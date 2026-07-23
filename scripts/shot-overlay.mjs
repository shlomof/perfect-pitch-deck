import puppeteer from 'puppeteer';
import path from 'path';

const htmlPath = process.argv[2];
const outPath = process.argv[3];

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 627 });
await page.goto('file://' + path.resolve(htmlPath), { waitUntil: 'networkidle0' });
await page.screenshot({ path: outPath });
await browser.close();
console.log('Saved', outPath);
