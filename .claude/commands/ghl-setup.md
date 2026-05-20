---
description: Walk the user through GoHighLevel API setup so slide 23's form captures leads. Optional — skip if you're using static CTA mode (brief.cta.url set).
---

You are the **/ghl-setup** skill. Get the user from "no GHL" → "form captures to my GHL account" without leaving Claude Code.

## Step 0 — Check if GHL is needed

If `brief.yaml` has `cta.url` set, the deck will ship in **static mode** — no form, just a button. GHL isn't needed. Ask the user:

> Your brief has `cta.url` set — slide 23 will render in static mode (visitors get a thank-you + button to your URL, no form). Want to switch to the live form anyway? (yes/no)

If they say no, exit and tell them to skip this step.

## Step 1 — Read or create .env

If `.env` doesn't exist, copy `.env.example` to `.env`.

If `.env` already has `GHL_API_KEY` and `GHL_LOCATION_ID` set, run `node scripts/ghl-ping.mjs` to verify they work. If it returns OK, tell the user GHL is already wired and exit. If it returns an error, walk them through re-setup.

## Step 2 — Get the API token

Tell the user to:

1. Log into [GoHighLevel](https://app.gohighlevel.com).
2. Go to **Settings → Integrations → Private Integrations**.
3. Click **Create Token**. Give it the scope `contacts.write` (read also works for `/ghl-ping` validation, but `write` is the minimum to capture leads).
4. Copy the token.

Then ask: "Paste the token here, or type 'browser' if you'd like me to print the URL again."

When they paste the token, write it to `.env`:
```
GHL_API_KEY=<the token>
```

## Step 3 — Get the Location ID

Tell the user to:

1. In GoHighLevel, click the **account dropdown** at the top-right.
2. The Location ID is the URL fragment after `/location/` — looks like `kVqQX5JzZ2g0YQwBy3FT`.
3. Copy it.

Ask: "Paste the Location ID."

Write to `.env`:
```
GHL_LOCATION_ID=<the id>
```

## Step 4 — Ping

Run `node scripts/ghl-ping.mjs`. If it returns OK, tell the user:

> ✓ GHL is wired. Slide 23 will post submissions to your account at `services.leadconnectorhq.com/contacts/upsert`. The contact gets tagged with one of `pitch_in`, `pitch_question`, `pitch_out` plus `perfect_pitch_deck`, plus a contact-note with their choice + any free-text message.

If it returns an error, the most common causes:
- Token scope is wrong (needs `contacts.write` and ideally `contacts.readonly` for /ghl-ping)
- Location ID is wrong
- Token was copied with leading/trailing whitespace

Walk through fixing whichever it is and re-ping.

## Step 5 — Update deck.config.json

Set `ghl.enabled: true` in `deck.config.json` so the build pipeline knows to expect the env vars.

## Step 6 — Remind about deploy

The `.env` values are local. For Cloudflare Pages deploys, run `/deploy` — it'll prompt for the same values and run `wrangler pages secret put GHL_API_KEY` + `... GHL_LOCATION_ID`.

## What you do NOT do

- Do NOT write API keys or location IDs into anything other than `.env`. They never go in `index.html`, `deck.config.json`, or commits.
- Do NOT show or log the actual token / location ID values after writing them.
- Do NOT touch `functions/api/lead.js` — its credential reading is already correct.
