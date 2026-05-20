---
name: fill-deck
description: Read brief.yaml and author copy for every slide in the deck, sequentially, with per-slide checkpoints so partial runs are resumable.
---

## What this does

Reads `brief.yaml` once, then walks slides 1→23, invoking each `skills/slide-NN-<slug>/SKILL.md` against the brief. Patches `index.html` slot-by-slot, regenerates per-slide speaker notes, and produces a `_qa/fill-deck-report.md` checkpoint after every slide so a killed/restarted run picks up where it left off.

## Inputs

- `brief.yaml` at the repo root (required) — single source of truth for the user's offer
- `slides/manifest.json` — slide index → slug → archetype mapping
- `slides/schema.json` — per-slot char limits and selectors
- `skills/slide-NN-<slug>/SKILL.md` × 23 — per-slide authoring guides

## Pre-flight checks (stop on failure)

1. `brief.yaml` exists. If not, prompt user to run `/brief` first.
2. Validate the **required top-level fields**:
   - `company`, `pitch_name`, `client_name`
   - `offer.name`, `offer.dream_outcome`, `offer.timeframe`, `offer.problem`, `offer.unique_mechanism`
   - `cta` (either `cta.url` for static mode OR GHL env vars set)
3. Run `scripts/validate-brand.mjs`. Stop on violations (warnings are fine).
4. Confirm `assets/brand/mark.svg` is no longer the default placeholder (i.e. `/brand` has been run). If still default, ask the user to run `/brand` first.

## Per-slide loop

For N = 1 to 23:

1. **Skip check** — Read `skills/slide-NN-<slug>/SKILL.md` frontmatter. If `requires_brief_fields` includes anything missing from `brief.yaml`, skip with a warning logged to the report. (Example: slide 15 needs `team` — if `team` isn't in the brief, the slide stays as-is and the team-slide section is left with placeholder copy.)
2. **Resume check** — If `_qa/fill-deck-report.md` already lists slide N as `status: completed` AND `index.html` was not modified since that line was written, skip this slide entirely (idempotent resume).
3. **Generate copy** — Follow the slide's SKILL.md `Generation Instructions` block. The skill itself contains slot specs, voice rules, anti-patterns, and the exact section selector. Do not deviate.
4. **Validate** — Run `scripts/validate-deck.mjs --slide N`. If any hard-limit slot overruns, rewrite shorter and retry up to twice. If still failing, mark the slide as `status: failed-validation` in the report and continue to the next slide (the user can `/fill-slide N` to retry with a different brief framing).
5. **Patch index.html** — Per the slide's SKILL.md output instructions: locate the Nth `<section>`, replace ONLY text inside each slot's CSS selector, never touch classes/structure/attrs.
6. **Generate speaker notes** — Per the slide's SKILL.md Speaker Notes Generation block. Overwrite `notes/slide-NN.html`.
7. **Append checkpoint** — Add one line to `_qa/fill-deck-report.md`:
   ```
   slide NN · <slug> · status=<completed|skipped|failed-validation> · slots=<N filled> · tightest=<chars>/<max>  ts=<ISO>
   ```

After the loop:

8. Run `node scripts/inject-notes.mjs` ONCE to splice all updated notes into `index.html`.
9. Run `node scripts/validate-deck.mjs --strict` to confirm no hard-limit overruns survived.
10. Print a summary: total slides filled, skipped, failed. Suggest `/fill-slide N` for any failures.
11. Open `http://localhost:8765` (start the dev server with `npm run dev` first if not running) so the user can review.

## Modes

These flags come from `brief.yaml`'s top-level config block (or CLI args if invoked directly):

- `replace_footer_placeholders: true` → substitute `{Company Name}` etc. with `brief.company` / `brief.pitch_name` everywhere they appear in footer slots. Default `false` (keeps the template feel for partial drafts).
- `strict_char_limits: true` (default) → halt on hard-limit violations during step 4.
- `strict_char_limits: false` → emit warnings but continue.
- `dry_run: true` → produce the report but don't patch `index.html` or notes.

## Output files

- `index.html` — 23 sections, slot text replaced
- `notes/slide-NN.html` × 23 — updated speaker notes
- `_qa/fill-deck-report.md` — per-slide status log (the checkpoint file)

## Tone

You are writing FOR THIS USER's BUSINESS, not for a generic SaaS pitch deck. Every slot should reference the brief specifically. If a slot reads like it could fit any company, rewrite.

## When `brief.yaml` is missing fields

- Required field missing → stop pre-flight, prompt the user to fill it via `/brief`. Do not start the loop.
- Optional field missing → silently skip the slides that depend on it, log in the report. Don't fabricate.
- A specific slot needs a fact that isn't in the brief → write `[MISSING: <field>]` in that slot, continue. The user can either edit `brief.yaml` and re-run, or `/fill-slide N` to retry that one slide.
