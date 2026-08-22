# Perfect Pitch Deck Kit — Claude Code Guardrails

This file tells Claude Code how to work inside this repo. Read it before editing anything. The repo is a 23-slide Reveal.js pitch-deck template designed to be branded, content-filled, and shipped to Cloudflare Pages by a non-technical user in under 60 minutes.

## Golden Rules (do not break)

0. **Start every new client deck from `template-base`, never from the previous client's deck.** Run `git checkout template-base -- index.html notes/ deck.config.json` before `/fill-deck` for a new prospect. Editing forward from whoever came before silently carries their framing choices, phrasing, and stale references into the next pitch with no record of why anything changed — this already happened once (a client-specific story swap on slide 2 that nobody decided on, plus `notes/*.html` files left three clients stale). If a framing choice from a past deck is worth reusing (e.g. a proof-point story), that's a deliberate call to make and note in the brief — not a default from copying the file forward.
1. **Use design tokens.** Never hardcode hex, `rgba()`, or `font-size` in px outside of `:root` in `index.html`. The brand tokens are in the `:root` block at the top of the `<style>` element.
2. **Never edit class names, `data-*` attributes, or structure in `index.html` from a slide-authoring skill.** Only replace TEXT INSIDE existing slot elements. Layout is the system's job, copy is the user's job.
3. **Use existing slot names.** Per-slide slots are defined in `slides/schema.json` and surfaced in each `skills/slide-NN-*/SKILL.md`. If a slide doesn't have a slot for what you want to add, leave it.
4. **Honor char limits.** Hard limits in `slides/schema.json` mean HARD — rewrite shorter, never truncate mid-word, never overrun. Soft limits (body/bullets) can be ±10%.
5. **Brand SVGs must use `fill="currentColor"`** for the recolour-able shape. Never use CSS `filter: hue-rotate / brightness / saturate` to recolour a brand asset — that hack was the canonical "we forgot to themify the asset" smell in the previous iteration.
6. **Never invent brief data.** If a required field is missing from `brief.yaml`, write `[MISSING: <field>]` in the slot and stop — do not fabricate.
7. **After editing any `offer.*` field in `brief.yaml` post-fill, or hand-editing more than one slide in a sitting, run `/narrative-check` before calling it done.** This already went wrong once for real (Kai Peschl deck, 2026-08-21): three separate rounds of "fix the narrative," each reasonable on its own slide, quietly deleted the deck's central growth-number theme by the third round, and one slide's speaker notes were never touched across any round because nobody was reading the deck as a whole story between edits — only structural validation ran, which can't see semantic drift. Run `node scripts/field-dependents.mjs <field>` first to see the full blast radius of a brief-field change, not just the slides you remember mattering, then `/narrative-check` (`skills/narrative-check/SKILL.md`) to actually read the whole deck against `brief.yaml`'s core claims before reporting the fix as complete.
8. **Run the Pre-Flight Checklist below before telling Shlomo any deck is ready.** Added 2026-08-22 after the Kai Peschl deck shipped for review with the demo cover image still in place, two empty split-image slides duplicating already-filled ones, a testimonial's photo and logo belonging to someone else entirely, and a fabricated "you'll forget to follow up" pain-point that had already been rejected once and just kept getting reworded instead of removed. None of that was caught by the validators or by `/narrative-check` alone — it took Shlomo going slide-by-slide again. The checklist exists so that doesn't have to happen a second time on the next client.

## Pre-Flight Checklist (run before showing Shlomo any deck)

