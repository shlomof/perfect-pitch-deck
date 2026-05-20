---
name: slide-09-how-it-works
description: "How It Works" — text left, big image right. Light background.
slide_index: 9
layout_family: split-text-image
strategic_role: mechanism
requires_brief_fields: ["offer.unique_mechanism"]
optional_brief_fields: ["team", "offer.timeframe"]
output_files:
  section: index.html (9th <section>)
  notes: notes/slide-09.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-937
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-937&m=dev
---
## Strategic Intent

Service delivery without visuals — copy carries the weight. Same job as slide 8 (prove you can deliver) but the words must do all the trust-building. Lean into specifics: who runs each part, what they actually produce, how the prospect knows it's working.

Full reference: [notes/slide-09.html](../../notes/slide-09.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 20 | ✓ | ✓ | `.ppd-eyebrow` |
| `headline` | headline | 60 | ✓ | ✓ | `.howitworks .left h3` |
| `body` | body | 220 |  | ✓ | `.howitworks .left p` |
| `bullet_1` | list_item | 30 |  |  | `.howitworks .left ul li:nth-child(1)` |
| `bullet_2` | list_item | 35 |  |  | `.howitworks .left ul li:nth-child(2)` |
| `bullet_3` | list_item | 55 |  |  | `.howitworks .left ul li:nth-child(3)` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `eyebrow` — blue eyebrow at top; wraps above ~18 chars
- `headline` — 68px h3 in left column; wraps below 2 lines above ~52 chars
## Voice & Tone Rules

- Specifics over structure. Real deliverables, real cadences, real names if possible.
- Active verbs: 'we run', 'we build', 'you sign off', 'you review'.
- Anchor each step to a tangible output the prospect can picture.
- No phase-1/phase-2/phase-3 unless the cadence genuinely matters.
- Cut anything that sounds like a slide from a consultancy pitch.
## Inputs Required from Brief

- `brief.offer.unique_mechanism`

### Optional brief fields

- `brief.team`
- `brief.offer.timeframe`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-09.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **9th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-09.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 9: how-it-works · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-09.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>How It Works — Slide 9</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Step 1: Onboarding. Step 2: Implementation. Step 3: Ongoing support."
  **WHY:** every vendor on earth has this slide, says nothing
- **BAD:** "We work closely with your team to ensure alignment."
  **WHY:** filler phrase, no specifics, no trust transfer
- **BAD:** "End-to-end service from initial consultation to long-term partnership."
  **WHY:** brochure-voice, no artefacts, no proof of expertise
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="bg-light">
      <div class="ppd-slide bg-light">
        <div class="ppd-eyebrow">How It Works</div>
        <div class="howitworks">
          <div class="left">
            <h3>Show Off Your Demos, Process, Portfolio etc.</h3>
            <p>This is an optional slide to explain how you deliver the solution. Duplicate if needed. Segue into a Notion doc, portfolio of work, or other relevant files.</p>
            <ul>
              <li>Use bullets.</li>
              <li>Keep text to a minimum.</li>
              <li>Google the &#8216;Rule of 3&#8217; if you don&#8217;t know it.</li>
            </ul>
          </div>
          <div class="right ph"></div>
        </div>
        <div class="ppd-footer">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>SLIDE OPTION — 2</strong></p>
        <p><strong>Service Delivery (who/what/where/when/why/how)</strong></p>
        <p><strong>Purpose:</strong> After laying out your big promise and key messages, it's time to explain exactly how you deliver. Break down who's involved, what steps are taken, where and when things happen, and how you back up your claims. This is where you show off your expertise and prove you're the real deal.</p>
        <p><strong>Why?</strong> Without a clear understanding of your process and expertise, doubts creep in. People need to see how you make the magic happen, so they trust you can deliver on your promises.</p>
        <p><strong>Pro-tip:</strong> Skip the info dump in your slides. Use real work you've already developed to explain and sell trust. Show your process, results, and past projects to back up what you're saying. When people see the awesome stuff you've already created, it's easier for them to trust that you'll deliver the same quality for them. Let your work prove the value.</p>
      </aside>
    </section>
```
