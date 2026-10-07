# Control — Motion Spec (frame-by-frame)

Companion to `README.md`. Exact keyframes live in `motion.css` (extracted verbatim from the prototype). This file gives the **storyboard**: what moves, from → to, at which millisecond, with which curve. Timings assume 60fps (1 frame ≈ 16.7ms).

## Curves (name them once in code)
| Name | cubic-bezier | Feel | Used for |
|---|---|---|---|
| `out` | `(.2,.8,.2,1)` | fast-out, soft land | panes, sheets, presses, list rows |
| `outExpo` | `(.22,1,.36,1)` | long glide | shared-element auth, scan lock, result sheet |
| `spring` | `(.34,1.56,.64,1)` | overshoot ~8% | tab icons, tick, lock-pop |
| `springHard` | `(.34,1.6,.64,1)` | overshoot ~12% | set tick |
| `springSoft` | `(.32,1.4,.5,1)` | small overshoot | segmented thumbs |
| `plusRot` | `(.34,1.4,.64,1)` | rotate overshoot | "+" → "×" |
| `draw` | `(.2,.85,.3,1)` | decelerating draw | calorie ring, macro bars |
| `sweep` | `(.45,0,.55,1)` | symmetric ease-in-out | scan line |
React Native/Reanimated: use `Easing.bezier(...)` with the same values, or `withSpring` tuned to match (spring ≈ damping 14, stiffness 180).

`prefers-reduced-motion` / OS "Reduce Motion": skip all of these, keep only opacity crossfades ≤150ms.

---

## 1. Welcome idle (loops)
| Element | Motion | Duration | Curve |
|---|---|---|---|
| Logo dot | rotates 360° around ring center | 18s linear ∞ | linear |
| Sonar ring ×3 | scale .66→1.5, opacity 0→.3 (at 18%)→0 | 4.2s ∞, offsets 0 / 1.4s / 2.8s | `(.2,.6,.3,1)` |
| Tint blob (420px) | translate(−14%,−6%)↔(12%,8%), scale 1↔1.14 | 24s ∞ | `(.4,0,.4,1)` |
| Entry content (`data-up` 1–5) | translateY 12→0, opacity 0→1 | 700ms, stagger 90ms (50/140/230/320/410) | `out` |

## 2. Welcome → Form (shared element) — total ≈ 1000ms
Frame: `frames/01-auth-welcome.png` → `frames/02-auth-form-signup.png`
| t (ms) | Element | From → To | Dur | Curve |
|---|---|---|---|---|
| 0 | Mark | top 196, centered, 64×64 → top 86, left 76, 34×34 | 660 | `outExpo` |
| 0 | Wordmark | top 298, centered, 48px → top 93, left 122, 18px | 660 | `outExpo` |
| 0 | Sonar | opacity → 0 | 450 | ease |
| 0 | Welcome blocks | opacity 1→0, translateY 0→−18 | 420 / 600 | ease / `outExpo` |
| 0 | Back button | opacity 0→1, translateX −8→0, scale .85→1 | 400 / 500 | ease / `outExpo` |
| 0 | Form block | opacity 0→1, translateY 20→0 | 420 / 600 | |
| 200 | Field group 1 (heading) | opacity 0→1, translateY 16→0 | 500 / 580 | `outExpo` |
| 270 | Field group 2 (name, email) | same | | |
| 340 | Field group 3 (password) | same | | |
| 410 | Group 4 (CTA) | same | | |
Back = exact reverse (no stagger delays on the way out).
⚠ Known bug: mark's vertical center drifts vs wordmark mid-flight. In the real build use a layout/shared-element transition (Reanimated `sharedTransitionTag`, or measure → animate transform only). Constraint: mark center-y and wordmark x-height center must be equal at t=660.

## 3. Tab switch — 340–620ms
| Tab | Icon motion (keyframes) | Dur | Curve |
|---|---|---|---|
| Home | 0% y0 s1 → 30% y−4 s1.16 → 55% y+1 s.97 → 75% y−1 s1.03 → 100% rest | 520 | `spring` |
| Train | 3 bars scaleY 1 → .45 (35%) → 1.14 (70%) → 1; origin bottom; stagger 0/60/120 | 500 | `(.34,1.5,.64,1)` |
| Nutrition | rotate 0 → −11° s1.08 (20%) → 8° s1.05 (45%) → −4° (68%) → 2° (86%) → 0; origin 50% 62% | 620 | `(.36,.8,.4,1)` |
| Insights | scale 1 → 1.17 (35%) → .98 (62%) → 1 | 460 | `spring` |
| New pane | opacity 0→1, translateY 7→0 | 340 | `out` |
| Any tab press | scale → .9 while held | 180 | `out` |
Icon animation plays **every time** the tab becomes active (prototype alternates twin keyframes to retrigger).

