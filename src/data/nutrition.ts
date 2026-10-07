import type { Food, MealEntry, QuickCombo } from '@/types'

export const TARGETS = { kcal: 2100, p: 140, c: 230, f: 62, goalWeight: 68 }

export const INITIAL_ENTRIES: MealEntry[] = [
  {
    id: 'e-breakfast',
    time: '07:20',
    name: 'Yến mạch, chuối, whey',
    meal: 'breakfast',
    kcal: 420,
    macros: { p: 32, c: 54, f: 9 },
    items: [
      { id: 'i1', name: 'Yến mạch', qty: '60g', kcal: 228 },
      { id: 'i2', name: 'Chuối', qty: '1 quả', kcal: 89 },
      { id: 'i3', name: 'Whey', qty: '1 scoop', kcal: 103 },
    ],
  },
  {
    id: 'e-lunch',
    time: '12:10',
    name: 'Cơm tấm sườn',
    meal: 'lunch',
    kcal: 720,
    macros: { p: 38, c: 82, f: 24 },
    items: [
      { id: 'i4', name: 'Cơm trắng', qty: '200g', kcal: 260 },
      { id: 'i5', name: 'Sườn nướng', qty: '180g', kcal: 460 },
    ],
  },
  {
    id: 'e-snack',
    time: '16:00',
    name: 'Sữa chua Hy Lạp',
    meal: 'snack',
    kcal: 280,
    macros: { p: 26, c: 18, f: 8 },
    items: [{ id: 'i6', name: 'Sữa chua Hy Lạp', qty: '1 hũ', kcal: 280 }],
  },
]

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
