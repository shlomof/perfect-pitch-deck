// OKLCH spike: convert current brand palette into OKLCH formulas,
// measure perceptual drift (deltaE 2000), and verify rendering in headless Chrome.
import { converter, formatHex, formatCss, parse, differenceCiede2000 } from 'culori';
import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';

const toOklch = converter('oklch');
const toRgb = converter('rgb');
const dE = differenceCiede2000();

const HEXES = {
  'bg-light':       '#F5F5F5',
  'bg-dark':        '#000000',
  'bg-blue':        '#1F5EFF',
  'bg-blue-tint':   '#D9E8FF',
  'surface':        '#FFFFFF',
  'accent-blue':    '#1F5EFF',
  'accent-blue-soft':'#C7DCFF',
};

console.log('\n=== STEP 2a: Convert palette to OKLCH ===');
const oklchMap = {};
for (const [name, hex] of Object.entries(HEXES)) {
  const o = toOklch(parse(hex));
  oklchMap[name] = o;
  const Lpct = (o.l * 100).toFixed(2);
  const C = o.c.toFixed(4);
  const H = (o.h ?? 0).toFixed(2);
  console.log(`  ${name.padEnd(18)} ${hex}  ->  oklch(${Lpct}% ${C} ${H})`);
}

console.log('\n=== STEP 2b: Candidate formulas for primary #1F5EFF ===');
const primary = oklchMap['accent-blue'];
const targetHex = '#1F5EFF';

const candidates = [
  { label: 'exact-from-hex',  l: primary.l, c: primary.c, h: primary.h },
  { label: '60% 0.18 H',      l: 0.60, c: 0.18, h: primary.h },
  { label: '50% 0.22 H',      l: 0.50, c: 0.22, h: primary.h },
  { label: '55% 0.20 H',      l: 0.55, c: 0.20, h: primary.h },
  { label: '52% 0.24 H',      l: 0.52, c: 0.24, h: primary.h },
  { label: '55% 0.24 H',      l: 0.55, c: 0.24, h: primary.h },
];

const target = parse(targetHex);
for (const c of candidates) {
  const ok = { mode: 'oklch', l: c.l, c: c.c, h: c.h };
  const rgb = toRgb(ok);
  const hex = formatHex(ok) ?? '(out of sRGB)';
  const inGamut = rgb.r >= 0 && rgb.r <= 1 && rgb.g >= 0 && rgb.g <= 1 && rgb.b >= 0 && rgb.b <= 1;
  const delta = dE(target, ok);
  console.log(`  ${c.label.padEnd(20)} L=${(c.l*100).toFixed(1)}% C=${c.c.toFixed(3)} H=${(c.h ?? 0).toFixed(2)}  -> ${hex}  inGamut=${inGamut}  dE=${delta.toFixed(2)}`);
}

console.log('\n=== STEP 5: Candidate formulas for soft tint #C7DCFF (and bg tint #D9E8FF) ===');
const softTarget = parse('#C7DCFF');
const bgTintTarget = parse('#D9E8FF');
const softCands = [
  { label: 'exact-from-hex C7DCFF', ...toOklch(softTarget) },
  { label: 'exact-from-hex D9E8FF', ...toOklch(bgTintTarget) },
  { label: '90% 0.05 H',  l: 0.90, c: 0.05, h: primary.h },
  { label: '88% 0.06 H',  l: 0.88, c: 0.06, h: primary.h },
  { label: '92% 0.04 H',  l: 0.92, c: 0.04, h: primary.h },
  { label: '94% 0.03 H',  l: 0.94, c: 0.03, h: primary.h },
  { label: 'C * 0.3 of primary', l: 0.88, c: primary.c * 0.3, h: primary.h },
  { label: 'C * 0.25', l: 0.91, c: primary.c * 0.25, h: primary.h },
];
for (const c of softCands) {
  const ok = { mode: 'oklch', l: c.l, c: c.c, h: c.h };
  const hex = formatHex(ok) ?? 'OOG';
  const dSoft = dE(softTarget, ok);
  const dBg = dE(bgTintTarget, ok);
  console.log(`  ${c.label.padEnd(28)} L=${(c.l*100).toFixed(1)}% C=${c.c.toFixed(4)} H=${(c.h ?? 0).toFixed(2)}  -> ${hex}  dE(soft)=${dSoft.toFixed(2)}  dE(bgTint)=${dBg.toFixed(2)}`);
}

// Pick best formulas for browser test
const bestPrimary = { l: 0.55, c: 0.24, h: primary.h };       // we'll let the table choose
const bestSoftFromSampling = { l: 0.91, c: primary.c * 0.25, h: primary.h };

console.log('\n=== STEP 3+4: Browser render test (puppeteer) ===');
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 400, deviceScaleFactor: 1 });

