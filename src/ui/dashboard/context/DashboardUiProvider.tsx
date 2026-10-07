import { useMemo, useState, type ReactNode } from 'react'
import { DashboardUiContext, type DashboardUiValue } from './DashboardUiContext'

/** Which global sheet is open — the "+" button, Home and Insights all open the same ones. */
export function DashboardUiProvider({ children }: { children: ReactNode }) {
  const [quickLogOpen, setQuickLogOpen] = useState(false)
  const [weightOpen, setWeightOpen] = useState(false)

  const value = useMemo<DashboardUiValue>(
    () => ({
      quickLogOpen,
      weightOpen,
      openQuickLog: () => setQuickLogOpen(true),
      closeQuickLog: () => setQuickLogOpen(false),
      openWeight: () => {
        setQuickLogOpen(false)
        setWeightOpen(true)
      },
      closeWeight: () => setWeightOpen(false),
    }),
    [quickLogOpen, weightOpen],
  )

  return <DashboardUiContext value={value}>{children}</DashboardUiContext>
}
