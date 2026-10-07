import { useSearchParams } from 'react-router'

export type NutritionTab = 'log' | 'library'

/** Tab lives in `?tab=library` so other screens can deep-link into the Library. */
export function useNutritionTab() {
  const [params, setParams] = useSearchParams()
  const tab: NutritionTab = params.get('tab') === 'library' ? 'library' : 'log'

  const setTab = (next: NutritionTab) => setParams(next === 'library' ? { tab: 'library' } : {}, { replace: true })

  return { tab, setTab }
}
