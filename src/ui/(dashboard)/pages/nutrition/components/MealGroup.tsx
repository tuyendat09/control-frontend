import type { MealType } from '@/types'
import { fmtInt } from '@/lib/format'
import { CardList } from '@/ui/shared/components/Card'
import { AddIcon } from '@/ui/shared/components/Icons'
import { SectionLabel } from '@/ui/shared/components/SectionLabel'
import { useT } from '@/ui/shared/hooks/useT'
import type { DayLog } from '../hooks/useDayLog'
import { MealItemRow } from './MealItemRow'

type Section = DayLog['sections'][number]

/** One meal of the selected day: header with total, its foods, and an "Add food" row. */
export function MealGroup({ section, log }: { section: Section; log: DayLog }) {
  const t = useT()
  const names: Record<MealType, string> = {
    breakfast: t('Bữa sáng', 'Breakfast'),
    lunch: t('Bữa trưa', 'Lunch'),
    dinner: t('Bữa tối', 'Dinner'),
    snack: t('Bữa phụ', 'Snack'),
  }
  const empty = section.items.length === 0

  return (
    <section>
      <div className="flex items-center justify-between px-1 pt-[22px] pb-[10px]">
        <SectionLabel>{names[section.meal]}</SectionLabel>
        <div className={empty ? 'text-[12px] text-tx3' : 'text-[12px] text-tx2 tabular-nums'}>
          {empty ? t('Chưa ghi', 'Not logged') : `${fmtInt(section.kcal)} kcal`}
        </div>
      </div>

      {empty ? (
        <button
          type="button"
          onClick={() => log.addFood(section.meal)}
          className="flex w-full items-center justify-center gap-2 rounded-[24px] border border-dashed border-line-hi p-5 text-[13.5px] text-tx2 transition-colors duration-200 hover:bg-tint"
        >
          <AddIcon size={15} />
          {t('Thêm món', 'Add food')}
        </button>
      ) : (
        <CardList>
          {section.items.map((item) => (
            <MealItemRow key={item.id} item={item} onRemove={() => log.remove(item)} />
          ))}
          <button
            type="button"
            onClick={() => log.addFood(section.meal)}
            className="flex w-full items-center gap-2 px-4 py-[13px] text-[13px] text-tx2 transition-colors duration-[180ms] hover:bg-tint hover:text-tx"
          >
            <AddIcon size={14} strokeWidth={2.2} />
            {t('Thêm món', 'Add food')}
          </button>
        </CardList>
      )}
    </section>
  )
}
