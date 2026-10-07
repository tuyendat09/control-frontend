import { cn } from '@/lib/cn'
import type { MealType } from '@/types'
import { useT } from '@/ui/shared/hooks/useT'

interface MealPickerProps {
  value: MealType
  onChange: (meal: MealType) => void
}

export function MealPicker({ value, onChange }: MealPickerProps) {
  const t = useT()
  const meals: { value: MealType; label: string }[] = [
    { value: 'breakfast', label: t('Sáng', 'Breakfast') },
    { value: 'lunch', label: t('Trưa', 'Lunch') },
    { value: 'dinner', label: t('Tối', 'Dinner') },
    { value: 'snack', label: t('Phụ', 'Snack') },
  ]

  return (
    <>
      <div className="mt-4 px-0.5 text-[10.5px] tracking-[.11em] text-tx3 uppercase">{t('Thêm vào', 'Add to')}</div>
      <div className="mt-[9px] flex gap-[7px]" role="radiogroup">
        {meals.map((meal) => (
          <button
            key={meal.value}
            type="button"
            role="radio"
            aria-checked={meal.value === value}
            onClick={() => onChange(meal.value)}
            className={cn(
              'flex-1 rounded-[12px] border py-[9px] text-center text-[12.5px] font-medium transition-all duration-200',
              meal.value === value ? 'border-acc bg-acc text-acc-tx' : 'border-line text-tx2',
            )}
          >
            {meal.label}
          </button>
        ))}
      </div>
    </>
  )
}
