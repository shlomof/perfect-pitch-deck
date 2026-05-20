---
name: slide-02-nice-to-meet-you
description: Dark intro — "Nice to meet you {Client Name}!" with brand subhead.
slide_index: 2
layout_family: hero-dark
strategic_role: icebreaker
requires_brief_fields: ["client_name"]
optional_brief_fields: ["proof_points.testimonials", "offer.dream_outcome", "company"]
output_files:
  section: index.html (2nd <section>)
  notes: notes/slide-02.html
  post_step: node scripts/inject-notes.mjs
figma_node: 1-867
figma_url: https://www.figma.com/design/FI4Kj6YkWpvcvdfAEA3Jey/Untitled?node-id=1-867&m=dev
---
## Strategic Intent

Authoritative storytelling icebreaker. Open by namedropping a real client who looks like the prospect — same industry, same pain, recent work. The job is to make the prospect think "they already get my world" before slide 3 lands the problem. Skip small talk; lead with a recognisable name and a specific outcome you're currently delivering.

Full reference: [notes/slide-02.html](../../notes/slide-02.html)
## Copy Slots

| slot | type | max chars | hard | required | selector |
|---|---|---|---|---|---|
| `headline` | headline | 35 | ✓ | ✓ | `.intro-slide h1` |
| `subhead` | body | 25 | ✓ | ✓ | `.intro-slide .subhead` |
| `corner_brand` | footer_brand | 20 | ✓ |  | `.intro-brand span` |
### Fragility notes

- `headline` — 144px hero type with explicit <br/> breaks; third line wraps below grid above ~12 chars/line
- `subhead` — 32px subhead on single line; wraps above ~24 chars
- `corner_brand` — inline next to sparkle; wraps above ~18 chars
## Voice & Tone Rules

- First-person, conversational — written the way you'd say it on a call.
- Name a real client. Use their name in the copy, not a placeholder.
- Reference common ground: industry, stage, or specific pain.
- End on momentum — what's happening right now, what's exciting.
- No weather, no city, no 'hope you're well'. Earn the room.
## Inputs Required from Brief

- `brief.client_name`

### Optional brief fields

- `brief.proof_points.testimonials`
- `brief.offer.dream_outcome`
- `brief.company`
## Generation Instructions

1. Read `brief.yaml`. If any field in **Inputs Required** is missing, write `[MISSING: <field>]` into that slot and stop — do not fabricate.
2. Read the full notes at `notes/slide-02.html` for the slide's complete strategic context.
3. For each slot in **Copy Slots**:
   a. Apply the **Voice & Tone Rules** above.
   b. Draft copy using the relevant brief fields.
   c. Verify char count ≤ `max chars`. **Hard limits MUST hold** — rewrite shorter, never truncate mid-word. Soft limits can stretch ±10%.
   d. Check the copy against **Anti-patterns** below. Rewrite if it matches any.
4. Patch `index.html`: locate the **2nd `<section>`** under `<div class="slides">` and replace ONLY the text inside each slot's selector. Never touch classes, `data-*` attributes, structure, or the `<aside class="notes">` block (notes are managed separately).
5. Generate speaker notes per the **Speaker Notes Generation** template below and overwrite `notes/slide-02.html`.
6. Run `node scripts/inject-notes.mjs` to splice updated notes back into `index.html`.
7. Print: `slide 2: nice-to-meet-you · <slots_filled> slots · <chars>/<max> on tightest slot`
## Speaker Notes Generation

Overwrite `notes/slide-02.html` with the SPOKEN version of this slide, tailored to the user's brief:

```html
<p><strong>Icebreaker — Slide 2</strong></p>
<p><strong>Beat:</strong> {one-line of what to land verbally before moving on}</p>
<p><strong>Say:</strong> "{15–40s of spoken copy in the user's voice, referencing brief specifics — real company name, real outcome, real timeframe — not template placeholders}"</p>
<p><strong>Watch out:</strong> {the most common way this slide gets under-delivered}</p>
```

The `Say:` paragraph is the critical one — it must use literal values from `brief.yaml` (`brief.company`, `brief.offer.dream_outcome`, etc.), not placeholders. If a brief field is missing, omit that detail rather than inventing.
## Anti-patterns

- **BAD:** "Thanks so much for taking the time to meet with me today!"
  **WHY:** small talk, zero authority, wastes the rapport window
- **BAD:** "We've worked with a number of leading brands across various industries"
  **WHY:** vague flex, names no one, builds no trust
- **BAD:** "I was just thinking about you the other day…"
  **WHY:** performative warmth, no story, no credibility transfer
## Section HTML reference

The layout below is the source of truth for structure. Replace ONLY text inside slot elements. Do not modify classes, attributes, or markup.

```html
<section data-bg-token="bg-dark">
      <div class="ppd-slide bg-dark">
        <div class="intro-slide">
          <h1>Nice to<br/>meet you<br/>{Client Name}!</h1>
          <div class="subhead">{Company Name}</div>
        </div>
        <div class="intro-brand">
          <svg class="ppd-sparkle-icon" viewBox="0 0 44 44" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C13.9836 22 22 13.9836 22 0C22 13.9836 30.0164 22 44 22C30.0164 22 22 30.0164 22 44C22 30.0164 13.9836 22 0 22Z"/></svg>
          <span>Acme Corp</span>
        </div>
      </div>
    
      <aside class="notes">
        <p><strong>Authoritative Storytelling (Icebreaker)</strong></p>
        <p><strong>Purpose:</strong> Build rapport and establish credibility right off the bat through storytelling. Talk about a real client, how you've been helping them, the results they're getting and how you're excited about it. Even better if you can name drop.</p>
        <p><strong>Example:</strong> "I just got off a call with [client name] who's like you with [client common-ground]. They were dealing with [problem], and we've been working with them for [time] with [service] to get ahead of it. It's exciting to see how things are shaping up for them with [specific outcome] – I'm pumped."</p>
        <p><strong>Why:</strong> This sets the stage by subtly showing you're experienced in their space and are actively helping others, making them more open to discussing their challenges.</p>
        <p><strong>What not to do:</strong> Avoid small talk! Don't talk about the weather, or a restaurant you went to in the city they're from. Be memorable. Be valuable.</p>
      </aside>
    </section>
```
