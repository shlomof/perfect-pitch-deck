---
name: slide-04-problem-agitators
description: "And To Make Things Worse…" — light-tint slide with 3 problem agitator columns.
slide_index: 4
layout_family: grid-3
strategic_role: agitate
requires_brief_fields: ["offer.problem"]
optional_brief_fields: ["offer.dream_outcome"]
output_files:
  section: index.html (4th <section>)
  notes: notes/slide-04.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-876
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-876&m=dev
---
## Strategic Intent

Hit them where it hurts. Slide 3 named the wound; this slide twists. Enumerate the ongoing cost of inaction — the daily leak, the missed window, the bigger fire on the horizon. Build tension high enough that the promise on slide 5 lands like relief.

Full reference: [notes/slide-04.html](../../notes/slide-04.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 30 | ✓ | ✓ | `.ppd-eyebrow` |
| `card_1_title` | card_title | 25 | ✓ | ✓ | `.agitators-grid > div:nth-child(1) .ppd-headline-md` |
| `card_1_body` | card_body | 120 |  | ✓ | `.agitators-grid > div:nth-child(1) p` |
| `card_2_title` | card_title | 25 | ✓ | ✓ | `.agitators-grid > div:nth-child(2) .ppd-headline-md` |
| `card_2_body` | card_body | 120 |  | ✓ | `.agitators-grid > div:nth-child(2) p` |
| `card_3_title` | card_title | 25 | ✓ | ✓ | `.agitators-grid > div:nth-child(3) .ppd-headline-md` |
| `card_3_body` | card_body | 120 |  | ✓ | `.agitators-grid > div:nth-child(3) p` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `eyebrow` — eyebrow line wraps and pushes grid down above ~28 chars
- `card_1_title` — 64px headline-md at 360px max-width; rows desync above ~22 chars
- `card_2_title` — 64px headline-md at 360px max-width; rows desync above ~22 chars
- `card_3_title` — 64px headline-md at 360px max-width; rows desync above ~22 chars
## Voice & Tone Rules

- Second-person. Keep 'you' / 'your' on every line.
- Stack 3–5 agitators. Each one a distinct consequence, not a synonym.
- Be specific about cost: time, money, opportunity, reputation, sleep.
- Future-tense the consequences — 'it's only going to get worse' energy.
- No solving yet. Don't even hint at the fix.
## Inputs Required from Brief

- `brief.offer.problem`

### Optional brief fields

- `brief.offer.dream_outcome`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-04.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **4th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-04.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 4: problem-agitators · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-04.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Pain Agitators — Slide 4</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "These problems are common and affect productivity."
  **WHY:** abstract, no felt cost, no escalation
- **BAD:** "Luckily, there's a better way — and we can help."
  **WHY:** breaks the agitation, leaks the promise too early
- **BAD:** "Inefficient processes, lack of alignment, poor visibility."
  **WHY:** consultant-speak list, no second-person, no twist
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="accent-tint">
      <div class="ppd-slide bg-blue-tint">
        <div class="ppd-eyebrow">And To Make Things Worse&#8230;</div>
        <div class="agitators-grid">
          <div>
            <div class="ppd-headline-md">Problem Agitator #1.</div>
            <p>Add a quick description of each agitator&#8212;process pain points, product problems, etc.</p>
          </div>
          <div>
            <div class="ppd-headline-md">Problem Agitator #2.</div>
            <p>Highlight things they&#8217;ve shared with you, so they know you&#8217;re listening to what they need.</p>
          </div>
          <div>
            <div class="ppd-headline-md">Problem Agitator #3.</div>
            <p>Take this chance to show them that you understand their problems, and you&#8217;re here to help.</p>
          </div>
        </div>
        <div class="ppd-footer" style="color: var(--accent-blue);">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>Hit Them Where It Hurts (Agitate Problem)</strong></p>
        <p><strong>Purpose:</strong> Focus on the inefficiencies, delays, or frustrations in the way the prospect currently operates. Highlight how these are slowing them down or causing bottlenecks that lead to bigger issues.</p>
        <p><strong>Example:</strong> "These issues don't just hurt your [business/operations/life]; it's likely costing you [specific loss or missed opportunity] every day, and unless you do something, it's only going to get worse."</p>
        <p><strong>Why:</strong> By focusing on the ongoing pain and consequences, the prospect begins to feel the urgency to act. Agitating the problem builds tension, driving them to seek out and consider a solution—your solution.</p>
      </aside>
    </section>
```
