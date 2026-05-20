---
name: slide-01-cover
description: Cover slide — title with check-list features and primary CTA. White background.
slide_index: 1
layout_family: cover
strategic_role: cover
requires_brief_fields: ["company", "pitch_name", "cta.url", "cta.label"]
optional_brief_fields: ["offer.dream_outcome"]
output_files:
  section: index.html (1st <section>)
  notes: notes/slide-01.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-838
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-838&m=dev
---
## Strategic Intent

The cover is a tone-setter, not a title slide. In 3 seconds it has to broadcast "this pitch was built for you, by a pro who knows what they're doing" — the pitch name signals personalisation, the CTA signals momentum, and the bullets signal substance. If it reads like a generic SaaS cover the rest of the deck is fighting uphill.

Full reference: [notes/slide-01.html](../../notes/slide-01.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `title` | headline | 20 | ✓ | ✓ | `.ppd-cover .title` |
| `lede` | body | 90 |  | ✓ | `.ppd-cover .lede` |
| `check_1` | list_item | 55 |  | ✓ | `.ppd-cover .ppd-check-list li:nth-child(1)` |
| `check_2` | list_item | 40 |  | ✓ | `.ppd-cover .ppd-check-list li:nth-child(2)` |
| `check_3` | list_item | 40 |  | ✓ | `.ppd-cover .ppd-check-list li:nth-child(3)` |
| `cta_label` | cta_label | 35 | ✓ | ✓ | `.ppd-cover .ppd-pill-cta` |
### Fragility notes

- `title` — nowrap at 92px — overflows column above 21 chars
- `cta_label` — pill CTA wraps to 2 lines above ~36 chars; breaks cover column rhythm
## Voice & Tone Rules

- Punchy. Title case for the pitch name, sentence case everywhere else.
- Lede is one sentence promising what the deck does for the reader — not what it is.
- Bullets are concrete benefits or distinguishers, not features. Max 6 words each.
- CTA verb-first: 'Click here for…', 'See the…', 'Start with…'. Never 'Learn more'.
- No emoji. No 'welcome'. No 'introducing'.
## Inputs Required from Brief

- `brief.company`
- `brief.pitch_name`
- `brief.cta.url`
- `brief.cta.label`

### Optional brief fields

- `brief.offer.dream_outcome`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-01.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **1st `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-01.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 1: cover · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-01.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Cover — Slide 1</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Welcome to our Q4 sales presentation"
  **WHY:** no pitch name, no audience, generic event-deck framing
- **BAD:** "Introducing Acme — A Modern Solution for Modern Teams"
  **WHY:** tagline soup, says nothing, no CTA
- **BAD:** "Click here to learn more"
  **WHY:** passive verb, gives the reader nothing to anticipate
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="surface">
      <div class="ppd-slide bg-white">
        <div class="ppd-cover">
          <div class="poster">
            <img src="assets/99-problems-poster.png" alt="99 Problems But A Pitch Ain&#8217;t One!" />
          </div>
          <div class="content">
            <h1 class="title">Perfect Pitch Deck</h1>
            <p class="lede">A template for a personalised pitch that sets you up to close the deal.</p>
            <ul class="ppd-check-list">
              <li>First time selling? No problem, we got you.</li>
              <li>Packed with sales psychology.</li>
              <li>&#8216;Hormozi&#8217; style offer format.</li>
            </ul>
            <div class="ppd-cta-row">
              <a class="ppd-pill-cta" href="#/1">Click Here For Instructions</a>
            </div>
          </div>
        </div>
        <div class="cover-branding">
          <img src="assets/slide-1-logo.svg" alt="" />
        </div>
      </div>
    
      <aside class="notes">
        <p>Dear Selling Enthusiast,</p>
        <p>If you're reading this, I'm excited for you.</p>
        <p>Why?</p>
        <p>When you add this pitch deck to your sales process, you're going to take a lot of people's money.</p>
        <p>Sincerely,<br>Perfect Pitch Deck Creator</p>
      </aside>
    </section>
```
