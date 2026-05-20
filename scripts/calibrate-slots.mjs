#!/usr/bin/env node
// calibrate-slots.mjs
//
// Refines `maxChars` in `slides/schema.json` by empirically finding the
// largest character count a slot can hold before the layout breaks. Uses
// puppeteer + binary search; updates the schema in place and marks each
// refined slot as `calibrated: true`.
//
// Pre-req: dev server on http://localhost:8765 serving the repo root.
//   python3 -m http.server 8765 &
//   node scripts/calibrate-slots.mjs [--slide N] [--slot name] [--dry]
//
// Flags:
//   --slide N    only calibrate slide N (1-based)
//   --slot name  only calibrate slots matching name
//   --dry        compute new maxes but don't write schema.json

import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const SCHEMA = resolve(ROOT, 'slides/schema.json');
const URL_BASE = 'http://localhost:8765/index.html';

const args = process.argv.slice(2);
const onlySlide = args.includes('--slide') ? parseInt(args[args.indexOf('--slide') + 1], 10) : null;
const onlySlot = args.includes('--slot') ? args[args.indexOf('--slot') + 1] : null;
const DRY = args.includes('--dry');

const LOREM = (
  'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod ' +
  'tempor incididunt ut labore et dolore magna aliqua ut enim ad minim '
).repeat(20);

function sample(n) {
  return n <= LOREM.length ? LOREM.slice(0, n) : LOREM + 'x'.repeat(n - LOREM.length);
}

const schema = JSON.parse(readFileSync(SCHEMA, 'utf8'));

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

console.log('connecting to', URL_BASE);
await page.goto(URL_BASE, { waitUntil: 'networkidle0' });
await page.waitForFunction(() => window.Reveal, { timeout: 8000 });

const STAGE_W = 1920;
const STAGE_H = 1080;

// Slot-type → breakage criterion. Returns true if the layout broke.
async function detectBreak(selector, type) {
  return page.evaluate(({ selector, type, STAGE_W, STAGE_H }) => {
    const el = document.querySelector(`.slides > section.present ${selector}`);
    if (!el) return { broke: false, reason: 'selector not found' };
    const rect = el.getBoundingClientRect();
    const parent = el.parentElement;
    const parentRect = parent ? parent.getBoundingClientRect() : null;
    if (type === 'headline' || type === 'cta_label' || type === 'card_title') {
      // Break if horizontal overflow OR vertical row-height growth past +50%
      if (el.scrollWidth > el.clientWidth + 1) return { broke: true, reason: 'horizontal overflow' };
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || (parseFloat(getComputedStyle(el).fontSize) * 1.2);
      const lines = Math.round(el.offsetHeight / lineHeight);
      if (lines > 2) return { broke: true, reason: `wrapped to ${lines} lines` };
    }
    if (type === 'quote' || type === 'body' || type === 'eyebrow') {
      // Break if it overflows the stage vertically
      if (rect.bottom > STAGE_H - 20) return { broke: true, reason: `bottom ${Math.round(rect.bottom)} > stage` };
    }
    if (type === 'card_body' || type === 'list_item') {
      // Break if the element pushes outside its parent
      if (parentRect && rect.bottom > parentRect.bottom + 1) return { broke: true, reason: 'overflows parent card' };
    }
    return { broke: false };
  }, { selector, type, STAGE_W, STAGE_H });
}

async function calibrateSlot(slideIndex, slot) {
  if (onlySlide !== null && slideIndex !== onlySlide) return null;
  if (onlySlot !== null && !slot.name.includes(onlySlot)) return null;

  await page.evaluate((i) => Reveal.slide(i - 1, 0), slideIndex);
  await new Promise((r) => setTimeout(r, 400));

  // Save original content so we can restore later
  const original = await page.evaluate((sel) => {
    const el = document.querySelector(`.slides > section.present ${sel}`);
    return el ? el.textContent : null;
  }, slot.selector);
  if (original === null) {
    return { ...slot, error: 'selector not found' };
  }

  // Binary search the largest length that doesn't break
  let lo = 1;
  let hi = 600;
  let lastGood = original.length;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    await page.evaluate((sel, text) => {
      const el = document.querySelector(`.slides > section.present ${sel}`);
      if (el) el.textContent = text;
    }, slot.selector, sample(mid));
    await new Promise((r) => setTimeout(r, 80));
    const result = await detectBreak(slot.selector, slot.type);
    if (result.broke) {
      hi = mid - 1;
    } else {
      lastGood = mid;
      lo = mid + 1;
    }
  }

  // Restore original
  await page.evaluate((sel, text) => {
    const el = document.querySelector(`.slides > section.present ${sel}`);
    if (el) el.textContent = text;
  }, slot.selector, original);

  // Apply 5-char safety margin
  const measured = lastGood;
  const newMax = Math.max(slot.maxChars ?? 0, measured - 5);
  return { name: slot.name, measured, oldMax: slot.maxChars, newMax };
}

const reports = [];
for (const slideSpec of schema.slides) {
  for (const slot of slideSpec.slots) {
    try {
      const r = await calibrateSlot(slideSpec.index, slot);
      if (!r) continue;
      reports.push({ slide: slideSpec.index, slug: slideSpec.slug, ...r });
      if (r.error) {
        console.log(`slide ${slideSpec.index} · ${slot.name}: ERROR ${r.error}`);
      } else {
        console.log(`slide ${slideSpec.index} · ${slot.name}: measured=${r.measured}  old=${r.oldMax}  new=${r.newMax}`);
        if (!DRY) {
          slot.maxChars = r.newMax;
          slot.calibrated = true;
        }
      }
    } catch (e) {
      console.log(`slide ${slideSpec.index} · ${slot.name}: EXCEPTION ${e.message}`);
    }
  }
}

if (!DRY) {
  writeFileSync(SCHEMA, JSON.stringify(schema, null, 2) + '\n');
  console.log(`\n✓ wrote ${SCHEMA}`);
} else {
  console.log('\n(dry run — schema.json not modified)');
}

await browser.close();
