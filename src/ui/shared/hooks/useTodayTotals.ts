import { TARGETS } from '@/data/nutrition'
import { useTracker } from './useTracker'

/** Calories + macros summed from today's logged meals. */
export function useTodayTotals() {
  const { entries } = useTracker()
  const totals = entries.reduce(
    (acc, e) => ({
      kcal: acc.kcal + e.kcal,
      p: acc.p + e.macros.p,
      c: acc.c + e.macros.c,
      f: acc.f + e.macros.f,
    }),
    { kcal: 0, p: 0, c: 0, f: 0 },
  )
  return { totals, targets: TARGETS, entries }
}
