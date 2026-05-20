---
name: slide-05-big-blue-promise
description: Full-accent slide with a single bold promise quote in soft-accent.
slide_index: 5
layout_family: quote
strategic_role: promise
requires_brief_fields: ["offer.dream_outcome", "offer.timeframe"]
optional_brief_fields: ["offer.guarantee", "offer.problem"]
output_files:
  section: index.html (5th <section>)
  notes: notes/slide-05.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-891
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-891&m=dev
---
## Strategic Intent

The big blue promise. After two slides of pain, this is the moment of relief — a single bold sentence the prospect can repeat back word-for-word. Promise an outcome, not a methodology. Make it feel reckless enough to be true.

Full reference: [notes/slide-05.html](../../notes/slide-05.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `quote` | quote | 235 | ✓ | ✓ | `.quote-slide .quote` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `quote` — 104px on full blue; collides with footer above 241 chars
## Voice & Tone Rules

- One sentence. Quote-on-a-wall energy.
- Promise an outcome, not a feature. Verbs of transformation.
- Specific numbers and a timeframe wherever possible.
- Add the risk reversal if the guarantee supports it ('…or we keep working').
- No jargon. No 'solutions', 'systems', 'platforms', 'methodologies'.
## Inputs Required from Brief

- `brief.offer.dream_outcome`
- `brief.offer.timeframe`

### Optional brief fields

- `brief.offer.guarantee`
- `brief.offer.problem`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-05.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **5th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-05.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 5: big-blue-promise · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-05.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>The Big Promise — Slide 5</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Our methodology helps creators achieve scalable growth through proprietary AI-driven content systems."
  **WHY:** jargon stack, no promise, no specifics
- **BAD:** "We help you grow."
  **WHY:** no specificity, no risk reversal, too short to feel deliberate
- **BAD:** "Unlock your business's full potential with our end-to-end platform."
  **WHY:** marketing fluff, promises nothing measurable
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="accent">
      <div class="ppd-slide bg-blue">
        <div class="quote-slide">
          <p class="quote">&#8220;This is a big, bold promise that makes your solution feel reliable and positions your offer as an easy, no-brainer decision.&#8221;</p>
        </div>
        <div class="ppd-footer">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>The Big Promise (Solution)</strong></p>
        <p><strong>Purpose:</strong> Position your offer, solution, and value as the clear answer to their problems, in a simple and memorable way that also serves as a promise. Giving the prospect a clear and powerful reason to believe in your offer.</p>
        <p><strong>Example:</strong> "We guarantee you'll see a complete turnaround in [problem] within [timeframe], or we'll work with you until you do."</p>
        <p><strong>Why:</strong> A bold promise stands out by showing your absolute belief in the solution's effectiveness. It leaves a lasting impression and positions your offer as a no-brainer for prospects looking for real results. Sets the expectation that your solution is both reliable and effective, making it easier for them to see the value.</p>
      </aside>
    </section>
```
