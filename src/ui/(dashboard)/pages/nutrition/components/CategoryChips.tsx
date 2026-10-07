import { cn } from '@/lib/cn'
import { useT } from '@/ui/shared/hooks/useT'
import type { LibraryFilter } from '../hooks/useFoodLibrary'

interface CategoryChipsProps {
  value: LibraryFilter
  onChange: (filter: LibraryFilter) => void
}

export function CategoryChips({ value, onChange }: CategoryChipsProps) {
  const t = useT()
  const chips: { value: LibraryFilter; label: string }[] = [
    { value: 'all', label: t('Tất cả', 'All') },
    { value: 'protein', label: t('Đạm', 'Protein') },
    { value: 'carbs', label: t('Tinh bột', 'Carbs') },
    { value: 'mine', label: t('Của tôi', 'Mine') },
  ]

  return (
    <div className="mt-[14px] flex flex-wrap gap-[7px]">
      {chips.map((chip) => (
        <button
          key={chip.value}
          type="button"
          onClick={() => onChange(chip.value)}
          className={cn(
            'rounded-full px-[13px] py-[7px] text-[12.5px] transition-all duration-200',
            chip.value === value
              ? 'bg-acc text-acc-tx'
              : 'border border-line text-tx2 hover:border-tx3 hover:text-tx',
          )}
        >
          {chip.label}
        </button>
      ))}
    </div>
  )
}
