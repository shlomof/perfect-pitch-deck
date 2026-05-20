#!/usr/bin/env node
/**
 * Measure char-count breakpoints for 5 high-risk slide slots.
 *
 * Approach: load the slide via Reveal.slide(N-1, 0), then progressively
 * replace the slot text with lorem-style strings of increasing length.
 * For each length, check whether the slot's bounding box overflows its
 * parent's bounding box in any direction, or pushes a sibling out of
 * the 1920x1080 stage. Report the lowest char count that triggers a
 * break.
 *
 * Pre-req: dev server on http://localhost:8765 serving the repo root.
 */
import puppeteer from 'puppeteer';

const URL_BASE = 'http://localhost:8765/index.html';
const VIEWPORT = { width: 1920, height: 1080, deviceScaleFactor: 1 };

// Long sample text (well over any expected limit). We slice it.
const LOREM_BASE = (
  'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod ' +
  'tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam ' +
  'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat ' +
  'duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu ' +
  'fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa ' +
  'qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde omnis iste ' +
  'natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ' +
  'ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt'
).repeat(4);

function sampleOfLength(n) {
  // Pad / slice to exactly n chars. Avoid breaking mid-word at the tail.
  if (n <= LOREM_BASE.length) return LOREM_BASE.slice(0, n);
  return LOREM_BASE + 'x'.repeat(n - LOREM_BASE.length);
}

/**
 * Cases to test. For each:
 *  - slideIndex: 1-based slide number (matches index.html section order)
 *  - slot: label for output
 *  - selector: CSS selector relative to the active slide's <section>
 *  - currentSelector: where to read the current copy from (defaults to selector)
 *  - researcherMax: the proposed max_chars the research agent gave
 *  - overflowCheck: function-string that returns true if layout is broken
 *  - rangeMax: highest length to try
 */
