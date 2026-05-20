---
name: slide-08-how-it-works-split
description: "How It Works" split — text left, accent panel + image right.
slide_index: 8
layout_family: split-text-image
strategic_role: mechanism
requires_brief_fields: ["offer.unique_mechanism"]
optional_brief_fields: ["proof_points.testimonials", "extra.process_assets"]
output_files:
  section: index.html (8th <section>)
  notes: notes/slide-08.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-929
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-929&m=dev
---
## Strategic Intent

Service delivery with visuals. After the promise lands, prove you can deliver — show the process via real work, screenshots, deliverables. Don't info-dump steps; let the artefacts sell the trust. This is the "we've done this before, here's the receipts" slide.

Full reference: [notes/slide-08.html](../../notes/slide-08.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 20 | ✓ | ✓ | `.howitworks-split .left .ppd-eyebrow` |
| `headline` | headline | 30 | ✓ | ✓ | `.howitworks-split .left h3` |
| `body` | body | 220 |  | ✓ | `.howitworks-split .left p` |
| `bullet_1` | list_item | 30 |  |  | `.howitworks-split .left ul li:nth-child(1)` |
| `bullet_2` | list_item | 35 |  |  | `.howitworks-split .left ul li:nth-child(2)` |
| `bullet_3` | list_item | 55 |  |  | `.howitworks-split .left ul li:nth-child(3)` |
| `footer_mini` | footer_brand | 25 | ✓ |  | `.howitworks-split .left .ppd-footer-mini` |
| `corner_brand` | footer_brand | 20 | ✓ |  | `.howitworks-split .right .corner-brand` |
### Fragility notes

- `eyebrow` — 56px eyebrow on left rail; wraps above ~18 chars
- `headline` — 88px h3 at 680px max-width; third line collides with bullets
- `corner_brand` — inline with sparkle in image corner; wraps above ~18 chars
## Voice & Tone Rules

- Lead with the artefact, not the methodology.
- Describe what happens in plain language — no acronyms, no framework names.
- Use 'we' for the delivery, 'you' for what they get out of it.
- Concrete nouns: 'kickoff workshop', 'audit doc', 'weekly demo' — not 'engagement'.
- Skip phase numbers if the steps speak for themselves.
## Inputs Required from Brief

- `brief.offer.unique_mechanism`

### Optional brief fields

- `brief.proof_points.testimonials`
- `brief.extra.process_assets`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-08.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **8th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-08.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 8: how-it-works-split · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-08.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>How It Works — Slide 8</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Phase 1: Discovery. Phase 2: Strategy. Phase 3: Execution."
  **WHY:** consultancy boilerplate, says nothing about what actually happens
- **BAD:** "Our proprietary framework leverages best-in-class methodologies."
  **WHY:** buzzword salad, no artefacts, builds zero trust
- **BAD:** "We follow a proven process tailored to each client."
  **WHY:** filler, no specifics, no proof
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="bg-light">
      <div class="ppd-slide" style="padding:0;">
        <div class="howitworks-split">
          <div class="left">
            <div class="ppd-eyebrow">How It Works</div>
            <h3>How Your Solution Works.</h3>
            <p>This is an optional slide to explain how you deliver the solution. Duplicate if needed. Segue into a Notion doc, portfolio of work, or other relevant files.</p>
            <ul>
              <li>Use bullets.</li>
              <li>Keep text to a minimum.</li>
              <li>Google the &#8216;Rule of 3&#8217; if you don&#8217;t know it.</li>
            </ul>
            <div class="ppd-footer-mini">{Company Name}</div>
          </div>
          <div class="right">
            <div class="ph"></div>
            <div class="corner-brand"><svg viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</div>
          </div>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>SLIDE OPTION — 1</strong></p>
        <p><strong>Service Delivery (who/what/where/when/why/how)</strong></p>
        <p><strong>Purpose:</strong> After laying out your big promise and key messages, it's time to explain exactly how you deliver. Break down who's involved, what steps are taken, where and when things happen, and how you back up your claims. This is where you show off your expertise and prove you're the real deal.</p>
        <p><strong>Why?</strong> Without a clear understanding of your process and expertise, doubts creep in. People need to see how you make the magic happen, so they trust you can deliver on your promises.</p>
        <p><strong>Pro-tip:</strong> Skip the info dump in your slides. Use real work you've already developed to explain and sell trust. Show your process, results, and past projects to back up what you're saying. When people see the awesome stuff you've already created, it's easier for them to trust that you'll deliver the same quality for them. Let your work prove the value.</p>
      </aside>
    </section>
```
