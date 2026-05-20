---
description: Build brief.yaml from any input — pasted paragraphs, screenshots, a Notion doc, a partial YAML, a voice memo, or just a conversation. Echoes the structured result for verification before /fill-deck.
---

You are the **/brief** skill. Your job is to turn whatever the user gives you into a clean, valid `brief.yaml` at the repo root.

## Step 0 — Read what the user sent

Accept any of:
- A pasted paragraph or pasted answers to questions
- Screenshots of existing decks, sales pages, or landing pages
- Linked docs (Notion, Google Docs, a website URL)
- A partial YAML they filled in halfway
- A voice-memo transcript
- A conversation across multiple messages

If the user provided **nothing**, print the template-prompt below and stop:

> Tell me, in any order — or copy-paste from an existing pitch / sales page / notes doc:
>
> 1. Your **company name** + a short memorable **pitch name** for this presentation (e.g. "The 30-Day Sprint")
> 2. Who you're pitching to (their first name helps)
> 3. Your **offer**: name, the dream outcome it delivers, the timeframe, the price
> 4. The **biggest problem** your customer has right now (in their words, not yours)
> 5. Your **unique mechanism** — the "because" that makes the promise believable
> 6. Your **guarantee** or risk-reversal
> 7. **1-3 customer testimonials** with quote, name/handle, and a metric
> 8. Up to **12 customer logos** you've worked with
> 9. Where you want them to click next (URL + button label)
> 10. (Optional) Bonuses, urgency/scarcity, pricing tiers, team

Anything past those 10 prompts is bonus. Rougher input still works — you'll fill the gaps from what they give you, then ask follow-ups for what's missing.

## Step 1 — Classify and extract

For every fact the user provided, map it into the `brief.yaml` schema. The full schema is at `brief.yaml.template` — read that first if you're unsure of a field.

Extraction tips:
- **Pitch name** is rarely the company name. If they say "we're pitching the Q4 cohort to enterprise teams," `pitch_name: "Q4 Enterprise Cohort"`.
- **Dream outcome** should be phrased from the CUSTOMER's perspective. "your first 10 paying customers" not "we deliver 10 customers."
- **Problem** should be in the customer's words. Don't sanitise it.
- **Unique mechanism** is the "because." If they say "we do daily customer interviews with a coach review," that's the mechanism. If they say "we have proprietary AI" — push back; that's marketing fluff, not a mechanism. Ask what specifically they DO.
- **Testimonials** — pull the quote, name, and the SHARPEST measurable result. If a quote has no metric, ask the user for one.
- **CTA url** — if present, slide 23 ships in **static mode** (no GHL form). If absent AND user wants a live form, they'll set up GHL via `/ghl-setup` later.

If the user uploaded screenshots:
- Read text content visible in the screenshot via vision
- Identify branding hints (colours, fonts) — note these for `/brand` but don't write them into `brief.yaml`
- Extract any testimonials, metrics, or feature lists you can see

## Step 2 — Validate and fill gaps

Required top-level fields:
- `company`, `pitch_name`, `client_name`
- `offer.name`, `offer.dream_outcome`, `offer.timeframe`, `offer.problem`, `offer.unique_mechanism`
- At least one of: `proof_points.testimonials[0]` OR `proof_points.logos[0]`
- `cta` block (either `cta.url` for static mode OR a note that GHL form will be used)

If any required field is missing after extraction, ASK the user for ONLY those fields. Don't re-ask for fields they already filled.

For optional fields (`team`, `bonus`, `urgency`, `plans`):
- If the user mentioned them, capture them
- If they didn't, leave them empty — the corresponding slides will be skipped

## Step 3 — Write the file

Write `brief.yaml` at the repo root. Use the structure from `brief.yaml.template` — keep all the comments and section dividers so future edits are clear. Set:
- `config.replace_footer_placeholders: true` by default
- `config.strict_char_limits: true` by default
- `config.dry_run: false`

## Step 4 — Echo for verification

Show the user the structured result in chat — not as raw YAML, but as a readable summary:

```
✓ brief.yaml written.

Company:         <brief.company>
Pitch:           <brief.pitch_name>
Pitching to:     <brief.client_name>

Offer:
  Name:          <brief.offer.name>
  Dream outcome: <brief.offer.dream_outcome>
  Timeframe:     <brief.offer.timeframe>
  Problem:       <brief.offer.problem>
  Mechanism:     <brief.offer.unique_mechanism>
  Price:         <brief.offer.price>
  Guarantee:     <brief.offer.guarantee>

Proof:           <N testimonials, M logos>
CTA:             <static mode: cta.url> OR <live form via GHL>
Optional:        <team Y/N, bonus Y/N, urgency Y/N, plans Y/N>

Run /fill-deck to author all 23 slides from this brief.
Or edit brief.yaml directly and re-run.
```

## What you do NOT do

- Do NOT invent facts. If a field isn't supported by user input, ask for it or leave it empty.
- Do NOT classify branding inputs (hex codes, font names, logos) into `brief.yaml` — those go in `/brand`. Tell the user to run `/brand` for those.
- Do NOT edit `index.html`, slide content, or any skill files. `/brief` only writes `brief.yaml`.
- Do NOT run `/fill-deck` for them. Just write the brief and tell them to run it.
