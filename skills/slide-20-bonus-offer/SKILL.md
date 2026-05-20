---
name: slide-20-bonus-offer
description: "48-Hour Bonus Offer" — three small bonus cards centered. Light background.
slide_index: 20
layout_family: grid-3
strategic_role: bonus
requires_brief_fields: ["bonus"]
optional_brief_fields: ["urgency.text", "urgency.expires_at"]
output_files:
  section: index.html (20th <section>)
  notes: notes/slide-20.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-1139
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-1139&m=dev
---
## Strategic Intent

But that's not all… Bonuses that compound the value stack and trigger urgency. Each bonus has a name, a tangible outcome, and an expiry — so the structure does the pushing instead of the seller. If the bonus would still be there next month, it's not a bonus.

Full reference: [notes/slide-20.html](../../notes/slide-20.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 35 | ✓ | ✓ | `.ppd-eyebrow` |
| `card_1_title` | card_title | 15 | ✓ | ✓ | `.bonus-grid .ppd-card:nth-child(1) .ppd-headline-sm` |
| `card_1_body` | card_body | 60 |  | ✓ | `.bonus-grid .ppd-card:nth-child(1) .body` |
| `card_2_title` | card_title | 15 | ✓ | ✓ | `.bonus-grid .ppd-card:nth-child(2) .ppd-headline-sm` |
| `card_2_body` | card_body | 60 |  | ✓ | `.bonus-grid .ppd-card:nth-child(2) .body` |
| `card_3_title` | card_title | 15 | ✓ | ✓ | `.bonus-grid .ppd-card:nth-child(3) .ppd-headline-sm` |
| `card_3_body` | card_body | 60 |  | ✓ | `.bonus-grid .ppd-card:nth-child(3) .body` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `eyebrow` — blue eyebrow with gift emoji; wraps above ~30 chars
- `card_1_title` — 52px headline-sm in card; rows desync above ~14 chars
- `card_2_title` — 52px headline-sm in card; rows desync above ~14 chars
- `card_3_title` — 52px headline-sm in card; rows desync above ~14 chars
## Voice & Tone Rules

- Each bonus gets a product-style name and a one-line outcome.
- Time-bound: explicit expiry ('for the next 48 hours', 'when you sign by Friday').
- Bonuses must feel additive, not like core features in disguise.
- Confident framing — 'we're including' / 'you also get', never 'we'll throw in'.
- Cap at 2–3 bonuses. More than that reads as desperate.
## Inputs Required from Brief

- `brief.bonus`

### Optional brief fields

- `brief.urgency.text`
- `brief.urgency.expires_at`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-20.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **20th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-20.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 20: bonus-offer · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-20.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Bonus Inclusions — Slide 20</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Bonus: Extra support."
  **WHY:** vague, not time-bound, doesn't compound value
- **BAD:** "Free t-shirt with every signup!"
  **WHY:** swag-tier bonus on a high-ticket offer trivialises the deal
- **BAD:** "Limited time bonus available… act fast!"
  **WHY:** no actual deadline, no real bonus named, theatrical urgency
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="bg-light">
      <div class="ppd-slide bg-light">
        <div class="ppd-eyebrow">48-Hour Bonus Offer &#127873;</div>
        <div class="bonus-grid">
          <div class="ppd-card">
            <div class="ppd-headline-sm">Bonus #1</div>
            <p class="body ppd-muted">Use this slide to highlight bonus inclusions.</p>
          </div>
          <div class="ppd-card">
            <div class="ppd-headline-sm">Bonus #2</div>
            <p class="body ppd-muted">Use this slide to highlight bonus inclusions.</p>
          </div>
          <div class="ppd-card">
            <div class="ppd-headline-sm">Bonus #3</div>
            <p class="body ppd-muted">Use this slide to highlight bonus inclusions.</p>
          </div>
        </div>
        <div class="ppd-footer">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>But That's Not All... (Bonus Inclusions)</strong></p>
        <p><strong>Purpose:</strong> Add extra value to the offer and create urgency.</p>
        <p><strong>Example:</strong> "To help you get started fast, we're including [Bonus], which has helped other clients with [outcome]. This bonus is available for the next 48 hours."</p>
        <p><strong>Why:</strong> Bonuses increase perceived value and urgency. This way, you don't have to feel 'pushy'—the structure of the deal naturally handles it, so you come off as confident, not pushy.</p>
        <p><strong>Pro-Tip:</strong> Read Alex Hormozi's $100M Offers: How To Make Offers So Good People Feel Stupid Saying No</p>
      </aside>
    </section>
```
