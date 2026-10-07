export type Lang = 'vi' | 'en'
export type Theme = 'light' | 'dark'

/** Translate helper: t(vi, en). */
export type Translate = (vi: string, en: string) => string

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface Macros {
  p: number
  c: number
  f: number
}

export interface LocalizedText {
  vi: string
  en: string
}

export interface MealItem {
  id: string
  name: string
  qty: string
  kcal: number
}

export interface MealEntry {
  id: string
  time: string
  name: string
  meal: MealType
  kcal: number
  macros: Macros
  items: MealItem[]
  /** Added during this session (rendered with the "just added" treatment). */
  fresh?: boolean
}

export type FoodCategory = 'protein' | 'carbs'

export interface Food {
  id: string
  name: string
  category: FoodCategory
  /** Per 100g */
  kcal: number
  macros: Macros
}

export interface QuickCombo {
  id: string
  name: LocalizedText
  kcal: number
  macros: Macros
}

export interface WeightEntry {
  /** Day of the sample month */
  day: number
  kg: number
}

export interface SetLog {
  id: string
  kg: number
  reps: number
  done: boolean
  prev?: { kg: number; reps: number }
}

export interface ExerciseLog {
  id: string
  name: string
  lastDate: string
  /** e.g. "4×8 @ 60kg" */
  lastSummary: string
  sets: SetLog[]
}

export type DayState = 'today' | 'past' | 'empty'

export interface ExerciseHistoryRow {
  date: string
  kg: number
  reps: number
  volume: number
  pr?: boolean
}

export interface ExerciseHistory {
  sessions: number
  /** Top-set weight over time, oldest first */
  weights: number[]
  /** Newest first */
  rows: ExerciseHistoryRow[]
}
