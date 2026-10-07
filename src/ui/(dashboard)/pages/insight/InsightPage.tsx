import { PageTitle } from '@/ui/shared/components/PageTitle'
import { Screen } from '@/ui/shared/components/Screen'
import { useT } from '@/ui/shared/hooks/useT'
import { CaloriesCard } from './components/CaloriesCard'
import { EnergyTiles } from './components/EnergyTiles'
import { VolumeCard } from './components/VolumeCard'
import { WeightCard } from './components/WeightCard'
import { useInsights } from './hooks/useInsights'

export function InsightPage() {
  const t = useT()
  const insights = useInsights()

  return (
    <Screen>
      <PageTitle className="px-6">{t('Số liệu', 'Insights')}</PageTitle>
      <WeightCard
        weightLabel={insights.weightLabel}
        deltaLabel={insights.deltaLabel}
        lastLabel={insights.lastLabel}
        series={insights.weightSeries}
        axis={insights.weightAxis}
      />
      <CaloriesCard bars={insights.calorieBars} />
      <EnergyTiles />
      <VolumeCard />
    </Screen>
  )
}
