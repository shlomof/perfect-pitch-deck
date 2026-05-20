---
description: Re-author a single slide against brief.yaml. Use after /fill-deck when one slide came out weak. Accepts a free-text hint to steer the regeneration.
---

This is a wrapper around `skills/fill-slide/SKILL.md`. Follow that skill's instructions exactly.

Usage:
- `/fill-slide 5`
- `/fill-slide 5 — make the promise punchier and add the timeframe`
- `/fill-slide 11 — use the Maya testimonial for card 1, swap to dollar-amount metric`
- `/fill-slide 17 — the offer needs to feel more like a no-brainer`

Always show the user a before/after diff for each slot you regenerate, with char counts, and wait for confirmation before patching `index.html`.
