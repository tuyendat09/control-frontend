import type { QuickCombo } from '@/types'
import { SAMPLE_NOW } from '@/lib/date'
import { useT } from '@/ui/shared/hooks/useT'
import { useToast } from '@/ui/shared/hooks/useToast'
import { useTodayTotals } from '@/ui/shared/hooks/useTodayTotals'
import { useTracker } from '@/ui/shared/hooks/useTracker'

export function useHome() {
  const t = useT()
  const { showToast } = useToast()
  const { addEntry } = useTracker()
  const { totals, targets, entries } = useTodayTotals()

  /** Quick-add chip → appends a row to today's log and confirms with a toast. */
  const addCombo = (combo: QuickCombo) => {
    const name = t(combo.name.vi, combo.name.en)
    addEntry({
      time: SAMPLE_NOW,
      name,
      meal: 'dinner',
      kcal: combo.kcal,
      macros: combo.macros,
      items: [{ id: crypto.randomUUID(), name, qty: '1', kcal: combo.kcal }],
    })
    showToast(t(`Đã thêm ${combo.kcal} kcal vào hôm nay`, `Added ${combo.kcal} kcal to today`))
  }

  return { totals, targets, entries, addCombo }
}
