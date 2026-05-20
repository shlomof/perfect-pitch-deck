// One-shot reorder: move the 23 <section> blocks inside index.html into the
// canonical PDF order. Safe to re-run because it works off the current order
// derived by parsing the file, not hardcoded line numbers.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const FILE = path.join(ROOT, 'index.html');

// Map current-index (1-based) → canonical-index (1-based), derived from the
// PDF page walkthrough. Each tuple: [current_index, current_slug, canonical_index].
const MAP = [
  [1,  'cover',                 1],
  [2,  'our-guarantee',         21],
  [3,  'whats-included',        18],
  [4,  'why-company-dark',      14],
  [5,  'special-offer',         22],
  [6,  'our-customers',         13],
  [7,  'customer-quote-blue',   12],
  [8,  'key-outcomes-split',    7],
  [9,  'plans-on-offer',        19],
  [10, 'todays-offer',          17],
  [11, 'how-it-works',          9],
  [12, 'big-blue-promise',      5],
  [13, 'problem-agitators',     4],
  [14, 'team-dark',             15],
  [15, 'nice-to-meet-you',      2],
  [16, 'how-it-works-split',    8],
  [17, 'bonus-offer',           20],
  [18, 'key-outcomes-blue',     6],
  [19, 'big-problem-quote',     3],
  [20, 'you-might-be-thinking', 10],
  [21, 'customer-wins',         11],
  [22, 'next-steps-split',      23],
  [23, 'future-together',       16],
];

const html = fs.readFileSync(FILE, 'utf8');

const slidesOpen = html.indexOf('<div class="slides">');
const slidesClose = html.indexOf('</div>\n</div>\n\n<!-- Keyboard');
if (slidesOpen < 0 || slidesClose < 0) throw new Error('Could not locate slides region');

const head = html.slice(0, slidesOpen + '<div class="slides">'.length);
const block = html.slice(slidesOpen + '<div class="slides">'.length, slidesClose);
const tail = html.slice(slidesClose);

// Parse sections from block. Preserve inter-section whitespace? Use a uniform
// "\n    " indent + blank-line separator between sections — matches existing.
const sections = [];
let i = 0;
while (true) {
  const openIdx = block.indexOf('<section', i);
  if (openIdx < 0) break;
  const closeIdx = block.indexOf('</section>', openIdx);
  if (closeIdx < 0) throw new Error('Unclosed <section>');
  sections.push(block.slice(openIdx, closeIdx + '</section>'.length));
  i = closeIdx + '</section>'.length;
}

if (sections.length !== MAP.length) {
  throw new Error(`Section count mismatch: parsed ${sections.length}, expected ${MAP.length}`);
}

// Sanity check: every slug in MAP should match its current section's content.
// Use a coarse signal — first eyebrow text or first heading — pulled from the
// section. This is a guard, not a strict comparison.
const guard = [
  [1,  'Perfect Pitch Deck'],            // cover
  [2,  'Our Guarantee'],                 // our-guarantee
  [3,  'What&#8217;s Included?'],        // whats-included
  [4,  'Why {Company Name}'],            // why-company-dark
  [5,  'Special Offer'],                 // special-offer
  [6,  'Our Customers'],                 // our-customers
  [7,  'short, memorable quote'],        // customer-quote-blue
  [8,  'Key Outcomes'],                  // key-outcomes-split (8)
  [9,  'Plans On Offer'],                // plans-on-offer
  [10, 'Today&#8217;s Offer'],           // todays-offer
  [11, 'How It Works'],                  // how-it-works (11)
  [12, 'big, bold promise'],             // big-blue-promise
  [13, 'And To Make Things Worse'],      // problem-agitators
  [14, 'The Team'],                      // team-dark
  [15, '{Client Name}!'],                // nice-to-meet-you (h1 has <br/>s)
  [16, 'How It Works'],                  // how-it-works-split (16)
  [17, '48-Hour Bonus Offer'],           // bonus-offer
  [18, 'Key Outcomes'],                  // key-outcomes-blue (18)
  [19, 'big problem'],                   // big-problem-quote
  [20, 'You Might Be Thinking'],         // you-might-be-thinking
  [21, 'Customer Wins'],                 // customer-wins
  [22, 'Next steps'],                    // next-steps-split
  [23, 'We Work<br/>Together.'],         // future-together (h1 has <br/>s)
];

for (const [idx, needle] of guard) {
  if (!sections[idx - 1].includes(needle)) {
    throw new Error(`Guard failed at current slide ${idx}: missing "${needle}"`);
  }
}

// Build canonical order: position N gets the section whose canonical_index === N.
const reordered = new Array(MAP.length);
for (const [currentIdx, , canonicalIdx] of MAP) {
  if (reordered[canonicalIdx - 1]) {
    throw new Error(`Canonical slot ${canonicalIdx} double-assigned`);
  }
  reordered[canonicalIdx - 1] = sections[currentIdx - 1];
}

for (let n = 0; n < reordered.length; n++) {
  if (!reordered[n]) throw new Error(`Canonical slot ${n + 1} empty`);
}

const newBlock = '\n    ' + reordered.join('\n\n    ') + '\n  ';

const next = head + newBlock + tail;
fs.writeFileSync(FILE, next);
console.log(`Reordered ${reordered.length} sections.`);
