import { createContext } from 'react'
import type { MealEntry, WeightEntry } from '@/types'

export interface TrackerValue {
  entries: MealEntry[]
  weightEntries: WeightEntry[]
  /** Adds a meal entry. `date` defaults to today — Home, quick-add and the scanner always log to today. */
  addEntry: (entry: Omit<MealEntry, 'id' | 'fresh' | 'date'> & { date?: string }) => void
  /** Removes one food from an entry; the entry disappears once its last food is gone. */
  removeItem: (entryId: string, itemId: string) => void
  /** Inserts or replaces an entry by id (used to undo a removal). */
  upsertEntry: (entry: MealEntry) => void
  /** Copies every entry of `fromDate` onto `toDate`. */
  copyDay: (fromDate: string, toDate: string) => void
  saveWeight: (kg: number) => void
}

export const TrackerContext = createContext<TrackerValue | null>(null)
