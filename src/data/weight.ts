import type { WeightEntry } from '@/types'

/** Weight 30 days ago — used for the "−1.6 kg · 30 days" delta. */
export const WEIGHT_BASELINE_30D = 73.2

/** Oldest first. The last entry is the current weight. */
export const INITIAL_WEIGHT_ENTRIES: WeightEntry[] = [
  { day: 3, kg: 72.6 },
  { day: 6, kg: 72.2 },
  { day: 8, kg: 71.7 },
  { day: 11, kg: 71.4 },
  { day: 13, kg: 71.6 },
]

/** 90-day trend before the current reading (oldest first). */
export const WEIGHT_TREND = [74.6, 74.2, 74.5, 73.4, 73.7, 72.6, 72.2, 72.4]
export const WEIGHT_TREND_LABELS = ['15/05', '15/06', '15/07', '15/08']
