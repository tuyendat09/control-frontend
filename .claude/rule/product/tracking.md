# Tracking rules (units, time, weight, insights)

## Units
- Canonical storage: kg, g, kcal. lb is display/input only (user setting in Profile).
- Convert at the edge; never round-trip converted values back into storage. Format kg/lb to 1 decimal.

## Time
- A day = device-local calendar day, boundary at 00:00. Store each record with its local date (`YYYY-MM-DD`) so travel/time-zone changes don't shift it.
- Week starts Monday by default; user can switch (Sunday/Saturday). Used by weekly volume, calendars, 7-day charts.

## Weight
- Multiple entries per day allowed; the day's value is its last entry.
- Trend line uses a 7-day moving average to smooth water fluctuation.
- Valid range 30–200 kg (equivalent in lb), one decimal. Optional reminder.

## Insights
- Streak = consecutive days with at least one logged food entry. Rest days from training don't break it.
- Calories chart = last 7 days of logged kcal vs target.
- TDEE shown comes from the profile calculation (`nutrition.md`), not a hard-coded number.
- Weekly volume and PRs: definitions in `training.md`.
