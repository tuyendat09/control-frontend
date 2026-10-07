import { createContext } from 'react'

export interface ToastState {
  id: number
  message: string
}

export interface ToastValue {
  toast: ToastState | null
  showToast: (message: string) => void
}

export const ToastContext = createContext<ToastValue | null>(null)
