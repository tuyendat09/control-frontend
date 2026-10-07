import { PageTitle } from '@/ui/shared/components/PageTitle'
import { Screen } from '@/ui/shared/components/Screen'
import { useT } from '@/ui/shared/hooks/useT'
import { BackToTodayPill } from './components/BackToTodayPill'
import { FoodLibrary } from './components/FoodLibrary'
import { MealLog } from './components/MealLog'
import { NutritionTabs } from './components/NutritionTabs'
import { useDayLog } from './hooks/useDayLog'
import { useNutritionTab } from './hooks/useNutritionTab'

export function NutritionPage() {
  const t = useT()
  const { tab, setTab } = useNutritionTab()
  const log = useDayLog()

  return (
    <Screen>
      <div className="flex items-end justify-between gap-3 px-6">
        <PageTitle>{t('Bữa ăn', 'Meals')}</PageTitle>
        {tab === 'log' && !log.isToday && <BackToTodayPill onClick={log.goToday} />}
      </div>
      <NutritionTabs tab={tab} onChange={setTab} />
      {tab === 'log' ? <MealLog log={log} /> : <FoodLibrary onDone={() => setTab('log')} />}
    </Screen>
  )
}
