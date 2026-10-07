import type { Food, QuickCombo } from '@/types'

export const TARGETS = { kcal: 2100, p: 140, c: 230, f: 62, goalWeight: 68 }

export const QUICK_COMBOS: QuickCombo[] = [
  {
    id: 'usual-breakfast',
    name: { vi: 'Bữa sáng quen', en: 'Usual breakfast' },
    kcal: 420,
    macros: { p: 32, c: 54, f: 9 },
  },
  {
    id: 'chicken-rice',
    name: { vi: 'Ức gà + cơm', en: 'Chicken + rice' },
    kcal: 610,
    macros: { p: 48, c: 78, f: 12 },
  },
  {
    id: 'post-workout',
    name: { vi: 'Shake sau tập', en: 'Post-workout' },
    kcal: 280,
    macros: { p: 30, c: 22, f: 6 },
  },
]

export const FOODS: Food[] = [
  { id: 'chicken-breast', name: 'Ức gà áp chảo', category: 'protein', kcal: 165, macros: { p: 31, c: 0, f: 3.6 } },
  { id: 'pho-bo', name: 'Phở bò tái', category: 'carbs', kcal: 118, macros: { p: 9, c: 14, f: 2.4 } },
  { id: 'boiled-egg', name: 'Trứng luộc', category: 'protein', kcal: 155, macros: { p: 13, c: 1, f: 11 } },
  { id: 'greek-yogurt', name: 'Sữa chua Hy Lạp', category: 'protein', kcal: 59, macros: { p: 10, c: 3.6, f: 0.4 } },
]
