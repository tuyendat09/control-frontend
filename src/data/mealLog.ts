import { addDays, appToday, dateKey } from '@/lib/date'
import type { MealEntry, MealItem, MealType } from '@/types'

/**
 * Sample food-log history. Replaced by real persisted data once storage lands.
 * Today matches the Home screen; Aug 13 is deliberately empty (to show the empty state).
 */

// name · qty · kcal · P · C · F
const F: Record<string, [string, string, number, number, number, number]> = {
  oat: ['Yến mạch', '60g', 228, 8, 40, 4],
  ban: ['Chuối', '1 quả', 89, 1, 23, 0.3],
  whey: ['Whey', '1 scoop', 103, 24, 2, 1],
  bmi: ['Bánh mì trứng', '1 ổ', 380, 16, 45, 14],
  xoi: ['Xôi gà', '1 gói', 450, 18, 62, 13],
  rice: ['Cơm trắng', '200g', 260, 5, 57, 0.6],
  suon: ['Sườn nướng', '180g', 460, 34, 4, 34],
  bunbo: ['Bún bò', '1 tô', 520, 30, 60, 16],
  comga: ['Cơm gà', '1 dĩa', 610, 42, 70, 14],
  pho: ['Phở bò tái', '1 tô', 480, 28, 60, 12],
  uc: ['Ức gà áp chảo', '200g', 330, 62, 0, 7],
  khoai: ['Khoai lang', '200g', 172, 3, 40, 0.2],
  ca: ['Cá hồi', '150g', 310, 30, 0, 20],
  rice2: ['Cơm trắng', '150g', 195, 4, 43, 0.4],
  shake: ['Shake sau tập', '1 ly', 280, 30, 30, 4],
  yog: ['Sữa chua Hy Lạp', '170g', 100, 17, 6, 0.7],
}

// Three templates per meal; past days pick one by date.
const T: Record<MealType, string[][]> = {
  breakfast: [['oat', 'ban', 'whey'], ['bmi'], ['xoi']],
  lunch: [['rice', 'suon'], ['bunbo'], ['comga']],
  dinner: [['pho'], ['uc', 'khoai'], ['ca', 'rice2']],
  snack: [['shake'], ['yog'], []],
}

const MEALS: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack']
const TIME: Record<MealType, string> = { breakfast: '07:20', lunch: '12:10', dinner: '18:30', snack: '16:00' }

const item = (id: string): MealItem => {
  const [name, qty, kcal, p, c, f] = F[id]
  return { id: crypto.randomUUID(), name, qty, kcal, macros: { p, c, f } }
}

function makeEntry(date: string, meal: MealType, ids: string[]): MealEntry {
  const items = ids.map(item)
  return {
    id: crypto.randomUUID(),
    date,
    time: TIME[meal],
    name: items.map((i) => i.name).join(', '),
    meal,
    kcal: items.reduce((s, i) => s + i.kcal, 0),
    macros: {
      p: items.reduce((s, i) => s + i.macros.p, 0),
      c: items.reduce((s, i) => s + i.macros.c, 0),
      f: items.reduce((s, i) => s + i.macros.f, 0),
    },
    items,
  }
}

/** Entries for every day of the sample month up to (and including) today. */
export function buildSeedEntries(): MealEntry[] {
  const today = appToday()
  const todayKey = dateKey(today)
  const out: MealEntry[] = []

  for (let n = 1; n <= today.getDate(); n++) {
    const day = new Date(today.getFullYear(), today.getMonth(), n)
    const key = dateKey(day)

    if (key === todayKey) {
      out.push(makeEntry(key, 'breakfast', T.breakfast[0]), makeEntry(key, 'lunch', T.lunch[0]), makeEntry(key, 'snack', T.snack[0]))
      continue
    }
    const empty = n === 13 || (day < addDays(today, -7) && n % 6 === 0)
    if (empty) continue

    MEALS.forEach((meal, i) => {
      const ids = T[meal][(n * 7 + i * 3) % 3]
      if (ids.length) out.push(makeEntry(key, meal, ids))
    })
  }
  return out
}
