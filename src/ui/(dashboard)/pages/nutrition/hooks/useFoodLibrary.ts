import { useState } from 'react'
import { FOODS } from '@/data/nutrition'
import { SAMPLE_NOW } from '@/lib/date'
import { normalize } from '@/lib/format'
import type { Food } from '@/types'
import { useT } from '@/ui/shared/hooks/useT'
import { useToast } from '@/ui/shared/hooks/useToast'
import { useTracker } from '@/ui/shared/hooks/useTracker'

export type LibraryFilter = 'all' | 'protein' | 'carbs' | 'mine'

export function useFoodLibrary() {
  const t = useT()
  const { showToast } = useToast()
  const { addEntry } = useTracker()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<LibraryFilter>('all')

  const q = normalize(query.trim())
  const foods = FOODS.filter((f) => {
    // "Mine" = foods the user created; none exist until custom foods are implemented.
    if (filter === 'mine') return false
    if (filter !== 'all' && f.category !== filter) return false
    return q === '' || normalize(f.name).includes(q)
  })

  /** Adds a 100g serving to dinner. */
  const addFood = (food: Food) => {
    addEntry({
      time: SAMPLE_NOW,
      name: food.name,
      meal: 'dinner',
      kcal: food.kcal,
      macros: food.macros,
      items: [{ id: crypto.randomUUID(), name: food.name, qty: '100g', kcal: food.kcal }],
    })
    showToast(t('Đã thêm món vào bữa tối', 'Added to dinner'))
  }

  return { query, setQuery, filter, setFilter, foods, addFood }
}
