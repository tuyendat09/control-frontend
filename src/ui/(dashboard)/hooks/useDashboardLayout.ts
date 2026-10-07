import { useLocation } from 'react-router'
import { useHideTabBar } from './useHideTabBar'

/**
 * Layout-level behavior: which tab is showing (re-keys the pane so its entrance animation replays
 * on tab change, not when drilling into sub-routes) and whether a full-screen route hides the tab bar.
 */
export function useDashboardLayout() {
  const { pathname } = useLocation()
  const hideTabBar = useHideTabBar()
  const tab = pathname.split('/')[1] ?? ''

  return { tab, hideTabBar }
}
