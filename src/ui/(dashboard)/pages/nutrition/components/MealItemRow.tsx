import { fmtInt } from '@/lib/format'
import { CloseIcon } from '@/ui/shared/components/Icons'
import { MacroChips } from '@/ui/shared/components/MacroChip'
import { useT } from '@/ui/shared/hooks/useT'
import type { LogItem } from '../hooks/useDayLog'

/** One logged food: name · qty, macro chips, kcal, remove. */
export function MealItemRow({ item, onRemove }: { item: LogItem; onRemove: () => void }) {
  const t = useT()

  return (
    <div className="flex items-center gap-3 px-4 py-[14px] transition-colors duration-[180ms] hover:bg-tint">
      <div className="min-w-0 flex-1">
        <div className="text-[14px]">
          {item.name} <span className="text-tx3">· {item.qty}</span>
        </div>
        <MacroChips macros={item.macros} size="md" className="mt-[7px]" />
      </div>
      <div className="text-[13.5px] font-semibold tabular-nums">{fmtInt(item.kcal)}</div>
      <button
        type="button"
        aria-label={`${t('Xoá', 'Remove')} ${item.name}`}
        onClick={onRemove}
        className="flex size-7 items-center justify-center rounded-[9px] text-tx3 transition-all duration-[180ms] hover:bg-tint hover:text-tx active:scale-90"
      >
        <CloseIcon size={12} strokeWidth={2.4} />
      </button>
    </div>
  )
}
