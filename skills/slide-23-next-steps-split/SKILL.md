---
name: slide-23-next-steps-split
description: "Next steps…" split — closing tactic + live CTA form (or static close in no-GHL mode).
slide_index: 23
layout_family: split-text-image
strategic_role: close
requires_brief_fields: ["cta.url", "cta.label"]
optional_brief_fields: ["offer.name", "offer.price"]
output_files:
  section: index.html (23rd <section>)
  notes: notes/slide-23.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-1207
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-1207&m=dev
---
## Strategic Intent

Clear next step — the close. One unambiguous ask, then stop talking. The slide gives the prospect three explicit options (in / question / out) so they have permission to commit verbally on the call. Whatever closing tactic you've chosen, present it and shut up.

Full reference: [notes/slide-23.html](../../notes/slide-23.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 20 | ✓ | ✓ | `.nextsteps-split .left .ppd-eyebrow` |
| `headline` | headline | 70 | ✓ | ✓ | `.nextsteps-split .left h3` |
| `body` | body | 175 |  | ✓ | `.nextsteps-split .left p` |
| `footer_mini` | footer_brand | 25 | ✓ |  | `.nextsteps-split .left .ppd-footer-mini` |
| `cta_title` | card_title | 20 | ✓ | ✓ | `.nextsteps-split .cta-card .title` |
| `choice_in_label` | cta_label | 30 | ✓ | ✓ | `.nextsteps-split .cta-card .choice-btn[data-choice="in"] span:first-child` |
| `choice_question_label` | cta_label | 40 | ✓ | ✓ | `.nextsteps-split .cta-card .choice-btn[data-choice="question"] span:first-child` |
| `choice_out_label` | cta_label | 35 | ✓ | ✓ | `.nextsteps-split .cta-card .choice-btn[data-choice="out"] span:first-child` |
| `submit_label` | cta_label | 15 | ✓ | ✓ | `.nextsteps-split .cta-card button.submit` |
| `success_title` | card_title | 40 | ✓ | ✓ | `.nextsteps-split .cta-card [data-success-title]` |
| `success_body` | body | 60 |  | ✓ | `.nextsteps-split .cta-card [data-success-body]` |
| `corner_brand` | footer_brand | 20 | ✓ |  | `.nextsteps-split .right .corner-brand` |
### Fragility notes

- `eyebrow` — 56px eyebrow with 220px bottom margin; wraps above ~18 chars and collapses the gap to headline
- `headline` — 76px on 680px max-width; body falls into footer above 76 chars
- `cta_title` — 22px CTA card title; wraps above ~18 chars and pushes choices down
- `choice_in_label` — single-line pill choice; check icon clips above ~28 chars
- `choice_question_label` — single-line pill choice; check icon clips above ~36 chars
- `choice_out_label` — single-line pill choice; check icon clips above ~32 chars
- `submit_label` — submit button — wraps and unbalances form above ~12 chars
- `success_title` — post-submit confirmation headline; wraps above ~36 chars
- `corner_brand` — inline with sparkle in right column corner; wraps above ~18 chars
## Voice & Tone Rules

- One ask. Specific verb, specific next action. 'Book the kickoff', 'sign the SOW', 'pick a plan'.
- Make the path one-click obvious — link, button, or in-meeting choice.
- Leave the three-option commitment scaffolding intact: I'm in / question / out.
- Tone is calm and certain — you've earned the close.
- No new value, no recaps, no 'and one more thing'.
## Inputs Required from Brief

- `brief.cta.url`
- `brief.cta.label`

### Optional brief fields

- `brief.offer.name`
- `brief.offer.price`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-23.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **23rd `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-23.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 23: next-steps-split · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-23.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Clear Next Step — Slide 23</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Reach out whenever you're ready to learn more."
  **WHY:** no ask, no next step, no time pressure, passive close
- **BAD:** "Looking forward to hearing your thoughts!"
  **WHY:** deflects the close, invites stall, no commitment frame
- **BAD:** "Final recap of all 22 previous slides on the close slide."
  **WHY:** violates 'make the ask and stop talking' — buries the CTA
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="bg-dark">
      <div class="ppd-slide" style="padding:0;">
        <div class="nextsteps-split">
          <div class="left">
            <div class="ppd-eyebrow">Next steps&#8230;</div>
            <h3>Insert your closing tactic and make the ask.</h3>
            <p>Give additional context and information about next steps, what they need to do and how you make it easy. Make the ask and stop talking.</p>
            <div class="ppd-footer-mini">{Company Name}</div>
          </div>
          <div class="right">
            <div class="cta-card" id="ppd-cta-card" data-endpoint="/api/lead">
              <p class="title">Ready to Buy?</p>
              <div class="choices" role="radiogroup" aria-label="Your response">
                <button type="button" class="choice-btn" data-choice="in" aria-pressed="false">
                  <span>I&#8217;m in! Let&#8217;s go.</span><span class="check">&#10003;</span>
                </button>
                <button type="button" class="choice-btn" data-choice="question" aria-pressed="false">
                  <span>Got a question, but looks good!</span><span class="check">&#10003;</span>
                </button>
                <button type="button" class="choice-btn" data-choice="out" aria-pressed="false">
                  <span>I&#8217;m out. Let&#8217;s not waste time.</span><span class="check">&#10003;</span>
                </button>
              </div>
              <form class="form" novalidate>
                <div class="field" data-field="name">
                  <label for="ppd-name">Name</label>
                  <input id="ppd-name" name="name" type="text" autocomplete="name" required maxlength="100">
                  <div class="err">Please enter your name.</div>
                </div>
                <div class="field" data-field="email">
                  <label for="ppd-email">Email</label>
                  <input id="ppd-email" name="email" type="email" autocomplete="email" required maxlength="254">
                  <div class="err">Please enter a valid email.</div>
                </div>
                <div class="field" data-field="phone">
                  <label for="ppd-phone">Phone</label>
                  <input id="ppd-phone" name="phone" type="tel" autocomplete="tel" required placeholder="+1 555 123 4567" maxlength="20">
                  <div class="err">Please enter a valid phone number (with country code).</div>
                </div>
                <div class="field" data-field="message" hidden>
                  <label for="ppd-message"><span data-message-label>Anything to add? (optional)</span></label>
                  <textarea id="ppd-message" name="message" maxlength="2000" rows="3"></textarea>
                  <div class="err">Please share a bit more so we can help.</div>
                </div>
                <button type="submit" class="submit">Send</button>
                <div class="form-message" role="status" aria-live="polite"></div>
              </form>
              <div class="success" role="status">
                <div class="tick">&#10003;</div>
                <h4 data-success-title>Thanks — you&#8217;re on the list.</h4>
                <p data-success-body>We&#8217;ll be in touch shortly.</p>
              </div>
            </div>
            <div class="corner-brand"><svg viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</div>
          </div>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>Clear Next Step (The Close)</strong></p>
        <p><strong>Purpose:</strong> Lay out a clear, simple path for the prospect to take the next step and make your ask.</p>
        <p><strong>Slide Design Strategy:</strong> The layout is strategically designed to clearly outline the next steps. The slide also leverages Figma Slides' poll functionality, but during a call, it prompts a verbal commitment – yes, no, or maybe.</p>
        <p><strong>Closing Tactic:</strong> Select the right closing tactic for your offer by following the steps in this worksheet: <a href="https://pebble-glasses-ebe.notion.site/Closing-Tactic-832c5065a1d84d58af585b6c6704a046" target="_blank" rel="noopener noreferrer">Closing Tactic worksheet</a>.</p>
      </aside>
    </section>
```
