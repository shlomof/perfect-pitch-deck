# Perfect Pitch Deck — Brand System

The kit's brand system is **one-knob simple by default, two-knob expressive when you want it.** Paste your accent hex into `--accent`, run `/brand`, and the whole deck rebrands.

## The brand knobs (only place a user edits colour)

All brand tokens live in the `:root` block at the top of `index.html`'s `<style>` element.

| Knob | Default | What it controls |
| --- | --- | --- |
| `--accent` | `#1F5EFF` | **Paste your brand hex here.** Drives the accent family on every slide. |
| `--brand-hue` | `263.74` | OKLCH hue of `--accent`. Used to derive matching tints. **Auto-set by `/brand`** when you paste a new `--accent`. |
| `--brand-hue-secondary` | `var(--brand-hue)` | Optional second hue for gradient surfaces (progress bar, slide 16). Default = match primary — most users leave this alone. |
| `--font-display` | `'Mona Sans', 'Inter', sans-serif` | Headline / display font |
| `--font-body` | `'Inter', system-ui, sans-serif` | Body / UI font |

That's it. Everything else is derived.

## Derived accent family (do not edit by hand)

```css
--accent-soft:  oklch(89% calc(0.247 * 0.22) var(--brand-hue));   /* ≈ #C7DCFF at default — dark-bg accent text */
--accent-tint:  oklch(92.5% calc(0.247 * 0.18) var(--brand-hue)); /* ≈ #D9E8FF at default — page-tint background */
```

These reproduce the current deck's `#C7DCFF` / `#D9E8FF` at **deltaE < 1.5 (imperceptible)** at the default hue, and stay visually balanced as `--brand-hue` moves around the colour wheel.

> **Why hex + hue, not pure OKLCH?** The default accent `#1F5EFF` sits at OKLCH chroma 0.247 — at the sRGB gamut edge for blue. Pure-OKLCH formulas like `oklch(60% 0.18 H)` drift by deltaE 9 (clearly different colour). A paste-hex knob is the only way to honour arbitrary brand hexes precisely while still deriving matching tints. The `/brand` slash command computes `--brand-hue` from `--accent` automatically.

## Neutrals (palette baseline — same for every brand)

| Token | Value | Role |
| --- | --- | --- |
| `--bg-light` | `#F5F5F5` | Default light-slide background |
| `--bg-dark` | `#000000` | Black-slide background |
| `--surface` | `#FFFFFF` | Cards, panels, white slides |
| `--text-primary` | `#000000` | Primary text on light bg |
| `--text-inverse` | `#FFFFFF` | Primary text on dark / accent bg |
| `--text-muted` | `rgba(0,0,0,0.65)` | Body copy, captions on light |
| `--text-muted-inverse` | `rgba(255,255,255,0.85)` | Body copy, captions on dark |
| `--border-card` | `rgba(0,0,0,0.06)` | Subtle card edges |
| `--warn` | `#C0271F` | Form validation errors |

## Allowed contrast pairs

`validate-brand.mjs` enforces these pairs only. Adding a colour combination not on this list fails the build.

