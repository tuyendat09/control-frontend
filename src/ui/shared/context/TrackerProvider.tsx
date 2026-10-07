import { useMemo, useState, type ReactNode } from 'react'
import { INITIAL_ENTRIES } from '@/data/nutrition'
import { INITIAL_WEIGHT_ENTRIES } from '@/data/weight'
import { SAMPLE_TODAY } from '@/lib/date'
import type { MealEntry, WeightEntry } from '@/types'
import { TrackerContext, type TrackerValue } from './TrackerContext'

/**
 * Local-first store for today's meals and weight log.
 * In-memory for now — swap the setters for Dexie writes when persistence lands.
 */
export function TrackerProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<MealEntry[]>(INITIAL_ENTRIES)
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>(INITIAL_WEIGHT_ENTRIES)

  const value = useMemo<TrackerValue>(
    () => ({
      entries,
      weightEntries,
      addEntry: (entry) =>
        setEntries((prev) => [...prev, { ...entry, id: crypto.randomUUID(), fresh: true }]),
      saveWeight: (kg) =>
        setWeightEntries((prev) => [
          ...prev.filter((w) => w.day !== SAMPLE_TODAY),
          { day: SAMPLE_TODAY, kg },
        ]),
    }),
    [entries, weightEntries],
  )

  return <TrackerContext value={value}>{children}</TrackerContext>
}
