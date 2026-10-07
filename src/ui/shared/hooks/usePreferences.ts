import { use } from 'react'
import { PreferencesContext } from '../context/PreferencesContext'

export function usePreferences() {
  const ctx = use(PreferencesContext)
  if (!ctx) throw new Error('usePreferences must be used inside <PreferencesProvider>')
  return ctx
}
