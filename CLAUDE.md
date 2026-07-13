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
| `scripts/*` · `functions/*` · `staticrypt-template.html` · `package.json` | NEVER from slide-authoring skills; only as deliberate kit-maintenance edits |

## Validators

Two validators run before any build and on demand via `/check`:

- `scripts/validate-brand.mjs` — fails on raw hex / `rgba()` / `font-size: px` outside `:root`; missing brand assets; SVGs without `currentColor`; Tailwind palette name leaks; dead asset files; dead font imports
- `scripts/validate-deck.mjs` — fails on slot char overruns (hard limits in `slides/schema.json`); missing required slots; speaker notes that don't reference a brief-specific token (catches generic LLM output); placeholder text left in production (e.g. "{Company Name}")

Both are warn-only during Phase 1 of development. Promoted to fail-on-error in Phase 4.

## When in doubt

- Read `BRAND.md` for the design token catalogue + allowed contrast pairs
- Read `slides/schema.json` for per-slot specs (slot name, max chars, transform, fragility)
- Read `skills/slide-NN-*/SKILL.md` for per-slide strategic intent + generation instructions
- Read `notes/slide-NN.html` for the full presenter strategy reference (the SKILL.md's strategic intent is a distillation of this)
- Read this file's "Golden Rules" before any cross-cutting change
