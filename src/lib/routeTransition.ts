import type { createBrowserRouter } from 'react-router'
import { reducedMotion } from './motion'

type AppRouter = ReturnType<typeof createBrowserRouter>

/**
 * Route transitions via the View Transitions API (react-router runs `document.startViewTransition`
 * around the navigation when `viewTransition: true`). Browsers without support navigate normally.
 *
 * Every navigation is tagged on <html data-route-transition="…"> while it plays, so the actual look can be
 * designed per kind in `src/index.css` (`::view-transition-old/new(root)`):
 *   push   → going deeper   (e.g. /training → /training/day/15)
 *   pop    → going back up  (e.g. /training/day/15 → /training)
 *   switch → between top-level screens (tabs, auth ⇄ dashboard)
 */
export type RouteTransitionKind = 'push' | 'pop' | 'switch'

const segments = (path: string) => path.split('?')[0].split('/').filter(Boolean)

export function transitionKind(from: string, to: string): RouteTransitionKind {
  const a = segments(from)
  const b = segments(to)
  if (a[0] !== b[0]) return 'switch'
  return b.length >= a.length ? 'push' : 'pop'
}

/** Policy: which navigations get a view transition. Edit here to opt screens in/out. */
export function shouldTransition(from: string, to: string) {
  if (reducedMotion()) return false
  const fromPath = from.split('?')[0]
  const toPath = to.split('?')[0]
  if (fromPath === toPath) return false // search-param changes (tabs inside a screen)
  if (fromPath.startsWith('/auth') && toPath.startsWith('/auth')) return false // auth animates itself
  return true
}

/** Makes every `navigate()` / `<Link>` use a view transition by default, per `shouldTransition`. */
export function installRouteTransitions(router: AppRouter) {
  if (!('startViewTransition' in document)) return

  const navigate = router.navigate.bind(router)

  router.navigate = ((to: unknown, opts?: { viewTransition?: boolean }) => {
    if (typeof to === 'number') return navigate(to as never) // history back/forward: browser handles it

    const target = typeof to === 'string' ? to : ((to as { pathname?: string }).pathname ?? '')
    const from = router.state.location.pathname

    if (opts?.viewTransition === undefined && target.startsWith('/')) {
      const on = shouldTransition(from, target)
      if (on) {
        const root = document.documentElement
        root.dataset.routeTransition = transitionKind(from, target)
        window.setTimeout(() => delete root.dataset.routeTransition, 1000)
      }
      return navigate(to as never, { ...opts, viewTransition: on })
    }
    return navigate(to as never, opts as never)
  }) as typeof router.navigate
}
