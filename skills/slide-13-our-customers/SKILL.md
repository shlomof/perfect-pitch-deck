---
name: slide-13-our-customers
description: "Our Customers" — headline plus a 2x6 grid of customer logos. Light background.
slide_index: 13
layout_family: logo-grid
strategic_role: social-proof
requires_brief_fields: ["proof_points.logos"]
optional_brief_fields: ["proof_points.testimonials"]
output_files:
  section: index.html (13th <section>)
  notes: notes/slide-13.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-1006
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-1006&m=dev
---
## Strategic Intent

Our customers — the logo wall. On its own a list of logos is wallpaper; on a call you pick one logo and tell a transformation story. The slide's job is to let the prospect's eyes catch a logo they recognise; the seller's job is to make that logo come alive.

Full reference: [notes/slide-13.html](../../notes/slide-13.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 25 | ✓ | ✓ | `.ppd-eyebrow` |
| `headline` | headline | 130 | ✓ | ✓ | `.customers-headline .ppd-headline-md` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `eyebrow` — blue eyebrow above headline; wraps above ~22 chars
- `headline` — headline-md spans 2 lines above logo grid; pushes logos into footer above ~120 chars
## Voice & Tone Rules

- Logos only — no taglines, no descriptors under each one.
- Order matters: most-recognisable or most-relevant-to-prospect first.
- Keep it tight — 6–12 logos. A wall of 40 logos screams 'we'll work with anyone'.
- Headline (if any) is the implied claim: 'Trusted by…', 'Companies like yours…'.
- Don't mix tiers — a startup logo next to Google reads as bluffing.
## Inputs Required from Brief

- `brief.proof_points.logos`

### Optional brief fields

- `brief.proof_points.testimonials`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-13.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **13th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-13.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 13: our-customers · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-13.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Our Customers — Slide 13</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "A grid of 40 small logos with no hierarchy."
  **WHY:** wallpaper, no story, dilutes every logo on it
- **BAD:** "Tagline under each logo: 'World leader in X', 'Industry pioneer in Y'."
  **WHY:** performative, distracts from the logos, looks desperate
- **BAD:** "Mixing recognisable brands with no-name startups in the same row."
  **WHY:** credibility flattens to the lowest logo on the wall
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="bg-light">
      <div class="ppd-slide bg-light">
        <div class="ppd-eyebrow">Our Customers</div>
        <div class="customers-headline">
          <h2 class="ppd-headline-md">Name-Drop, Share a Story, and Explain How You&#8217;ve Solved Problems for Similar Customers.</h2>
        </div>
        <div class="customers-grid">
          <div class="logo-circle"></div>
          <div class="logo-circle"></div>
          <div class="logo-circle"></div>
          <div class="logo-circle"></div>
          <div class="logo-circle"></div>
          <div class="logo-circle"></div>
          <div class="logo-circle"></div>
          <div class="logo-circle"></div>
          <div class="logo-circle"></div>
          <div class="logo-circle"></div>
          <div class="logo-circle"></div>
          <div class="logo-circle"></div>
        </div>
        <div class="ppd-footer">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong><em>OPTIONAL SLIDE — CUSTOMER LOGOS</em></strong></p>
        <p><strong>Story Time (Trust)</strong></p>
        <p><strong>Purpose:</strong> More proof. Keep the quote short, driving home the core message. Tell a quick story about a transformation.</p>
        <p><strong>Why:</strong> Build trust.</p>
        <p><strong>Pro-tip:</strong> Don't just say we work with company name, company name, company name...pick one and tell a memorable story about a transformation. Then they'll just assume all the other companies had the same experience.</p>
      </aside>
    </section>
```
