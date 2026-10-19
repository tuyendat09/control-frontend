# Product — Control

Calorie/macro, training and body-weight tracker for lifters. A real multi-user product and a portfolio piece: complete, production-quality, clean code.

## Decisions (confirmed)
- **Accounts:** real accounts, many users. Sign-in/up is mock UI only so far (`(auth)/`, no backend).
- **Dates:** real current date, device-local, midnight boundary. `appToday()` in `src/lib/date.ts` returns it; days are `YYYY-MM-DD` keys everywhere (training, weight, meals). Not yet reactive across midnight.
- **Languages:** VI (default) + EN, inline `t('vi','en')`.
- **Units:** kg/g/kcal and lb. Store metric; convert only at the UI edge (display + input).
- **Per-meal calorie goal:** users can set a calorie goal for each meal (breakfast/lunch/dinner/snack), on top of the daily target. UI not designed yet — see `nutrition.md`.
- **Meal presets:** the base unit is a per-meal preset (name, foods, per-ingredient grams + free-text note, e.g. "14g oil (note: 1 spoon)"). User composes ahead and logs item by item as they eat. A day plan (ordered meal presets per breakfast/lunch/dinner/snack, by reference) comes later.
- **Preset sharing via QR:** replaces the old "QR combo sharing: dropped". User B shows a QR, user A scans it and gets a **copy** of the preset (A's edits and B's later edits never affect each other). Meal preset can carry its data in the QR (no backend); day plans need a short link (needs backend/accounts). Keep the QR tab in the scanner.
- **Mascot + streak:** planned — a pet (reacts to route/state) and an exercise-guide mascot. See `mascot.md`. Streak rules (what counts as a logged day, freeze) not decided yet — needs the real device date first.

## Domain docs (read the one you're changing)
- Food, targets, macros, logging, barcode → `.claude/rule/product/nutrition.md`
- Exercises, sets, sessions, rest timer, volume/PR → `.claude/rule/product/training.md`
- Library moderation (user-created foods/exercises, admin, AI matching) → `.claude/rule/product/library-moderation.md`
- Units, dates, weight, streak, insights → `.claude/rule/product/tracking.md`
- Mascots (pet, exercise guide, SVG contract, activities) → `.claude/rule/product/mascot.md`

## Screens (WHAT)
Home · Nutrition (Log / Library) · Training (calendar → day sheet → exercise progress) · Insight · Profile · overlays: "+" quick-log, weight sheet, barcode scanner.

## Rules for changes
- Anything the user types or sees as a weight is unit-aware (kg/lb) from day one.
- Behavior not listed in the domain docs came from the prototype and is unconfirmed — ask before depending on it.
- Update the domain doc when a decision is made. Unanswered questions live in `.claude/docs/ask-later.md`.
