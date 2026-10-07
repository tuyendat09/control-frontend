import type { Translate } from '@/types'
import { usePreferences } from './usePreferences'

/** `t('Xin chào', 'Hello')` — bilingual copy lives next to the markup, like the design. */
export function useT(): Translate {
  const { lang } = usePreferences()
  return (vi, en) => (lang === 'vi' ? vi : en)
}
