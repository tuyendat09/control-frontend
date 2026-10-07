---
name: Control
description: Mobile-first calorie, macro, training and body-weight tracker. Warm paper canvas, matte ink, serif numerals.
colors:
  canvas: { light: "#E7E4DE", dark: "#070908" }
  surface: { light: "#F4F1EC", dark: "#101413" }
  surface-raised: { light: "#FFFFFF", dark: "#19201D" }
  tint: { light: "#E7EAE7", dark: "#242A27" }
  ink: { light: "#16231E", dark: "#EFEEE9" }
  ink-2: { light: "#67655F", dark: "#9B9993" }
  ink-3: { light: "#A09C94", dark: "#66645E" }
  accent: { light: "#16231E", dark: "#DDE4DF" }
  on-accent: { light: "#F4F1EC", dark: "#16231E" }
  line: { light: "rgba(26,25,23,.055)", dark: "rgba(255,255,255,.055)" }
  line-soft: { light: "rgba(26,25,23,.045)", dark: "rgba(255,255,255,.04)" }
  line-hi: { light: "rgba(26,25,23,.16)", dark: "rgba(255,255,255,.18)" }
  protein: { chip: "#F4E7E1", text: "#8A4530", dot: "#A9573F", dark-chip: "#2A1E19", dark-text: "#D2937A", dark-dot: "#B96A4E" }
  carbs: { chip: "#F3EDDD", text: "#7C6126", dot: "#9A7A33", dark-chip: "#282418", dark-text: "#C4A96A", dark-dot: "#AC8B41" }
  fat: { chip: "#E5EBEF", text: "#3B5A6B", dot: "#4C7286", dark-chip: "#1B2429", dark-text: "#93AEBE", dark-dot: "#5E839A" }
  camera: { base: "#0A0C0B", text: "#F4F1EC", lock: "#9FD3BC" }
typography:
  display: { family: "Instrument Serif", weight: 400, tracking: "-0.01 to -0.022em" }
  ui: { family: "Instrument Sans", weights: [400, 500, 600, 700] }
rounded: { xs: 7, sm: 9, md: 14, lg: 16, xl: 20, card: 24, sheet: 32, frame: 46, pill: 9999 }
spacing: { gutter: 20, header: 24, card-y: 15, hero: 26, section: 26, pane-top: 62, pane-bottom: 118 }
---

## Overview

Control is a phone-first app for lifters: log meals, log sets, watch the trend. The look is **warm paper and matte ink** — a tinted cream surface (`{colors.surface}`), white cards (`{colors.surface-raised}`), and a single deep green-black ink (`{colors.ink}` = `{colors.accent}`) that does every job: text, primary button, progress ring, active tab. There is no brand hue; color is reserved for *data* (protein / carbs / fat).

Numbers are the hero. Big values (calories, weight, rest timer) are set in **Instrument Serif**; everything else is **Instrument Sans**. The mix reads like a printed training journal rather than a fitness dashboard.

Two themes (light / dark) and two languages (VI default, EN) ship together. Dark is not an inversion: it adds a mint glow at the top, an amber glow bottom-left, and 5 % film grain.

**Key characteristics**
- One ink for everything interactive; no secondary brand color.
- Card = 1px ink-alpha border + soft shadow. Borders are never gray (`{colors.line}`).
- Macro colors (earth / amber / slate) appear only on chips, bars and legends.
- Serif numerals, uppercase tracked labels, generous radii (24 on cards, 32 on sheets).
- Spring motion on taps and tab icons; slow expo glides for shared elements.
- The scanner camera layer is always dark, regardless of theme.

## Colors

### Surfaces
- **Canvas** (`{colors.canvas}`): page behind the phone frame on desktop only.
- **Surface** (`{colors.surface}`): screen background and sheets.
- **Surface raised** (`{colors.surface-raised}`): cards, inputs, tab bar.
- **Tint** (`{colors.tint}`): icon wells, segmented track, hover row, "active" set row.
- **Dark theme** keeps the same roles with greener-black values; raised surfaces get an inset 1px rim light (`rgba(255,255,255,.045)`) — required, it is what separates cards from the floor.

### Text
- **Ink** (`{colors.ink}`): headings, values, primary labels.
- **Ink 2** (`{colors.ink-2}`): secondary copy, inactive tab, row sublabels.
- **Ink 3** (`{colors.ink-3}`): section labels, placeholders, captions, pending set rows.
- **On accent** (`{colors.on-accent}`): text/icons on `{colors.accent}` fills.

### Lines
- **Line** (`{colors.line}`): card borders, input borders.
- **Line soft** (`{colors.line-soft}`): dividers *inside* a card.
- **Line hi** (`{colors.line-hi}`): the only hover/focus border change.

### Macros
Protein = terracotta, Carbs = amber, Fat = slate. Each has `chip` (background), `text`, and `dot` (bars, legend squares); dark theme has its own trio. Weight delta reuses them: gain = protein text, loss = fat text.

### Camera
`{colors.camera}` is theme-independent: near-black base, cream text, mint (`lock`) for scan line and locked corners.

## Typography

