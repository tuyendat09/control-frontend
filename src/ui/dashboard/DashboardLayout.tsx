import { Outlet, useLocation } from 'react-router'
import { QuickLogSheet } from './components/QuickLogSheet'
import { TabBar } from './components/TabBar'
import { WeightSheet } from './components/weight-sheet/WeightSheet'
import { DashboardUiProvider } from './context/DashboardUiProvider'
import { useDashboardUi } from './hooks/useDashboardUi'
import { useHideTabBar } from './hooks/useHideTabBar'

function DashboardShell() {
  const { pathname } = useLocation()
  const hideTabBar = useHideTabBar()
  const { quickLogOpen, weightOpen } = useDashboardUi()
  // Re-run the pane entrance when switching tabs, not when drilling into a tab's sub-routes.
  const tab = pathname.split('/')[1] ?? ''

  return (
    <>
      <div key={tab} className="absolute inset-0 animate-pane">
        <Outlet />
      </div>
      {!hideTabBar && <TabBar />}
      {quickLogOpen && <QuickLogSheet />}
      {weightOpen && <WeightSheet />}
    </>
  )
}

/** Layout for the five main tabs (+ profile and scanner). */
export function DashboardLayout() {
  return (
    <DashboardUiProvider>
      <DashboardShell />
    </DashboardUiProvider>
  )
}