const CASES = [
  {
    slideIndex: 1,
    slot: 'slide-01.title',
    selector: '.ppd-cover .title',
    researcherMax: 24, // Researcher estimate: tight because of nowrap + 92px
    rangeMax: 80,
    // Title is white-space: nowrap inside the .content column (878px wide
    // per the grid template). Break = title's natural width exceeds the
    // 878px content column.
    overflowCheck: `
      (el) => {
        const content = el.closest('.content') || el.parentElement;
        const cr = content.getBoundingClientRect();
        // 878px column at 1:1 device scale; reveal may apply a transform.
        // Compare title scrollWidth against content clientWidth instead.
        return el.scrollWidth > content.clientWidth + 2;
      }
    `,
  },
  {
    slideIndex: 5,
    slot: 'slide-05.quote',
    selector: '.quote-slide .quote',
    researcherMax: 140, // Researcher: ~140 (single bold promise)
    rangeMax: 400,
    // .quote-slide is absolute inset:0 with padding 80px top / 120px bottom
    // inside a 1080px stage. The .quote is the only block; it can grow
    // vertically. Break = quote's bottom passes the footer's top (or stage bottom - 120).
    overflowCheck: `
      (el) => {
        const stage = el.closest('section');
        const stageRect = stage.getBoundingClientRect();
        const footer = stage.querySelector('.ppd-footer');
        const footerTop = footer ? footer.getBoundingClientRect().top : stageRect.bottom - 60;
        const r = el.getBoundingClientRect();
        return r.bottom > footerTop - 8 || r.top < stageRect.top + 60;
      }
    `,
  },
  {
    slideIndex: 11,
    slot: 'slide-11.card_1_stat',
    selector: '.wins-grid .ppd-card:nth-child(1) .stat',
    researcherMax: 8, // Researcher: tight, big number like "+$1.2M"
    rangeMax: 40,
    // .stat is font-size 48px in a 450px-wide card. Seed ("+$XX") is 1 line.
    // Break = stat wraps to more lines than seed (which destroys the
    // centered-grid layout balance).
    needsSeedHeight: true,
    overflowCheck: `
      (el) => {
        const lh = parseFloat(getComputedStyle(el).lineHeight) || 57.6;
        const lines = Math.round(el.clientHeight / lh);
        const seedLines = window.__seedLines || 1;
        return lines > seedLines;
      }
    `,
  },
  {
    slideIndex: 11,
    slot: 'slide-11.card_1_body',
    selector: '.wins-grid .ppd-card:nth-child(1) .body',
    researcherMax: 90, // Researcher: ~90 (3-line body in 450px card)
    rangeMax: 400,
    // .body has max-width: 357px in a 450px card; line-height 1.4 * 24px = 33.6px.
    // Seed copy is one line. Break = body wraps to more lines than the seed
    // wraps to, growing the card and shifting proof-circle out of design.
    // We capture seed lineCount once, then compare.
    needsSeedHeight: true,
    overflowCheck: `
      (el) => {
        const lh = parseFloat(getComputedStyle(el).lineHeight) || 33.6;
        const lines = Math.round(el.clientHeight / lh);
        const seedLines = window.__seedLines || 0;
        // Allow 1 extra line; break at +2 lines.
        return lines > seedLines + 1;
      }
    `,
  },
  {
    slideIndex: 18,
    slot: 'slide-18.card_1_title',
    selector: '.inclusions-grid .ppd-card:nth-child(1) .ppd-headline-sm',
    researcherMax: 28, // Researcher: ~28 (tight title in 1/4-width grid cell)
    rangeMax: 120,
    // 4x3 grid, ~415px cells with 32px horizontal padding => content ~351px.
    // ppd-headline-sm is 40px font, line-height 1.2 => 48px per line. Seed is 1 line.
    // Grid rows are fixed-height (3 rows in absolute container). Break = title
    // wraps to MORE lines than seed (each extra line eats body space).
    needsSeedHeight: true,
    overflowCheck: `
      (el) => {
        const lh = parseFloat(getComputedStyle(el).lineHeight) || 48;
        const lines = Math.round(el.clientHeight / lh);
        const seedLines = window.__seedLines || 0;
        return lines > seedLines;
      }
    `,
  },
  {
    slideIndex: 23,
    slot: 'slide-23.headline',
    selector: '.nextsteps-split .left h3',
    researcherMax: 60, // Researcher: ~60 (76px headline, 680px max-width)
    rangeMax: 400,
    // h3 max-width 680px, font 76px, line-height 1.04 ~= 79px per line.
    // Seed wraps to ~1 line. Eyebrow above takes 56px + 220px margin = 276px.
    // h3 sits in column padding-top 80px so h3 starts at ~356px. The p
    // and footer-mini sit below. Break when p's bottom collides with
    // footer-mini's top (the column then visually overflows).
    overflowCheck: `
      (el) => {
        // The slide stage is 1080px tall; the left column is position:relative
        // and grows past 1080 with content (footer-mini is absolute-bottom,
        // pinned to the grown column rather than the stage). So we measure
        // against the stage rect, not the column.
        const stage = el.closest('section');
        const sr = stage.getBoundingClientRect();
        const p = el.parentElement.querySelector('p');
        const pr = p ? p.getBoundingClientRect() : null;
        const hr = el.getBoundingClientRect();
        // Break = headline OR following paragraph extends past stage bottom
        // (minus the 80px column padding-bottom + ~50px footer-mini reserve).
        const bottomLimit = sr.bottom - 130;
        return hr.bottom > bottomLimit || (pr && pr.bottom > bottomLimit);
      }
    `,
  },
];

