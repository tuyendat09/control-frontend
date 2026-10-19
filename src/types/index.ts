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
  macros: Macros
}

export interface MealEntry {
  id: string
  /** Local calendar day the meal belongs to, `YYYY-MM-DD`. */
  date: string
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
  /** Local calendar day, `YYYY-MM-DD`. */
  day: string
  kg: number
}

export interface SetLog {
  id: string
  kg: number
  reps: number
  done: boolean
  prev?: { kg: number; reps: number }
}

export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core'
export type Equipment = 'barbell' | 'dumbbell' | 'cable' | 'machine' | 'body'
/** Drives the mascot guide. */
export type MovementPattern =
  | 'squat'
  | 'hinge'
  | 'push-horizontal'
  | 'push-vertical'
  | 'pull-horizontal'
  | 'pull-vertical'
  | 'curl'
  | 'extend'
  | 'hold'

/** One entry of the exercise library (shared seed + the user's own). */
export interface Exercise {
  id: string
  name: LocalizedText
  muscle: MuscleGroup
  equipment: Equipment
  pattern?: MovementPattern
  custom?: boolean
}

/** Latest logged work for an exercise; `daysAgo` is relative to today (sample data). */
export interface ExerciseLast {
  daysAgo: number
  sets: number
  reps: number
  kg?: number
  /** How many sessions it appears in (ranks suggestions). */
  count: number
}

export interface ExerciseLog {
  id: string
  name: string
  nameVi: string
  equipment: Equipment
  /** Empty when the exercise has no history yet. */
  lastDate: string
  /** e.g. "4×8 @ 60kg"; empty when the exercise has no history yet. */
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
