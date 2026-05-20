---
name: slide-21-our-guarantee
description: Body slide — 90-day money-back guarantee block with body + italic fine-print.
slide_index: 21
layout_family: hero-light
strategic_role: guarantee
requires_brief_fields: ["offer.guarantee"]
optional_brief_fields: ["offer.dream_outcome", "offer.timeframe"]
output_files:
  section: index.html (21st <section>)
  notes: notes/slide-21.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-1181
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-1181&m=dev
---
## Strategic Intent

Drop the mic — the guarantee. Reverse the risk so taking the deal is obviously safer than walking away. The bolder the guarantee, the more it signals you actually believe what you've promised. Small print is fine; weasel terms are not.

Full reference: [notes/slide-21.html](../../notes/slide-21.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 20 | ✓ | ✓ | `.ppd-eyebrow` |
| `headline` | headline | 90 | ✓ | ✓ | `.guarantee-hero .ppd-headline-md` |
| `body` | body | 290 |  | ✓ | `.guarantee-hero p.body` |
| `fine_print` | body | 280 |  |  | `.guarantee-hero p.fine` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `eyebrow` — blue eyebrow above hero; wraps above ~18 chars
- `headline` — headline-md centered hero; collides with body above ~85 chars
## Voice & Tone Rules

- State the guarantee in plain words — 'money back', 'we keep working', 'we pay you'.
- Specific timeframe and condition. '90 days, do the work, not happy, full refund.'
- Confident, not defensive. The guarantee is a flex.
- Small print is allowed for the one fair condition (e.g. 'jump on a 10-min call first').
- No 'satisfaction guaranteed', no 'we stand behind our work' — show the mechanism.
## Inputs Required from Brief

- `brief.offer.guarantee`

### Optional brief fields

- `brief.offer.dream_outcome`
- `brief.offer.timeframe`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-21.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **21st `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-21.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 21: our-guarantee · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-21.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Our Guarantee — Slide 21</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "100% satisfaction guaranteed."
  **WHY:** meaningless phrase, no mechanism, no condition, no specifics
- **BAD:** "Refunds available subject to terms and conditions."
  **WHY:** weasel language, kills trust, signals there's a trapdoor
- **BAD:** "We stand behind our work."
  **WHY:** every vendor says this — names no actual risk reversal
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="bg-light">
      <div class="ppd-slide bg-light">
        <div class="ppd-eyebrow">Our Guarantee</div>
        <div class="guarantee-hero">
          <h2 class="ppd-headline-md">A program we stand behind with a 90-day money-back guarantee</h2>
          <p class="body ppd-body-lg">If you implement the system for 90 days, making sure you create your offer, make an effort to join the calls, and do everything our program show you to do, and you&#8217;re not happy, I&#8217;ll give you your money back.</p>
          <p class="fine">Small print: The only catch is that you&#8217;ll have to jump on a 10 min call because it&#8217;d be weird if it didn&#8217;t work, and I&#8217;d be curious to know what went wrong, and why you couldn&#8217;t acheive your goals.</p>
        </div>
        <div class="ppd-footer">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>Drop The Mic (Guarantees)</strong></p>
        <p><strong>Purpose:</strong> Eliminate any remaining hesitation by reducing perceived risk.</p>
        <p><strong>Example:</strong> "We're confident in our approach, which is why we offer a full money-back guarantee if you don't see the results we've discussed. We want you to feel completely secure in moving forward."</p>
        <p><strong>Why:</strong> A strong guarantee makes the decision easier by removing the fear of making a wrong choice.</p>
        <p><strong>Pro-Tip:</strong> Read Alex Hormozi's $100M Offers: How To Make Offers So Good People Feel Stupid Saying No</p>
      </aside>
    </section>
```
