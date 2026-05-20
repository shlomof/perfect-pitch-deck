// Build script — assembles ./dist for Cloudflare Pages deploy.
//
//   DECK_PASSWORD set   → staticrypt the whole deck (gated mode)
//   DECK_PASSWORD unset → copy the deck through as-is (public mode)
//
// Speaker-notes handling (independent of DECK_PASSWORD):
//   INCLUDE_NOTES=false → strip <aside class="notes">…</aside> entirely
//   NOTES_PASSWORD=xxx  → encrypt notes with AES-GCM (PBKDF2-derived key);
//                         the page prompts the viewer for the passphrase
//                         when they request speaker view
//   (neither)           → notes ship inline as plaintext (default)
//
// Either way, /assets and /functions are copied alongside so the GHL Pages
// Function (functions/api/lead.js) is included in the deploy.

import { execSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { createCipheriv, pbkdf2Sync, randomBytes } from 'node:crypto';
import { resolve } from 'node:path';
import yaml from 'js-yaml';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = resolve(ROOT, 'dist');
const INDEX = resolve(ROOT, 'index.html');
const BRIEF = resolve(ROOT, 'brief.yaml');
const SKIP_VALIDATE = process.argv.includes('--skip-validate');

const NOTES_RE = /\s*<aside class="notes">([\s\S]*?)<\/aside>/g;

function escapeHtmlAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function stampCtaStatic(html, brief) {
  const url = brief?.cta?.url?.trim();
  if (!url) return html; // form mode — leave the card as-is
  const label = (brief?.cta?.label ?? 'Book a call').trim();
  // Inject data-mode + data-cta-url + data-cta-label on the ppd-cta-card
  // div. The choice-click handler reads these on each click.
  return html.replace(
    /(<div\s+class="cta-card"\s+id="ppd-cta-card"[^>]*?)data-endpoint="([^"]*)"/,
    `$1data-endpoint="$2" data-mode="static" data-cta-url="${escapeHtmlAttr(url)}" data-cta-label="${escapeHtmlAttr(label)}"`
  );
}

function sh(cmd) {
  execSync(cmd, { stdio: 'inherit', cwd: ROOT });
}

function copy(from, to) {
  const src = resolve(ROOT, from);
  if (!existsSync(src)) return;
  cpSync(src, resolve(DIST, to), { recursive: true });
}

function stripNotes(html) {
  return html.replace(NOTES_RE, '');
}

