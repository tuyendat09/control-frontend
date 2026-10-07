# Handoff: Control — Calorie & Training Log (mobile app)

## Overview
**Control** is a mobile app for lifters to track daily calories/macros, log training sessions set-by-set (with rest timer and previous-session comparison), and track body weight. Bilingual (Vietnamese default, English), light + dark themes.

Screens: Welcome/Auth → Home (Today) → Nutrition (Log + Library) → Training (date-based log) → Insights → Profile, plus a center "+" Quick-log action sheet and a Weight entry sheet.

## About the Design Files
The files in this bundle are **design references created in HTML** — a clickable prototype showing intended look and behavior, **not production code to copy**. Recreate these designs in the target codebase's environment (React Native / Expo, SwiftUI, Flutter, etc.) using its established patterns. If no codebase exists yet, recommended stack: **React Native + Expo + Reanimated** (the design leans heavily on spring/bezier micro-interactions and shared-element transitions).

Open `Calo App.dc.html` in a browser (keep `support.js` next to it). The left panel toggles theme, language and jumps between screens. The phone frame is 390×844.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, radii, copy and motion. Recreate pixel-perfectly. All data is sample data.

---

## Design Tokens

### Colors — Light
| Token | Value | Use |
|---|---|---|
| bg | `#E7E4DE` | app/page background behind frame |
| surf | `#F4F1EC` | screen background, sheets |
| surf2 | `#FFFFFF` | cards, inputs, tab bar |
| tint | `#E7EAE7` | icon wells, segmented track, hover rows |
| tx | `#16231E` | primary text (matte ink) |
| tx2 | `#67655F` | secondary text |
| tx3 | `#A09C94` | tertiary / labels |
| acc | `#16231E` | primary buttons, ring, active tab |
| accTx | `#F4F1EC` | text on acc |
| line | `rgba(26,25,23,.055)` | 1px card borders |
| line2 | `rgba(26,25,23,.045)` | dividers inside cards |
| lineHi | `rgba(26,25,23,.16)` | hover border |
| accGlow | `rgba(22,35,30,.4)` | primary-button shadow color |

### Colors — Dark
| Token | Value |
|---|---|
| bg | `#070908` |
| surf | `#101413` |
| surf2 | `#19201D` |
| tint | `#242A27` |
| tx / tx2 / tx3 | `#EFEEE9` / `#9B9993` / `#66645E` |
| acc / accTx | `#DDE4DF` / `#16231E` |
| line / line2 / lineHi | `rgba(255,255,255,.055)` / `.04` / `.18` |
| accGlow | `rgba(0,0,0,.55)` |

### Macro colors (bg chip / text / dot-bar)
| Macro | Light | Dark |
|---|---|---|
| Protein (earth) | `#F4E7E1` / `#8A4530` / `#A9573F` | `#2A1E19` / `#D2937A` / `#B96A4E` |
| Carbs (amber) | `#F3EDDD` / `#7C6126` / `#9A7A33` | `#282418` / `#C4A96A` / `#AC8B41` |
| Fat (slate) | `#E5EBEF` / `#3B5A6B` / `#4C7286` | `#1B2429` / `#93AEBE` / `#5E839A` |

Weight delta: gain uses Protein text color, loss uses Fat text color.

### Elevation (border + shadow)
Every card = `border: 1px solid line` + `box-shadow: el`. Border is always ink-at-alpha, never a grey.
```
Light el:     0 1px 1px rgba(26,25,23,.03), 0 3px 10px -6px rgba(26,25,23,.07)
Light shadow: 0 1px 1px rgba(26,25,23,.035), 0 4px 14px -8px rgba(26,25,23,.10)   (hero calorie card)
Dark el:      inset 0 1px 0 rgba(255,255,255,.045),  ← rim light (required)
              0 1px 1px rgba(0,0,0,.3), 0 6px 18px -10px rgba(0,0,0,.6)
Dark shadow:  0 1px 1px rgba(0,0,0,.3), 0 4px 14px -8px rgba(0,0,0,.5)
Tab bar:      0 1px 2px rgba(26,25,23,.04), 0 10px 30px -12px rgba(26,25,23,.16)
Primary btn:  0 4px 14px -6px accGlow
Toast:        0 8px 24px -8px rgba(0,0,0,.4)
```

