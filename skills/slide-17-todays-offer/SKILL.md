---
name: slide-17-todays-offer
description: "Today's Offer — [Offer name]" centered card with headline + body + closer line.
slide_index: 17
layout_family: hero-card
strategic_role: offer
requires_brief_fields: ["offer.name", "offer.dream_outcome"]
optional_brief_fields: ["offer.timeframe", "offer.unique_mechanism"]
output_files:
  section: index.html (17th <section>)
  notes: notes/slide-17.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-1062
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-1062&m=dev
---
## Strategic Intent

Today's offer — the value stack. Frame the offer the way Hormozi frames it: stack tangible inclusions and outcomes so the price (revealed later) feels like a steal. This is the headline of the offer; slides 18–22 are the line items.

Full reference: [notes/slide-17.html](../../notes/slide-17.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 40 | ✓ | ✓ | `.ppd-eyebrow` |
| `headline` | headline | 100 | ✓ | ✓ | `.todays-offer h3` |
| `body` | body | 175 |  | ✓ | `.todays-offer p:not(.closer)` |
| `closer` | body | 100 |  | ✓ | `.todays-offer p.closer` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `eyebrow` — blue eyebrow with offer name; wraps above ~35 chars
- `headline` — 44px h3 over body; collides with closer above ~90 chars
## Voice & Tone Rules

- Lead with the offer name and the dream outcome side-by-side.
- Build anticipation, not a feature list — that's slide 18's job.
- Confident framing: 'Here's exactly what you get when you say yes.'
- Use the offer's actual name throughout; reinforce the label.
- Don't reveal price yet — keep eyes on value.
## Inputs Required from Brief

- `brief.offer.name`
- `brief.offer.dream_outcome`

### Optional brief fields

- `brief.offer.timeframe`
- `brief.offer.unique_mechanism`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-17.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **17th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-17.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 17: todays-offer · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-17.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Today's Offer — Slide 17</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Our package includes a variety of features and benefits."
  **WHY:** no name, no outcome, no stack, vendor-voice
- **BAD:** "Choose from our flexible offering tailored to your needs."
  **WHY:** deflects the offer instead of presenting it boldly
- **BAD:** "Starting at $X/month."
  **WHY:** leads with price before value is built — kills the stack
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="bg-light">
      <div class="ppd-slide bg-light">
        <div class="ppd-eyebrow">Today&#8217;s Offer - [Offer name]</div>
        <div class="todays-offer">
          <h3>Get [Result] Without [Biggest Pain Point] &#8211; In Just [Timeframe], All for [Price].</h3>
          <p>If you&#8217;re tired of dealing with [pain or frustration] and ready for [result], this is exactly what you need. It&#8217;s [benefit], [benefit], and [benefit].</p>
          <p class="closer">Stick with me, and I&#8217;ll walk you through everything you get in the next slides.</p>
        </div>
        <div class="ppd-footer">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>Insane Value Stack (The Offer)</strong></p>
        <p><strong>Purpose:</strong> Present a compelling, value-packed offer with specific outcomes that build the hype for the next slides.</p>
        <p><strong>Pro-Tip:</strong> Read Alex Hormozi's $100M Offers: How To Make Offers So Good People Feel Stupid Saying No</p>
      </aside>
    </section>
```
