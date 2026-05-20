---
name: slide-03-big-problem-quote
description: Light-tint slide with a single big-problem quote in accent blue.
slide_index: 3
layout_family: quote
strategic_role: problem
requires_brief_fields: ["offer.problem"]
optional_brief_fields: ["client_name"]
output_files:
  section: index.html (3rd <section>)
  notes: notes/slide-03.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-871
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-871&m=dev
---
## Strategic Intent

The cold hard truth. Surface the prospect's single biggest, most-named pain and stare at it. This slide isn't a list — it's one visceral sentence that makes them nod and lean in. Done right it earns permission to agitate further in slide 4 and promise in slide 5.

Full reference: [notes/slide-03.html](../../notes/slide-03.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `quote` | quote | 120 | ✓ | ✓ | `.quote-slide.tint .quote` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `quote` — 120px tint quote; collides with footer above ~120 chars
- `footer_left` — footer cell — long company names push mid cell
- `footer_mid` — centered cell — overflow pushes right cell off-canvas
- `footer_right_brand` — inline with sparkle; wraps above ~18 chars
## Voice & Tone Rules

- Second-person. 'You' and 'your' — never 'companies' or 'teams'.
- Name the pain in concrete terms. No abstractions, no 'challenges', no 'pain points'.
- One sentence preferred. Two max. Should read like a quote on a wall.
- Cut every hedge: 'often', 'sometimes', 'many', 'can be'.
- If a stat sharpens it, use one number. Otherwise none.
## Inputs Required from Brief

- `brief.offer.problem`

### Optional brief fields

- `brief.client_name`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-03.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **3rd `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-03.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 3: big-problem-quote · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-03.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>The Problem — Slide 3</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Many businesses today face a variety of challenges when it comes to growth."
  **WHY:** abstract, hedged, third-person, says nothing
- **BAD:** "It can be frustrating when things don't go as planned."
  **WHY:** weasel words, no specific pain, no urgency
- **BAD:** "Pain points include inefficiency, scalability, and ROI."
  **WHY:** buzzword list, not a felt problem
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="accent-tint">
      <div class="ppd-slide bg-blue-tint">
        <div class="quote-slide tint">
          <p class="quote">&#8220;The big problem your clients want fixed, framed to remind them of their deepest fears.&#8221;</p>
        </div>
        <div class="ppd-footer" style="color: var(--accent-blue);">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>Cold Hard Truth (Problem)</strong></p>
        <p><strong>Purpose:</strong> Highlight the prospect's biggest problem to create urgency and remind them of their deepest fears.</p>
        <p><strong>Example:</strong> "I've been seeing companies in [industry] struggle with [specific problem], and it's really affecting [desired outcome]—some of them have been close to [deepest fear]."</p>
        <p><strong>Why:</strong> Directly addressing their pain points invites them to open up about their challenges, making the conversation more relevant and urgent.</p>
      </aside>
    </section>
```
