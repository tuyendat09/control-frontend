import { useHideTabBar } from './useHideTabBar'

/** Layout-level state: full-screen routes (scanner) hide the tab bar. Route motion lives in `lib/routeTransition.ts`. */
export function useDashboardLayout() {
  return { hideTabBar: useHideTabBar() }
}
