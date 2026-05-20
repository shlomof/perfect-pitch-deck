---
name: slide-22-special-offer
description: Pricing card with strikethrough prices, spots-left counter, and offer description.
slide_index: 22
layout_family: hero-card
strategic_role: urgency
requires_brief_fields: ["offer.name", "offer.price", "urgency.text"]
optional_brief_fields: ["urgency.expires_at"]
output_files:
  section: index.html (22nd <section>)
  notes: notes/slide-22.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-1193
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-1193&m=dev
---
## Strategic Intent

Drop the mic again — urgency and scarcity. Combine a real cap (we take X clients this quarter) with a real deadline (this price expires Friday). The urgency must be true; manufactured scarcity is detected on contact and torches the whole pitch.

Full reference: [notes/slide-22.html](../../notes/slide-22.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 20 | ✓ | ✓ | `.ppd-eyebrow` |
| `price` | price | 50 | ✓ | ✓ | `.offer-card .price` |
| `spots` | card_meta | 30 | ✓ | ✓ | `.offer-card .spots` |
| `body_1` | body | 80 |  | ✓ | `.offer-card p:nth-of-type(1)` |
| `body_2` | body | 95 |  | ✓ | `.offer-card p:nth-of-type(2)` |
| `body_3` | body | 130 |  | ✓ | `.offer-card p:nth-of-type(3)` |
| `body_4` | body | 165 |  | ✓ | `.offer-card p:nth-of-type(4)` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `eyebrow` — blue eyebrow above offer card; wraps above ~18 chars
- `price` — 56px price with strike+discount inline; wraps and breaks card above ~45 chars
- `spots` — 28px scarcity line; wraps above ~28 chars
## Voice & Tone Rules

- Name both the cap and the deadline. Be specific: 'three spots', 'until Friday 5pm'.
- Tie scarcity to quality of service, not artificial limits.
- Confident close: 'lock in the price', 'secure your spot' — assume they want in.
- Restate the offer price and what it includes — anchor before the ask.
- No fake countdowns, no 'limited time only!!!' — the structure is the urgency.
## Inputs Required from Brief

- `brief.offer.name`
- `brief.offer.price`
- `brief.urgency.text`

### Optional brief fields

- `brief.urgency.expires_at`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-22.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **22nd `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-22.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 22: special-offer · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-22.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Urgency & Scarcity — Slide 22</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Limited time offer — act now!"
  **WHY:** no specific deadline, no specific cap, manufactured urgency
- **BAD:** "Only 2 spots left! (we say this every week)"
  **WHY:** transparent fake scarcity destroys credibility
- **BAD:** "Special pricing for early adopters."
  **WHY:** no deadline, no cap, no actual scarcity mechanism named
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="bg-light">
      <div class="ppd-slide bg-light">
        <div class="ppd-eyebrow">Special Offer</div>
        <div class="offer-card">
          <div class="price">[Expiration time]:<br/><span class="ppd-strike">[$price]</span>[$discounted price]</div>
          <div class="spots">7 <span class="ppd-strike">10</span> spots left</div>
          <p>Here&#8217;s what I&#8217;m doing with the [offer name] in [month]:</p>
          <p>The outcome is simple: To get you to [outcome], getting [outcome], and [outcome].</p>
          <p>I&#8217;m only working with [total spots] [ICP], to help them with [success milestone] over a [timeline].</p>
          <p>We&#8217;ll do it with the perfect mix of [inclusion], [inclusion] and [inclusion] with deep involvement from me and my team.</p>
        </div>
        <div class="ppd-footer">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>Drop The Mic Again (Urgency &amp; Scarcity)</strong></p>
        <p><strong>Purpose:</strong> Push for immediate action by emphasising limited availability and/or time-sensitive pricing.</p>
        <p><strong>Example:</strong> "We're only taking on a few more clients this month to ensure everyone gets the attention they deserve, and the current offer price is only available for a short time. If this sounds like the right fit, secure your spot and lock in the special price before we fill up."</p>
        <p><strong>Why:</strong> Combining real scarcity with a limited-time offer makes the deal feel exclusive, urgent, and too good to miss.</p>
      </aside>
    </section>
```
