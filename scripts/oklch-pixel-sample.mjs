// Sample center pixels of the rendered swatch screenshot so we measure
// what the screen actually shows (not the spec'd oklch() string).
import sharp from 'sharp';
import { parse, differenceCiede2000, formatHex } from 'culori';

const dE = differenceCiede2000();
const img = sharp('scripts/oklch-spike.png');
const meta = await img.metadata();
const raw = await img.raw().toBuffer();
const W = meta.width, H = meta.height, C = meta.channels;

// Grid: 2 rows x 6 cols of 200x200 swatches starting at (0,0)
// Row 1: a(0), b(1), c(2), d(3), e(4), j(5)
// Row 2: f(0), g(1), h(2), i(3)
const cells = [
  ['a', 0, 0, '#1F5EFF'],
  ['b', 1, 0, '#1F5EFF'],
  ['c', 2, 0, '#1F5EFF'],
  ['d', 3, 0, '#1F5EFF'],
  ['e', 4, 0, '#1F5EFF'],
  ['j', 5, 0, '#1F5EFF'],
  ['f', 0, 1, '#D9E8FF'],
  ['g', 1, 1, '#D9E8FF'],
  ['h', 2, 1, '#C7DCFF'],
  ['i', 3, 1, '#C7DCFF'],
];

function samplePixel(x, y) {
  const i = (y * W + x) * C;
  return { r: raw[i] / 255, g: raw[i+1] / 255, b: raw[i+2] / 255, mode: 'rgb' };
}

function avgRegion(cx, cy, half = 40) {
  let r=0, g=0, b=0, n=0;
  for (let y = cy - half; y <= cy + half; y++) {
    for (let x = cx - half; x <= cx + half; x++) {
      const p = samplePixel(x, y);
      r += p.r; g += p.g; b += p.b; n++;
    }
  }
  return { r: r/n, g: g/n, b: b/n, mode: 'rgb' };
}

console.log(`Image ${W}x${H}, channels=${C}`);
console.log('\nRendered pixel sample (avg of 81x81 region near center, away from label):');
for (const [id, col, row, refHex] of cells) {
  const cx = col * 200 + 100;
  const cy = row * 200 + 60;  // upper area, away from label box at bottom
  const rgb = avgRegion(cx, cy, 40);
  const ref = parse(refHex);
  const delta = dE(ref, rgb);
  const hex = formatHex(rgb);
  console.log(`  ${id}: rendered=${hex}  ref=${refHex}  dE=${delta.toFixed(2)}`);
}
