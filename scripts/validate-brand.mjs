// validate-brand.mjs — Phase 1 (warn mode)
//
// Catches the things that quietly break the kit's rebrand contract:
//   - Raw hex / rgba outside the :root token block
//   - Tailwind palette names anywhere (we don't use Tailwind)
//   - SVGs in assets/brand/ missing currentColor
//   - Missing required brand assets
//   - Dead Google Font imports (loaded but never used in CSS)
//
// Usage:  node scripts/validate-brand.mjs [--strict]
//   --strict → exit 1 on violations (fail builds). Default: warn (exit 0).

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const INDEX = resolve(ROOT, 'index.html');
const BRAND_DIR = resolve(ROOT, 'assets/brand');

const STRICT = process.argv.includes('--strict');

const violations = [];
const warnings = [];

function violation(msg, file, line) {
  violations.push({ msg, file, line });
}
function warning(msg, file, line) {
  warnings.push({ msg, file, line });
}

// ─── Component-level neutrals allowlist (see BRAND.md §"Component-level neutrals") ───
const ALLOWED_NEUTRALS = new Set([
  '#FFFFFF', '#FFF', '#fff',
  '#000000', '#000',
  '#1a1a1a', '#111', '#0a0a0a',
  '#F5F5F5', '#f5f5f5',
  '#F7F7F7', '#f7f7f7',
  '#F0F5FF', '#f0f5ff',
  '#F4F6FA', '#f4f6fa',
  '#E1E1E1', '#e1e1e1', '#E4E4E4', '#e4e4e4', '#EEE', '#eee',
  '#D8D8D8', '#d8d8d8', '#C8C8C8', '#c8c8c8',
  '#545454', '#6B7280',
  '#C0271F', '#c0271f',  // warn red
  '#ff7a7a', '#FF7A7A',  // notes-lock error
  '#1750D9', '#1750d9',  // accent hover
  '#0B66C2', '#0b66c2',  // legacy logo blue (will move out)
  '#1F5EFF', '#1f5eff',  // default accent (in :root only)
  '#D9E8FF', '#d9e8ff',  // legacy accent-tint
  '#C7DCFF', '#c7dcff',  // legacy accent-soft
]);

const TAILWIND_PALETTE = /\b(?:bg|text|border|ring|fill|stroke|from|to|via|placeholder|divide|outline|accent|caret|decoration|shadow)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g;

// ─── Parse index.html ───────────────────────────────────────────────────
if (!existsSync(INDEX)) {
  console.error('FATAL: index.html not found');
  process.exit(2);
}
const html = readFileSync(INDEX, 'utf8');
const lines = html.split('\n');

