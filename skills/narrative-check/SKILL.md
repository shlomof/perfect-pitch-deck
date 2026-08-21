---
name: narrative-check
description: Read the whole deck as one story and check it against brief.yaml's core claims, catching cross-slide contradictions and dropped themes that per-slide validation can't see.
---

## Why this exists

`validate-deck.mjs` checks structure: char limits, missing slots, leftover placeholder text. It has zero ability to notice that slide 6 says "this isn't about growth" while slide 9 is built entirely around a growth number, or that a number named in `offer.problem` got progressively edited out of every slide across several rounds of fixes and nobody caught it because each fix only looked at the one slide being touched.

This happened for real on the Kai Peschl deck (2026-08-21): three separate correction rounds, each one internally reasonable, left the deck's central "10 to 30 conversations" theme quietly deleted by the third round, and slide 2's speaker notes were never even touched across any of the rounds. Nothing flagged it. The user caught it by reading the deck himself and asking "where is that part?"

This skill is the fix: after ANY edit to `brief.yaml`'s offer fields, or ANY hand-edit to more than one slide in a sitting, run this before calling the deck done.

## When to run this

- **Always** as the final step of `/fill-deck` (after `inject-notes.mjs`, before printing the summary).
- **Always** after editing any `offer.*` field in `brief.yaml` post-fill — before touching any slide copy, run `node scripts/field-dependents.mjs <field>` to know the full blast radius, not just the slides you remember mattering.
- **Always** before telling the user a multi-slide narrative fix is done, even if you're confident — confidence is exactly what failed last time.

## How to run it

1. Read `brief.yaml` in full. Note the core claims: `offer.problem`, `offer.dream_outcome`, `offer.unique_mechanism`, `offer.price`, `offer.guarantee`, and any named numbers, phrases, or client quotes called out in comments as load-bearing (e.g. a growth target, a verbatim quote the pitch is anchored on).
2. Run `node scripts/dump-deck-text.mjs` to get every visible slide's rendered text in one place. (Use `--slide N` to inspect one slide in isolation while debugging, but the consistency pass itself needs the full dump — reading slides one at a time is the exact failure mode this skill exists to prevent.)
3. Cross-reference. For each core claim identified in step 1, check:
   - **Presence**: does it actually appear anywhere in the dump? A claim can be true in `brief.yaml` and still be absent from the deck if a later edit round quietly dropped it. Don't assume presence from memory of what you intended to write — check the dump.
   - **Consistency**: do any two slides assert contradictory things about it? (Classic failure: one slide says "this isn't about X", another slide's entire content is built around X.)
   - **Attribution**: if a claim has a specific honest mechanism (e.g. "the Newsletter drives growth, not the paid build"), does every slide that mentions the claim preserve that attribution, or does some slide's phrasing accidentally imply the wrong thing caused it?
4. Also sanity-check the slides that DON'T obviously touch the changed field — per `field-dependents.mjs`'s "optional" column especially. A slide marked optional for a field can still reference that theme in freehand copy (icebreakers, asides) without it being tracked by the schema. Read slide 2 and any narrative or scene-setting slides even if they show up nowhere in the dependency map — those are exactly the ones that go stale silently, as happened here.
5. Report findings as a short list: confirmed-consistent, contradictions found (name the slides + the exact conflicting lines), and omissions found (a core claim with zero slides referencing it). Fix what's found before considering the pass complete — don't just report and stop.

## What this is not

Not a replacement for `validate-deck.mjs` (structure) or `validate-brand.mjs` (tokens/assets). Run those too. This skill only catches semantic drift across slides, which is a different failure mode from either of those and needs an actual read of the content, not a script alone — that's why this is a skill (an LLM reasoning pass) and not a lint rule.
