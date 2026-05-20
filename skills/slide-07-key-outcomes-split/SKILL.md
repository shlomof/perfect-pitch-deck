---
name: slide-07-key-outcomes-split
description: "Key Outcomes" split — accent text left, 2x2 image grid right.
slide_index: 7
layout_family: split-text-image
strategic_role: outcomes
requires_brief_fields: ["offer.dream_outcome"]
optional_brief_fields: ["offer.problem", "offer.unique_mechanism", "extra.key_outcomes_images"]
output_files:
  section: index.html (7th <section>)
  notes: notes/slide-07.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-911
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-911&m=dev
---
## Strategic Intent

Same as slide 6 — ease the pain via key messages — but with image slots that let real screenshots or product shots carry the proof. The job is the same: bridge pain to relief with parallel, specific benefits, and let the visuals show what the words promise.

Full reference: [notes/slide-07.html](../../notes/slide-07.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 20 | ✓ | ✓ | `.outcomes-split .left .ppd-eyebrow` |
| `card_1_title` | card_title | 25 | ✓ | ✓ | `.outcomes-split .left .msg:nth-of-type(1) .ppd-headline-sm` |
| `card_1_body` | card_body | 130 |  | ✓ | `.outcomes-split .left .msg:nth-of-type(1) .body` |
| `card_2_title` | card_title | 25 | ✓ | ✓ | `.outcomes-split .left .msg:nth-of-type(2) .ppd-headline-sm` |
| `card_2_body` | card_body | 135 |  | ✓ | `.outcomes-split .left .msg:nth-of-type(2) .body` |
| `card_3_title` | card_title | 25 | ✓ | ✓ | `.outcomes-split .left .msg:nth-of-type(3) .ppd-headline-sm` |
| `card_3_body` | card_body | 115 |  | ✓ | `.outcomes-split .left .msg:nth-of-type(3) .body` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
### Fragility notes

- `eyebrow` — 56px eyebrow in left rail; wraps above ~18 chars and crowds first msg
- `card_1_title` — 44px headline-sm at 480px max-width; second line crowds body
- `card_2_title` — 44px headline-sm at 480px max-width; second line crowds body
- `card_3_title` — 44px headline-sm at 480px max-width; second line crowds body
## Voice & Tone Rules

- Treat images as proof, copy as promise — they must reinforce each other.
- Benefit-led headlines. Image captions stay descriptive, not salesy.
- Parallel structure across all messages.
- Show, don't list features. The image is the feature; copy is the outcome.
- Keep each headline punchy — visuals do the heavy explanation.
## Inputs Required from Brief

- `brief.offer.dream_outcome`

### Optional brief fields

- `brief.offer.problem`
- `brief.offer.unique_mechanism`
- `brief.extra.key_outcomes_images`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-07.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **7th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-07.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 7: key-outcomes-split · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-07.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Key Outcomes — Slide 7</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Screenshot of dashboard. Caption: 'Our dashboard.'"
  **WHY:** image with no narrative weight, caption adds nothing
- **BAD:** "See below for a comprehensive view of our product suite."
  **WHY:** tour-guide voice, no benefit, no second-person
- **BAD:** "Streamline. Optimize. Accelerate."
  **WHY:** verb-soup with no object, says nothing about outcomes
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="accent">
      <div class="ppd-slide" style="padding:0;">
        <div class="outcomes-split">
          <div class="left">
            <div class="ppd-eyebrow">Key Outcomes</div>
            <div class="msg">
              <div class="ppd-headline-sm">Key Message #1.</div>
              <p class="body">What makes your product different? What you offer that your competitors don&#8217;t. (Or better yet, can&#8217;t.)</p>
            </div>
            <div class="msg">
              <div class="ppd-headline-sm">Key Message #2.</div>
              <p class="body">Pair these points with images on the right that demonstrate what you mean, like screenshots of specific features.</p>
            </div>
            <div class="msg">
              <div class="ppd-headline-sm">Key Message #3.</div>
              <p class="body">Make sure these tie back to the customers&#8217; challenges to make sure they really hit home.</p>
            </div>
          </div>
          <div class="right">
            <div class="ph"></div>
            <div class="ph"></div>
            <div class="ph"></div>
            <div class="ph"></div>
          </div>
        </div>
        <div class="ppd-footer" style="color: var(--text-inverse);">
          <span class="ppd-footer-left">{Company Name}</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>SLIDE OPTION — WITH IMAGES</strong></p>
        <p><strong>Ease The Pain (Key Messages)</strong></p>
        <p><strong>Purpose:</strong> Clearly highlight how your solution directly addresses their biggest problems and pain points. Key messages should focus on the benefits that make your solution stand out—like accelerating workflows, eliminating delays, or removing their most frustrating obstacles. Make it obvious how your solution creates tangible improvements that they can feel and measure.</p>
        <p><strong>Why:</strong> Key messages must be simple, powerful, and trustworthy. When you clearly show how your solution solves their problems and delivers real, noticeable results, it's obvious why they can't go without it. Your message becomes the bridge between their pain and your solution.</p>
      </aside>
    </section>
```
