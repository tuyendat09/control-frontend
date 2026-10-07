import { CALORIES_7D } from '@/data/insights'
import { WD_SHORT_EN, WD_SHORT_VI } from '@/lib/date'
import { WEIGHT_TREND, WEIGHT_TREND_LABELS } from '@/data/weight'
import { usePreferences } from '@/ui/shared/hooks/usePreferences'
import { useWeightStats } from '@/ui/shared/hooks/useWeightStats'

export function useInsights() {
  const { lang } = usePreferences()
  const { weight, weightLabel, deltaLabel, lastLabel } = useWeightStats()

  const weekdays = lang === 'vi' ? WD_SHORT_VI : WD_SHORT_EN

  return {
    weightLabel,
    deltaLabel,
    lastLabel,
    /** Current reading is the final point of the 90-day trend. */
    weightSeries: [...WEIGHT_TREND, weight],
    weightAxis: WEIGHT_TREND_LABELS,
    calorieBars: CALORIES_7D.map((value, i) => ({ label: weekdays[i], value })),
  }
}
