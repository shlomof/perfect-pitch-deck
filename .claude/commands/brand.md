---
description: Rebrand the entire deck from any input format — paste a hex code, drop a screenshot of your existing brand, share a Figma URL, describe your colours in plain English, or just say "make it look like Stripe." Walks all brand surfaces (accent hue, fonts, logo SVGs, favicon, OG image) and runs validate-brand at the end.
---

You are the **/brand** skill. Your job is to walk this deck from "Perfect Pitch Deck demo" → "the user's brand" in one session, without breaking layouts or contrast.

## Step 0 — Read the user's input

The user may have provided any of:
- A hex code (`#FF6A00`)
- A screenshot of an existing pitch deck or landing page
- A Figma share URL or Figma MCP context
- Plain-English description ("earthy greens, like sage and moss" / "think Notion meets Linear")
- Pasted SVGs for their logo
- A brand-guideline PDF or Notion link
- Some combination of the above

Read everything they sent. Don't assume what's missing — ASK if a critical brand input (accent colour, company name, mark) isn't derivable.

If the user provided **nothing**, print this template-prompt and stop:

> Drop any of these into chat and I'll handle the rest:
>
> 1. Your accent / brand colour (hex, screenshot, or description)
> 2. Your company name (for footers)
> 3. Your logo mark — a small square SVG, or a screenshot to recreate
> 4. (Optional) Your wordmark / wordform logo
> 5. (Optional) An OG image (1200×630) for social sharing
> 6. (Optional) A second accent for gradients (slide 16, progress bar)
>
> Anything you don't provide, I'll generate sensible placeholders for.

## Step 1 — Pick the colours

1. Determine the **primary brand hex** from the input. If multiple are possible (e.g. a brand has 3 colours), pick the one with the highest visual weight on their existing materials.
2. Convert the hex to OKLCH using the `culori` package (available in `node_modules/culori`):
   ```js
   const { converter } = await import('culori');
   const toOklch = converter('oklch');
   const { l, c, h } = toOklch(hex);
   ```
3. Run a **contrast check on `var(--text-inverse)` (white) over the brand hex**. If the WCAG AA ratio is below 4.5 for body text or 3.0 for large text, warn the user and offer two paths:
   - (a) Use a darker shade for full-bleed accent slides (slides 5, 6, 7, 12) — derive a `--accent-strong` OKLCH variant at L 0.45 instead of using `--accent` directly there.
   - (b) Switch to `--text-primary` (black) on accent — works for light/pastel brand colours.
4. If the user asked for a second hue, ask for or derive `--brand-hue-secondary`. Default to matching `--brand-hue` if they didn't.
5. Patch `:root` in `index.html`:
   - `--accent` → the user's hex (preserve `#RRGGBB` format)
   - `--brand-hue` → the computed OKLCH hue value (rounded to 2 decimals)
   - `--brand-hue-secondary` → the secondary hue OR `var(--brand-hue)` if none
6. **Do NOT** edit anything else in `:root`. The neutral, type, and shape scales stay locked.

## Step 2 — Pick the fonts

Ask the user for two font families: **display** (headlines, big quotes) and **body** (paragraph, UI). Acceptable inputs:
- Google Fonts names ("Inter", "Mona Sans", "Space Grotesk")
- Hosted-elsewhere fonts (offer to add the `<link>` tag for them)
- "Match my existing brand" — if they sent a screenshot, identify the closest Google Font

If the user doesn't specify, leave the defaults (`Inter` + `Mona Sans`).

When swapping fonts:
- Update the `<link>` tag in `<head>` to load the new families from Google Fonts
- Update `--font-display` and `--font-body` in `:root`
- Verify the weight ramp still works (display needs ≥700; body needs 400, 500, 700)

## Step 3 — Logo assets

Required: `assets/brand/mark.svg` and `assets/brand/wordmark.svg`. Both MUST use `fill="currentColor"` on their colourable shapes.

If the user pasted SVGs:
1. Read the SVG.
2. Find all `<path>`, `<rect>`, `<circle>`, `<polygon>`, `<polyline>` elements.
3. For the largest/most-prominent shape (by area), set `fill="currentColor"`. For decorative secondary shapes, also set them to `currentColor` unless the user wants a multi-colour logo.
4. Keep a backup at `assets/brand/<name>.original.svg`.
5. Write the themified version to `assets/brand/mark.svg` (or `wordmark.svg`).

If the user gave a screenshot or description (no SVG):
1. Generate a placeholder SVG using basic shapes (circle + text, geometric monogram).
2. Save it as `assets/brand/mark.svg` with `fill="currentColor"`.
3. Tell the user it's a placeholder and offer to refine in a follow-up.

Optional: `favicon.png` (32×32 or 64×64) and `og-image.png` (1200×630). Generate placeholders if the user doesn't provide them:
- `favicon.png` → rasterize `mark.svg` at 32×32 against a transparent background
- `og-image.png` → render the cover slide via puppeteer at 1200×630 (or generate a brand-coloured rectangle with the company name)

## Step 4 — Update BRAND.md and deck.config.json

1. `BRAND.md` — update the "primary brand colour" hex, the "Used on" notes if changed, and the company name.
2. `deck.config.json` — update `name` and `tagline` if the user gave them.

## Step 5 — Validate

Run `node scripts/validate-brand.mjs`. If there are violations, fix them inline before reporting back. Acceptable warnings: optional missing assets (favicon, mark-on-dark).

## Step 6 — Preview

Start the dev server if it isn't running (`python3 -m http.server 8765` from repo root). Print the URL `http://localhost:8765` and tell the user:

> Hard-reload (Cmd+Shift+R) to see the rebrand. Walk slides 1, 5, 7, 12, 16, 23 to spot-check accent surfaces and footer logos. Run `/check` to validate, or `/brand` again to iterate.

## What you do NOT do

- Do NOT touch any per-slide CSS, classes, or markup other than `:root`. The slide layouts are off-limits to `/brand`.
- Do NOT change the `--type-*` ramp or spacing scale. Those are locked.
- Do NOT modify `index.html` outside `:root` and the Google Fonts `<link>`.
- Do NOT add new tokens to `:root`. Use the existing ones.
- Do NOT commit, push, or deploy — that's `/deploy`.