// Find the :root { ... } block range so we don't flag token definitions
let rootStart = -1, rootEnd = -1;
let depth = 0;
for (let i = 0; i < lines.length; i++) {
  if (rootStart < 0 && /:root\s*\{/.test(lines[i])) {
    rootStart = i;
    depth = (lines[i].match(/\{/g) || []).length - (lines[i].match(/\}/g) || []).length;
    continue;
  }
  if (rootStart >= 0 && rootEnd < 0) {
    depth += (lines[i].match(/\{/g) || []).length;
    depth -= (lines[i].match(/\}/g) || []).length;
    if (depth <= 0) { rootEnd = i; break; }
  }
}
if (rootStart < 0 || rootEnd < 0) {
  violation('Could not find :root { ... } block in index.html — brand tokens missing?', 'index.html', 0);
}

// ─── Scan for raw hex outside :root ─────────────────────────────────────
// Match #ABC, #ABCD, #ABCDEF, #ABCDEFAA — but NOT &#NNNN; HTML entities.
const HEX_RE = /(?<![&])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;
for (let i = 0; i < lines.length; i++) {
  if (i >= rootStart && i <= rootEnd) continue; // skip the :root block
  const line = lines[i];
  // Heuristic: only consider lines that look like CSS declarations.
  // Skip HTML attribute lines, inline SVG fills, comments.
  const looksLikeCss = /:\s*[^;]*#[0-9a-fA-F]{3,8}/.test(line) && !/<[a-z][^>]*#[0-9a-fA-F]{3,8}/.test(line);
  if (!looksLikeCss) continue;
  let m;
  HEX_RE.lastIndex = 0;
  while ((m = HEX_RE.exec(line))) {
    const hex = m[0];
    if (ALLOWED_NEUTRALS.has(hex) || ALLOWED_NEUTRALS.has(hex.toUpperCase()) || ALLOWED_NEUTRALS.has(hex.toLowerCase())) continue;
    warning(`raw hex literal outside :root: ${hex}`, 'index.html', i + 1);
  }
}

// ─── Scan for raw rgba() outside :root ──────────────────────────────────
// Allow pure-channel rgba (0/255 only) for shadows / UI chrome.
const RGBA_ALLOW = /rgba\(\s*(?:0|255)\s*,\s*(?:0|255)\s*,\s*(?:0|255)\s*,\s*(?:0|1|0?\.\d+)\s*\)/;
for (let i = 0; i < lines.length; i++) {
  if (i >= rootStart && i <= rootEnd) continue;
  const line = lines[i];
  if (!/rgba\(/.test(line)) continue;
  // Heuristic: only CSS-looking declarations. Skip JS string comparisons.
  const looksLikeCss = /:\s*[^;]*rgba\(/.test(line) && !/[!=]==?\s*['"]rgba/.test(line);
  if (!looksLikeCss) continue;
  const allMatches = line.match(/rgba\([^)]+\)/g) || [];
  for (const rgba of allMatches) {
    if (RGBA_ALLOW.test(rgba)) continue;
    warning(`raw rgba() outside :root: ${rgba}`, 'index.html', i + 1);
  }
}

// ─── Scan for Tailwind palette names ────────────────────────────────────
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let m;
  TAILWIND_PALETTE.lastIndex = 0;
  while ((m = TAILWIND_PALETTE.exec(line))) {
    violation(`Tailwind palette name found: ${m[0]} — we don't use Tailwind`, 'index.html', i + 1);
  }
}

// ─── Required brand assets manifest ─────────────────────────────────────
const REQUIRED_ASSETS = [
  { file: 'mark.svg', mustHaveCurrentColor: true, role: 'Logo mark — bottom-right corner brand on most slides' },
  { file: 'wordmark.svg', mustHaveCurrentColor: true, role: 'Slide 1 bottom-right wordmark' },
  { file: 'og-image.png', mustHaveCurrentColor: false, role: 'Open Graph social card (1200×630)' },
];
const OPTIONAL_ASSETS = [
  { file: 'favicon.png', role: 'Browser favicon (32×32 or 64×64)' },
  { file: 'mark-on-dark.svg', role: 'Light variant of mark for dark backgrounds (optional — currentColor handles it)' },
];

if (!existsSync(BRAND_DIR)) {
  violation('assets/brand/ directory does not exist', 'assets/brand', 0);
} else {
  for (const a of REQUIRED_ASSETS) {
    const path = join(BRAND_DIR, a.file);
    if (!existsSync(path)) {
      violation(`missing required brand asset: ${a.file} (${a.role})`, `assets/brand/${a.file}`, 0);
      continue;
    }
    if (a.mustHaveCurrentColor) {
      const svg = readFileSync(path, 'utf8');
      if (!/fill="currentColor"|stroke="currentColor"/.test(svg)) {
        violation(`brand SVG ${a.file} must use fill="currentColor" or stroke="currentColor" — never CSS filter hacks`, `assets/brand/${a.file}`, 0);
      }
    }
  }
  for (const a of OPTIONAL_ASSETS) {
    const path = join(BRAND_DIR, a.file);
    if (!existsSync(path)) {
      warning(`optional brand asset missing: ${a.file} (${a.role})`, `assets/brand/${a.file}`, 0);
    }
  }
}

// ─── Dead Google Font check ─────────────────────────────────────────────
const fontMatches = [...html.matchAll(/fonts\.googleapis\.com\/css2\?family=([^&"']+)/g)];
for (const m of fontMatches) {
  const families = m[1].split('&family=').map((f) => decodeURIComponent(f.split(':')[0]).replace(/\+/g, ' '));
  for (const family of families) {
    const used = new RegExp(`['"\`]${family}['"\`]`).test(html);
    if (!used) warning(`Google Font loaded but never referenced in CSS: ${family}`, 'index.html', 0);
  }
}

// ─── Report ─────────────────────────────────────────────────────────────
const total = violations.length + warnings.length;
if (violations.length) {
  console.log(`\n✗ ${violations.length} violation${violations.length === 1 ? '' : 's'}:`);
  for (const v of violations) console.log(`   ${v.file}:${v.line}  ${v.msg}`);
}
if (warnings.length) {
  console.log(`\n! ${warnings.length} warning${warnings.length === 1 ? '' : 's'}:`);
  for (const w of warnings.slice(0, 50)) console.log(`   ${w.file}:${w.line}  ${w.msg}`);
  if (warnings.length > 50) console.log(`   …and ${warnings.length - 50} more`);
}
if (total === 0) console.log('✓ validate-brand: clean');

if (STRICT && violations.length) process.exit(1);
process.exit(0);