| Role | Face | Size / weight | Notes |
|---|---|---|---|
| Wordmark | Serif | 48 → 18 (auth shared element) | tracking −.022em |
| Screen title | Serif | 29 | tracking −.01em |
| Auth heading | Serif | 31 / 1.1 | |
| Big value | Serif | 26 (tile), 32–36 (hero, scan), 34 (weight card), 52 (weight sheet) | line-height 1–1.15 |
| Sheet title | Serif | 23 | |
| Item title | Sans | 14 / 500 · 15 / 600 (exercise, session) | |
| Button | Sans | 15 / 600 (14–14.5 for in-card buttons) | |
| Body / secondary | Sans | 12–13.5 / 400 | |
| Section label | Sans | 10.5–11, UPPERCASE, tracking .09–.11em, `{colors.ink-3}` | |
| Tab label | Sans | 10 | active 600 |

Rules: numbers in tables, timers and set rows use `tabular-nums` so nothing shifts. Never bold the serif. Prefer a larger serif over a heavier sans for emphasis.

## Layout

- **Frame**: 390 × 844 (radius 46) when the viewport is ≥ 480px wide; otherwise the app fills the viewport. `cqw` units inside the frame keep the welcome layout centered at any width.
- **Screen pane**: scrolls inside the frame; top padding 62 (status bar), bottom 118 (floating tab bar).
- **Gutters**: 24 for headers and section labels, 20 for cards, 16 for the tab bar.
- **Rhythm**: 26 between sections, 10–12 between stacked cards, 14–18 row padding, 22–26 inside hero cards.
- **Stacking**: tab bar z-8 · day sheet z-12 · exercise progress z-14 · quick-log z-22 · weight sheet z-24 · scanner z-26 · toast z-20.
- **Sub-pages are overlays** on top of their parent tab (day sheet over the calendar, progress over the day sheet) so the parent keeps its scroll position.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Card | border `{colors.line}` + `el` shadow | every card and list |
| Hero | border + `shadow` (slightly larger) | calorie card, rest timer |
| Glow | `0 4px 14px -6px accGlow` | primary buttons, "+" FAB, scan button |
| Tab bar | `0 1px 2px …, 0 10px 30px -12px …` | floating pill |
| Sheet | top radius 32, scrim `rgba(20,19,17,.42)` + 3px blur | quick-log, weight |
| Toast | `0 8px 24px -8px rgba(0,0,0,.4)` | bottom-centered message |

Depth is border + soft shadow; there are no heavy drop shadows.

## Shapes

| Token | px | Use |
|---|---|---|
| `{rounded.xs}` | 7 | macro chips |
| `{rounded.sm}` | 9 | add-food button, small icon buttons |
| `{rounded.md}` | 14 | icon wells, back button, search field, segmented track |
| `{rounded.lg}` | 16 | buttons, inputs, quick-add chips |
| `{rounded.xl}` | 20 | action rows, compact lists |
| `{rounded.card}` | 24 | cards, tiles |
| `{rounded.sheet}` | 32 | sheet top, tab bar |
| `{rounded.frame}` | 46 | phone frame |
| `{rounded.pill}` | full | profile pill, filter chips, "Log" pill, bars |

## Components

All live in `src/ui/shared/components`; page-specific ones live in each page's `components/`.

### Actions
- **Button** — height 54 (46–52 in cards), radius 16, 15 / 600. `primary` = `{colors.accent}` fill (+ optional glow); `outline` = 1px `{colors.line}`, hover tint. Pressed: scale .98.
- **StepButton** — 40 (radius 14) or 52 (radius 18) tint square for − / +; pressed scale .9.
- **BackButton** — 34 × 34, radius 14, tint.
- **Quick-add chip / filter chip** — chip: raised surface, radius 16; filter: pill, active = accent fill.

### Containers
- **Card / CardList** — radius 24, raised surface, border + shadow; list rows split by `{colors.line-soft}` hairlines.
- **Sheet** — scrim + panel (surface, top radius 32, grabber 38 × 4). Mounted only while open.
- **Dashed card** — `1px dashed {colors.line}` for empty slots ("Add food", empty day, library note).
- **Stat tile** — tint, radius 14, 10px uppercase label over a serif 21 value.

### Inputs & selection
- **Input** — label above (11.5 uppercase), field 52 high, radius 16, raised surface with border + shadow; focus brightens border to `{colors.line-hi}`. Password gets an eye toggle.
- **Segmented** — tint track (radius 14), raised thumb (radius 12) that springs between items; `glass` variant sits on the camera.
- **Toggle** — visual switch (44 × 26, or 34 × 20) inside a `role="switch"` row; checked = ink track.
- **Weight stepper** — 52px serif value, tap to type (clamped 30–200, 1 decimal), ±0.1 buttons, ±0.5 / ±0.1 jump chips.
- **Set checkbox** — 20px, radius 6; checked shows a check with a spring pop.