| Foreground | Background | WCAG | Used on |
| --- | --- | --- | --- |
| `--text-primary` (#000) | `--bg-light` (#F5F5F5) | AAA | most slides |
| `--text-primary` (#000) | `--surface` (#FFF) | AAA | cards |
| `--text-primary` (#000) | `--accent` (default: #1F5EFF as it stands, but assumes brand-hex stays in light blue range) | needs check per brand | accent pill, choice-btn |
| `--text-inverse` (#FFF) | `--bg-dark` (#000) | AAA | dark slides |
| `--text-inverse` (#FFF) | `--accent` | AAA at default; **`/brand` runs a contrast check on user's hex** | full-bleed accent slides |
| `--text-primary` (#000) | `--accent-tint` | AAA | tinted slides (3, 4) |
| `--accent-soft` (#C7DCFF) | `--accent` (#1F5EFF) | AA-large | soft quote text inside accent slides |
| `--text-muted` | `--bg-light` / `--surface` | AA | body copy |
| `--text-muted-inverse` | `--bg-dark` / `--accent` | AA | body copy on dark/accent |

**If a brand's `--accent` has insufficient contrast with `--text-inverse` (white)**, `/brand` will warn the user and offer to: (a) use a darker shade for full-bleed accent backgrounds, or (b) switch to `--text-primary` (black) on accent.

## Typography

| Token | Stack | Role |
| --- | --- | --- |
| `--font-display` | `'Mona Sans', 'Inter', sans-serif` (700–900) | Slide headlines, big quotes |
| `--font-body` | `'Inter', system-ui, sans-serif` (400–700) | Body, captions, footer |
| `--font-mono` | `'JetBrains Mono', monospace` (400–600) | HUD only |

`/brand` lets the user swap the display + body fonts. Mono stays system-default — it's UI chrome only.

## Type ramp (10 named steps — locked)

| Token | Default px | Used on |
| --- | --- | --- |
| `--type-display-xl` | 152px | Slide 2 ("Nice to meet you") |
| `--type-display-lg` | 124px | Slide 16 ("The Future If…") |
| `--type-display-md` | 92px | Slide 1 cover title |
| `--type-headline-lg` | 76px | Slide 23 close |
| `--type-headline-md` | 56px | Slide 13, 21 hero |
| `--type-headline-sm` | 44px | Slide 17 offer |
| `--type-body-lg` | 32px | Hero-slide body |
| `--type-body-md` | 24px | Card body |
| `--type-body-sm` | 18px | Captions, footer |
| `--type-eyebrow` | 16px (uppercase + tracked) | Top-left slide label |

**Adding a new font-size outside this ramp fails `validate-brand`.** If you genuinely need a new size, add it to `:root` first, document its role here, then consume it.

## Spacing & shape (locked)

| Token | Value | Role |
| --- | --- | --- |
| `--canvas-w` / `--canvas-h` | `1920px` / `1080px` | Reveal slide stage |
| `--gutter` | `80px` | Inner slide padding |
| `--radius-card` | `10px` | Card corners |
| `--radius-button` | `999px` | Pill buttons |

## Required brand assets

Live in `assets/brand/`. `/brand` walks the user through pasting these. Missing assets fail `validate-brand`.

| File | Spec | Role |
| --- | --- | --- |
| `mark.svg` | ≤ 8KB, square viewBox, `fill="currentColor"` on the recolour-able shape | Logo mark on light/accent backgrounds — recolours via parent `color` |
| `wordmark.svg` | ≤ 12KB, `fill="currentColor"` | Slide 1 bottom-right wordmark |
| `mark-on-dark.svg` | white or light variant of `mark.svg` | Logo on `--bg-dark` slides |
| `favicon.png` | 32×32 or 64×64 | Browser favicon |
| `og-image.png` | 1200×630 | Open Graph social card |

`assets/brand/*.svg` MUST use `fill="currentColor"` for any colour-able shape. **Never use CSS `filter: hue-rotate / brightness / saturate` to recolour brand assets.** That hack always means "this asset wasn't themified" — `/brand` runs an SVG rewriter to fix this automatically.

## Component-level neutrals (out of scope for rebrand)

These hex literals live in `index.html` outside `:root` and stay literal — they're component-internal greys / status colours that don't change per brand:

- Form input borders: `#D8D8D8` (default), `#C8C8C8` (radio outline)
- Form error: `#C0271F` (border), `#ff7a7a` (notes-lock error)
- Card hover surface: `#F0F5FF`
- CTA submit hover: `#1750D9`
- HUD chrome: `rgba(0,0,0,0.45)` (HUD bg), `rgba(255,255,255,0.X)` (HUD text)
- Repeating-conic placeholder pattern: `#FFFFFF` / `#E4E4E4`
- Subtle borders: `#F7F7F7`, `#E4E4E4`, `#EEE`, `#E1E1E1`

`validate-brand` has an allowlist for these. Anything else triggers a violation.

## Recurring marks

- **Sparkle** — 4-point star, the deck's visual signature. Lives at `assets/sparkle.svg`. Appears bottom-right of most slides.
- **Footer triplet** — `{Company Name}` (bottom-left) · `{Memorable Pitch Name}` (bottom-center) · sparkle (bottom-right). Present on slides 3-7, 10-15, 17-22.

## Where `--brand-hue-secondary` is consumed

Only two surfaces in v1.0:

1. **Reveal progress bar** (`.reveal .progress span`) — `linear-gradient(90deg, var(--accent), oklch(60% 0.18 var(--brand-hue-secondary)))`. Two-tone sweep follows slide progress. Collapses to a solid bar when `--brand-hue-secondary = var(--brand-hue)` (default).
2. **Slide 16 future-pacing left panel** (`.future-split .left`) — gradient between primary and secondary hue. White text on top; if a user's brand colours fail contrast here, `/brand` warns + reverts to solid `--bg-dark`.

Anything more is deferred to v1.1.
