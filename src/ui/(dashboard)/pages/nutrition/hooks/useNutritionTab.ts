import { useSearchParams } from 'react-router'

export type NutritionTab = 'log' | 'library'

/** Tab lives in `?tab=library` so other screens can deep-link into the Library. */
export function useNutritionTab() {
  const [params, setParams] = useSearchParams()
  const tab: NutritionTab = params.get('tab') === 'library' ? 'library' : 'log'

  const setTab = (next: NutritionTab) =>
    setParams(
      (prev) => {
        const params = new URLSearchParams()
        if (next === 'library') params.set('tab', 'library')
        const date = prev.get('date')
        if (date) params.set('date', date) // keep the selected day across tabs
        return params
      },
      { replace: true },
    )

  return { tab, setTab }
}