### Dark-mode atmosphere (screen-level overlays, pointer-events none)
- Ambient 1: `radial-gradient(120% 62% at 50% -8%, rgba(150,196,175,.13), transparent 62%)` (mint, top)
- Ambient 2: `radial-gradient(78% 44% at 8% 106%, rgba(196,169,106,.07), transparent 70%)` (amber, bottom-left)
- Film grain: fractal-noise texture (baseFrequency .9, 3 octaves), 140px tile, `mix-blend-mode: overlay`, opacity **.05** (0 in light).

### Typography
- **Instrument Serif** (400) — display: screen titles 29px, big numbers 32–34px, weight entry 52px, wordmark 48px, sheet titles 23px, card values 26px, auth heading 31px. letter-spacing −.01 to −.022em, line-height 1–1.15.
- **Instrument Sans** (400/500/600/700) — UI. Body 13.5–15.5px; list item title 14px/500; buttons 15px/600; secondary 11.5–12.5px; section labels 10.5–11px UPPERCASE, letter-spacing .09–.11em, color tx3; tab labels 10px.
- Numbers in tables/timers: `font-variant-numeric: tabular-nums`.

### Radii
Phone frame 46 · hero/list cards 24 · sheets 32 (top) · tab bar pill 32 · action rows 20 · inputs/buttons 16 · quick-add chips 16 · icon wells 14 · segmented track 14 / thumb 12 · stepper buttons 18 · macro chips 7 · bars 99.

### Spacing
Screen horizontal padding 24 (headers) / 20 (cards). Scroll pane padding: top 62 (below status bar), bottom 118 (clears tab bar). Card inner padding 15–18 rows, 22–26 hero. Section gap 26. Card list gap 10–12.

---

## Screens

### 1. Welcome / Auth (`astage: welcome | form`, `amode: up | in`)
- **Welcome:** logo mark 64×64 centered at top 196; wordmark "Control" 48px serif centered at top 298; 3 sonar rings (inset −22px, 1px acc border, 4.2s loop, staggered 1.4s); slow-drifting tint blob (24s). Below (top 358): overline "NUTRITION & TRAINING" (10.5px, .24em) + tagline 15.5px tx2, max-width 268. Bottom (44px from bottom): primary "Bắt đầu / Get started →" (54h, r16), secondary outline "Tôi đã có tài khoản / I already have an account", privacy note 11.5px tx3.
- **Form:** shared-element transition — mark moves to top 86 / left 76 at 34×34; wordmark to top 93 / left 122 at 18px (becomes header next to back button at left 26). Back button 34×34 r12 tint fades in. Fields stagger in (delays .20/.27/.34/.41s): heading 31px serif + subtitle; Display name (sign-up only), Email, Password (with eye icon; "Forgot?" sign-in only; "At least 8 characters" sign-up only). Field: 52h, r16, surf2, border line, shadow el; label 11.5px uppercase tx3. Primary CTA → Home.
- **Transition:** all mark/wordmark props `0.66s cubic-bezier(.22,1,.36,1)`. Welcome blocks fade out + translateY(−18). Sonar fades out .45s. **Known issue:** verify mark's vertical center stays aligned with wordmark during the move; implement with a proper shared-element/layout animation rather than animating top/left/font-size.

### 2. Home / Today (`dash`)
- Header: date "T7, 15 THG 8" (12.5px tx3) + "Chào An / Hello An" 29px serif; right: profile pill (avatar 34 circle "AN" + name/“Profile”) → Profile.
- **Calorie card** (r24, padding 26/22): ring 118px, r=51, stroke 9, track = line, progress = acc, round cap, starts at −90°; center "1,420" 32px serif + "/ 2,100 KCAL". Right: 3 macro rows (Protein 96/140g, Carbs 154/230g, Fat 41/62g) — 7px square dot, 6px bar.
- **Quick add** horizontal scroller: chips "Bữa sáng quen 420 kcal · 32g P", "Ức gà + cơm 610 · 48g P", "Shake sau tập 280 · 30g P". Tap → appends a "Combo just added" row to today's list + toast.
- **Logged today** list card: rows (time well 36×36 r14, name 14/500, macro chips P/C/F, kcal right).
- Two tiles: Session "Push A · 5 lifts · 18 sets · 62′" → Training; Weight "71.6 kg · −1.6 kg · 30 days" + "+ Log today" → Weight sheet.

