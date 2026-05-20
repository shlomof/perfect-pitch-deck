---
name: slide-15-team-dark
description: "The Team" — dark slide with 5 portraits, names, roles, and bios.
slide_index: 15
layout_family: team-5
strategic_role: team
requires_brief_fields: ["team", "company"]
optional_brief_fields: []
output_files:
  section: index.html (15th <section>)
  notes: notes/slide-15.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-1035
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-1035&m=dev
---
## Strategic Intent

Team — optional, deploy only when it adds trust. Names and faces matter on high-ticket deals or projects where execution risk is real. If the team isn't a flex, skip the slide; a thin team page hurts more than no team page.

Full reference: [notes/slide-15.html](../../notes/slide-15.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `eyebrow` | eyebrow | 20 | ✓ | ✓ | `.ppd-eyebrow` |
| `person_1_name` | card_title | 15 | ✓ | ✓ | `.team-grid .person:nth-child(1) .name` |
| `person_1_role` | card_meta | 10 | ✓ | ✓ | `.team-grid .person:nth-child(1) .role` |
| `person_1_bio` | card_body | 110 |  | ✓ | `.team-grid .person:nth-child(1) p` |
| `person_2_name` | card_title | 15 | ✓ | ✓ | `.team-grid .person:nth-child(2) .name` |
| `person_2_role` | card_meta | 10 | ✓ | ✓ | `.team-grid .person:nth-child(2) .role` |
| `person_2_bio` | card_body | 110 |  | ✓ | `.team-grid .person:nth-child(2) p` |
| `person_3_name` | card_title | 15 | ✓ | ✓ | `.team-grid .person:nth-child(3) .name` |
| `person_3_role` | card_meta | 10 | ✓ | ✓ | `.team-grid .person:nth-child(3) .role` |
| `person_3_bio` | card_body | 110 |  | ✓ | `.team-grid .person:nth-child(3) p` |
| `person_4_name` | card_title | 15 | ✓ | ✓ | `.team-grid .person:nth-child(4) .name` |
| `person_4_role` | card_meta | 10 | ✓ | ✓ | `.team-grid .person:nth-child(4) .role` |
| `person_4_bio` | card_body | 110 |  | ✓ | `.team-grid .person:nth-child(4) p` |
| `person_5_name` | card_title | 15 | ✓ | ✓ | `.team-grid .person:nth-child(5) .name` |
| `person_5_role` | card_meta | 10 | ✓ | ✓ | `.team-grid .person:nth-child(5) .role` |
| `person_5_bio` | card_body | 110 |  | ✓ | `.team-grid .person:nth-child(5) p` |
| `footer_left` | footer_brand | 25 | ✓ |  | `.ppd-footer .ppd-footer-left` |
| `footer_mid` | footer_brand | 30 | ✓ |  | `.ppd-footer .ppd-footer-mid` |
| `footer_right_brand` | footer_brand | 20 | ✓ |  | `.ppd-footer .ppd-footer-right` |
### Fragility notes

- `eyebrow` — white-on-dark eyebrow; wraps above ~18 chars
- `person_1_name` — uppercase 18px; wraps above ~14 chars and breaks 5-up alignment
- `person_1_role` — uppercase 18px; wraps above ~9 chars and pushes bio down
- `person_2_name` — uppercase 18px; wraps above ~14 chars
- `person_2_role` — uppercase 18px; wraps above ~9 chars
- `person_3_name` — uppercase 18px; wraps above ~14 chars
- `person_3_role` — uppercase 18px; wraps above ~9 chars
- `person_4_name` — uppercase 18px; wraps above ~14 chars
- `person_4_role` — uppercase 18px; wraps above ~9 chars
- `person_5_name` — uppercase 18px; wraps above ~14 chars
- `person_5_role` — uppercase 18px; wraps above ~9 chars
## Voice & Tone Rules

- Each bio earns its place — relevant credential, recognisable past role, or specific expertise.
- Skip generic titles. 'Head of Customer Success' tells the prospect nothing; specifics do.
- First name and last name. Real photos, not avatars.
- Bios under 20 words. Lead with the most credible fact.
- If the team is one person, this slide is probably the wrong move.
## Inputs Required from Brief

- `brief.team`
- `brief.company`

### Optional brief fields

- _none_
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-15.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **15th `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-15.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 15: team-dark · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-15.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>The Team — Slide 15</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "John Smith — Passionate about customer success and building great teams."
  **WHY:** platitudes, no credential, no trust signal
- **BAD:** "A stock photo with a generic role title underneath."
  **WHY:** kills trust faster than no team slide at all
- **BAD:** "A 15-person team grid where most are 'Operations' or 'Support'."
  **WHY:** padding the wall — only show the people the prospect will actually interact with or whose names carry weight
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="bg-dark">
      <div class="ppd-slide bg-dark">
        <div class="ppd-eyebrow">The Team</div>
        <div class="team-grid">
          <div class="person">
            <div class="avatar"></div>
            <div class="name">FULL NAME</div>
            <div class="role">ROLE</div>
            <p>Say who this person is, what they do, and how they&#8217;ll help the customer be successful.</p>
          </div>
          <div class="person">
            <div class="avatar"></div>
            <div class="name">FULL NAME</div>
            <div class="role">ROLE</div>
            <p>Say who this person is, what they do, and how they&#8217;ll help the customer be successful.</p>
          </div>
          <div class="person">
            <div class="avatar"></div>
            <div class="name">FULL NAME</div>
            <div class="role">ROLE</div>
            <p>Say who this person is, what they do, and how they&#8217;ll help the customer be successful.</p>
          </div>
          <div class="person">
            <div class="avatar"></div>
            <div class="name">FULL NAME</div>
            <div class="role">ROLE</div>
            <p>Say who this person is, what they do, and how they&#8217;ll help the customer be successful.</p>
          </div>
          <div class="person">
            <div class="avatar"></div>
            <div class="name">FULL NAME</div>
            <div class="role">ROLE</div>
            <p>Say who this person is, what they do, and how they&#8217;ll help the customer be successful.</p>
          </div>
        </div>
        <div class="ppd-footer">
          <span class="ppd-footer-left">{Company Name}</span>
          <span class="ppd-footer-mid">{Memorable Pitch Name}</span>
          <span class="ppd-footer-right"><svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>OPTIONAL SLIDE</strong></p>
        <p><strong>Purpose:</strong> Highlight YOU, or EPIC team members. Only use this if it genuinely adds trust or fits well with your offer and service.</p>
        <p><strong>Why:</strong> For high-ticket offers or big projects, or other scenarios, it can build trust by showing there's a team of specialists who won't let you down.</p>
      </aside>
    </section>
```
