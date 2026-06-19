---
description: Ship the deck to Cloudflare Pages. Runs wrangler login, project create, secret put, build, and deploy. Prints the live .pages.dev URL.
---

You are the **/deploy** skill. Get the user from "working locally" → "deck live on a public URL" in under 5 minutes.

## Step 0 — Pre-flight

Run, in this order:
1. `node scripts/validate-brand.mjs --strict`
2. `node scripts/validate-deck.mjs --strict`

If either fails, fix or punt back to the user. Don't deploy a deck that fails validation.

Read `deck.config.json` for `cloudflare.project_name` (defaults to `perfect-pitch-deck`).

Check `.env` for `DECK_PASSWORD`. If it's missing or empty, stop and ask the user to confirm: do they want this deck password-protected (set `DECK_PASSWORD` in `.env`) or are they intentionally shipping it public (`ALLOW_PUBLIC_DECK=true`)? `scripts/build.mjs` enforces this — the build fails by default with no password set, so don't try to work around it silently.

Same check for speaker notes: if `INCLUDE_NOTES` isn't `false`, `.env` must also have `NOTES_PASSWORD` set — otherwise anyone who unlocks the deck (e.g. the prospect) can read the presenter's internal strategy notes. `scripts/build.mjs` enforces this too (fails unless `NOTES_PASSWORD` is set, `INCLUDE_NOTES=false`, or `ALLOW_PUBLIC_NOTES=true`). Don't bypass it — surface the missing password to the user instead.

## Step 1 — Wrangler login

Run `npx wrangler whoami` to check if the user is logged in. If not:
- Tell the user: `! wrangler login` (with the `!` prefix so it runs in their terminal — the OAuth flow needs a browser).
- Wait for them to confirm completion.

## Step 2 — Project create (one-time)

Run `npx wrangler pages project list | grep -w "$CF_PROJECT"` to check if the project already exists.

If not, run:
```
npx wrangler pages project create "$CF_PROJECT" --production-branch=main
```

The first deploy creates the project; subsequent deploys reuse it.

## Step 3 — Secrets (only if GHL is enabled)

Read `deck.config.json` `ghl.enabled`. If true:

1. Read the user's `.env` file for `GHL_API_KEY`, `GHL_LOCATION_ID`, `ALLOWED_ORIGINS`.
2. For each, run:
   ```
   echo "$VALUE" | npx wrangler pages secret put SECRET_NAME --project-name "$CF_PROJECT"
   ```
   (Wrangler reads stdin so the value is never logged. Don't pass it as a flag.)

If GHL isn't enabled (static CTA mode), skip this step entirely.

## Step 4 — Build

Run `npm run build`. This goes through `scripts/build.mjs`:
- validate-brand (strict)
- validate-deck (strict)
- INCLUDE_NOTES handling
- NOTES_PASSWORD encryption (if set)
- staticrypt wrap (if DECK_PASSWORD set)
- Copy assets/ and functions/ to dist/

Confirm `dist/index.html` exists before proceeding.

## Step 5 — Deploy

Run:
```
npx wrangler pages deploy dist --project-name "$CF_PROJECT" --commit-dirty=true --branch=main
```

Wrangler prints the deploy URL — typically `https://<hash>.<project>.pages.dev` for the latest deploy, and `https://<project>.pages.dev` as the production alias.

## Step 6 — Confirm live

Curl the production URL: `curl -sI https://${CF_PROJECT}.pages.dev/ | head -3`. Confirm `200` (or `200` after staticrypt unlock page if gated mode).

Print the URL with copy-paste friendly formatting:

> ✓ Deck live at: **https://<project>.pages.dev**
>
> Share that URL in your deal email. To update content, edit `brief.yaml` → `/fill-deck` → `/deploy` again.

## What you do NOT do

- Do NOT push to git or create commits. Deployment is decoupled from git here — wrangler deploys whatever's in `dist/`.
- Do NOT modify `deck.config.json` or `.env` from this skill. Those are `/brand` and `/ghl-setup`.
- Do NOT skip validators. If they fail, surface the failures and let the user fix them or override with `--no-validate` (which we don't support yet — they have to fix the underlying issue).
- Do NOT change DNS or custom domains in this skill. That's a manual Cloudflare dashboard step the user does separately.
