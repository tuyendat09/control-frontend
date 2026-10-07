import type { MealType } from '@/types'
import { formatDate, parseDateKey } from '@/lib/date'
import { usePreferences } from '@/ui/shared/hooks/usePreferences'
import { useT } from '@/ui/shared/hooks/useT'

interface LibraryTargetProps {
  meal: MealType
  date?: string
  onDone: () => void
}

/** Shown in the Library when it was opened from a day's meal ("Add food"). */
export function LibraryTarget({ meal, date, onDone }: LibraryTargetProps) {
  const t = useT()
  const { lang } = usePreferences()
  const names: Record<MealType, string> = {
    breakfast: t('Bữa sáng', 'Breakfast'),
    lunch: t('Bữa trưa', 'Lunch'),
    dinner: t('Bữa tối', 'Dinner'),
    snack: t('Bữa phụ', 'Snack'),
  }

  return (
    <div className="mb-[14px] flex items-center justify-between gap-3 rounded-[16px] bg-tint px-4 py-3 text-[12.5px] text-tx2">
      <span>
        {t('Đang thêm vào', 'Adding to')} <b className="font-semibold text-tx">{names[meal]}</b>
        {date && ` · ${formatDate(parseDateKey(date), lang)}`}
      </span>
      <button type="button" onClick={onDone} className="font-semibold text-tx underline underline-offset-[3px]">
        {t('Xong', 'Done')}
      </button>
    </div>
  )
}
