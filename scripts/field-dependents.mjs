#!/usr/bin/env node
// Given a brief.yaml field path (e.g. "offer.problem"), lists every slide whose
// SKILL.md declares it in requires_brief_fields or optional_brief_fields.
// Built so that after editing a core brief.yaml field, it's a one-command answer
// to "which slides need to be re-checked", instead of relying on memory of which
// slides happened to get touched last time.
//
// Usage: node scripts/field-dependents.mjs offer.problem
//        node scripts/field-dependents.mjs           (lists every field -> slides)

import fs from 'node:fs';
import path from 'node:path';

const SKILLS_DIR = path.resolve(import.meta.dirname, '..', 'skills');
const target = process.argv[2] || null;

const map = {}; // field -> [{slide, required}]

for (const dir of fs.readdirSync(SKILLS_DIR)) {
  const skillPath = path.join(SKILLS_DIR, dir, 'SKILL.md');
  if (!fs.existsSync(skillPath)) continue;
  const src = fs.readFileSync(skillPath, 'utf-8');

  const idxMatch = src.match(/^slide_index:\s*(\d+)/m);
  if (!idxMatch) continue;
  const slideIdx = parseInt(idxMatch[1], 10);

  const reqMatch = src.match(/^requires_brief_fields:\s*\[(.*?)\]/m);
  const optMatch = src.match(/^optional_brief_fields:\s*\[(.*?)\]/m);

  const parseList = (m) => m ? m[1].split(',').map(s => s.trim().replace(/^"|"$/g, '')).filter(Boolean) : [];

  for (const f of parseList(reqMatch)) {
    (map[f] ??= []).push({ slide: slideIdx, required: true });
  }
  for (const f of parseList(optMatch)) {
    (map[f] ??= []).push({ slide: slideIdx, required: false });
  }
}

function printField(field) {
  const deps = (map[field] || []).sort((a, b) => a.slide - b.slide);
  if (!deps.length) {
    console.log(`${field}: no slide declares this field (check the spelling, or it's genuinely unused)`);
    return;
  }
  const slides = deps.map(d => d.required ? `${d.slide}` : `${d.slide} (optional)`).join(', ');
  console.log(`${field} -> slides ${slides}`);
}

if (target) {
  printField(target);
} else {
  Object.keys(map).sort().forEach(printField);
}
