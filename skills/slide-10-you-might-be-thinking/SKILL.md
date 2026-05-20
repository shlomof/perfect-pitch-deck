---
name: slide-10-you-might-be-thinking
description: "You Might Be Thinking…" — three preemptive-objection cards. Light background.
slide_index: 10
layout_family: grid-3
strategic_role: objections
requires_brief_fields: ["offer.problem"]
optional_brief_fields: ["proof_points.testimonials"]
output_files:
  section: index.html (10th <section>)
  notes: notes/slide-10.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-947
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-947&m=dev
---
## Strategic Intent

Objection crusher. Read the prospect's mind out loud — name the doubt they're already thinking, normalise it, then alley-oop to the proof on slides 11–13. The line "I hear that a lot" disarms; the rebuttal is the next slide.

Full reference: [notes/slide-10.html](../../notes/slide-10.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 30 | ✓ | ✓ | `.ppd-eyebrow` |
| `card_1_title` | card_title | 30 | ✓ | ✓ | `.objections-grid .ppd-card:nth-child(1) .ppd-headline-sm` |
| `card_1_body` | card_body | 50 |  | ✓ | `.objections-grid .ppd-card:nth-child(1) p` |
| `card_2_title` | card_title | 30 | ✓ | ✓ | `.objections-grid .ppd-card:nth-child(2) .ppd-headline-sm` |
| `card_2_body` | card_body | 60 |  | ✓ | `.objections-grid .ppd-card:nth-child(2) p` |
| `card_3_title` | card_title | 30 | ✓ | ✓ | `.objections-grid .ppd-card:nth-child(3) .ppd-headline-sm` |
| `card_3_body` | card_body | 70 |  | ✓ | `.objections-grid .ppd-card:nth-child(3) p` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `eyebrow` — blue eyebrow; wraps above ~28 chars
- `card_1_title` — 52px headline-sm in card; rows desync above ~26 chars
- `card_2_title` — 52px headline-sm in card; rows desync above ~26 chars
- `card_3_title` — 52px headline-sm in card; rows desync above ~26 chars
## Voice & Tone Rules

- Open with 'You might be thinking…' or a close variant. Then quote the objection.
- The objection must be the real one — 'too expensive', 'we tried before', 'won't work for us'.
- Validate before resolving. 'I hear that a lot' / 'totally fair' / 'most people do'.
- Don't fully resolve here — tee up the proof slides.
- No defensive language, no 'actually', no 'but'.
## Inputs Required from Brief

- `brief.offer.problem`

### Optional brief fields

- `brief.proof_points.testimonials`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-10.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **10th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-10.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 10: you-might-be-thinking · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-10.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Preemptive Objections — Slide 10</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "You might be wondering if we're the right fit."
  **WHY:** soft non-objection, dodges the real doubt
- **BAD:** "We know change can be hard, but we make it easy!"
  **WHY:** patronising, doesn't name a specific objection, no setup for proof
- **BAD:** "Don't worry — our solution is designed for businesses just like yours."
  **WHY:** dismissive, no validation, no objection actually named
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="bg-light">
      <div class="ppd-slide bg-light">
        <div class="ppd-eyebrow">You Might Be Thinking&#8230;</div>
        <div class="objections-grid">
          <div class="ppd-card">
            <div class="ppd-headline-sm">Preemptive Objection #1</div>
            <p>Preemptively address common objections.</p>
          </div>
          <div class="ppd-card">
            <div class="ppd-headline-sm">Preemptive Objection #2</div>
            <p>Dissolve doubts and keeps the prospect engaged.</p>
          </div>
          <div class="ppd-card">
            <div class="ppd-headline-sm">Preemptive Objection #3</div>
            <p>Opens up for your &#8216;unique delivery mechanism&#8217; and proof.</p>
          </div>
        </div>
        <div class="ppd-footer">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>Objection Crusher (Preemptive Objection Handling)</strong></p>
        <p><strong>Purpose:</strong> Preemptively address common objections to reduce resistance. Alley-oop for the proof points in upcoming slides to drive trust hard to the hoop.</p>
        <p><strong>Example:</strong> "You might be thinking, 'We've tried similar solutions before, and they didn't work.' I hear that a lot."</p>
        <p><strong>Why:</strong> Handling objections head-on right after presenting your solution dissolves doubts and keeps the prospect engaged. It makes them more open to trusting what's next.</p>
      </aside>
    </section>
```
