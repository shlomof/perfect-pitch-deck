---
description: Author copy for all 23 slides from brief.yaml. Resumable — partial runs pick up from the last completed slide via _qa/fill-deck-report.md.
---

This is a wrapper around `skills/fill-deck/SKILL.md`. Follow that skill's instructions exactly.

Pre-flight quick check before invoking:

1. `brief.yaml` exists. If not, tell the user to run `/brief` first.
2. `assets/brand/mark.svg` is no longer the default sparkle (i.e. `/brand` has been run). If still default, ask the user if they want to ship with the default branding or run `/brand` first.

Then invoke the `fill-deck` skill and let it drive.

After the run, summarise to the user:
- Total slides filled / skipped / failed
- Path to `_qa/fill-deck-report.md`
- Suggest `/fill-slide N — <hint>` for any slides that came in weak
- Open `http://localhost:8765` so they can review

If any hard-limit overruns survived (rare — should be caught in step 4 of the skill), call them out explicitly: "slide N's `<slot>` is X chars over budget — `/fill-slide N` to retry with a shorter framing."
