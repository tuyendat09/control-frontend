import { Outlet } from 'react-router'
import { QuickLogSheet } from './components/QuickLogSheet'
import { TabBar } from './components/TabBar'
import { WeightSheet } from './components/weight-sheet/WeightSheet'
import { DashboardUiProvider } from './context/DashboardUiProvider'
import { useDashboardUi } from './hooks/useDashboardUi'
import { useDashboardLayout } from './hooks/useDashboardLayout'

function DashboardShell() {
  const { tab, hideTabBar } = useDashboardLayout()
  const { quickLogOpen, weightOpen } = useDashboardUi()

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
