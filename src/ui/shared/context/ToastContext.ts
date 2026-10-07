import { createContext } from 'react'

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface ToastState {
  id: number
  message: string
  action?: ToastAction
}

export interface ToastValue {
  toast: ToastState | null
  /** A toast with an `action` (e.g. Undo) stays longer so it can be tapped. */
  showToast: (message: string, action?: ToastAction) => void
}

export const ToastContext = createContext<ToastValue | null>(null)
