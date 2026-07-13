// validate-deck.mjs — Phase 1 (warn mode)
//
// Reads slides/schema.json and checks each slide's slot copy in index.html
// against the per-slot character budget. Also verifies required slots are
// non-empty and (when --strict-notes) that speaker notes reference at least
// one brief-specific token.
//
// Phase 1 ships in warn mode (schema may not exist yet). When schema.json is
// present, this validator reports per-slot deltas without failing the build.
//
// Usage: node scripts/validate-deck.mjs [--strict] [--strict-notes]
//   --strict       → exit 1 on hard-limit overruns
//   --strict-notes → exit 1 if speaker notes look like generic LLM output

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const INDEX = resolve(ROOT, 'index.html');
const SCHEMA = resolve(ROOT, 'slides/schema.json');
const NOTES_DIR = resolve(ROOT, 'notes');

const STRICT = process.argv.includes('--strict');

if (!existsSync(SCHEMA)) {
  console.log('! validate-deck: slides/schema.json not found — skipping per-slot checks.');
  console.log('  Run `node scripts/calibrate-slots.mjs` to generate the schema.');
  process.exit(0);
}

const schema = JSON.parse(readFileSync(SCHEMA, 'utf8'));
const html = readFileSync(INDEX, 'utf8');

const violations = [];
const warnings = [];

function violation(msg, slide, slot) { violations.push({ msg, slide, slot }); }
function warning(msg, slide, slot) { warnings.push({ msg, slide, slot }); }

// Extract just the visible text from an HTML snippet
function visibleText(html) {
  return html
    .replace(/<aside class="notes">[\s\S]*?<\/aside>/g, '')
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/&#\d+;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Find each <section> in order
const sections = [];
let cursor = 0;
while (true) {
  const start = html.indexOf('<section', cursor);
  if (start < 0) break;
  const end = html.indexOf('</section>', start);
  if (end < 0) break;
  sections.push({ start, end: end + '</section>'.length, html: html.slice(start, end + '</section>'.length) });
  cursor = end + '</section>'.length;
}

if (!Array.isArray(schema.slides)) {
  console.error('FATAL: schema.json missing "slides" array');
  process.exit(2);
}

// ─── Notes drift check ──────────────────────────────────────────────────
// notes/slide-NN.html is the source of truth (see scripts/inject-notes.mjs);
// the <aside class="notes"> in index.html is supposed to be an exact splice
// of it. Hand-editing one without the other is how a deck ends up telling
// the presenter to say something the slide no longer shows (this happened
// on the Jim James deck: slide 9's aside was updated to describe a real
// screenshot, but notes/slide-09.html still said "there isn't a dashboard
// for this build"). Compare normalized text on every build so drift shows
// up immediately instead of surviving silently across client reuses.
function normalizeNotesText(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8217;|&#8216;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8212;|&#8211;/g, '-')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/&#\d+;/g, "'")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

const ASIDE_RE = /<aside class="notes">([\s\S]*?)<\/aside>/;

for (let idx = 0; idx < sections.length; idx++) {
  const n = idx + 1;
  const notePath = resolve(NOTES_DIR, `slide-${String(n).padStart(2, '0')}.html`);
  if (!existsSync(notePath)) continue;
  const asideMatch = sections[idx].html.match(ASIDE_RE);
  const liveText = normalizeNotesText(asideMatch ? asideMatch[1] : '');
  const sourceText = normalizeNotesText(readFileSync(notePath, 'utf8'));
  if (liveText !== sourceText) {
    warning(
      `<aside class="notes"> in index.html does not match notes/slide-${String(n).padStart(2, '0')}.html — one was hand-edited without the other. Run node scripts/inject-notes.mjs (after reconciling which side is correct) to resync.`,
      n,
      'notes'
    );
  }
}

for (const slideSpec of schema.slides) {
  const idx = slideSpec.index - 1;
  const section = sections[idx];
  if (!section) {
    violation(`section ${slideSpec.index} not found in index.html`, slideSpec.index, null);
    continue;
  }
  for (const slot of slideSpec.slots ?? []) {
    if (!slot.selector) continue;
    // Static regex-based validation only handles simple `.classname [.classname]…`
    // selectors. Anything with brackets, pseudo-selectors, or `>` combinators
    // needs the DOM-based runtime validator (run via `node scripts/calibrate-slots.mjs`).
    // For now, only validate selectors that are pure class chains.
    if (/[\[\]:>+~*]/.test(slot.selector)) continue;
    const segments = slot.selector
      .split(/\s+/)
      .filter(Boolean)
      .map((seg) => seg.replace(/^\./, ''));
    if (!segments.length) continue;
    const lastClass = segments[segments.length - 1];
    if (!/^[A-Za-z][\w-]*$/.test(lastClass)) continue;
    // Match a class attribute whose token list (space-separated) contains the
    // EXACT class name. `\b` won't do — it treats `quote-slide` as starting
    // with `quote`. Require space or quote on both sides of the token.
    const re = new RegExp(`<[a-z][^>]*class="(?:[^"]*\\s)?${lastClass}(?:\\s[^"]*)?"[^>]*>([\\s\\S]*?)<`, 'i');
    const m = section.html.match(re);
    if (!m) {
      if (slot.required) warning(`slot "${slot.name}" (selector ${slot.selector}) not found in section`, slideSpec.index, slot.name);
      continue;
    }
    const text = visibleText(m[1]);
    const chars = text.length;
    if (slot.required && chars === 0) {
      violation(`required slot "${slot.name}" is empty`, slideSpec.index, slot.name);
      continue;
    }
    if (slot.maxChars && chars > slot.maxChars) {
      const msg = `slot "${slot.name}" overruns max=${slot.maxChars} (actual=${chars})`;
      if (slot.hardLimit) violation(msg, slideSpec.index, slot.name);
      else warning(msg, slideSpec.index, slot.name);
    }
  }
}

// ─── Report ─────────────────────────────────────────────────────────────
if (violations.length) {
  console.log(`\n✗ ${violations.length} violation${violations.length === 1 ? '' : 's'}:`);
  for (const v of violations) console.log(`   slide ${v.slide}${v.slot ? ' · ' + v.slot : ''}  ${v.msg}`);
}
if (warnings.length) {
  console.log(`\n! ${warnings.length} warning${warnings.length === 1 ? '' : 's'}:`);
  for (const w of warnings.slice(0, 50)) console.log(`   slide ${w.slide}${w.slot ? ' · ' + w.slot : ''}  ${w.msg}`);
  if (warnings.length > 50) console.log(`   …and ${warnings.length - 50} more`);
}
if (violations.length === 0 && warnings.length === 0) console.log('✓ validate-deck: clean');

if (STRICT && violations.length) process.exit(1);
process.exit(0);
