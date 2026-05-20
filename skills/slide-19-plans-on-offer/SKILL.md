---
name: slide-19-plans-on-offer
description: Three-column pricing grid with results, prices, and inclusion bullets.
slide_index: 19
layout_family: pricing-3
strategic_role: pricing
requires_brief_fields: ["plans"]
optional_brief_fields: ["offer.name", "offer.guarantee"]
output_files:
  section: index.html (19th <section>)
  notes: notes/slide-19.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-1118
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-1118&m=dev
---
## Strategic Intent

Tiered pricing — the decoy structure. Three plans where the middle one is engineered to look like the obvious winner. Anchor with a premium tier, expose value gaps in the cheap tier, make the recommended tier the path of least resistance.

Full reference: [notes/slide-19.html](../../notes/slide-19.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 25 | ✓ | ✓ | `.ppd-eyebrow` |
| `plan_1_name` | card_title | 15 | ✓ | ✓ | `.plans-grid .plan:nth-child(1) .plan-title` |
| `plan_1_result` | headline | 70 | ✓ | ✓ | `.plans-grid .plan:nth-child(1) .plan-result` |
| `plan_1_price` | price | 10 | ✓ | ✓ | `.plans-grid .plan:nth-child(1) .plan-price` |
| `plan_1_bullets` | list_item | 200 |  | ✓ | `.plans-grid .plan:nth-child(1) > ul` |
| `plan_2_name` | card_title | 15 | ✓ | ✓ | `.plans-grid .plan:nth-child(2) .plan-title` |
| `plan_2_result` | headline | 55 | ✓ | ✓ | `.plans-grid .plan:nth-child(2) .plan-result` |
| `plan_2_price` | price | 10 | ✓ | ✓ | `.plans-grid .plan:nth-child(2) .plan-price` |
| `plan_2_bullets` | list_item | 175 |  | ✓ | `.plans-grid .plan:nth-child(2) > ul` |
| `plan_3_name` | card_title | 15 | ✓ | ✓ | `.plans-grid .plan:nth-child(3) .plan-title` |
| `plan_3_result` | headline | 55 | ✓ | ✓ | `.plans-grid .plan:nth-child(3) .plan-result` |
| `plan_3_price` | price | 10 | ✓ | ✓ | `.plans-grid .plan:nth-child(3) .plan-price` |
| `plan_3_bullets` | list_item | 185 |  | ✓ | `.plans-grid .plan:nth-child(3) > ul` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `eyebrow` — blue eyebrow above 3-column grid; wraps above ~22 chars
- `plan_1_name` — 42px plan title; wraps above ~14 chars and breaks card heights
- `plan_1_result` — 32px result line; collides with price above ~60 chars
- `plan_1_price` — 56px price; wraps and breaks card alignment above ~8 chars
- `plan_2_name` — 42px plan title; wraps above ~14 chars
- `plan_2_result` — 32px result line; collides with price above ~60 chars
- `plan_2_price` — 56px price; wraps above ~8 chars
- `plan_3_name` — 42px plan title; wraps above ~14 chars
- `plan_3_result` — 32px result line; collides with price above ~60 chars
- `plan_3_price` — 56px price; wraps above ~8 chars
## Voice & Tone Rules

- Three tiers. Name each one — not 'Basic / Pro / Enterprise', use names that signal use-case or ambition.
- Anchor high. The premium tier exists to make the middle tier look smart.
- Mark one tier as 'Most popular' or 'Recommended'. Don't be coy.
- Each tier lists its core promise first, then 3–5 inclusions.
- Prices visible. Hidden pricing on a tier slide kills trust.
## Inputs Required from Brief

- `brief.plans`

### Optional brief fields

- `brief.offer.name`
- `brief.offer.guarantee`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-19.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **19th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-19.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 19: plans-on-offer · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-19.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Plans On Offer — Slide 19</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Contact us for pricing."
  **WHY:** kills the close, breaks the decoy structure, signals overpriced
- **BAD:** "Basic / Pro / Enterprise."
  **WHY:** no positioning, no use-case signal, looks copy-pasted
- **BAD:** "Three tiers with near-identical inclusions and a $5 price gap."
  **WHY:** no anchoring, no decoy effect, middle tier doesn't win
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="bg-light">
      <div class="ppd-slide bg-light">
        <div class="ppd-eyebrow">Plans On Offer</div>
        <div class="plans-grid">
          <div class="plan">
            <div class="plan-title">Plan 1</div>
            <div class="plan-result">Get [Result] Without [Biggest Pain] &#8211; In Just [Timeframe]</div>
            <div class="plan-price">$XX</div>
            <ul>
              <li>INCLUSION</li>
              <li>INCLUSION</li>
              <li>INCLUSION</li>
              <li>INCLUSION</li>
            </ul>
          </div>
          <div class="plan">
            <div class="plan-title">Plan 2</div>
            <div class="plan-result">Get [Additional Value] &#8211; In Just [Timeframe]</div>
            <div class="plan-price">$XX</div>
            <ul>
              <li>Everything in Plan 1 plus:
                <ul>
                  <li>INCLUSION</li>
                  <li>INCLUSION</li>
                  <li>INCLUSION</li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="plan">
            <div class="plan-title">Plan 3</div>
            <div class="plan-result">Get [Additional Value] &#8211; In Just [Timeframe]</div>
            <div class="plan-price">$XX</div>
            <ul>
              <li>Everything in Plan 1 &amp; Plan 2 plus:
                <ul>
                  <li>INCLUSION</li>
                  <li>INCLUSION</li>
                  <li>INCLUSION</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="ppd-footer">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>ALTERNATIVE SLIDE OPTION FOR TIERED PRICING</strong></p>
        <p><strong>Tiered Pricing (The Offer)</strong></p>
        <p><strong>Purpose:</strong> Present tiered, value-packed offers with clear outcomes and inclusions for each pricing option.</p>
        <p><strong>Pro-Tip:</strong> Use decoy pricing to make the ideal tier appear like the best value by design.</p>
      </aside>
    </section>
```
