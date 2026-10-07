import { useMatches } from 'react-router'

export interface DashboardRouteHandle {
  /** Full-screen routes (scanner) cover the tab bar. */
  hideTabBar?: boolean
}

export function useHideTabBar() {
  return useMatches().some((m) => (m.handle as DashboardRouteHandle | undefined)?.hideTabBar)
}
