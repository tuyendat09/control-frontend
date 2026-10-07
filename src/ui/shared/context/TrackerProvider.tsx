import { useMemo, useState, type ReactNode } from 'react'
import { buildSeedEntries } from '@/data/mealLog'
import { INITIAL_WEIGHT_ENTRIES } from '@/data/weight'
import { SAMPLE_TODAY, appToday, dateKey } from '@/lib/date'
import type { MealEntry, WeightEntry } from '@/types'
import { TrackerContext, type TrackerValue } from './TrackerContext'

/**
 * Local-first store for the food log (all days) and the weight log.
 * In-memory for now — swap the setters for Dexie writes when persistence lands.
 */
export function TrackerProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<MealEntry[]>(buildSeedEntries)
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>(INITIAL_WEIGHT_ENTRIES)

  const value = useMemo<TrackerValue>(
    () => ({
      entries,
      weightEntries,
      addEntry: ({ date, ...entry }) =>
        setEntries((prev) => [
          ...prev,
          { ...entry, date: date ?? dateKey(appToday()), id: crypto.randomUUID(), fresh: true },
        ]),
      removeItem: (entryId, itemId) =>
        setEntries((prev) =>
          prev.flatMap((e) => {
            if (e.id !== entryId) return [e]
            const items = e.items.filter((i) => i.id !== itemId)
            if (items.length === 0) return []
            return [
              {
                ...e,
                items,
                kcal: items.reduce((s, i) => s + i.kcal, 0),
                macros: {
                  p: items.reduce((s, i) => s + i.macros.p, 0),
                  c: items.reduce((s, i) => s + i.macros.c, 0),
                  f: items.reduce((s, i) => s + i.macros.f, 0),
                },
              },
            ]
          }),
        ),
      upsertEntry: (entry) =>
        setEntries((prev) => (prev.some((e) => e.id === entry.id) ? prev.map((e) => (e.id === entry.id ? entry : e)) : [...prev, entry])),
      copyDay: (fromDate, toDate) =>
        setEntries((prev) => [
          ...prev,
          ...prev
            .filter((e) => e.date === fromDate)
            .map((e) => ({
              ...e,
              id: crypto.randomUUID(),
              date: toDate,
              fresh: false,
              items: e.items.map((i) => ({ ...i, id: crypto.randomUUID() })),
            })),
        ]),
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
