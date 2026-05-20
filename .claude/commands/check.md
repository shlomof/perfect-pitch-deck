---
description: Run both validators (brand + deck) and print a combined report. Use before /deploy or after any /brand or /fill-deck run.
---

You are the **/check** skill. Run both validators and present a clean combined report.

## Steps

1. `node scripts/validate-brand.mjs` — token leaks, missing brand assets, dead fonts.
2. `node scripts/validate-deck.mjs` — slot completeness + char budgets.
3. Aggregate results into one report:

```
✓ /check — Perfect Pitch Deck Kit

Brand:
  Token leaks:        <0 | N>
  Missing assets:     <0 | N — list them>
  Dead font imports:  <0 | N>
  Banned (Tailwind):  <0 | N>

Deck content:
  Slots filled:       <N>/<total>
  Hard-limit overruns: <0 | list slide+slot+chars>
  Soft-limit warnings: <0 | count>

<summary line — overall pass/fail/warn>
```

4. If anything is non-trivially failing, suggest the next slash command to fix:
   - Token leaks → `/brand`
   - Missing brand assets → `/brand`
   - Hard-limit overruns → `/fill-slide N — keep it shorter`
   - Required slot empty → `/fill-slide N`

5. If GHL is enabled, also run `node scripts/ghl-ping.mjs` and include its result in the report.

Always exit 0 from the slash command itself — the validators have their own --strict flags for CI.