function encryptNotes(html, password) {
  const salt = randomBytes(16);
  const key = pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  const blocks = [];
  const replaced = html.replace(NOTES_RE, (_match, inner) => {
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const ct = Buffer.concat([cipher.update(inner, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    blocks.push({
      iv: iv.toString('base64'),
      // Web Crypto AES-GCM expects ciphertext|tag concatenated
      ct: Buffer.concat([ct, tag]).toString('base64'),
    });
    return '\n      <aside class="notes" data-locked></aside>';
  });
  const payload = JSON.stringify({ salt: salt.toString('base64'), blocks });
  const script = `<script type="application/json" id="ppd-notes-encrypted">${payload}</script>`;
  // Inject right after the opening <body> tag so the JSON blob is in DOM
  // before any inline script below it runs. Under staticrypt's document.write
  // unlock, the parser still walks the decrypted HTML top-to-bottom, so we
  // need this script to appear above the notes-gate setup code.
  const bodyOpen = replaced.match(/<body[^>]*>/i);
  if (!bodyOpen) {
    throw new Error('encryptNotes: could not find <body> to inject ciphertext');
  }
  const insertAt = bodyOpen.index + bodyOpen[0].length;
  return replaced.slice(0, insertAt) + '\n' + script + replaced.slice(insertAt);
}

// ─── Pre-build validation ────────────────────────────────────────────────
if (!SKIP_VALIDATE) {
  console.log('→ validate-brand');
  sh('node scripts/validate-brand.mjs --strict');
  console.log('→ validate-deck');
  try {
    sh('node scripts/validate-deck.mjs --strict');
  } catch (e) {
    console.error('\n✗ validate-deck failed. Fix the violations above or rebuild with --skip-validate.');
    process.exit(1);
  }
}

// Reset dist/
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

const password = process.env.DECK_PASSWORD;
const includeNotes = process.env.INCLUDE_NOTES !== 'false';
const notesPassword = process.env.NOTES_PASSWORD;

// Read brief.yaml if present — drives CTA static-mode stamping
let brief = null;
if (existsSync(BRIEF)) {
  try {
    brief = yaml.load(readFileSync(BRIEF, 'utf8'));
  } catch (e) {
    console.warn(`! brief.yaml present but unparseable (${e.message}) — skipping CTA stamping`);
  }
}

let sourceText = readFileSync(INDEX, 'utf8');

// Stamp CTA static mode from brief BEFORE any other source mutation
const beforeStamp = sourceText;
sourceText = stampCtaStatic(sourceText, brief);
const ctaMode = sourceText !== beforeStamp ? 'static' : 'form';

let notesMode = 'inline';

if (!includeNotes) {
  console.log('→ INCLUDE_NOTES=false — stripping <aside class="notes"> blocks');
  sourceText = stripNotes(sourceText);
  notesMode = 'stripped';
} else if (notesPassword) {
  console.log('→ NOTES_PASSWORD set — encrypting speaker notes (AES-GCM)');
  sourceText = encryptNotes(sourceText, notesPassword);
  notesMode = 'encrypted';
}

// staticrypt operates on a file on disk; whenever we mutated the source
// (notes encryption/stripping OR CTA stamping) we must write a temp file.
let stagedPath = INDEX;
let stagedTemp = null;
const sourceModified = notesMode !== 'inline' || ctaMode !== 'form';
if (sourceModified) {
  stagedTemp = resolve(ROOT, '.index.staged.html');
  writeFileSync(stagedTemp, sourceText);
  stagedPath = stagedTemp;
}

try {
  if (password) {
    console.log('→ Gated mode (DECK_PASSWORD set) — running staticrypt');
    const title = process.env.DECK_TITLE ?? 'Perfect Pitch Deck';
    const instructions =
      process.env.DECK_INSTRUCTIONS ?? 'Enter the passphrase to unlock the deck.';
    // staticrypt's --remember N enables the "Remember me" checkbox; the unlock
    // is then cached in localStorage for N days. The custom template
    // pre-checks the box so refresh-on-same-device just works. Set
    // DECK_REMEMBER_DAYS=0 to disable the checkbox entirely.
    const rememberDays = process.env.DECK_REMEMBER_DAYS ?? '30';
    const rememberArgs =
      String(rememberDays) === 'false' || String(rememberDays) === '0'
        ? ['--remember false']
        : [`--remember ${rememberDays}`];
    const args = [
      `npx staticrypt "${stagedPath}"`,
      `-p "${password.replace(/"/g, '\\"')}"`,
      '--short',
      '-d dist',
      ...rememberArgs,
      '--template staticrypt-template.html',
      `--template-title "${title}"`,
      `--template-instructions "${instructions}"`,
      '--template-placeholder Passphrase',
      '--template-button "Unlock deck"',
      '--template-error "Wrong passphrase — try again."',
      '--template-remember "Remember on this device"',
    ].join(' ');
    sh(args);
    // staticrypt names the output after the input file; if we fed it a
    // temp path, rename the result to index.html.
    if (stagedTemp) {
      const built = resolve(DIST, '.index.staged.html');
      if (existsSync(built)) {
        cpSync(built, resolve(DIST, 'index.html'));
        rmSync(built);
      }
    }
  } else {
    console.log('→ Public mode (no DECK_PASSWORD) — copying index.html through unencrypted');
    cpSync(stagedPath, resolve(DIST, 'index.html'));
  }
} finally {
  if (stagedTemp) rmSync(stagedTemp, { force: true });
}

// Always include assets + functions
copy('assets', 'assets');
copy('functions', 'functions');

console.log('\n✓ dist/ assembled.');
console.log(`  · notes ${notesMode}`);
console.log(`  · gate  ${password ? 'gated' : 'public'}`);
console.log(`  · cta   ${ctaMode}`);
console.log('  → next: npm run deploy');
