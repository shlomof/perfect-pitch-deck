---
name: slide-11-customer-wins
description: "Customer Wins" — three metric cards with logo or avatar proof. Light background.
slide_index: 11
layout_family: grid-3
strategic_role: proof
requires_brief_fields: ["proof_points.testimonials"]
optional_brief_fields: ["proof_points.logos"]
output_files:
  section: index.html (11th <section>)
  notes: notes/slide-11.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-969
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-969&m=dev
---
## Strategic Intent

Irrefutable proof. Three customer wins with specific metrics that map directly to the objection just raised on slide 10. Numbers do the heavy lifting — revenue up, costs down, time saved — each tied to a recognisable name or logo. This is where claims become receipts.

Full reference: [notes/slide-11.html](../../notes/slide-11.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 25 | ✓ | ✓ | `.ppd-eyebrow` |
| `card_1_stat` | metric | 12 | ✓ | ✓ | `.wins-grid .ppd-card:nth-child(1) .stat` |
| `card_1_label` | card_meta | 15 | ✓ | ✓ | `.wins-grid .ppd-card:nth-child(1) .label` |
| `card_1_body` | card_body | 90 |  | ✓ | `.wins-grid .ppd-card:nth-child(1) .body` |
| `card_1_proof_name` | attribution | 30 | ✓ |  | `.wins-grid .ppd-card:nth-child(1) .proof-name` |
| `card_2_stat` | metric | 12 | ✓ | ✓ | `.wins-grid .ppd-card:nth-child(2) .stat` |
| `card_2_label` | card_meta | 15 | ✓ | ✓ | `.wins-grid .ppd-card:nth-child(2) .label` |
| `card_2_body` | card_body | 65 |  | ✓ | `.wins-grid .ppd-card:nth-child(2) .body` |
| `card_2_proof_name` | attribution | 30 | ✓ |  | `.wins-grid .ppd-card:nth-child(2) .proof-name` |
| `card_3_stat` | metric | 12 | ✓ | ✓ | `.wins-grid .ppd-card:nth-child(3) .stat` |
| `card_3_label` | card_meta | 15 | ✓ | ✓ | `.wins-grid .ppd-card:nth-child(3) .label` |
| `card_3_body` | card_body | 65 |  | ✓ | `.wins-grid .ppd-card:nth-child(3) .body` |
| `card_3_proof_name` | attribution | 35 | ✓ |  | `.wins-grid .ppd-card:nth-child(3) .proof-name` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `eyebrow` — blue eyebrow above grid; wraps above ~22 chars
- `card_1_stat` — 48px breaks centre above 17 chars
- `card_1_label` — label below stat — wraps and breaks card rhythm above ~14 chars
- `card_1_proof_name` — single line below logo; wraps above ~28 chars
- `card_2_stat` — 48px breaks centre above 17 chars
- `card_2_label` — label below stat; wraps and breaks card rhythm above ~14 chars
- `card_2_proof_name` — single line below logo; wraps above ~28 chars
- `card_3_stat` — 48px breaks centre above 17 chars
- `card_3_label` — label below stat; wraps and breaks card rhythm above ~14 chars
- `card_3_proof_name` — single line below avatar; wraps above ~28 chars
## Voice & Tone Rules

- Lead with the metric. Number first, context second.
- Use real names, real companies, real numbers. No 'a leading brand'.
- Each win addresses a different objection or proves a different message.
- Short captions: who, what changed, in how long.
- No adjectives on the metric — '+$847K revenue' beats 'massive revenue growth'.
## Inputs Required from Brief

- `brief.proof_points.testimonials`

### Optional brief fields

- `brief.proof_points.logos`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-11.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **11th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-11.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 11: customer-wins · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-11.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Customer Wins — Slide 11</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Significant ROI for our enterprise clients."
  **WHY:** no number, no name, no specificity
- **BAD:** "+200% growth across the board."
  **WHY:** growth in what, for whom, over what period — meaningless
- **BAD:** "Customers love us!"
  **WHY:** not proof, not a metric, not a story
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="bg-light">
      <div class="ppd-slide bg-light">
        <div class="ppd-eyebrow">Customer Wins</div>
        <div class="wins-grid">
          <div class="ppd-card">
            <div class="stat">+$XX</div>
            <div class="label">Revenue</div>
            <p class="body">Highlight customer wins to back up objection handling.</p>
            <div class="proof-circle"><img src="assets/skool-wordmark.svg" alt="Skool" /></div>
            <div class="proof-name">Skool</div>
          </div>
          <div class="ppd-card">
            <div class="stat">+XX%</div>
            <div class="label">Profits</div>
            <p class="body">Each metric should also reinforce your key messages.</p>
            <div class="proof-circle"><img src="assets/skool-wordmark.svg" alt="Skool" /></div>
            <div class="proof-name">Skool</div>
          </div>
          <div class="ppd-card">
            <div class="stat">&#8722;$XX</div>
            <div class="label">Costs</div>
            <p class="body">Replace the circles below with customer logos or people.</p>
            <img class="proof-avatar" src="assets/steve.webp" alt="Steve Butler" />
            <div class="proof-name">Steve Butler @ LinkNinja</div>
          </div>
        </div>
        <div class="ppd-footer">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>Irrefutable Proof (Trust)</strong></p>
        <p><strong>Purpose:</strong> Back up your solution with real success stories that directly address the objections from the previous slide.</p>
        <p><strong>Example:</strong> "[Client] had the same concern and still achieved [Result] in just [Timeframe]. Seeing their transformation has been incredible."</p>
        <p><strong>Why:</strong> Showing real results from clients with the same objections makes your claims believable and builds trust quickly.</p>
      </aside>
    </section>
```
