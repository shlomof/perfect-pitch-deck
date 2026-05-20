---
name: fill-slide
description: Re-author a single slide against brief.yaml. Use after /fill-deck when one slide came out weak or to iterate on a specific slot's copy.
---

## Invocation

The user invokes this skill with a slide number, optionally with a hint:

- `/fill-slide 5`
- `/fill-slide 5 — make the promise punchier and add the timeframe`
- `/fill-slide 11 — use the Maya testimonial for card 1, swap to dollar-amount metric`

## Steps

1. Parse the slide number `N` (1–23) and any free-text hint from the user.
2. Read:
   - `slides/manifest.json` to resolve `N` → `slug` → SKILL.md path
   - `skills/slide-NN-<slug>/SKILL.md` for the per-slide authoring guide
   - `brief.yaml` for the user's offer data
   - The current text in the Nth `<section>` of `index.html` (so you know what to replace and can show before/after)
3. If the user's hint targets a specific slot, generate ONLY that slot. Otherwise regenerate every slot listed in the SKILL.md `Copy Slots` table.
4. Follow the SKILL.md `Generation Instructions` exactly — voice rules, anti-patterns, hard char limits all apply.
5. Show the user a diff: each slot's old text + new text + char count vs limit. Ask for confirmation before patching `index.html`.
6. On confirm: patch `index.html`, overwrite `notes/slide-NN.html` per the SKILL.md Speaker Notes Generation block, run `node scripts/inject-notes.mjs`, and run `node scripts/validate-deck.mjs --slide N`.
7. Print the after-summary: `slide N: <slug> · <slots changed> · tightest=<chars>/<max>`.

## When the user's hint conflicts with the SKILL.md voice rules

The SKILL.md voice rules win. If the user asks for something the rules forbid (e.g. "make the promise into bullet points" when the slide is single-quote-only), explain why the layout doesn't support it and propose a variant that does.

## When a slot's hard limit blocks the user's hint

If the user asks for copy that can't fit in the hard char limit (e.g. "add three more proof points to the headline" when headline maxChars=70), report the constraint and propose either:
  - A tighter rewrite that fits
  - Moving the extra content to a softer-limit slot on the same slide (body, bullets)
  - Splitting the content across two slides (offer + bonus)

Never violate a hard char limit.