This is the concrete, checkable version of "don't ship template leftovers or an incoherent narrative." Go through every item below against the actual rendered deck (`node scripts/qa-screenshots.mjs`, then look at the PNGs — don't judge from HTML source alone) before calling a build or an edit pass "ready."

1. **Cover image.** Not `assets/99-problems-poster.png`, not any other file with "problems," "acme," or a joke name in it. Screenshot it — if the image is invisible or low-contrast against its background (a common failure: dark SVG brand marks on this kit's dark cover), that's a fail even though the `<img>` tag "works." If no real client-specific asset exists, use a guaranteed-visible on-brand fallback (`assets/brand/asset_bolt_logo.jpg` has shipped as one) and say so out loud to Shlomo rather than silently presenting it as the final answer — he'd rather be asked than surprised.
2. **No duplicate-role slides both live.** Check `slides/manifest.json` — several slide pairs share the same `strategic_role` (6/7 = "outcomes", 8/9 = "mechanism") as alternate archetype choices, not a sequence. If both got filled by `/fill-deck`, that's a bug: pick the one with real content/images behind it, `data-visibility="hidden"` the other, and say in its notes why.
3. **No empty placeholders.** Grep for `<div class="ph"></div>` and any other empty visual slot. Every one is either filled with a real, honestly-captioned image, or the slide is hidden. Never leave a visibly empty box in a slide Shlomo is going to present live.
4. **Every proof photo/logo belongs to the name next to it.** Cross-check each `<img alt="...">` in a testimonial/team/quote slide against the name printed beside it. `assets/steve.webp` (alt "Steve Butler") and `assets/skool-wordmark.svg` are this kit's own template-default placeholders, not real people or real logos from any client — if either appears in a client deck, it was never actually replaced. If no real photo exists for someone, leave the image out entirely rather than reuse an unrelated person's photo or logo.
5. **Every stated fact traces to `brief.yaml` or the source call debrief.** If a slide asserts a pain-point, habit, or number that isn't in the brief and isn't a verbatim/sourced quote from the call materials, it's invented — cut it or replace it with something sourced, per Golden Rule 6. This includes reworded repeats: a fabricated pain-point that gets caught and "fixed" by rephrasing it, three slides later, in slightly different words is still the same fabrication (this is exactly what happened with a "you'll forget to follow up" framing across 7 different slides on the Kai deck — rejected once, never actually removed, just reworded each round).
6. **`brief.yaml` and the live deck agree.** If a slide shows a testimonial, stat, or claim that isn't written into `brief.yaml`'s `proof_points`/`offer` fields, the brief is stale — update it to match what's actually shipping, don't leave the deck ahead of its own source of truth. (This happened here: a third "Ica" testimonial had been added straight to `index.html` and was never written back into `brief.yaml`.)
7. **`notes/slide-NN.html` matches the `<aside class="notes">` in `index.html` for every slide you touched.** `node scripts/validate-deck.mjs` flags mismatches directly — resolve every one, don't leave stale presenter notes next to updated slide copy.
8. **One coherent narrative, read start to finish.** Run `node scripts/dump-deck-text.mjs` and read the output as Kai/the prospect would see it live, not slide-by-slide against memory of what you last wrote. Confirm: the opening quote is real and is the same want/number referenced later; the promise slide and the guarantee slide don't contradict each other; nothing on a "hidden" slide's dead copy would matter if it were ever un-hidden by accident.

## Copy Balance Rules

When writing slides with repeated card / list / bullet groups, keep the items balanced:

- Card titles within a grid: ±2 words across cards
- Card bodies within a grid: ±4 words across cards
- Plan / inclusion lists: equal item count per plan unless intentional stair-step
- A card grid where one card has 42 words and another has 20 is unacceptable

Before finishing a slide, count words/chars in every repeated group.

## Slide System Rules

- 23 slides, in the order defined by `slides/manifest.json`
- Each slide has ONE strategic role (see frontmatter in `skills/slide-NN-*/SKILL.md`)
- Slide archetypes: `quote`, `grid-3`, `grid-2x2`, `split-text-image`, `hero-card`, `pricing-3`, `team-5`, `logo-grid`, `cover`
- Never invent a 24th slide without also: (1) creating `skills/slide-24-*/SKILL.md`, (2) updating `slides/manifest.json`, (3) updating `slides/schema.json`, (4) updating the brief schema if it consumes new fields

## Banned

- Tailwind palette names (`bg-blue-500`, `text-slate-700`, etc.) — we don't use Tailwind
- Raw hex / `rgba()` outside `:root` in `index.html` (except component-level neutrals already in the file — those are listed in `BRAND.md` as out-of-scope for rebrand)
- Inline `style="..."` for color / font-size / spacing
- `filter: hue-rotate / brightness / saturate` on brand SVGs
- Modifying `functions/api/lead.js` without also updating CLAUDE.md notes about new GHL fields

## Brand-Setup Check

Before writing any slide copy from `/fill-deck`, check that:
- `BRAND.md` has been edited away from the demo defaults (look for "Perfect Pitch Deck Creator")
- `:root` `--accent` is no longer `#1F5EFF` (the default demo blue)

If either check fails, prompt the user to run `/brand` first.

## File-touch matrix

| Files | Touched by |
| --- | --- |
| `index.html` slot text only | `/fill-deck`, `/fill-slide` |
| `notes/*.html` | `/fill-deck`, `/fill-slide` |
| `_qa/*` | `/fill-deck` (writes report), `/check` |
| `:root` block in `index.html` · `BRAND.md` · `assets/brand/*` | `/brand` ONLY |
| `brief.yaml` | `/brief` ONLY |
| `deck.config.json` | `/brand`, `/deploy`, `/ghl-setup` |
| `.env` | `/ghl-setup`, `/deploy` |
| `scripts/*` · `functions/*` · `staticrypt-template.html` · `package.json` | NEVER edited from slide-authoring skills; only as deliberate kit-maintenance edits. Exception: `scripts/dump-deck-text.mjs` and `scripts/field-dependents.mjs` are read-only diagnostics — any skill may *run* them, none may edit them casually. |

## Validators

Two structural validators run before any build and on demand via `/check`:

- `scripts/validate-brand.mjs` — fails on raw hex / `rgba()` / `font-size: px` outside `:root`; missing brand assets; SVGs without `currentColor`; Tailwind palette name leaks; dead asset files; dead font imports
- `scripts/validate-deck.mjs` — fails on slot char overruns (hard limits in `slides/schema.json`); missing required slots; speaker notes that don't reference a brief-specific token (catches generic LLM output); placeholder text left in production (e.g. "{Company Name}")

Both are warn-only during Phase 1 of development. Promoted to fail-on-error in Phase 4.

Neither validator reads for meaning — they can't tell two slides contradict each other, or that a theme got quietly edited out across several rounds of fixes. That's what `/narrative-check` (`skills/narrative-check/SKILL.md`) is for — a semantic pass, not a lint rule, run via `node scripts/dump-deck-text.mjs` plus a full read against `brief.yaml`. See Golden Rule 7. `node scripts/field-dependents.mjs [field]` answers "which slides does this brief field touch" without relying on memory.

## When in doubt

- Read `BRAND.md` for the design token catalogue + allowed contrast pairs
- Read `slides/schema.json` for per-slot specs (slot name, max chars, transform, fragility)
- Read `skills/slide-NN-*/SKILL.md` for per-slide strategic intent + generation instructions
- Read `notes/slide-NN.html` for the full presenter strategy reference (the SKILL.md's strategic intent is a distillation of this)
- Read this file's "Golden Rules" before any cross-cutting change
- Run `node scripts/dump-deck-text.mjs` before trusting your own memory of what a slide currently says — this exact mistake (assuming a slide still said what you last wrote, without re-checking) is what caused the Kai deck regression
