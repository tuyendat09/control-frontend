# Product — Control

Calorie/macro, training and body-weight tracker for lifters. A real multi-user product and a portfolio piece: complete, production-quality, clean code.

## Decisions (confirmed)
- **Accounts:** real accounts, many users. Sign-in/up is mock UI only so far (`(auth)/`, no backend).
- **Dates:** real current date, device-local, midnight boundary. The fixed sample date in `src/lib/date.ts` is temporary — don't build on it.
- **Languages:** VI (default) + EN, inline `t('vi','en')`.
- **Units:** kg/g/kcal and lb. Store metric; convert only at the UI edge (display + input).
- **Per-meal calorie goal:** users can set a calorie goal for each meal (breakfast/lunch/dinner/snack), on top of the daily target. UI not designed yet — see `nutrition.md`.
- **QR combo sharing:** dropped for now (maybe later). Remove/hide the QR tab when touching the scanner.

## Domain docs (read the one you're changing)
- Food, targets, macros, logging, barcode → `.claude/rule/product/nutrition.md`
- Exercises, sets, sessions, rest timer, volume/PR → `.claude/rule/product/training.md`
- Library moderation (user-created foods/exercises, admin, AI matching) → `.claude/rule/product/library-moderation.md`
- Units, dates, weight, streak, insights → `.claude/rule/product/tracking.md`

## Screens (WHAT)
Home · Nutrition (Log / Library) · Training (calendar → day sheet → exercise progress) · Insight · Profile · overlays: "+" quick-log, weight sheet, barcode scanner.

## Rules for changes
- Anything the user types or sees as a weight is unit-aware (kg/lb) from day one.
- Behavior not listed in the domain docs came from the prototype and is unconfirmed — ask before depending on it.
- Update the domain doc when a decision is made. Unanswered questions live in `.claude/docs/ask-later.md`.
