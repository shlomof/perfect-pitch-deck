---
name: slide-06-key-outcomes-blue
description: "Key Outcomes" — full-accent slide with 3 columns of key messages.
slide_index: 6
layout_family: grid-3
strategic_role: outcomes
requires_brief_fields: ["offer.dream_outcome"]
optional_brief_fields: ["offer.problem", "offer.unique_mechanism"]
output_files:
  section: index.html (6th <section>)
  notes: notes/slide-06.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-896
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-896&m=dev
---
## Strategic Intent

Ease the pain. Three to five key messages that translate the big promise into felt benefits — what changes for them in week one, month one, quarter one. Each line is a bridge from a specific pain to a specific relief.

Full reference: [notes/slide-06.html](../../notes/slide-06.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 20 | ✓ | ✓ | `.ppd-eyebrow` |
| `card_1_title` | card_title | 25 | ✓ | ✓ | `.outcomes-cols > div:nth-child(1) .ppd-headline-md` |
| `card_1_body` | card_body | 135 |  | ✓ | `.outcomes-cols > div:nth-child(1) p` |
| `card_2_title` | card_title | 25 | ✓ | ✓ | `.outcomes-cols > div:nth-child(2) .ppd-headline-md` |
| `card_2_body` | card_body | 135 |  | ✓ | `.outcomes-cols > div:nth-child(2) p` |
| `card_3_title` | card_title | 25 | ✓ | ✓ | `.outcomes-cols > div:nth-child(3) .ppd-headline-md` |
| `card_3_body` | card_body | 110 |  | ✓ | `.outcomes-cols > div:nth-child(3) p` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `eyebrow` — white-on-blue eyebrow; wraps above ~18 chars and crowds grid
- `card_1_title` — 60px headline-md inverted; rows desync above ~22 chars
- `card_2_title` — 60px headline-md inverted; rows desync above ~22 chars
- `card_3_title` — 60px headline-md inverted; rows desync above ~22 chars
## Voice & Tone Rules

- Benefit-led, not feature-led. 'You stop X / you start Y.'
- Parallel structure across all bullets. Same grammatical shape.
- Tangible verbs: 'cut', 'ship', 'close', 'recover', 'reclaim'.
- Each message must map to a pain raised in slides 3–4.
- Max ~12 words per message. No sub-bullets.
## Inputs Required from Brief

- `brief.offer.dream_outcome`

### Optional brief fields

- `brief.offer.problem`
- `brief.offer.unique_mechanism`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-06.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **6th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-06.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 6: key-outcomes-blue · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-06.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Key Outcomes — Slide 6</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Best-in-class platform with industry-leading capabilities."
  **WHY:** feature-vague, no benefit, no second-person
- **BAD:** "Improved efficiency, increased ROI, enhanced collaboration."
  **WHY:** consultant trio, no specificity, no felt change
- **BAD:** "Our solution offers a comprehensive suite of tools to address your needs."
  **WHY:** abstract, vendor-voice, doesn't ease any pain
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="accent">
      <div class="ppd-slide bg-blue">
        <div class="ppd-eyebrow">Key Outcomes</div>
        <div class="outcomes-cols">
          <div>
            <div class="ppd-headline-md">Key Message #1.</div>
            <p>What makes your solution valuable? What you offer that your competitors don&#8217;t. (Or better yet, can&#8217;t.)</p>
          </div>
          <div>
            <div class="ppd-headline-md">Key Message #2.</div>
            <p>If you don&#8217;t have images use this slide. If you have images to show off you can use the next slide instead.</p>
          </div>
          <div>
            <div class="ppd-headline-md">Key Message #3.</div>
            <p>Make sure these tie back to solving the customers problems and pain points.</p>
          </div>
        </div>
        <div class="ppd-footer">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>SLIDE OPTION — NO IMAGE</strong></p>
        <p><strong>Ease The Pain (Key Messages)</strong></p>
        <p><strong>Purpose:</strong> Clearly highlight how your solution directly addresses their biggest problems and pain points. Key messages should focus on the benefits that make your solution stand out—like accelerating workflows, eliminating delays, or removing their most frustrating obstacles. Make it obvious how your solution creates tangible improvements that they can feel and measure.</p>
        <p><strong>Why:</strong> Key messages must be simple, powerful, and trustworthy. When you clearly show how your solution solves their problems and delivers real, noticeable results, it's obvious why they can't go without it. Your message becomes the bridge between their pain and your solution.</p>
      </aside>
    </section>
```
