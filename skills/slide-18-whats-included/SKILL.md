---
name: slide-18-whats-included
description: 4x3 inclusion grid (12 cards). Light background.
slide_index: 18
layout_family: grid-2x2
strategic_role: inclusions
requires_brief_fields: ["offer.name"]
optional_brief_fields: ["extra.inclusions"]
output_files:
  section: index.html (18th <section>)
  notes: notes/slide-18.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-1076
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-1076&m=dev
---
## Strategic Intent

What's included. Translate the value stack into concrete deliverables — 3–5 strong inclusions the prospect can point to. Each line should feel valuable enough to be its own product. Avoid kitchen-sinking; clarity beats volume.

Full reference: [notes/slide-18.html](../../notes/slide-18.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 25 | ✓ | ✓ | `.ppd-eyebrow` |
| `card_1_title` | card_title | 12 | ✓ | ✓ | `.inclusions-grid .ppd-card:nth-child(1) .ppd-headline-sm` |
| `card_1_body` | card_body | 60 |  | ✓ | `.inclusions-grid .ppd-card:nth-child(1) .body` |
| `card_2_title` | card_title | 12 | ✓ | ✓ | `.inclusions-grid .ppd-card:nth-child(2) .ppd-headline-sm` |
| `card_2_body` | card_body | 60 |  | ✓ | `.inclusions-grid .ppd-card:nth-child(2) .body` |
| `card_3_title` | card_title | 12 | ✓ | ✓ | `.inclusions-grid .ppd-card:nth-child(3) .ppd-headline-sm` |
| `card_3_body` | card_body | 60 |  | ✓ | `.inclusions-grid .ppd-card:nth-child(3) .body` |
| `card_4_title` | card_title | 12 | ✓ | ✓ | `.inclusions-grid .ppd-card:nth-child(4) .ppd-headline-sm` |
| `card_4_body` | card_body | 60 |  | ✓ | `.inclusions-grid .ppd-card:nth-child(4) .body` |
| `card_5_title` | card_title | 12 | ✓ |  | `.inclusions-grid .ppd-card:nth-child(5) .ppd-headline-sm` |
| `card_5_body` | card_body | 60 |  |  | `.inclusions-grid .ppd-card:nth-child(5) .body` |
| `card_6_title` | card_title | 12 | ✓ |  | `.inclusions-grid .ppd-card:nth-child(6) .ppd-headline-sm` |
| `card_6_body` | card_body | 60 |  |  | `.inclusions-grid .ppd-card:nth-child(6) .body` |
| `card_7_title` | card_title | 12 | ✓ |  | `.inclusions-grid .ppd-card:nth-child(7) .ppd-headline-sm` |
| `card_7_body` | card_body | 60 |  |  | `.inclusions-grid .ppd-card:nth-child(7) .body` |
| `card_8_title` | card_title | 12 | ✓ |  | `.inclusions-grid .ppd-card:nth-child(8) .ppd-headline-sm` |
| `card_8_body` | card_body | 60 |  |  | `.inclusions-grid .ppd-card:nth-child(8) .body` |
| `card_9_title` | card_title | 12 | ✓ |  | `.inclusions-grid .ppd-card:nth-child(9) .ppd-headline-sm` |
| `card_9_body` | card_body | 60 |  |  | `.inclusions-grid .ppd-card:nth-child(9) .body` |
| `card_10_title` | card_title | 12 | ✓ |  | `.inclusions-grid .ppd-card:nth-child(10) .ppd-headline-sm` |
| `card_10_body` | card_body | 60 |  |  | `.inclusions-grid .ppd-card:nth-child(10) .body` |
| `card_11_title` | card_title | 12 | ✓ |  | `.inclusions-grid .ppd-card:nth-child(11) .ppd-headline-sm` |
| `card_11_body` | card_body | 60 |  |  | `.inclusions-grid .ppd-card:nth-child(11) .body` |
| `card_12_title` | card_title | 12 | ✓ |  | `.inclusions-grid .ppd-card:nth-child(12) .ppd-headline-sm` |
| `card_12_body` | card_body | 60 |  |  | `.inclusions-grid .ppd-card:nth-child(12) .body` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `eyebrow` — blue eyebrow above 4x3 grid; wraps above ~22 chars
- `card_1_title` — 40px in 4-up cell; wraps at 18 chars
- `card_2_title` — 40px in 4-up cell; wraps at 18 chars
- `card_3_title` — 40px in 4-up cell; wraps at 18 chars
- `card_4_title` — 40px in 4-up cell; wraps at 18 chars
- `card_5_title` — 40px in 4-up cell; wraps at 18 chars
- `card_6_title` — 40px in 4-up cell; wraps at 18 chars
- `card_7_title` — 40px in 4-up cell; wraps at 18 chars
- `card_8_title` — 40px in 4-up cell; wraps at 18 chars
- `card_9_title` — 40px in 4-up cell; wraps at 18 chars
- `card_10_title` — 40px in 4-up cell; wraps at 18 chars
- `card_11_title` — 40px in 4-up cell; wraps at 18 chars
- `card_12_title` — 40px in 4-up cell; wraps at 18 chars
## Voice & Tone Rules

- Each inclusion gets a name (like a product) and a one-line description.
- Outcome-flavoured names beat feature-flavoured ones: 'The 90-Day Sprint' > '12 weekly calls'.
- Keep to 3–5 inclusions if possible. More than 7 reads as desperate stacking.
- Parallel structure across all lines.
- No 'access to', no 'support', no 'consultation' unless that's literally the deliverable.
## Inputs Required from Brief

- `brief.offer.name`

### Optional brief fields

- `brief.extra.inclusions`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-18.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **18th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-18.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 18: whats-included · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-18.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>What's Included — Slide 18</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Access to our platform, ongoing support, regular check-ins."
  **WHY:** generic deliverables every vendor offers, no naming, no specificity
- **BAD:** "Unlimited everything!"
  **WHY:** smells like an upsell trap, devalues the rest of the stack
- **BAD:** "12 inclusions listed at 6pt type to fit them all."
  **WHY:** cluttered, none of them feel valuable when stacked this small
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="bg-light">
      <div class="ppd-slide bg-light">
        <div class="ppd-eyebrow">What&#8217;s Included?</div>
        <div class="inclusions-grid">
          <div class="ppd-card"><div class="ppd-headline-sm">Inclusion #1</div><p class="body ppd-body-md ppd-muted">Use this slide to highlight key inclusions.</p></div>
          <div class="ppd-card"><div class="ppd-headline-sm">Inclusion #2</div><p class="body ppd-body-md ppd-muted">Use this slide to highlight key inclusions.</p></div>
          <div class="ppd-card"><div class="ppd-headline-sm">Inclusion #3</div><p class="body ppd-body-md ppd-muted">Use this slide to highlight key inclusions.</p></div>
          <div class="ppd-card"><div class="ppd-headline-sm">Inclusion #4</div><p class="body ppd-body-md ppd-muted">Use this slide to highlight key inclusions.</p></div>
          <div class="ppd-card"><div class="ppd-headline-sm">Inclusion #5</div><p class="body ppd-body-md ppd-muted">Use this slide to highlight key inclusions.</p></div>
          <div class="ppd-card"><div class="ppd-headline-sm">Inclusion #6</div><p class="body ppd-body-md ppd-muted">Use this slide to highlight key inclusions.</p></div>
          <div class="ppd-card"><div class="ppd-headline-sm">Inclusion #7</div><p class="body ppd-body-md ppd-muted">Use this slide to highlight key inclusions.</p></div>
          <div class="ppd-card"><div class="ppd-headline-sm">Inclusion #8</div><p class="body ppd-body-md ppd-muted">Use this slide to highlight key inclusions.</p></div>
          <div class="ppd-card"><div class="ppd-headline-sm">Inclusion #9</div><p class="body ppd-body-md ppd-muted">Use this slide to highlight key inclusions.</p></div>
          <div class="ppd-card"><div class="ppd-headline-sm">Inclusion #10</div><p class="body ppd-body-md ppd-muted">Use this slide to highlight key inclusions.</p></div>
          <div class="ppd-card"><div class="ppd-headline-sm">Inclusion #11</div><p class="body ppd-body-md ppd-muted">Use this slide to highlight key inclusions.</p></div>
          <div class="ppd-card"><div class="ppd-headline-sm">Inclusion #12</div><p class="body ppd-body-md ppd-muted">Use this slide to highlight key inclusions.</p></div>
        </div>
        <div class="ppd-footer">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>Inclusions (The Offer)</strong></p>
        <p><strong>Purpose:</strong> Lay out the core inclusions of the offer to make it crystal clear what the prospect is getting.</p>
        <p><strong>Pro-Tip:</strong> 3-5 solid inclusions make the offer easy to grasp without overwhelming. But if more are needed, this template is designed to handle many.</p>
      </aside>
    </section>
```
