import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Lang, Theme } from '@/types'
import { PreferencesContext, type PreferencesValue } from './PreferencesContext'

const THEME_KEY = 'control.theme'
const LANG_KEY = 'control.lang'

function read<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const value = window.localStorage.getItem(key)
    return allowed.includes(value as T) ? (value as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* storage unavailable — preference just won't persist */
  }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => read(THEME_KEY, ['light', 'dark'], 'light'))
  const [lang, setLangState] = useState<Lang>(() => read(LANG_KEY, ['vi', 'en'], 'vi'))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.lang = lang
  }, [theme, lang])

  const value = useMemo<PreferencesValue>(() => {
    const setTheme = (next: Theme) => {
      setThemeState(next)
      write(THEME_KEY, next)
    }
    const setLang = (next: Lang) => {
      setLangState(next)
      write(LANG_KEY, next)
    }
    return {
      theme,
      lang,
      setTheme,
      setLang,
      toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      toggleLang: () => setLang(lang === 'vi' ? 'en' : 'vi'),
    }
  }, [theme, lang])

  return <PreferencesContext value={value}>{children}</PreferencesContext>
}
