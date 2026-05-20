---
name: slide-16-future-together
description: "The Future If We Work Together." — black left, white right with imagine-future paragraph.
slide_index: 16
layout_family: split-text-image
strategic_role: future-pacing
requires_brief_fields: ["offer.dream_outcome", "offer.timeframe"]
optional_brief_fields: ["offer.problem"]
output_files:
  section: index.html (16th <section>)
  notes: notes/slide-16.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-1055
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-1055&m=dev
---
## Strategic Intent

Future pacing. Make the prospect feel six months ahead — problem solved, outcome real. This isn't a benefits recap; it's a guided visualisation. The job is to install the after-state in their head so the offer on slide 17 lands as the obvious bridge.

Full reference: [notes/slide-16.html](../../notes/slide-16.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `headline` | headline | 35 | ✓ | ✓ | `.future-split .left h1` |
| `body` | body | 160 |  | ✓ | `.future-split .right p` |
| `footer_mini` | footer_brand | 25 | ✓ |  | `.future-split .left .ppd-footer-mini` |
| `corner_brand` | footer_brand | 20 | ✓ |  | `.future-split .right .corner-brand` |
### Fragility notes

- `headline` — hero h1 with explicit <br/> breaks across 4 lines; fifth line overflows left rail above ~10 chars/line
- `corner_brand` — inline with sparkle in image corner; wraps above ~18 chars
## Voice & Tone Rules

- Open with 'Imagine…' or 'Picture…'. Address them directly.
- Concrete sensory detail — what they see in their dashboard, what their inbox looks like, what their team is doing.
- Timeframe specific: 'six months from now', 'by Q3', 'this time next year'.
- Forward-tense throughout. Treat the outcome as already real.
- Don't pitch the offer here — paint the after, then move on.
## Inputs Required from Brief

- `brief.offer.dream_outcome`
- `brief.offer.timeframe`

### Optional brief fields

- `brief.offer.problem`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-16.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **16th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-16.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 16: future-together · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-16.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Future Vision — Slide 16</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Imagine the possibilities."
  **WHY:** no image, no detail, lazy invocation
- **BAD:** "You could potentially see significant improvements over time."
  **WHY:** hedged, conditional, breaks the visualisation
- **BAD:** "With our solution, the future looks bright."
  **WHY:** vendor-voice, generic, doesn't pace any specific future
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="surface">
      <div class="ppd-slide" style="padding:0;">
        <div class="future-split">
          <div class="left">
            <h1>The<br/>Future If<br/>We Work<br/>Together.</h1>
            <div class="ppd-footer-mini">{Company Name}</div>
          </div>
          <div class="right">
            <p>Imagine where you and your business can be [x] months from now, with [problem] solved and [desired outcome] achieved.</p>
            <div class="corner-brand"><svg viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</div>
          </div>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>Vision of the Future (Future Pacing)</strong></p>
        <p><strong>Purpose:</strong> Help the prospect visualise the positive impact of your solution on their life!</p>
        <p><strong>Example:</strong> "Imagine where your business could be six months from now, with [Problem] solved and [Desired Outcome] achieved. I'm going to help you get there."</p>
        <p><strong>Why:</strong> Future pacing makes the benefits of your solution feel more real and immediate, motivating the prospect to take action.</p>
      </aside>
    </section>
```
