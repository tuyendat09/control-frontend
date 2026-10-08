import { addDays, appToday, dateKey, formatDayMonth } from '@/lib/date'
import type { WeightEntry } from '@/types'

const daysAgo = (n: number) => dateKey(addDays(appToday(), -n))

/** Weight 30 days ago — used for the "−1.6 kg · 30 days" delta. */
export const WEIGHT_BASELINE_30D = 73.2

/** Oldest first. The last entry is the current weight. */
export const INITIAL_WEIGHT_ENTRIES: WeightEntry[] = [
  { day: daysAgo(12), kg: 72.6 },
  { day: daysAgo(9), kg: 72.2 },
  { day: daysAgo(7), kg: 71.7 },
  { day: daysAgo(4), kg: 71.4 },
  { day: daysAgo(2), kg: 71.6 },
]

/** 90-day trend before the current reading (oldest first). */
export const WEIGHT_TREND = [74.6, 74.2, 74.5, 73.4, 73.7, 72.6, 72.2, 72.4]
export const WEIGHT_TREND_LABELS = [90, 60, 30, 0].map((n) => formatDayMonth(daysAgo(n)))
