#!/usr/bin/env node
// Extracts the visible text of every slide in index.html, one block per slide,
// skipping speaker notes and script/style noise. Built so a narrative-consistency
// pass (human or LLM) can read the WHOLE deck's story in one shot instead of
// checking slides one at a time and missing cross-slide drift.
//
// Usage: node scripts/dump-deck-text.mjs [--slide N]

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const onlyIdx = args.includes('--slide') ? parseInt(args[args.indexOf('--slide') + 1], 10) : null;

const INDEX_HTML = path.resolve(import.meta.dirname, '..', 'index.html');
const html = fs.readFileSync(INDEX_HTML, 'utf-8');

const sections = html.split('<section').slice(1);

sections.forEach((raw, i) => {
  const n = i + 1;
  if (onlyIdx && n !== onlyIdx) return;

  const hidden = /data-visibility\s*=\s*"hidden"/.test(raw);
  console.log(`=== SLIDE ${n}${hidden ? ' (HIDDEN — excluded from live run-through)' : ''} ===`);
  if (hidden) { console.log(); return; }

  // Only the visible slide body — cut everything from the notes aside onward,
  // and strip the footer (brand chrome, not narrative content).
  let body = raw.split('<aside class="notes"')[0];
  body = body.split('<div class="ppd-footer"')[0];
  body = body.replace(/<svg[\s\S]*?<\/svg>/g, '');

  const text = body
    .replace(/<[^>]+>/g, ' | ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/\s*\|\s*(\|\s*)+/g, ' | ')
    .replace(/\s+/g, ' ')
    .trim();

  console.log(text);
  console.log();
});
