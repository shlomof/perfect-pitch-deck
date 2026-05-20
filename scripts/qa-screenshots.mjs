import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(import.meta.dirname, '..', '_qa');
fs.mkdirSync(OUT, { recursive: true });

const SLIDE_COUNT = 23;
const URL_BASE = 'http://localhost:8765/index.html';

const browser = await puppeteer.launch({ headless: 'new' });

const failures = [];
for (let i = 1; i <= SLIDE_COUNT; i++) {
  // Fresh page per slide kills any stale transition state from Reveal's fade.
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  const url = `${URL_BASE}#/${i - 1}`;
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
    // Wait for fonts + Reveal layout
    await page.evaluate(() => document.fonts ? document.fonts.ready : null);
    await new Promise(r => setTimeout(r, 500));
    const out = path.join(OUT, `slide-${String(i).padStart(2, '0')}.png`);
    await page.screenshot({ path: out, fullPage: false });
    process.stdout.write(`✓ slide ${i}\n`);
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
console.log(`\nAll ${SLIDE_COUNT} slides rendered.`);
