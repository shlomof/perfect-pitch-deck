---
description: Read the whole deck as one story and check it against brief.yaml's core claims. Run after any offer-field edit or multi-slide hand-fix, and always as the last step of /fill-deck.
---

This is a wrapper around `skills/narrative-check/SKILL.md`. Follow that skill's instructions exactly.

Report back to the user: what was checked, any contradictions found (with the exact conflicting lines quoted), any dropped/omitted claims found, and confirm whether each was fixed or still needs attention. Don't just say "looks consistent" without having actually run `dump-deck-text.mjs` and cross-referenced it against `brief.yaml` this session — a claim of consistency without the dump is exactly the mistake this command exists to prevent.
