import { createContext } from 'react'
import type { MealEntry, WeightEntry } from '@/types'

export interface TrackerValue {
  entries: MealEntry[]
  weightEntries: WeightEntry[]
  addEntry: (entry: Omit<MealEntry, 'id' | 'fresh'>) => void
  saveWeight: (kg: number) => void
}

export const TrackerContext = createContext<TrackerValue | null>(null)
