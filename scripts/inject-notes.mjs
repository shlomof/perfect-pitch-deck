// One-shot injector: reads notes/slide-NN.html for N=1..23 and inserts each
// as <aside class="notes">…</aside> just before the matching </section>.
// Re-running is safe — existing <aside class="notes"> blocks are replaced.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const NOTES_DIR = path.join(ROOT, 'notes');
const INDEX = path.join(ROOT, 'index.html');

const html = fs.readFileSync(INDEX, 'utf8');

const slidesOpen = html.indexOf('<div class="slides">');
const slidesClose = html.indexOf('</div>\n</div>\n\n<!-- Keyboard');
if (slidesOpen < 0 || slidesClose < 0) throw new Error('Could not locate slides region');

const head = html.slice(0, slidesOpen + '<div class="slides">'.length);
const block = html.slice(slidesOpen + '<div class="slides">'.length, slidesClose);
const tail = html.slice(slidesClose);

// Parse sections
const sections = [];
let i = 0;
while (true) {
  const openIdx = block.indexOf('<section', i);
  if (openIdx < 0) break;
  const closeIdx = block.indexOf('</section>', openIdx);
  if (closeIdx < 0) throw new Error('Unclosed <section>');
  sections.push(block.slice(openIdx, closeIdx + '</section>'.length));
  i = closeIdx + '</section>'.length;
}

if (sections.length !== 23) {
  throw new Error(`Expected 23 sections, parsed ${sections.length}`);
}

const NOTES_RE = /\s*<aside class="notes">[\s\S]*?<\/aside>\s*/g;

const rebuilt = sections.map((section, idx) => {
  const n = idx + 1;
  const notePath = path.join(NOTES_DIR, `slide-${String(n).padStart(2, '0')}.html`);
  if (!fs.existsSync(notePath)) {
    console.warn(`  · slide ${n}: no notes file at ${notePath}`);
    // Strip any pre-existing notes so the section is clean
    return section.replace(NOTES_RE, '');
  }
  const notes = fs.readFileSync(notePath, 'utf8').trim();
  // Strip existing notes block(s)
  let cleaned = section.replace(NOTES_RE, '');
  // Insert just before </section>
  const indent = '      ';
  const inserted = cleaned.replace(
    /<\/section>$/,
    `\n${indent}<aside class="notes">\n${notes
      .split('\n')
      .map((l) => (l.trim() ? indent + '  ' + l : ''))
      .join('\n')}\n${indent}</aside>\n    </section>`
  );
  return inserted;
});

const newBlock = '\n    ' + rebuilt.join('\n\n    ') + '\n  ';
fs.writeFileSync(INDEX, head + newBlock + tail);

console.log(`Injected notes into ${rebuilt.length} sections.`);
