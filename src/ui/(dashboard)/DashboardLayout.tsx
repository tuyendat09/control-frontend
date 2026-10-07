import { Outlet } from 'react-router'
import { QuickLogSheet } from './components/QuickLogSheet'
import { TabBar } from './components/TabBar'
import { WeightSheet } from './components/weight-sheet/WeightSheet'
import { DashboardUiProvider } from './context/DashboardUiProvider'
import { useDashboardLayout } from './hooks/useDashboardLayout'

function DashboardShell() {
  const { hideTabBar } = useDashboardLayout()

  return (
    <>
      <div className="absolute inset-0">
        <Outlet />
      </div>
      {!hideTabBar && <TabBar />}
      <QuickLogSheet />
      <WeightSheet />
    </>
  )
}

/** Layout for the five main tabs (+ profile and scanner). Route changes animate via the View Transitions API. */
export function DashboardLayout() {
  return (
    <DashboardUiProvider>
      <DashboardShell />
    </DashboardUiProvider>
  )
}
