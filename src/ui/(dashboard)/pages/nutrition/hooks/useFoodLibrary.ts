import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { FOODS } from '@/data/nutrition'
import { SAMPLE_NOW } from '@/lib/date'
import { normalize } from '@/lib/format'
import type { Food, MealType } from '@/types'
import { useT } from '@/ui/shared/hooks/useT'
import { useToast } from '@/ui/shared/hooks/useToast'
import { useTracker } from '@/ui/shared/hooks/useTracker'

export type LibraryFilter = 'all' | 'protein' | 'carbs' | 'mine'

const MEALS: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack']

export function useFoodLibrary() {
  const t = useT()
  const { showToast } = useToast()
  const { addEntry } = useTracker()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<LibraryFilter>('all')

  // "Add food" on a day's meal opens the library with `?meal=…&date=…`; otherwise log to dinner, today.
  const [params] = useSearchParams()
  const paramMeal = params.get('meal') as MealType | null
  const meal: MealType = paramMeal && MEALS.includes(paramMeal) ? paramMeal : 'dinner'
  const date = params.get('date') ?? undefined
  const mealName: Record<MealType, string> = {
    breakfast: t('bữa sáng', 'breakfast'),
    lunch: t('bữa trưa', 'lunch'),
    dinner: t('bữa tối', 'dinner'),
    snack: t('bữa phụ', 'snack'),
  }

  const q = normalize(query.trim())
  const foods = FOODS.filter((f) => {
    // "Mine" = foods the user created; none exist until custom foods are implemented.
    if (filter === 'mine') return false
    if (filter !== 'all' && f.category !== filter) return false
    return q === '' || normalize(f.name).includes(q)
  })

  /** Adds a 100g serving to the target meal (dinner by default). */
  const addFood = (food: Food) => {
    addEntry({
      time: SAMPLE_NOW,
      name: food.name,
      meal,
      date,
      kcal: food.kcal,
      macros: food.macros,
      items: [{ id: crypto.randomUUID(), name: food.name, qty: '100g', kcal: food.kcal, macros: food.macros }],
    })
    showToast(t(`Đã thêm món vào ${mealName[meal]}`, `Added to ${mealName[meal]}`))
  }

  return { query, setQuery, filter, setFilter, foods, addFood, target: params.get('meal') || date ? { meal, date } : null }
}
