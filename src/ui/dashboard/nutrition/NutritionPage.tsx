import { PageTitle } from '@/ui/shared/components/PageTitle'
import { Screen } from '@/ui/shared/components/Screen'
import { useT } from '@/ui/shared/hooks/useT'
import { FoodLibrary } from './components/FoodLibrary'
import { MealLog } from './components/MealLog'
import { NutritionTabs } from './components/NutritionTabs'
import { useNutritionTab } from './hooks/useNutritionTab'

export function NutritionPage() {
  const t = useT()
  const { tab, setTab } = useNutritionTab()

  return (
    <Screen>
      <PageTitle className="px-6">{t('Bữa ăn', 'Meals')}</PageTitle>
      <NutritionTabs tab={tab} onChange={setTab} />
      {tab === 'log' ? <MealLog onAddFood={() => setTab('library')} /> : <FoodLibrary />}
    </Screen>
  )
}
