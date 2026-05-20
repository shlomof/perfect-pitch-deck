---
name: slide-12-customer-quote-blue
description: Full-accent testimonial slide — large quote with avatar + name + handle.
slide_index: 12
layout_family: quote
strategic_role: testimonial
requires_brief_fields: ["proof_points.testimonials"]
optional_brief_fields: []
output_files:
  section: index.html (12th <section>)
  notes: notes/slide-12.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-996
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-996&m=dev
---
## Strategic Intent

Story time — a single customer quote that drives the core message home. The quote is short; the value comes from the story the seller tells around it on the call. Pick the quote that sounds most like the prospect's own words about their own problem.

Full reference: [notes/slide-12.html](../../notes/slide-12.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `quote` | quote | 60 | ✓ | ✓ | `.quote-slide .quote` |
| `attribution` | attribution | 35 | ✓ | ✓ | `.quote-slide .quote-author .meta` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `quote` — 120px blue testimonial quote; collides with attribution below ~75 chars
- `attribution` — two-line attribution next to avatar; wraps below avatar above ~32 chars
## Voice & Tone Rules

- Quote stays under 25 words. Punchy, conversational, ideally first-person from the client.
- Attribution: name, role, company. Handle optional. Photo if available.
- Pick a quote that mirrors the prospect's pain or doubt — not a generic rave.
- Don't paraphrase or polish — verbatim sounds true, edited sounds like marketing.
- Avoid stacked superlatives ('amazing, incredible, life-changing').
## Inputs Required from Brief

- `brief.proof_points.testimonials`

### Optional brief fields

- _none_
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-12.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **12th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-12.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 12: customer-quote-blue · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-12.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Customer Testimonial — Slide 12</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** ""This product is amazing and has changed everything for us!" — Anonymous Customer"
  **WHY:** vague rave, no attribution, no specifics, sounds fabricated
- **BAD:** ""10/10 would recommend.""
  **WHY:** Yelp-voice, no context, no story hook
- **BAD:** "A 200-word testimonial covering every feature and benefit."
  **WHY:** too long to read on slide, dilutes the punch
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="accent">
      <div class="ppd-slide bg-blue">
        <div class="quote-slide">
          <p class="quote">&#8220;This is a short, memorable quote from a customer.&#8221;</p>
          <div class="quote-author">
            <img src="assets/steve.webp" alt="Steve Butler" />
            <div class="meta">Steve Butler<br/>@ LinkNinja</div>
          </div>
        </div>
        <div class="ppd-footer">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong><em>OPTIONAL SLIDE — CUSTOMER TESTIMONIAL</em></strong></p>
        <p><strong>Story Time (Trust)</strong></p>
        <p><strong>Purpose:</strong> More proof. Keep the quote short, driving home the core message. Tell a quick story about a transformation.</p>
        <p><strong>Why:</strong> Build trust.</p>
        <p><strong>Pro-tip:</strong> Don't just read the quote. Your client can read. Tell them what they don't know – use story telling to talk about behind the scenes of this quote and how you got to the outcome.</p>
      </aside>
    </section>
```
