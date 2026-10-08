# Mascot

Two characters, one visual family: **pixel art**, ink-only palette from `DESIGN.MD`. Art is made as pixel SVG by Claude Design; motion is GSAP frame-swapping written here. Status: **planned** — no code yet.

Tone: playful and cute, never serious. Precision of movement does not matter; personality does.

## Characters
| | Pet | Exercise guide |
|---|---|---|
| Role | User's companion; reacts to route and state | Illustrates how an exercise moves |
| State | Yes — name, mood, streak-driven | None; driven by one prop |
| Lives in | `(dashboard)` layout, outside `<Outlet>` | Exercise screen only |
| Complexity | Highest | Lower: ~10 looping movement patterns |

Decisions: pet only **reacts** (and gets a name) in v1 — no feeding, growth or accessories yet. Guide motion is **illustrative, not form-accurate**; always show a "illustration — watch the clip for correct form" note.

## SVG contract (what Claude Design must deliver)
- Pixel art on a fixed grid (e.g. 32×32): each pixel a `<rect>` or merged runs, `shape-rendering="crispEdges"`. Render at integer scale (×4, ×6) so pixels never blur.
- **No joint rotation** — rotating pixel art breaks the grid. Movement is frame swapping: every activity is 2–4 frames, each its own `<g id="<activity>-<n>">` (e.g. `cook-1`, `cook-2`, `rest-1`).
- Layers: every activity may have a **mascot** layer, **prop** layers and **fx** layers. All layers of a character share one `viewBox` and grid and are drawn at their rest position, so stacking them aligns with no extra math. Props move by whole-pixel translation only (never rotation; tilted poses are pre-drawn frames); fx loop their own frames independently.
- Naming: `<layer>-<name>-<frame>` as a top-level `<g id="…">`, kebab-case (`mascot-cook-2`, `prop-pan-tilt`, `fx-fire-3`). Colors via classes `c-ink`, `c-surface`, `c-tint` (mapped to tokens in CSS), never hex.
- Max 3 colors, only from tokens (`ink`, `surface`, `tint`); no raw hex, no gradients/filters, no animation inside the SVG. Must work in light and dark. Macro colors are for data only — never used on mascots.
- GSAP drives playback: show one frame at a time at ~4–8 fps (`steps()` or visibility toggle). Anything that appears also animates out (opacity / quick frame-out), per `architecture.md`.
- Reduced motion: hold a single still frame (frame swapping has no "near zero" duration).

## Asset list
Two files, one per character: `pet.svg`, `guide.svg`. Canvas 48×48 per character (headroom for tosses/confetti), identical for every group. Frame counts are minimums; more is fine.

**pet.svg** — `mascot-*` is the character, `prop-*` and `fx-*` are separate layers.
| Activity | mascot | props | fx |
|---|---|---|---|
| idle | `mascot-idle-1..2` (breathe), `mascot-idle-blink` | — | — |
| cook | `mascot-cook-1..3` (hold, toss, catch) | `prop-pan-flat`, `prop-pan-tilt`, optional `prop-food-1` | `fx-fire-1..3` |
| rest | `mascot-rest-1..2` | `prop-chair`, `prop-cup` | `fx-steam-1..2` |
| happy | `mascot-happy-1..2` | — | `fx-sparkle-1..2` |
| celebrate | `mascot-celebrate-1..3` | — | `fx-confetti-1..3` |
| remind | `mascot-remind-1..2` (wave) | — | — |
| worry | `mascot-worry-1..2` | — | `fx-sweat-1..2` |
| sleep | `mascot-sleep-1..2` | — | `fx-zzz-1..3` |

**guide.svg** — per pattern `mascot-<pattern>-1..3` (start, mid, end/mood beat); patterns: `squat hinge push-horizontal push-vertical pull-horizontal pull-vertical curl extend hold` (27 frames). Props: `prop-barbell`, `prop-dumbbell`, `prop-bench`, `prop-pullup-bar` (+ tilted variants only where a pose needs it). fx: `fx-sweat-1..2`, `fx-sparkle-1..2`.

Claude Design delivers static art only; all timing, easing, sequencing and state live in code.

## Pet activities
| Activity | Trigger |
|---|---|
| idle | default (Home): breathe, random blink |
| cook | route `/nutrition` (picking food) |
| rest | rest countdown running (any route) |
| happy | meal logged / goal hit (timed) |
| celebrate | streak milestone 7/30/100 (timed) |
| remind | nothing logged today |
| worry | streak about to break |
| sleep | quiet hours |
| hidden | route `/scan` |

Priority: **timed event > active claim (rest) > route activity > idle**.

## Pet architecture
- `(dashboard)/context/MascotContext.ts`, `MascotProvider.tsx`, `hooks/useMascot.ts` (3-file context convention).
- **Route source:** add `mascot?: MascotActivity` to `DashboardRouteHandle` in `src/router.tsx`; the provider reads it with `useMatches()`.
- **State source (claims):** screens register with `useMascotClaim('rest', isCounting)`; the provider never imports training code. The rest timer lives in `TrainingProvider` (tab-scoped) — it publishes the claim upward. Verify the exact place when implementing.
- Single pet instance rendered in `DashboardLayout` outside `<Outlet>` so it survives route changes. Fixed small slot; must not cover controls on data-dense or fast-action screens.
- Motion: `useAnimationMascot` (GSAP frame playback). On activity change, outgoing frame group animates out and incoming animates in; reduced-motion holds a still frame.
- Persistence: pet name/state local first (Dexie), sync later with accounts.

## Exercise guide
Exercise screen layout: **name → clip link → guide mascot looping the movement**. The clip is an external link (no clip hosting in the app).

Each exercise is tagged with one movement pattern. A pattern is a tiny looping skit — 2–4 frames plus a mood beat (e.g. effort then relief) — so it is data, and new or user-made exercises only pick a pattern.

| Pattern | Examples | Skit |
|---|---|---|
| squat | back squat, goblet squat, leg press | wobbly down, proud up |
| hinge | deadlift, RDL, hip thrust | lifts bar, flexes |
| push-horizontal | bench press, push-up | lies on bench, pushes happily |
| push-vertical | overhead press | presses up, grins |
| pull-horizontal | row, cable row | pulls, puffs |
| pull-vertical | lat pulldown, pull-up | pulls up, dangles |
| curl | biceps curl | curls up, then looks tired |
| extend | triceps extension | extends, shakes arm |
| hold | plank | holds, slowly sweating |

The skits above are placeholders; Claude Design / the user can change the jokes. Keep the "illustration — watch the clip for correct form" note.

## Open questions
- Which animal/shape each character is (Claude Design decides). Check on Home that angular pixel sprites sit well next to the app's large radii and serif.
- Streak rule: what counts as a logged day (how many meals?), freeze allowance. Needs the real device date first (`src/lib/date.ts`).
- Pet mood thresholds (when remind/worry/sleep fire; quiet hours).
- Where the clip links are stored and who maintains them (library moderation).
- Exact pet slot position per screen.
