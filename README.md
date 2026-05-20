# Perfect Pitch Deck Kit

Author and ship a 23-slide pitch deck with sales psychology baked in — branded to your business, content tailored from a single brief, deployed to a live Cloudflare Pages URL — in under 60 minutes, without writing a single line of code.

Built for [Claude Code](https://claude.com/claude-code).

**Live demo:** the deck this repo ships with. Run `npm run dev` to see it locally.

---

## What's in the box

- **23 strategically sequenced slides** built on Hormozi-style offer framing + sales psychology. Cover → icebreaker → problem → agitate → promise → outcomes → mechanism → objections → proof → testimonials → differentiator → team → future → offer → inclusions → pricing → bonus → guarantee → urgency → close.
- **One-knob rebranding.** Paste your accent hex; the whole deck reskins via OKLCH-derived tints. `/brand` walks you through it.
- **Brief-driven copy.** Write `brief.yaml` once (or talk to `/brief` in plain English); `/fill-deck` authors every slide from it with hard char limits that protect the layout.
- **Speaker notes that present themselves.** Every slide has a Beat / Say / Watch out script tailored to your offer. Press `S` in the deck to open speaker view.
- **Live CTA form OR static close.** Slide 23 captures choices to GoHighLevel via a Cloudflare Pages Function, or — if you set `cta.url` in the brief — renders as a static "Book a call" button instead. No GHL? No problem.
- **Optional passphrase gate.** `staticrypt` wraps the whole deck behind a passphrase. Independent passphrase available for speaker notes too.

---

## Zero to live in an hour

Prerequisites: Node 20+, [Claude Code](https://claude.com/claude-code), [GitHub CLI](https://cli.github.com/), and [Wrangler](https://developers.cloudflare.com/workers/wrangler/) (`brew install gh && npm install -g wrangler`).

```bash
# 1. Fork + clone (30s)
gh auth login
gh repo fork stvbutlr/perfect-pitch-deck --clone && cd perfect-pitch-deck
npm install
npm run dev        # http://localhost:8765 — the demo deck

# 2. Inside Claude Code (in your terminal: `claude`)
> /brand           # paste your hex / screenshot / Figma share / "make it Stripe blue"
> /brief           # paste a paragraph about your offer (Claude classifies into brief.yaml)
> /fill-deck       # writes copy for all 23 slides + per-slide speaker notes
> /check           # validates brand tokens + slot budgets

# 3. Optional — wire up the slide-23 form to GoHighLevel
> /ghl-setup       # walks API token + Location ID + .env + smoke-test

# 4. Ship it
> /deploy          # wrangler login, create project, secret put, build, deploy
                   # prints https://<your-project>.pages.dev
```

That's it. Your deck is live.

---

## The slash commands

All commands live in `.claude/commands/`. Each is a long-form spec Claude follows verbatim.

| Command | What it does |
| --- | --- |
| `/brand` | Rebrand the deck from any input — hex, screenshot, Figma URL, plain-English description, pasted SVGs. Themifies brand SVGs to `currentColor`, runs contrast checks on `--text-inverse` over your accent, validates. |
| `/brief` | Build `brief.yaml` from any input — paragraph dump, screenshots, Notion paste, partial YAML, voice-memo transcript. Echoes a readable summary for verification. |
| `/fill-deck` | Author copy for all 23 slides from `brief.yaml`. Resumable via `_qa/fill-deck-report.md`. Per-slide hard char limits enforced. |
| `/fill-slide N — <hint>` | Re-author one slide. Shows before/after diff, waits for confirmation. |
| `/ghl-setup` | Wire slide 23's form to your GoHighLevel account. Optional — skip for static CTA mode. |
| `/deploy` | Ship to Cloudflare Pages. First run creates the project; subsequent runs update it. |
| `/check` | Run `validate-brand` + `validate-deck` + `ghl-ping`. Combined report with remediation hints. |

---

## How to brief Claude (the ideal one-shot)

If you want `/fill-deck` to nail the deck in a single pass, tell `/brief` (in any order, in any format):

1. Your **company name** + a short memorable **pitch name** (e.g. "The 30-Day Sprint")
2. Who you're pitching to — their first name helps
3. Your **offer**: name, dream outcome, timeframe, price
4. The **biggest problem** your customer has right now, in their words
5. Your **unique mechanism** — the "because" that makes the promise believable
6. Your **guarantee** or risk-reversal
7. **1-3 customer testimonials** with quote, name, and a metric
8. Up to **12 customer logos** you've worked with
9. Where you want them to click next (URL + button label)
10. (Optional) Bonuses, urgency/scarcity, pricing tiers, team

The kit also works with rougher input — paste in everything you have and `/brief` will pull what it can, then ask follow-ups. See `brief.example.yaml` and `brief.yaml.template`.

---

## Customising the deck

| What you want to change | Where it lives | How to edit |
| --- | --- | --- |
| Brand accent colour | `:root --accent` in `index.html` | `/brand` |
| Logo mark / wordmark | `assets/brand/{mark,wordmark}.svg` | `/brand` (themifies SVGs to `currentColor`) |
| Fonts | `--font-display` / `--font-body` in `:root` + Google Fonts `<link>` | `/brand` |
| Per-slide copy | The Nth `<section>` under `<div class="slides">` in `index.html` + `notes/slide-NN.html` | `/fill-deck` or `/fill-slide N` |
| Strategic intent for a slide | `notes/slide-NN.html` (full strategy reference) | hand-edit, then `node scripts/inject-notes.mjs` |
| Slot char budgets | `slides/schema.json` | hand-edit OR `node scripts/calibrate-slots.mjs` to remeasure |
| GHL integration | `functions/api/lead.js` + `.env` | `/ghl-setup` |
| Slide order | `slides/manifest.json` + reorder `<section>` blocks in `index.html` | `node scripts/reorder-sections.mjs` |
| Add a new slide | `skills/slide-24-<slug>/SKILL.md` + `slides/{manifest,schema}.json` + new `<section>` | hand-craft, then `node scripts/build-skills.mjs` |

The CLAUDE.md file at the repo root tells Claude exactly what's safe to touch and what's locked. Read it.

---

## Anatomy

```
perfect-pitch-deck/
├─ index.html                  # the deck (single-file Reveal.js, all 23 sections)
├─ brief.yaml                  # your offer — written by /brief, consumed by /fill-deck
├─ brief.example.yaml          # the demo brief (kit pitching itself)
├─ brief.yaml.template         # blank template with field-by-field comments
├─ deck.config.json            # site name, allowed origins, CF project name
├─ BRAND.md                    # token catalogue + allowed contrast pairs
├─ CLAUDE.md                   # guardrails (Golden Rules + Copy Balance + file-touch matrix)
├─ .env.example                # GHL keys + deck/notes passphrases + CF project
│
├─ .claude/commands/           # 7 slash commands
├─ skills/
│   ├─ fill-deck/SKILL.md      # orchestration (1→23)
│   ├─ fill-slide/SKILL.md     # single-slide retry
│   └─ slide-NN-<slug>/SKILL.md  # per-slide authoring guide (× 23)
├─ notes/slide-NN.html         # full strategic reference per slide (× 23)
├─ slides/
│   ├─ manifest.json           # slide index → slug → archetype
│   └─ schema.json             # per-slot specs (selector, maxChars, hardLimit, fragility)
├─ assets/
│   ├─ brand/                  # mark.svg, wordmark.svg, og-image.png, favicon.png
│   └─ speaker-view.html       # self-hosted Reveal speaker view (survives refresh)
├─ functions/api/lead.js       # Cloudflare Pages Function — GHL upsert + tag + note
├─ scripts/
│   ├─ build.mjs               # validate + (notes / staticrypt) + dist assembly
│   ├─ build-skills.mjs        # regenerate skills/ from schema + notes + manifest
│   ├─ inject-notes.mjs        # splice notes/*.html into index.html aside blocks
│   ├─ validate-brand.mjs      # token-leak + asset-manifest check
│   ├─ validate-deck.mjs       # slot-completeness + char-budget check
│   ├─ calibrate-slots.mjs     # binary-search per-slot maxChars (DOM-accurate)
│   ├─ ghl-ping.mjs            # smoke-test GHL credentials
│   ├─ qa-screenshots.mjs      # puppeteer thumbnails of every slide
│   └─ reorder-sections.mjs    # shuffle <section> blocks if you re-order slides
└─ staticrypt-template.html    # passphrase gate page (used when DECK_PASSWORD set)
```

---

## Build & deploy modes

The build pipeline is `node scripts/build.mjs`. Behavior is env-driven:

| Env var | Effect |
| --- | --- |
| `DECK_PASSWORD=<pp>` | Wrap published `dist/index.html` in staticrypt with passphrase `pp`. Viewers see a passphrase prompt. |
| `DECK_REMEMBER_DAYS=N` | Days staticrypt remembers the unlock in localStorage (default 30; `0` = always re-prompt). |
| `NOTES_PASSWORD=<pp>` | AES-encrypt speaker notes. Pressing `S` then prompts for the notes passphrase. Independent of `DECK_PASSWORD`. |
| `INCLUDE_NOTES=false` | Strip speaker notes from `dist/` entirely (use for public marketing decks). |
| `CF_PROJECT=<name>` | Cloudflare Pages project name for `npm run deploy`. |

Examples:

```bash
# Public deck, notes stripped, no gate
INCLUDE_NOTES=false npm run ship

# Public deck, notes encrypted, no deck gate
NOTES_PASSWORD='presenter-only' npm run ship

# Gated deck + encrypted notes (different passphrases)
DECK_PASSWORD='deck-pass' NOTES_PASSWORD='notes-pass' npm run ship
```

---

## Keyboard shortcuts (in the deck)

- `→` / `←` — navigate
- `Esc` — overview
- `F` — fullscreen
- `S` — speaker notes (prompts for passphrase if `NOTES_PASSWORD` was set)

---

## Speaker notes

Each slide has presenter notes in `notes/slide-NN.html`. Press `S` while presenting to open the speaker window — current slide, next slide, notes, and a timer. The window has a real URL (`/assets/speaker-view.html`) so refreshing it works.

When `NOTES_PASSWORD` is set, the speaker-notes button in the HUD shows a 🔒 icon. Click or press `S` → enter the passphrase → notes decrypt in the browser, speaker view opens. The unlock is cached in localStorage for 30 days; clear via DevTools `localStorage.removeItem('ppd-notes-unlock')` to test the locked flow.

---

## License

MIT. Fork freely. Built by [Steve Butler](https://github.com/stvbutlr) with [Claude Code](https://claude.com/claude-code).
