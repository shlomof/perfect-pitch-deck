// build-skills.mjs
//
// Generates skills/slide-NN-<slug>/SKILL.md for every slide by composing:
//   - slides/manifest.json          (slug, frame_node, frame_url)
//   - slides/schema.json            (slot specs: name, selector, type, maxChars, hardLimit, required, fragility)
//   - notes/slide-NN.html           (the user's full strategic notes — referenced, not inlined)
//   - scripts/skill-authoring-data.mjs (per-slide strategicIntent, voiceRules, requiresBriefFields, antiPatterns)
//   - index.html section block       (verbatim layout reference at the bottom of each SKILL.md)
//
// Also rewrites slides/manifest.json with index+slug+frame metadata so it stays
// in sync with the on-disk skills/ directories.

import fs from 'node:fs';
import path from 'node:path';
import { SKILL_AUTHORING } from './skill-authoring-data.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');

// ─── Slide metadata (single source for slug + Figma node + one-line description) ───
const SLIDE_META = [
  { slug: 'cover',                  role: 'cover',          desc: 'Cover slide — title with check-list features and primary CTA. White background.', frame: '1-838' },
  { slug: 'nice-to-meet-you',       role: 'icebreaker',     desc: 'Dark intro — "Nice to meet you {Client Name}!" with brand subhead.', frame: '1-867' },
  { slug: 'big-problem-quote',      role: 'problem',        desc: 'Light-tint slide with a single big-problem quote in accent blue.', frame: '1-871' },
  { slug: 'problem-agitators',      role: 'agitate',        desc: '"And To Make Things Worse…" — light-tint slide with 3 problem agitator columns.', frame: '1-876' },
  { slug: 'big-blue-promise',       role: 'promise',        desc: 'Full-accent slide with a single bold promise quote in soft-accent.', frame: '1-891' },
  { slug: 'key-outcomes-blue',      role: 'outcomes',       desc: '"Key Outcomes" — full-accent slide with 3 columns of key messages.', frame: '1-896' },
  { slug: 'key-outcomes-split',     role: 'outcomes',       desc: '"Key Outcomes" split — accent text left, 2x2 image grid right.', frame: '1-911' },
  { slug: 'how-it-works-split',     role: 'mechanism',      desc: '"How It Works" split — text left, accent panel + image right.', frame: '1-929' },
  { slug: 'how-it-works',           role: 'mechanism',      desc: '"How It Works" — text left, big image right. Light background.', frame: '1-937' },
  { slug: 'you-might-be-thinking',  role: 'objections',     desc: '"You Might Be Thinking…" — three preemptive-objection cards. Light background.', frame: '1-947' },
  { slug: 'customer-wins',          role: 'proof',          desc: '"Customer Wins" — three metric cards with logo or avatar proof. Light background.', frame: '1-969' },
  { slug: 'customer-quote-blue',    role: 'testimonial',    desc: 'Full-accent testimonial slide — large quote with avatar + name + handle.', frame: '1-996' },
  { slug: 'our-customers',          role: 'social-proof',   desc: '"Our Customers" — headline plus a 2x6 grid of customer logos. Light background.', frame: '1-1006' },
  { slug: 'why-company-dark',       role: 'differentiator', desc: 'Dark slide — "Why {Company Name}?" with centered headline + unique-value body.', frame: '1-1024' },
  { slug: 'team-dark',              role: 'team',           desc: '"The Team" — dark slide with 5 portraits, names, roles, and bios.', frame: '1-1035' },
  { slug: 'future-together',        role: 'future-pacing',  desc: '"The Future If We Work Together." — black left, white right with imagine-future paragraph.', frame: '1-1055' },
  { slug: 'todays-offer',           role: 'offer',          desc: '"Today\'s Offer — [Offer name]" centered card with headline + body + closer line.', frame: '1-1062' },
  { slug: 'whats-included',         role: 'inclusions',     desc: '4x3 inclusion grid (12 cards). Light background.', frame: '1-1076' },
  { slug: 'plans-on-offer',         role: 'pricing',        desc: 'Three-column pricing grid with results, prices, and inclusion bullets.', frame: '1-1118' },
  { slug: 'bonus-offer',            role: 'bonus',          desc: '"48-Hour Bonus Offer" — three small bonus cards centered. Light background.', frame: '1-1139' },
  { slug: 'our-guarantee',          role: 'guarantee',      desc: 'Body slide — 90-day money-back guarantee block with body + italic fine-print.', frame: '1-1181' },
  { slug: 'special-offer',          role: 'urgency',        desc: 'Pricing card with strikethrough prices, spots-left counter, and offer description.', frame: '1-1193' },
  { slug: 'next-steps-split',       role: 'close',          desc: '"Next steps…" split — closing tactic + live CTA form (or static close in no-GHL mode).', frame: '1-1207' },
];

