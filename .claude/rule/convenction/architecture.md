# Architecture — Control

Mobile-first PWA: calorie/macro log, training log, body weight. Local-first, bilingual (VI/EN), light/dark. Visual rules live in `DESIGN.MD` (same folder) — read it before touching UI.

## Stack (WHAT)
React 19 · TypeScript · Vite · Tailwind v4 (tokens in `src/index.css`) · react-router (`src/router.tsx`) · vite-plugin-pwa (`vite.config.ts`). Alias `@/` = `src/`.

## Folder map
- `src/ui/(auth)/` — layout + `welcome/ login/ register/`
- `src/ui/(dashboard)/` — layout (tab bar, quick-log + weight sheets) + `home/ training/ nutrition/ insight/ profile/ scan/`
- `src/ui/shared/` — reusable `components/`, app-wide `context/` + `hooks/` (not a layout)
- `src/ui/root/` — app shell: phone frame, toast viewport, dark-mode atmosphere (not a layout)
- `src/data/` sample data · `src/types/` shared types · `src/lib/` pure helpers

## Page anatomy (HOW to structure)
Layout folder `(x)/` holds `XLayout.tsx` plus its own `components/ context/ hooks/`. Each page is `(x)/<page>/` with `<Name>Page.tsx`, `components/`, `hooks/` (and `context/` only if state outlives the page).
- Page file composes small components; no logic, no big markup.
- Logic lives in a `use<Thing>` hook in the page's `hooks/`. Example: `(auth)/login/` → `LoginPage` → `LoginForm` → `useLoginForm`.
- Multi-step UI: the form renders one step component per state.
- Reused in 2+ places → move to `ui/shared/components`.
- Layout logic/animation (not pure UI) → a hook in the layout's `hooks/`. Example: `(dashboard)/hooks/useDashboardLayout.ts`, `(auth)/hooks/useAuthStage.ts`.
- Context = 3 files: `XContext.ts` (createContext), `XProvider.tsx`, `hooks/useX.ts`.

## Where things are (WHY)
- Routes: `src/router.tsx`. Sub-screens are nested routes rendered as overlays (`training/session`, `training/progress`).
- App-wide state providers (prefs, toast, tracker): wrapped in `src/App.tsx`; implementations in `ui/shared/context`.
- Tab-scoped state: `(dashboard)/training/context/TrainingProvider.tsx`.
- Animation: GSAP only (no CSS keyframes). Setup + named eases in `src/lib/motion.ts` (import `gsap`/`useGSAP` from there). Every animation lives in a `useAnimationXxx` hook — shared ones in `ui/shared/hooks`, layout/page ones in that folder's `hooks/`. Anything that appears must also animate out (timeline reversed, or unmount after the exit). Hover/press stay CSS transitions.
- Route transitions: View Transitions API, wired in `src/lib/routeTransition.ts`; look is designed in `src/index.css` (`::view-transition-*`, `html[data-route-transition=push|pop|switch]`).
- Copy: bilingual inline via `useT()` → `t('vi', 'en')`.
- "Today" is the device date (`appToday()` in `src/lib/date.ts`); sample data is seeded relative to it and held in-memory (`ui/shared/context/TrackerProvider.tsx`).
- Install-app logic: `src/lib/installPrompt.ts`, `ui/shared/hooks/useInstallApp.ts`.

## Workflow
```
npm run dev      # dev server (PWA enabled in dev)
npx tsc -b       # typecheck
npm run lint
npm run build    # tsc + vite build
```
Before finishing UI work: typecheck, lint, then check the screen in the browser in light + dark.

## Gotchas
- Never set `color`/`font` in global CSS outside a layer — it overrides Tailwind utilities.
- File names with `(…)` need quoting in shell commands.
- Files that export components must not also export hooks/constants (react-refresh lint) — split them.
- Port 5173 may be taken by another project; use `--port`.