## 4. Home entry — 1150ms
Frame: `frames/03-home-light.png`, `frames/07-home-dark.png`
| t | Element | From → To | Dur | Curve |
|---|---|---|---|---|
| 0 | Calorie ring | stroke-dashoffset 320.4 (empty) → 103 (68%) | 1150 | `draw` |
| 0 / 70 / 140 | Macro bars P/C/F | scaleX 0→1, origin left | 800 | `draw` |
Circumference = 2π·51 = 320.4. dashoffset = 320.4 × (1 − kcal/target).

## 5. Quick-log action sheet — 300ms + row stagger
Frame: `frames/04-quicklog-sheet.png`
| t | Element | Motion | Dur | Curve |
|---|---|---|---|---|
| 0 | "+" icon | rotate 0→135° (becomes ×) | 380 | `plusRot` |
| 0 | Scrim | opacity 0→1 (rgba(20,19,17,.42) + blur 3) | 220 | ease |
| 0 | Sheet | translateY 26→0, opacity 0→1 | 300 | `out` |
| 40/90/140/190 | Rows 1–4 | translateY 14→0, opacity 0→1 | 420 | `out` |
Close: reverse, rotate back to 0.

## 6. Segmented controls (Log/Library, Weight/Volume, Barcode/QR)
Thumb translateX 0 ↔ (100% + 4px), 340ms `springSoft`. Label color crossfade 200ms.

## 7. Set tick → rest timer
| t | Element | Motion | Dur | Curve |
|---|---|---|---|---|
| 0 | Checkbox → tick | scale .3 → 1.22 (55%) → 1, opacity 0→1 | 420 | `springHard` |
| 0 | Row text | color tx2 → tx | 200 | ease |
| 0 | Rest timer | resets to 2:00 and starts counting (1s steps, tabular digits — no layout shift) | | |

## 8. Weight sheet
Sheet in = same as §5 (300ms `out`). Stepper press scale .9 (160ms). Value crossfades on change (no rolling digits). Save → sheet out + toast.

## 9. Toast — 2200ms
0→12% (264ms): opacity 0→1, y +12→0 · 12→80%: hold · 80→100% (440ms): opacity →0, y →−6. Positioned bottom 108, centered.

## 10. Scanner
Frames: `frames/05-scan-live.png` → `frames/06-scan-found.png`
**Open:** overlay fade 0→1, 280ms ease.
**Live (loop):** scan line top 8% ↔ 92% of frame, 1700ms `sweep`, alternate ∞; 2px mint `#9FD3BC` + glow `0 0 14px 2px rgba(159,211,188,.55)`.
**Mode switch:** frame 276×156 ↔ 224×224, 500ms `outExpo`; hint text swaps; restarts detection.
**Flash:** button fill → `#F4F1EC`, camera brightness 1→1.45, 300ms.
**Detect (lock) — total ≈ 550ms:**
| t | Element | Motion | Dur | Curve |
|---|---|---|---|---|
| 0 | Haptic | success notification (real build) | | |
| 0 | Corners | color white → mint `#9FD3BC` | 300 | ease |
| 0 | Frame brackets | scale 1 → .94 (40%) → 1 | 500 | `spring` |
| 0 | Frame + camera layer (together) | translateY 0→−92, scale 1→.86, origin = frame center | 500 | `outExpo` |
| 0 | Scan line | opacity → 0, pause | 200 | ease |
| 0 | Hint + bottom controls | opacity →0, translateY 0→16 | 300 / 400 | `outExpo` |
| 0 | Result sheet | translateY 104% → 0 | 550 | `outExpo` |
**Rescan:** reverse all, sheet down, line resumes.
**Add:** overlay closes, Today list appends row (rise: y10→0, 300ms `out`), toast.

## 11. Presses & hovers (global)
- Primary/secondary buttons: active scale .98, 180ms `out`; hover opacity .9.
- Cards/chips: active scale .96–.98; hover border line → lineHi (180ms).
- List rows: hover bg → tint (180ms).
- Theme switch: background/colors crossfade 350ms ease on root.

## 12. Dark-mode atmosphere (static, no motion)
Ambient mint/amber radial gradients + 5% overlay film grain fade in with the theme (450ms).