// ─── Load inputs ────────────────────────────────────────────────────────
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const schema = JSON.parse(fs.readFileSync(path.join(ROOT, 'slides/schema.json'), 'utf8'));

// Extract the 23 <section> blocks
const slidesOpen = html.indexOf('<div class="slides">');
const slidesClose = html.indexOf('</div>\n</div>\n\n<!-- Keyboard');
if (slidesOpen < 0 || slidesClose < 0) throw new Error('Could not locate slides region');
const block = html.slice(slidesOpen, slidesClose);

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
if (sections.length !== SLIDE_META.length) {
  throw new Error(`Section count mismatch: parsed ${sections.length}, expected ${SLIDE_META.length}`);
}

// ─── Skill-md emitter ────────────────────────────────────────────────────
function renderSkill(n, meta, sectionHtml, slideSpec, authoring) {
  const nn = String(n).padStart(2, '0');
  const skillName = `slide-${nn}-${meta.slug}`;

  // YAML frontmatter
  const requires = authoring.requiresBriefFields ?? [];
  const optional = authoring.optionalBriefFields ?? [];
  const fm = [
    '---',
    `name: ${skillName}`,
    `description: ${meta.desc}`,
    `slide_index: ${n}`,
    `layout_family: ${slideSpec.archetype}`,
    `strategic_role: ${meta.role}`,
    `requires_brief_fields: [${requires.map((f) => JSON.stringify(f)).join(', ')}]`,
    `optional_brief_fields: [${optional.map((f) => JSON.stringify(f)).join(', ')}]`,
    `output_files:`,
    `  section: index.html (${ordinal(n)} <section>)`,
    `  notes: notes/slide-${nn}.html`,
    `  post_step: node scripts/inject-notes.mjs`,
    `figma_node: ${meta.frame}`,
    `figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=${meta.frame}&m=dev`,
    '---',
  ].join('\n');

  // Strategic Intent
  const intent = [
    '',
    '## Strategic Intent',
    '',
    authoring.strategicIntent.trim(),
    '',
    `Full reference: [notes/slide-${nn}.html](../../notes/slide-${nn}.html)`,
  ].join('\n');

  // Copy Slots table
  const slotsHeader = '| slot | type | max chars | hard | required | selector |';
  const slotsSep    = '|---|---|---|---|---|---|';
  const slotRows = (slideSpec.slots ?? []).map((s) => {
    const hard = s.hardLimit ? '✓' : '';
    const req = s.required ? '✓' : '';
    return `| \`${s.name}\` | ${s.type} | ${s.maxChars ?? '—'} | ${hard} | ${req} | \`${s.selector}\` |`;
  });
  const slots = [
    '',
    '## Copy Slots',
    '',
    slotsHeader,
    slotsSep,
    ...slotRows,
  ].join('\n');

  const fragility = (slideSpec.slots ?? []).filter((s) => s.fragility).map((s) => `- \`${s.name}\` — ${s.fragility}`);
  const fragilityBlock = fragility.length ? ['', '### Fragility notes', '', ...fragility].join('\n') : '';

  // Voice & Tone Rules
  const voice = [
    '',
    '## Voice & Tone Rules',
    '',
    ...authoring.voiceRules.map((r) => `- ${r}`),
  ].join('\n');

  // Inputs Required from Brief
  const reqList = requires.length ? requires.map((f) => `- \`brief.${f}\``).join('\n') : '- _none_';
  const optList = optional.length ? optional.map((f) => `- \`brief.${f}\``).join('\n') : '- _none_';
  const inputs = [
    '',
    '## Inputs Required from Brief',
    '',
    reqList,
    '',
    '### Optional brief fields',
    '',
    optList,
  ].join('\n');

  // Generation Instructions
  const gen = [
    '',
    '## Generation Instructions',
    '',
    '1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.',
    `2. Read the full notes at \`notes/slide-${nn}.html\` for the slide's complete strategic context.`,
    '3. For each slot in **Copy Slots**:',
    '   a. Apply the **Voice & Tone Rules** above.',
    '   b. Draft copy using the relevant brief fields.',
    '   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.',
    '   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.',
    `4. Patch \`index.html\`: locate the **${ordinal(n)} \`<section>\`** under \`<div class="slides">\` and replace ONLY the text inside each slot's selector. Never touch classes, \`data-*\` attributes, structure, or the \`<aside class="notes">\` block (notes are managed separately).`,
    '5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-' + nn + '.html`.',
    '6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.',
    `7. Print: \`slide ${n}: ${meta.slug} · <slots_filled> slots · <chars>/<max> on tightest slot\``,
  ].join('\n');

  // Speaker Notes Generation
  const speakerNotes = [
    '',
    '## Speaker Notes Generation',
    '',
    `Overwrite \`notes/slide-${nn}.html\` with the SPOKEN version of this slide, tailored to the user's brief:`,
    '',
    '```html',
    `<p><strong>${titleFromRole(meta.role)} — Slide ${n}</strong></p>`,
    '<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>',
    '<p><strong>Say:</strong> "{15–40s of spoken copy in the user\'s voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>',
    '<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>',
    '```',
    '',
    'The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.',
  ].join('\n');

  // Anti-patterns
  const apLines = (authoring.antiPatterns ?? []).map((a) => `- **BAD:** "${a.bad}"\n  **WHY:** ${a.why}`).join('\n');
  const anti = [
    '',
    '## Anti-patterns',
    '',
    apLines || '_(none specified)_',
  ].join('\n');

  // Section reference
  const ref = [
    '',
    '## Section HTML reference',
    '',
    'The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.',
    '',
    '```html',
    sectionHtml,
    '```',
    '',
  ].join('\n');

  return fm + intent + slots + fragilityBlock + voice + inputs + gen + speakerNotes + anti + ref;
}

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function titleFromRole(role) {
  const map = {
    cover: 'Cover',
    icebreaker: 'Icebreaker',
    problem: 'The Problem',
    agitate: 'Pain Agitators',
    promise: 'The Big Promise',
    outcomes: 'Key Outcomes',
    mechanism: 'How It Works',
    objections: 'Preemptive Objections',
    proof: 'Customer Wins',
    testimonial: 'Customer Testimonial',
    'social-proof': 'Our Customers',
    differentiator: 'Unique Mechanism',
    team: 'The Team',
    'future-pacing': 'Future Vision',
    offer: 'Today\'s Offer',
    inclusions: 'What\'s Included',
    pricing: 'Plans On Offer',
    bonus: 'Bonus Inclusions',
    guarantee: 'Our Guarantee',
    urgency: 'Urgency & Scarcity',
    close: 'Clear Next Step',
  };
  return map[role] || 'Slide';
}

