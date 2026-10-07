import { useMemo, useState, type ReactNode } from 'react'
import { ToastContext, type ToastState, type ToastValue } from './ToastContext'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null)

  const value = useMemo<ToastValue>(
    () => ({
      toast,
      showToast: (message) => setToast((prev) => ({ id: (prev?.id ?? 0) + 1, message })),
    }),
    [toast],
  )

  return <ToastContext value={value}>{children}</ToastContext>
}
