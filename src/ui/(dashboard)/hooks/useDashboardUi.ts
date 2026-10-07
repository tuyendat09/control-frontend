import { use } from 'react'
import { DashboardUiContext } from '../context/DashboardUiContext'

export function useDashboardUi() {
  const ctx = use(DashboardUiContext)
  if (!ctx) throw new Error('useDashboardUi must be used inside <DashboardUiProvider>')
  return ctx
}