// ─── Run ─────────────────────────────────────────────────────────────────
const skillsRoot = path.join(ROOT, 'skills');
fs.mkdirSync(skillsRoot, { recursive: true });

// Clear stale slide-NN-* folders so a reorder doesn't leave orphans
for (const entry of fs.readdirSync(skillsRoot)) {
  if (/^slide-\d{2}-/.test(entry)) {
    fs.rmSync(path.join(skillsRoot, entry), { recursive: true, force: true });
  }
}

const manifest = [];
sections.forEach((sectionHtml, idx) => {
  const n = idx + 1;
  const nn = String(n).padStart(2, '0');
  const meta = SLIDE_META[idx];
  const slideSpec = schema.slides.find((s) => s.index === n);
  const authoring = SKILL_AUTHORING[n];

  if (!slideSpec) throw new Error(`schema.json missing entry for slide ${n}`);
  if (!authoring) throw new Error(`skill-authoring-data.mjs missing entry for slide ${n}`);

  const skillName = `slide-${nn}-${meta.slug}`;
  const skillDir = path.join(skillsRoot, skillName);
  fs.mkdirSync(skillDir, { recursive: true });
  fs.writeFileSync(path.join(skillDir, 'SKILL.md'), renderSkill(n, meta, sectionHtml, slideSpec, authoring));

  manifest.push({
    index: n,
    slug: meta.slug,
    archetype: slideSpec.archetype,
    strategic_role: meta.role,
    skill_name: skillName,
    skill_path: `skills/${skillName}/SKILL.md`,
    notes_path: `notes/slide-${nn}.html`,
    frame_node: meta.frame,
    frame_url: `https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=${meta.frame}&m=dev`,
    slot_count: slideSpec.slots?.length ?? 0,
  });
});

fs.mkdirSync(path.join(ROOT, 'slides'), { recursive: true });
fs.writeFileSync(
  path.join(ROOT, 'slides/manifest.json'),
  JSON.stringify({
    deck: 'Perfect Pitch Deck',
    figma_file: 'FI4Kj6YkWpvcvdfAEA3Jey',
    slide_count: manifest.length,
    slides: manifest,
  }, null, 2) + '\n'
);

const totalSlots = manifest.reduce((acc, s) => acc + s.slot_count, 0);
console.log(`✓ wrote ${sections.length} SKILL.md files + manifest.json (${totalSlots} slots across ${sections.length} slides)`);
