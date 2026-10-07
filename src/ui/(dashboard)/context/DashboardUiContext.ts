import { createContext } from 'react'

export interface DashboardUiValue {
  quickLogOpen: boolean
  weightOpen: boolean
  openQuickLog: () => void
  closeQuickLog: () => void
  openWeight: () => void
  closeWeight: () => void
}

export const DashboardUiContext = createContext<DashboardUiValue | null>(null)
