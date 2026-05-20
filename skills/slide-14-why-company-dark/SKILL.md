---
name: slide-14-why-company-dark
description: Dark slide — "Why {Company Name}?" with centered headline + unique-value body.
slide_index: 14
layout_family: hero-dark
strategic_role: differentiator
requires_brief_fields: ["company", "offer.unique_mechanism"]
optional_brief_fields: ["proof_points.testimonials"]
output_files:
  section: index.html (14th <section>)
  notes: notes/slide-14.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-1024
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-1024&m=dev
---
## Strategic Intent

The unique mechanism. Why you, why now, why not the alternatives. Name the specific thing you do that no one else does — the proprietary angle, the contrarian method, the unfair advantage. Vague differentiation here means a price-comparison conversation later.

Full reference: [notes/slide-14.html](../../notes/slide-14.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 25 | ✓ | ✓ | `.ppd-eyebrow` |
| `headline` | headline | 130 | ✓ | ✓ | `.why-hero .ppd-headline-md` |
| `body` | body | 220 |  | ✓ | `.why-hero p` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `eyebrow` — white-on-dark eyebrow; wraps above ~22 chars
- `headline` — headline-md inverted; collides with body above ~125 chars
## Voice & Tone Rules

- Name the mechanism. Give it a label the prospect can repeat.
- Explain what it does and why it works — one sentence each.
- Contrast implied or explicit — 'unlike most…', 'while everyone else…'.
- Confident, not boastful. 'Only' is fine if it's true.
- Avoid the word 'unique' — show, don't claim.
## Inputs Required from Brief

- `brief.company`
- `brief.offer.unique_mechanism`

### Optional brief fields

- `brief.proof_points.testimonials`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-14.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **14th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-14.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 14: why-company-dark · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-14.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Unique Mechanism — Slide 14</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "We're a unique, innovative, customer-first company."
  **WHY:** every adjective is empty, names no actual mechanism
- **BAD:** "Our proprietary methodology delivers superior results."
  **WHY:** buzzword, no specifics, no contrast with alternatives
- **BAD:** "We're different because we care."
  **WHY:** every vendor 'cares' — that's not a mechanism
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="bg-dark">
      <div class="ppd-slide bg-dark">
        <div class="ppd-eyebrow">Why {Company Name}?</div>
        <div class="why-hero">
          <h2 class="ppd-headline-md">Unique Value and Differentiation That Clearly Shows Why You&#8217;re the Best&#8212;and Only&#8212;Choice.</h2>
          <p class="ppd-body-lg ppd-muted-inv">The difference is [unique differentiation], proven by [proof point] backed up by [proof point]. This approach solves [problem] with [secret sauce], delivering [specific result] that you won&#8217;t find anywhere else.</p>
        </div>
        <div class="ppd-footer">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>Unique Mechanism (What Sets You Apart?)</strong></p>
        <p><strong>Purpose:</strong> Highlight what makes your solution different and why it's the only real choice.</p>
        <p><strong>Example:</strong> "What sets you apart is your [secret sauce]. It's built to tackle [problem] by [specifics], and that's how it delivers such great results."</p>
        <p><strong>Why:</strong> When done right, it makes you feel like the only option that can truly solve their problem.</p>
      </aside>
    </section>
```
