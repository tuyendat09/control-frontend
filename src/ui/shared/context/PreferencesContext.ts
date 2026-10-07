import { createContext } from 'react'
import type { Lang, Theme } from '@/types'

export interface PreferencesValue {
  theme: Theme
  lang: Lang
  setTheme: (theme: Theme) => void
  setLang: (lang: Lang) => void
  toggleTheme: () => void
  toggleLang: () => void
}

export const PreferencesContext = createContext<PreferencesValue | null>(null)
