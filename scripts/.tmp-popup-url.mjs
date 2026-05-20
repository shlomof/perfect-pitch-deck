import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new' });
const ctx = await browser.createBrowserContext();
const page = await ctx.newPage();
const popupPromise = new Promise((resolve) => {
  browser.on('targetcreated', async (t) => {
    const p = await t.page();
    if (p && p !== page) resolve(p);
  });
});

await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://127.0.0.1:8800/', { waitUntil: 'networkidle0' });
await page.type('input[name="password"]', 'peeking');
await page.click('.staticrypt-decrypt-button');
await page.waitForFunction(() => window.Reveal && Reveal.getPlugin && Reveal.getPlugin('notes'), { timeout: 8000 });

await page.keyboard.press('s');
await page.waitForSelector('.notes-lock.open');
await page.type('.notes-lock input', 'presenter');
await page.click('.notes-lock [data-action="unlock"]');

const popup = await Promise.race([popupPromise, new Promise((_, rej) => setTimeout(() => rej(new Error('no popup')), 5000))]);
await new Promise((r) => setTimeout(r, 500));
console.log('POPUP URL:', popup.url());

// Now refresh the popup and see what happens
popup.on('console', (m) => console.log('  [popup]', m.type(), m.text()));
popup.on('pageerror', (e) => console.log('  [popup error]', e.message));

await popup.reload({ waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 3000));

const state = await popup.evaluate(() => ({
  url: location.href,
  connectionStatus: document.querySelector('#connection-status')?.textContent?.trim(),
  connectionDisplay: document.querySelector('#connection-status') ? getComputedStyle(document.querySelector('#connection-status')).display : null,
  iframeCount: document.querySelectorAll('iframe').length,
  notesText: document.querySelector('.speaker-controls-notes .value')?.textContent?.slice(0, 80),
  bodyBackground: getComputedStyle(document.body).backgroundColor,
  visibleText: document.body.innerText?.slice(0, 200),
}));
console.log('AFTER POPUP RELOAD:', state);

await browser.close();
