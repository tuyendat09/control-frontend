# Handoff: Meals — log by day

**Scope: this one screen only.** The rest of the app is already built; reuse its existing tokens, tab bar, cards, macro chips and toast. Replace the current Nutrition → "Log" tab with this.

Open `Meals by Day.dc.html` in a browser (keep `support.js` next to it). Tweaks: theme light/dark, lang vi/en. Design reference only. Rebuild it in the existing codebase.

## What changed vs current Log tab
1. **Week strip** (new) under the title: pick any past day.
2. **Day summary card** (new): kcal vs target, status, P/C/F bars for the *selected* day.
3. **Meal sections** now read/write the selected day (not just "today").
4. **Empty day state** with "Copy from {previous day}".
5. **Inline calendar dropdown** (tap the week label) → jump to any past day.
6. "Back to today" pill in header when viewing another day.
7. Swipe horizontally on content = previous/next day.

## Layout (390 wide, scroll pane padding 62 top / 118 bottom)
- Header (24px side): "Bữa ăn / Meals" Instrument Serif 29px. Right: pill "Về hôm nay / Back to today" (only when sel ≠ today): r99, surf2, border line, el shadow, 12px/600, refresh icon 12px.
- **Week card**: margin 16/20, padding 12/10/10, r24, surf2 + border + el.
  - Row: chevron buttons 30×30 r10 (hover tint) · label "10 – 16 Thg 8" / "Aug 10 – 16" 13.5/600. Next chevron opacity .3 and inert on the current week.
  - 7-col grid, gap 3. Cell 64h r15: weekday 10.5px (opacity .72; today shows "Nay"/"Today"), date 15px tabular, then a 20×3 progress bar = day kcal ÷ target (capped 100%).
  - Selected: bg acc, text accTx, bar accTx on a translucent track. Bar turns protein-dot color when the day is >105% of target. Future days: opacity .32, not tappable. Hover: inset 1px lineHi.
- **Calendar dropdown** (inline, no dialog): tap the week label (calendar icon + chevron). The week card expands in place into a month grid, and the chevron rotates 180° (300ms overshoot). Tap again to collapse.
  - While open, the header chevrons switch months and the label shows "Tháng 8, 2026". The next chevron is disabled on the current month. The grid fades in from −6px (300ms). Opens on the month of the selected day.
  - Grid Mon-first, 7 cols, cell 44h r14: date 13.5 tabular + a 5px status dot: tx = on target, pDot = >105% target, none = not logged. Selected = acc fill (dot accTx). Today = inset 1px lineHi ring. Future = opacity .3, inert.
  - Legend row under a line2 divider.
  - Tap a day: select it and collapse back to the week strip, now showing that day's week.
  - Data: one `GROUP BY date` over the month range for the dots.
- **Summary card**: margin 12/20, padding 20/20/18, r24, surf2 + border + `shadow` token.
  - Overline (11px uppercase .11em tx3): "Hôm nay · T7, 15/08" or "T4, 12/08" / "Wed, Aug 12".
  - Value: Instrument Serif 34px tabular "1,420" + "/ 2,100 KCAL" (Sans 12px tx3).
  - Status chip (top-right, tint bg r9, 12/600): "Còn 680 kcal" / "Vượt 140 kcal" (color pTx when over) / "Chưa ghi".
  - Bar 6px (track line, fill acc). Then 3-col macros: 7px dot + label 11.5 tx2, "96/140g" 13/600, 4px bar in macro dot color.
- **Empty day** (no entries at all): dashed card (border lineHi, r24, padding 26/22, centered). Title serif 22 "Ngày này chưa ghi gì", body 13 tx2, primary button 46h r16 "Chép từ T3, 11/08" with copy icon. Copies every meal of the previous day (deep copy), then toast "Đã chép 2,050 kcal".
- **Meal sections** (Sáng / Trưa / Tối / Phụ): header row padding 22/4/10, label 11px uppercase tx3, total right 12px tx2 (or "Chưa ghi" tx3).
  - With items: card r24 surf2 + border + el. Row padding 14/16: name 14px + " · qty" tx3, macro chips below (existing P/C/F chip), kcal 13.5/600 right, remove × 28×28 r9 (hover tint). Last row "+ Thêm món" 13px tx2.
  - No items: dashed add box r24 padding 20.
- Footer note 11.5 tx3 with lock icon: "Each day is saved on your device. Swipe sideways to change day."

## Motion
- Change day: content block slides in from 14px (from the right if moving forward, from the left if moving back) + fades, 340ms `cubic-bezier(.2,.8,.2,1)`.
- Selected cell bg/color: 220ms ease. Day progress bars, kcal bar, macro bars animate width 500–600ms `cubic-bezier(.2,.85,.3,1)` when values change.
- Swipe threshold: |dx| > 60px horizontally (vertical scroll stays native).
- Toast: same as app (2.2s in/hold/out).
- Respect Reduce Motion.

## Data model (local-first, no backend)
SQLite (expo-sqlite) or MMKV. One row per logged item:
```
food_log(id TEXT PK, date TEXT 'YYYY-MM-DD', meal TEXT 'b|l|d|s',
         food_id TEXT, name TEXT, qty_label TEXT,
         kcal REAL, p REAL, c REAL, f REAL,      -- SNAPSHOT at log time
         created_at INTEGER)
INDEX (date)
```
- `date` = the user's **local** calendar day at the time of logging (not UTC). Rolling into a new day at midnight just shows an empty day. Nothing is deleted.
- Store macros as a snapshot so later edits to the food library never change history.
- Day totals = `SELECT SUM(kcal),SUM(p),SUM(c),SUM(f) FROM food_log WHERE date=?`. The week strip needs 7 totals: one `GROUP BY date` query over the week range.
- Targets (2100 / P140 / C230 / F62) come from the existing TDEE settings. For accurate history, store a `targets(date_from, kcal, p, c, f)` row whenever the user changes targets.
- "Copy from previous day" = insert copies of that date's rows with the new date + new ids.
- Logging from Home / Quick-add / Scanner always writes to **today**. Logging from this screen writes to the **selected** day.
- Backup: JSON export/import of `food_log` (free). Cloud sync later (e.g. Supabase free tier) can key on `id`.

## Sample data in prototype
Today Sat Aug 15 2026 = Breakfast 420 + Lunch 720 + Snack 280 = 1,420 (matches Home). Wed Aug 13 is empty, to show the empty state. Other past days are generated.