function visibleCharCount(html) {
  // Strip tags, collapse whitespace, decode the few entities we use.
  const decoded = html
    .replace(/&#8220;|&#8221;|&quot;/g, '"')
    .replace(/&#8216;|&#8217;|&#39;/g, "'")
    .replace(/&#8211;|&#8212;|&ndash;|&mdash;/g, '-')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ');
  const text = decoded.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length;
}

async function waitForFontsAndLayout(page) {
  await page.evaluate(() => document.fonts ? document.fonts.ready : null);
  await new Promise(r => setTimeout(r, 250));
}

async function measureCase(browser, c) {
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  const url = `${URL_BASE}#/${c.slideIndex - 1}`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await waitForFontsAndLayout(page);

  // Snap exactly onto the slide and force layout for reveal scaling.
  await page.evaluate((idx) => {
    if (window.Reveal && window.Reveal.slide) window.Reveal.slide(idx - 1, 0);
  }, c.slideIndex);
  await new Promise(r => setTimeout(r, 350));

  // Pick the active slide. Reveal marks one section with class "present".
  const activeSel = `.reveal .slides > section.present`;

  // Read original innerHTML and visible char count.
  const original = await page.evaluate((activeSel, slotSel) => {
    const slide = document.querySelector(activeSel);
    if (!slide) return null;
    const el = slide.querySelector(slotSel);
    if (!el) return null;
    return { html: el.innerHTML, text: el.textContent || '' };
  }, activeSel, c.selector);

  if (!original) {
    await page.close();
    return { ...c, error: `selector not found for ${c.selector}` };
  }

  const currentChars = visibleCharCount(original.html);

  // If the check needs the seed line count, capture it now and stash on window.
  if (c.needsSeedHeight) {
    await page.evaluate((activeSel, slotSel) => {
      const slide = document.querySelector(activeSel);
      const el = slide.querySelector(slotSel);
      const lh = parseFloat(getComputedStyle(el).lineHeight) || 1;
      window.__seedLines = Math.round(el.clientHeight / lh);
    }, activeSel, c.selector);
  }

  // Verify the original layout is NOT already broken under our overflowCheck.
  // (Sanity: if the check fires at the seed length, the check itself is wrong.)
  const seedBroken = await page.evaluate((activeSel, slotSel, checkSrc) => {
    const slide = document.querySelector(activeSel);
    const el = slide.querySelector(slotSel);
    // eslint-disable-next-line no-new-func
    const fn = new Function('return (' + checkSrc + ')')();
    return fn(el);
  }, activeSel, c.selector, c.overflowCheck);

  // Binary search for the smallest length that breaks.
  // Range [lo, hi]. We find first length L such that checking with text-of-length(L) -> true.
  // Use length values aligned to a step (4 chars) for speed.
  const step = 2;
  const lo = Math.max(currentChars, 4);
  const hi = c.rangeMax;

  async function testLength(n) {
    return await page.evaluate(
      (activeSel, slotSel, sample, checkSrc) => {
        const slide = document.querySelector(activeSel);
        const el = slide.querySelector(slotSel);
        const prev = el.innerHTML;
        // Preserve curly quotes around the slot for the quote selector;
        // but for measurement we just replace with raw text. That's fine
        // for layout because the differences in glyph width are <1%.
        el.textContent = sample;
        // Force layout
        void el.offsetWidth;
        // eslint-disable-next-line no-new-func
        const fn = new Function('return (' + checkSrc + ')')();
        const broken = fn(el);
        el.innerHTML = prev;
        return broken;
      },
      activeSel,
      c.selector,
      sampleOfLength(n),
      c.overflowCheck
    );
  }

  // First confirm rangeMax DOES break. If not, the range is too small.
  const maxBroken = await testLength(hi);

  let breakAt = null;

  if (seedBroken) {
    breakAt = -1; // already broken at seed — overflow check is too strict
  } else if (!maxBroken) {
    breakAt = null; // never broke within range
  } else {
    // Linear scan with step, then refine.
    let lastOk = lo;
    let firstBreak = hi;
    for (let n = lo; n <= hi; n += step) {
      const broken = await testLength(n);
      if (broken) {
        firstBreak = n;
        break;
      } else {
        lastOk = n;
      }
    }
    // Refine to single-char precision between lastOk and firstBreak.
    let a = lastOk, b = firstBreak;
    while (b - a > 1) {
      const m = Math.floor((a + b) / 2);
      const broken = await testLength(m);
      if (broken) b = m; else a = m;
    }
    breakAt = b;
  }

  await page.close();

  return {
    ...c,
    currentChars,
    seedBroken,
    breakAt,
  };
}

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const results = [];
for (const c of CASES) {
  const r = await measureCase(browser, c);
  results.push(r);
  const v = r.error ? `ERROR: ${r.error}` :
    `current=${r.currentChars} seedBroken=${r.seedBroken} breakAt=${r.breakAt}`;
  process.stdout.write(`${r.slot.padEnd(28)} ${v}\n`);
}

await browser.close();

// Pretty table
console.log('\n=== RESULTS ===');
const header = ['slot', 'currentChars', 'researcherMax', 'breakAt', 'verdict'];
const rows = results.map(r => {
  let verdict;
  if (r.error || r.breakAt == null) verdict = r.error ? 'ERR' : 'no-break-in-range';
  else if (r.breakAt === -1) verdict = 'check-too-strict';
  else if (r.breakAt < r.researcherMax) verdict = 'researcher-LOOSE';
  else if (r.breakAt > r.researcherMax * 1.3) verdict = 'researcher-TIGHT';
  else verdict = 'researcher-ACCURATE';
  return [r.slot, r.currentChars ?? '-', r.researcherMax, r.breakAt ?? '-', verdict];
});
const all = [header, ...rows];
const widths = header.map((_, i) => Math.max(...all.map(r => String(r[i]).length)));
for (const row of all) {
  console.log(row.map((c, i) => String(c).padEnd(widths[i])).join('  '));
}

// JSON for machine consumption
console.log('\n=== JSON ===');
console.log(JSON.stringify(results, null, 2));
