import type { MealType } from '@/types'
import { CardList } from '@/ui/shared/components/Card'
import { AddIcon } from '@/ui/shared/components/Icons'
import { SectionLabel } from '@/ui/shared/components/SectionLabel'
import { useT } from '@/ui/shared/hooks/useT'
import type { MealGroupData } from '../hooks/useMealLog'

interface MealGroupProps {
  group: MealGroupData
  onAddFood: () => void
}

export function MealGroup({ group, onAddFood }: MealGroupProps) {
  const t = useT()
  const names: Record<MealType, string> = {
    breakfast: t('Bữa sáng', 'Breakfast'),
    lunch: t('Bữa trưa', 'Lunch'),
    dinner: t('Bữa tối', 'Dinner'),
    snack: t('Bữa phụ', 'Snack'),
  }
  const empty = group.entries.length === 0

  return (
    <section className="mt-[22px] first:mt-0">
      <div className="flex items-center justify-between px-1 pb-[10px]">
        <SectionLabel>{names[group.meal]}</SectionLabel>
        {empty ? (
          <div className="text-[12px] text-tx3">{t('Chưa ghi', 'Not logged')}</div>
        ) : (
          <div className="text-[12px] text-tx2">{group.kcal} kcal</div>
        )}
      </div>

      {empty ? (
        <button
          type="button"
          onClick={onAddFood}
          className="flex w-full items-center justify-center gap-2 rounded-[24px] border border-dashed border-line p-[22px] text-[13.5px] text-tx2 transition-colors duration-200 hover:bg-tint"
        >
          <AddIcon size={15} />
          {t('Thêm món', 'Add food')}
        </button>
      ) : (
        <CardList>
          {group.entries
            .flatMap((e) => e.items)
            .map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-4 py-[14px]">
                <div className="flex-1 text-[14px]">
                  {item.name} <span className="text-tx3">· {item.qty}</span>
                </div>
                <div className="text-[13.5px] font-semibold">{item.kcal}</div>
              </div>
            ))}
        </CardList>
      )}
    </section>
  )
}

