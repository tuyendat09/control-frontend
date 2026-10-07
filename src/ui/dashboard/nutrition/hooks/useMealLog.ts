import type { MealEntry, MealType } from '@/types'

const ORDER: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack']

export interface MealGroupData {
  meal: MealType
  entries: MealEntry[]
  kcal: number
}

/** Groups today's entries by meal. Snack only shows up once something is logged there. */
export function useMealLog(entries: MealEntry[]): MealGroupData[] {
  return ORDER.map((meal) => {
    const inMeal = entries.filter((e) => e.meal === meal)
    return { meal, entries: inMeal, kcal: inMeal.reduce((sum, e) => sum + e.kcal, 0) }
  }).filter((g) => g.meal !== 'snack' || g.entries.length > 0)
}