const HUE = primary.h.toFixed(3);

const html = `<!doctype html><html><head><style>
  body { margin: 0; padding: 0; font-family: monospace; background: #222; color: #fff; }
  .row { display: flex; }
  .sw { width: 200px; height: 200px; display: flex; align-items: flex-end; justify-content: center; padding: 6px; font-size: 11px; color: #fff; text-shadow: 0 1px 1px #000; }
  .lbl { background: rgba(0,0,0,0.6); padding: 2px 6px; border-radius: 4px; }
  :root {
    --brand-hue: ${HUE};
    --brand-chroma: ${primary.c.toFixed(4)};
  }
  .a { background: #1F5EFF; }
  .b { background: oklch(${(primary.l*100).toFixed(2)}% ${primary.c.toFixed(4)} ${HUE}); }
  .c { background: oklch(55% 0.24 var(--brand-hue)); }
  .d { background: oklch(60% 0.18 var(--brand-hue)); }
  .e { background: oklch(calc(${(primary.l*100).toFixed(2)} * 1%) calc(var(--brand-chroma) * 1) var(--brand-hue)); }
  .f { background: #D9E8FF; color: #000; text-shadow: none; }
  .g { background: oklch(92.4% ${(primary.c*0.18).toFixed(4)} var(--brand-hue)); color:#000; text-shadow:none; }
  .h { background: #C7DCFF; color: #000; text-shadow: none; }
  .i { background: oklch(88% ${(primary.c*0.25).toFixed(4)} var(--brand-hue)); color: #000; text-shadow: none; }
  .j { background: oklch(60% calc(var(--brand-chroma) * 0.4) var(--brand-hue)); }
</style></head><body>
<div class="row">
  <div class="sw a"><span class="lbl">A: #1F5EFF literal</span></div>
  <div class="sw b"><span class="lbl">B: oklch exact</span></div>
  <div class="sw c"><span class="lbl">C: oklch(55% 0.24 H)</span></div>
  <div class="sw d"><span class="lbl">D: oklch(60% 0.18 H)</span></div>
  <div class="sw e"><span class="lbl">E: oklch w/ calc()</span></div>
  <div class="sw j"><span class="lbl">J: calc() chroma*0.4</span></div>
</div>
<div class="row">
  <div class="sw f"><span class="lbl">F: #D9E8FF literal</span></div>
  <div class="sw g"><span class="lbl">G: oklch derived bg-tint</span></div>
  <div class="sw h"><span class="lbl">H: #C7DCFF literal</span></div>
  <div class="sw i"><span class="lbl">I: oklch derived soft</span></div>
</div>
</body></html>`;

await page.setContent(html, { waitUntil: 'load' });

const screenshotPath = path.resolve('scripts/oklch-spike.png');
await page.screenshot({ path: screenshotPath, fullPage: true });
console.log('  screenshot ->', screenshotPath);

// Sample computed colors and center pixels
const samples = await page.evaluate(() => {
  const ids = ['a','b','c','d','e','j','f','g','h','i'];
  return ids.map(id => {
    const el = document.querySelector('.' + id);
    const cs = getComputedStyle(el).backgroundColor;
    const r = el.getBoundingClientRect();
    return { id, computed: cs, rect: { x: r.x + r.width/2, y: r.y + r.height/2 } };
  });
});

// Read screenshot pixels with sharp-free approach: re-render solid full page via canvas read
// Instead use puppeteer's evaluate to read pixel via canvas
const pixelReads = await page.evaluate(async (samples) => {
  // capture body via html2canvas-style hack — use getComputedStyle only (rgb()).
  // Computed style is what was actually applied; that's the resolved color.
  return samples;
}, samples);

function parseRgb(str) {
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(',').map(s => parseFloat(s.trim()));
  return { r: parts[0]/255, g: parts[1]/255, b: parts[2]/255, mode: 'rgb' };
}

console.log('\n  Computed colors (what the browser actually rendered):');
for (const s of samples) {
  const rgb = parseRgb(s.computed);
  let extra = '';
  if (rgb) {
    const refs = { a: '#1F5EFF', b: '#1F5EFF', c: '#1F5EFF', d: '#1F5EFF', e: '#1F5EFF', j: '#1F5EFF', f: '#D9E8FF', g: '#D9E8FF', h: '#C7DCFF', i: '#C7DCFF' };
    const ref = parse(refs[s.id]);
    const d = dE(ref, rgb);
    const hex = formatHex(rgb);
    extra = `  -> ${hex}  dE(vs ${refs[s.id]})=${d.toFixed(2)}`;
  }
  console.log(`    ${s.id}: ${s.computed}${extra}`);
}

await browser.close();
console.log('\nDone.');