### 3. Nutrition (`food`, tabs `log | lib`)
Title "Bữa ăn / Meals". Sliding segmented control (Log / Library). Log = today's meals grouped; Library = searchable foods & saved combos with add button → toast "Added to dinner". See HTML lines ~518–607 for exact content.

### 4. Training (`work`)
- Date-based (not split-based). Horizontal month strip of days; trained days show a dot; selected day = acc fill. Day states: `today` (live session), `past` (completed, read-only summary), `empty` ("No session yet" + Create session).
- Day sheet: exercise list → exercise detail with sets table: columns `# | kg | reps | rest | ✓`. **Previous Set ghost column** toggle (default ON) adds last session's values beside current ones for comparison without switching day.
- Ticking a set: checkbox → tick pop animation (.42s spring) and **auto-starts a 2:00 rest timer**. Rest timer card (acc background, 32px serif tabular digits, play/pause round button 50px).
- Exercise stats sheet with tabs Weight / Volume: "Current top set 62.5 kg · +7.5 kg / 90d", "Latest top set 62.5 × 8 · 500 kg total", chart.
- Finish session → toast "Session saved · 11 sets".

### 5. Insights (`stats`)
Weight · 90 days card (34px serif value, delta, last entry), trend chart, 28-cell training heatmap (10×10 r3, opacity steps 0/.18/.5/.85/1 of tx), other summaries (see HTML ~912–970).

### 6. Profile (`me`)
Profile info, TDEE calculator / targets, theme toggle switch, language toggle (see HTML ~972–1013).

### Tab bar
Floating pill: 64h, r32, inset 16px sides, 26px from bottom, surf2 + border + tab-bar shadow. Items: Home · Train · **[+]** · Nutrition · Insights. "+" = 56px acc circle, glow shadow, hover scale 1.07 / press .92; icon rotates 135° while the action sheet is open (.38s overshoot). Inactive tab color tx2, active acc + label 600. Press scale .9.

### Quick-log action sheet
Scrim `rgba(20,19,17,.42)` + blur 3px (fade .22s). Sheet surf, top radius 32, grabber 38×4, title "Ghi nhanh / Quick log" 23px serif + "Today, Aug 15". 3 rows (r20, staggered rise .04/.09/.14s): Log a meal → Nutrition Library; Start a session → Training today, day sheet open; Today's weight → Weight sheet.

### Weight sheet
Title + "Mon, Aug 18 · morning, fasted". Stepper card: − / value / + (buttons 52×52 r18 tint; hover acc). Value 52px serif; tap to type (input, Enter/Esc commits, clamped 30–200, 1 decimal). Jump chips −0.5 / −0.1 / +0.1 / +0.5. Recent entries list (date, kg, delta colored). "Save weight" → toast "Logged 71.6 kg for today".

