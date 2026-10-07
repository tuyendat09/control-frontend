import type { Food } from '@/types'
import { Card } from '@/ui/shared/components/Card'
import { AddIcon } from '@/ui/shared/components/Icons'
import { MacroChips, MacroSquare } from '@/ui/shared/components/MacroChip'
import { useT } from '@/ui/shared/hooks/useT'

const GRID = 'grid grid-cols-[1fr_58px_44px] gap-2'

function MacroLegend() {
  const t = useT()
  const items = [
    { macro: 'p', letter: 'P', label: t('Đạm', 'Protein') },
    { macro: 'c', letter: 'C', label: t('Tinh bột', 'Carbs') },
    { macro: 'f', letter: 'F', label: t('Chất béo', 'Fat') },
  ] as const

  return (
    <div className="flex flex-col gap-[9px] border-b border-line px-4 py-[13px]">
      <div className="text-[10.5px] tracking-[.09em] text-tx3 uppercase">{t('Macro trên 100g', 'Macros per 100g')}</div>
      <div className="flex flex-wrap gap-[14px]">
        {items.map((i) => (
          <div key={i.macro} className="flex items-center gap-1.5 text-[11.5px] text-tx2">
            <MacroSquare macro={i.macro} className="size-2 rounded-[3px]" />
            <b className="font-semibold text-tx">{i.letter}</b> {i.label}
          </div>
        ))}
      </div>
    </div>
  )
}

interface FoodTableProps {
  foods: Food[]
  onAdd: (food: Food) => void
}

export function FoodTable({ foods, onAdd }: FoodTableProps) {
  const t = useT()

  return (
    <Card className="mt-4 overflow-hidden">
      <MacroLegend />
      <div className={`${GRID} border-b border-line2 px-4 py-[10px] text-[10.5px] tracking-[.09em] text-tx3 uppercase`}>
        <div>{t('Món', 'Food')}</div>
        <div className="text-right">Kcal</div>
        <div />
      </div>

      {foods.length === 0 && (
        <div className="px-4 py-6 text-center text-[13px] text-tx3">{t('Không có món nào', 'No foods found')}</div>
      )}

      <div className="divide-y divide-line2">
        {foods.map((food) => (
          <div
            key={food.id}
            className={`${GRID} items-center px-4 py-[14px] transition-colors duration-[180ms] hover:bg-tint`}
          >
            <div>
              <div className="text-[14px]">{food.name}</div>
              <MacroChips macros={food.macros} size="md" className="mt-[7px]" />
            </div>
            <div className="text-right text-[13.5px] font-semibold">{food.kcal}</div>
            <div className="flex justify-end">
              <button
                type="button"
                aria-label={`${t('Thêm', 'Add')} ${food.name}`}
                onClick={() => onAdd(food)}
                className="flex size-7 items-center justify-center rounded-[9px] bg-tint transition-all duration-[180ms] ease-soft hover:bg-acc hover:text-acc-tx active:scale-90"
              >
                <AddIcon size={13} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
