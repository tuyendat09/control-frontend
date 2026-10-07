import { WEIGHT_BASELINE_30D } from '@/data/weight'
import { SAMPLE_TODAY } from '@/lib/date'
import { fmtDelta } from '@/lib/format'
import { useT } from './useT'
import { useTracker } from './useTracker'

/** Current weight, 30-day delta, and the "last entry" label shared by Home / Insights / sheets. */
export function useWeightStats() {
  const t = useT()
  const { weightEntries } = useTracker()
  const last = weightEntries[weightEntries.length - 1]
  const weight = last.kg
  const delta30 = weight - WEIGHT_BASELINE_30D
  const daysAgo = SAMPLE_TODAY - last.day

  const ago =
    daysAgo <= 0
      ? t('hôm nay', 'today')
      : t(`${daysAgo} ngày trước`, `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`)

  return {
    weight,
    weightLabel: weight.toFixed(1),
    deltaLabel: `${fmtDelta(delta30)} kg`,
    lastLabel: t(`Lần cuối ${weight.toFixed(1)} kg · ${ago}`, `Last ${weight.toFixed(1)} kg · ${ago}`),
    entries: weightEntries,
  }
}
