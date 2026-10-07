import { cn } from '@/lib/cn'
import type { MealEntry } from '@/types'
import { MacroChips } from '@/ui/shared/components/MacroChip'
import { useAnimationRise } from '@/ui/shared/hooks/useAnimationRise'

/** One logged meal: time well · name + macro chips · kcal. */
export function MealRow({ entry }: { entry: MealEntry }) {
  const ref = useAnimationRise(Boolean(entry.fresh))

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-[14px] px-[18px] py-[15px] transition-colors duration-[180ms] hover:bg-tint',
        entry.fresh && 'bg-tint',
      )}
    >
      <div
        className={cn(
          'flex size-9 flex-none items-center justify-center rounded-[14px] text-[10px] tracking-[.05em] text-tx3',
          entry.fresh ? 'bg-surf' : 'bg-tint',
        )}
      >
        {entry.time}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-medium">{entry.name}</div>
        <MacroChips macros={entry.macros} className="mt-[7px]" />
      </div>
      <div className="text-[14px] font-semibold">{entry.kcal}</div>
    </div>
  )
}
