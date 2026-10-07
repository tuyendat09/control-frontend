# Nutrition rules

## Daily target
- Computed from the user's profile: sex, age, height, weight, activity level, goal (lose / maintain / gain) → BMR (Mifflin-St Jeor) → TDEE → target kcal.
- Goal has a **rate** (e.g. −0.25 / −0.5 kg per week). Rate → daily deficit/surplus (≈7700 kcal per kg). Warn when the rate is aggressive or kcal falls below a safe floor.
- Always manually adjustable afterward.

## Per-meal calorie goal
- Users can set a kcal goal **for each meal** (breakfast / lunch / dinner / snack), in addition to the daily target.
- Meal goals are optional; when set, a meal's total is shown against its goal (e.g. on the meal section header) and over/under status uses the same ±5% rule as the day.
- Open: how meal goals relate to the daily target (must they sum to it? default split?), and where to edit them.

## Macros
- Split by **preset** (new users pick one; e.g. high-protein / balanced / low-carb — names and ratios still to define).
- Experienced users can edit grams directly. Editing never changes the stored kcal target silently — show the mismatch.

## Food data
- Store macros **per 1 g**, not per 100 g. Display per-100 g only as a derived label.
- A food has named **servings** that resolve to grams (1 tbsp oil = 14 g, 1 egg, 1 scoop). The user enters grams or serving × count; macros = per-gram × grams.

## Meals-by-day log (Nutrition → Log)
- Any past day can be viewed/edited (never future): week strip, month dropdown, swipe sideways. The selected day lives in `?date=YYYY-MM-DD`.
- Day summary = that day's kcal vs target + P/C/F bars; day dots: on target / over (>105%) / not logged.
- Empty day offers "Copy from previous day" (deep copy of all its meals).
- Logging from Home, quick-add and the scanner always writes to **today**; "Add food" on a meal here logs to the **selected day + that meal**.

## Logging flow
1. User opens "log a meal" → picks the **meal** (breakfast/lunch/dinner/snack). Suggest one by current time; never force it.
2. Picks foods and quantity for that meal (same flow from library, scan, quick-add).
3. Entries can be edited (quantity, meal) or deleted; delete is **undoable** for a few seconds.
- Quick-add combos add several foods at once into the chosen meal.

## Barcode
- Real camera scan (EAN/UPC) → look up Open Food Facts → cache the result in our DB.
- Not found → manual form (name + macros); the new food keeps the barcode and enters the moderation queue (`library-moderation.md`).
- QR scanning is out of scope for now.