### Scan (Barcode / QR) — full-screen overlay (`scan: 0 | live | found`, `smode: bar | qr`)
Entry: scan button (46×46 acc, r14) beside Library search; 4th row "Scan a barcode" in Quick-log sheet.
- Camera layer: always dark regardless of theme (`#0A0C0B`, radial to `#2B302D`). Own white status bar. Top: close (44 circle, `rgba(255,255,255,.12)` + blur 12) · "Quét mã / Scan" 14.5/600 · flash toggle (active = `#F4F1EC` fill, ink icon; camera brightens).
- Viewfinder centered at y≈300: barcode 276×156, QR 224×224 (size morphs .5s `(.22,1,.36,1)`), r22, outside dimmed via `box-shadow 0 0 0 999px rgba(6,8,7,.58)`. 4 corner brackets 30px, 3px `#F4F1EC`. Scan line 2px mint `#9FD3BC` + glow, sweeps 8%→92% 1.7s ease-in-out alternate.
- Hint (13.5px, 78% white) under frame; bottom: glass segmented Barcode / QR (sliding light thumb) + "Enter code manually".
- **Detect** (prototype: auto after 2.3s): corners turn mint, frame lock-pop (.94 → 1) and moves up 92px scaled .86; controls fade; result sheet slides up (.55s).
- Result sheet (theme surf): status line "Matched · EAN-13" / "Combo from QR", name 25px serif, brand + barcode digits (tabular), rescan button. Card: kcal 36px serif, serving label, qty stepper (1–9) recalculating kcal & P/C/F chips. Meal picker (Breakfast/Lunch/Dinner/Snack, default Dinner). CTA "Add to {meal}" → closes, appends row to Today, toast "Added N kcal from scan".
- Sample data: barcode = Vinamilk low-sugar yogurt, 62 kcal / 100g cup, P5.2 C7.8 F1.2; QR = coach combo "Meal prep · Gà + khoai lang", 520 kcal / 350g box, P42 C55 F12.
- Real impl: use native camera barcode API (EAN-13/UPC-A/QR), lookup via nutrition DB (e.g. Open Food Facts); not-found → manual entry form. QR payload format suggestion: `control://combo/<id>`.

---

## Interactions & Motion
| Element | Animation |
|---|---|
| Screen change | pane fade + translateY 7→0, .34s `cubic-bezier(.2,.8,.2,1)` |
| Tab icon on activate | Home: hop (translateY −4, scale 1.16) .52s `(.34,1.56,.64,1)`; Train: 3 bars scaleY .45→1.14→1 staggered .06s; Nutrition: apple wobble ±11° .62s; Insights: pop scale 1.17 .46s |
| Segmented thumb | translateX, .34s `(.32,1.4,.5,1)` |
| Calorie ring | stroke-dashoffset from full (320.4) to value, 1.15s `(.2,.85,.3,1)` on Home entry |
| Macro bars | scaleX 0→1, .8s, stagger .07s |
| Sheets | slide up 26px + fade, .3s; scrim fade .22s |
| Set tick | scale .3→1.22→1, .42s `(.34,1.6,.64,1)` |
| Toast | bottom 108, centered, acc bg; in/hold/out over 2.2s |
| Buttons | press scale .96–.98, .18s; hover opacity .9 or border → lineHi |
| Welcome entry | fade-up 12px .7s, stagger .09s |
| Logo dot | orbits ring 18s linear infinite (welcome only) |
Respect `prefers-reduced-motion` (disable all).

## State
`screen` (auth|dash|food|work|stats|me), `theme`, `lang`, `astage`, `amode`, `ftab`, `day` (1–31), `dayopen`, `dstate` (derived), `ghost` (prev-set column), `s{n}` set-done flags, `t`/`running` (rest timer seconds), `exstat`/`extab`, `action` (sheet open), `wopen`/`wDraft`/`wedit`/`w` (weight), `added` (quick-add appended), `toast`/`toastMsg`, `scan`/`smode`/`flash`/`smeal`/`sq` (scanner). Data layer: local-first (copy says "data stays on your device").

## Logo
Control knob: ring (r15 of 40 viewBox, stroke 2.2, acc) + filled dot r3.4 at 7.5 units from center, rotated 50° in static usage. Doubles as the calorie-ring metaphor.

## Assets
No raster images. Icons are inline 24px stroke SVGs (stroke 1.7–2.4, round caps) in the HTML — reuse paths or map to Lucide equivalents. Fonts: Google Fonts Instrument Sans + Instrument Serif.

## Files
- `MOTION.md` — frame-by-frame storyboard of every animation (timings, from→to, curves). **Read alongside this README.**
- `motion.css` — all keyframes + transition rules extracted verbatim from the prototype.
- `frames/` — key-state screenshots: 01 auth welcome, 02 auth form, 03 home light, 04 quick-log sheet, 05 scan live, 06 scan found, 07 home dark.
- `Calo App.dc.html` — full prototype (all screens, both themes, both languages, all motion). Source of truth for exact copy and values.
- `support.js` — runtime needed to open the HTML locally.
- `Color Options.dc.html` — color explorations (reference only, not final).

## Open item
"Beat the log" (show target reps for next set based on last session, for to-failure training) — not built; decide scope before implementation.