### Data display
- **MacroChip(s)** — "P 32g / C 54g / F 9g"; sizes sm 10.5, md 11, lg 12.
- **Calorie ring** — r 51, stroke 9, round cap, starts at −90°; track = `{colors.line}`.
- **Macro bar** — 6px, track `{colors.line}`, fill = macro dot color, grows from the left.
- **LineChart / BarChart** — hand-drawn SVG; ink line + .05 fill; last item is the highlighted one.
- **Heatmap** — 10 × 10 cells, radius 3, ink at opacity steps 0 / .18 / .5 / .85 / 1.
- **Toast** — accent fill, 13 / 600, one at a time.

### Navigation
- **Tab bar** — floating pill, 64 high, radius 32, inset 16, 26 from bottom. Home · Train · **+** · Nutrition · Insights. "+" is a 56px accent circle that rotates 135° while the quick-log sheet is open. Active tab = accent color + 600 label.
- **Month calendar** — 7-column grid, 38px day cells, selected = accent fill, dot under days with a session.
- **Set table** — columns Set · Kg · Rep · Rest · [Last] · ✓. Row states: *done* (medium), *active* (tint, semibold, rest "—"), *pending* (ink-3).

### Overlays
- **Quick-log** — four action rows, staggered rise (40 / 90 / 140 / 190 ms).
- **Weight sheet** — stepper, jumps, last four entries with deltas, save.
- **Scanner** — full-screen dark camera, morphing viewfinder (barcode 276 × 156 / QR 224²), corner brackets, sweeping line; on lock the frame rises 92px and the result sheet slides up.

## Motion

Motion is GSAP (hooks `useAnimationXxx`, setup in `src/lib/motion.ts`); route changes use the View Transitions API. Named curves (GSAP names in `lib/motion.ts`, Tailwind `ease-*` for CSS transitions): `soft` (.2,.8,.2,1) panes, sheets, presses · `expo` (.22,1,.36,1) auth, scan · `spring` (.34,1.56,.64,1) tab icons, lock · `spring-hard` set tick · `spring-soft` segmented · `plus` rotation · `draw` ring and bars.

| Moment | Motion |
|---|---|
| Tab change | route view-transition (placeholder cross-fade); active icon plays its own spring; pressing/holding the bar lifts it, release springs back (elastic) |
| Press | scale .9–.98, 160–180 ms |
| Welcome → form | logo + wordmark glide via `transform` only (.66s expo); welcome fades up, form groups stagger in at .20 / .27 / .34 / .41 s |
| Home entry | ring draws 1.15s; macro bars 0.8s, 70 ms apart |
| Set tick | check pops (.42s) and the rest timer restarts at 2:00 |
| Sheets | scrim + panel + rows in; the same timeline reverses to close |
| Toast | 2.2s: in 12 %, hold, out |

`prefers-reduced-motion` collapses all animation durations to ~0.

## Do's and Don'ts

### Do
- Use ink (`{colors.accent}`) for every primary action; let macro colors carry the data meaning.
- Keep borders ink-alpha, and keep the dark-theme rim light on raised surfaces.
- Show numbers in serif and keep them tabular where they change.
- Build screens as small components; put logic in the page's `hooks/`.
- Write both languages inline with `t('vi', 'en')`.
- Reach for tokens (`bg-surf`, `text-tx2`, `border-line`) — never raw hex in components (the camera layer is the one exception).

### Don't
- Don't add a brand hue or a second accent; color means protein / carbs / fat.
- Don't use gray borders or heavy shadows.
- Don't bold the serif or use the serif for body text.
- Don't invert the camera layer with the theme.
- Don't set `color` or `font` in unlayered global CSS — it silently overrides Tailwind utilities (this broke button icons once).
- Don't animate `top` / `left` / `font-size` for shared elements; animate `transform`.

## Responsive Behavior

| Viewport | Behavior |
|---|---|
| < 480px | App fills the viewport; fake status bar hidden |
| ≥ 480px | Centered 390 × 844 phone frame on `{colors.canvas}` with status bar |

Layouts are single-column by design; absolute positions in the welcome and scanner screens assume the 844px frame height. Touch targets: buttons ≥ 46px high, icon buttons 34–52px, checkbox hit area 26px.

## Iteration Guide

1. Change one component at a time; check light and dark, VI and EN.
2. New screen → new folder `ui/(layout)/<page>/` with `components/`, `hooks/` and `XxxPage.tsx` (layout-level files — `XxxLayout.tsx`, `components/`, `context/`, `hooks/` — sit at the layout root; `shared/` and `root/` are not layouts); add a route in `src/router.tsx`.
3. New shared piece → `ui/shared/components`; keep it presentational.
4. New token → define in `src/index.css` (`:root` + `[data-theme="dark"]` + `@theme inline`), then use the utility.
5. Keep the three-part pacing: paper surface → white card → ink (primary button / timer card).

## Known Gaps

- Data is in-memory and anchored to a sample date (Sat 15 Aug 2026); no persistence or real calendar yet.
- Sign-in / sign-up have no backend; the scanner simulates detection instead of reading the camera.
- No error, loading or offline-sync states are designed.
- Profile edit, month navigation and custom foods ("Mine") have no screens.
- "Beat the log" (target reps from last session) is an open question in the original handoff.
- Instrument Sans / Serif load from Google Fonts; the service worker caches them after first load.
