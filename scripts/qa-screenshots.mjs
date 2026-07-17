import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(import.meta.dirname, '..', '_qa');
fs.mkdirSync(OUT, { recursive: true });

const SLIDE_COUNT = 23;
const URL_BASE = 'http://localhost:8765/index.html';
const INDEX_HTML = path.resolve(import.meta.dirname, '..', 'index.html');

// Reveal.js removes data-visibility="hidden" sections from the DOM at runtime,
// so hash indices (#/N) are 0-based over the REMAINING visible sections only —
// they do not line up 1:1 with original slide numbers once any slide is hidden.
// Parse the source to find which of the top-level <section> elements are
// hidden, then compute each visible slide's real hash index by counting only
// the hidden sections that precede it.
const html = fs.readFileSync(INDEX_HTML, 'utf-8');
const sectionRegex = /<section\b([^>]*)>/g;
const sections = [];
let m;
while ((m = sectionRegex.exec(html)) !== null) {
  sections.push({ hidden: /data-visibility\s*=\s*"hidden"/.test(m[1]) });
}
if (sections.length !== SLIDE_COUNT) {
  console.warn(`Warning: found ${sections.length} <section> tags, expected ${SLIDE_COUNT}. Slide numbering below may be off — check index.html structure.`);
}

let hashCursor = 0;
const slideToHash = {}; // 1-based slide number -> hash index, or null if hidden
sections.forEach((s, i) => {
  const slideNum = i + 1;
  if (s.hidden) {
    slideToHash[slideNum] = null;
  } else {
    slideToHash[slideNum] = hashCursor;
    hashCursor += 1;
  }
});

const browser = await puppeteer.launch({ headless: 'new' });

const failures = [];
for (let i = 1; i <= SLIDE_COUNT; i++) {
  const hash = slideToHash[i];
  if (hash === null) {
    process.stdout.write(`- slide ${i}: hidden (data-visibility="hidden"), skipped — no screenshot\n`);
    continue;
  }
  // Fresh page per slide kills any stale transition state from Reveal's fade.
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  const url = `${URL_BASE}#/${hash}`;
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
    // Wait for fonts + Reveal layout
    await page.evaluate(() => document.fonts ? document.fonts.ready : null);
    await new Promise(r => setTimeout(r, 500));
    const out = path.join(OUT, `slide-${String(i).padStart(2, '0')}.png`);
    await page.screenshot({ path: out, fullPage: false });
    process.stdout.write(`✓ slide ${i} (hash #/${hash})\n`);
  } catch (e) {
    failures.push({ slide: i, error: e.message });
    process.stdout.write(`✗ slide ${i}: ${e.message}\n`);
  }
  await page.close();
}

await browser.close();
if (failures.length) {
  console.error(`\n${failures.length} failure(s):`, JSON.stringify(failures, null, 2));
  process.exit(1);
}
console.log(`\nAll visible slides rendered (hidden slides skipped by design).`);
