import { cn } from '@/lib/cn'
import { useT } from '@/ui/shared/hooks/useT'
import { usePreferences } from '@/ui/shared/hooks/usePreferences'
import type { CalendarCell } from '../hooks/useDayLog'

interface MonthGridProps {
  cells: CalendarCell[]
  onPick: (key: string) => void
}

const DOT = { none: 'bg-transparent', on: 'bg-tx', over: 'bg-p-dot' }

/** Month dropdown: Monday-first grid; the dot shows whether that day was on target, over, or not logged. */
export function MonthGrid({ cells, onPick }: MonthGridProps) {
  const t = useT()
  const { lang } = usePreferences()
  const weekdays = lang === 'vi' ? ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  return (
    <div>
      <div data-month-head className="grid grid-cols-7 gap-0.5 pb-1.5 text-center text-[10.5px] text-tx3">
        {weekdays.map((w, i) => (
          <div key={i}>{w}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((cell) =>
          cell.kind === 'blank' ? (
            <div key={cell.key} />
          ) : (
            <button
              key={cell.key}
              data-month-cell
              type="button"
              disabled={cell.future}
              aria-pressed={cell.selected}
              onClick={() => onPick(cell.key)}
              className={cn(
                'flex h-11 flex-col items-center justify-center gap-1 rounded-[14px] text-[13.5px] tabular-nums transition-colors duration-[180ms] disabled:pointer-events-none disabled:opacity-30',
                cell.selected ? 'bg-acc text-acc-tx' : 'text-tx hover:bg-tint',
                (cell.selected || cell.today) && 'font-semibold',
                cell.today && !cell.selected && 'shadow-[inset_0_0_0_1px_var(--lineHi)]',
              )}
            >
              <span>{cell.date}</span>
              <span className={cn('size-[5px] rounded-full', cell.selected && cell.status !== 'none' ? 'bg-acc-tx' : DOT[cell.status])} />
            </button>
          ),
        )}
      </div>

      <div data-month-legend className="mt-3 flex justify-center gap-4 border-t border-line2 pt-3 text-[11.5px] text-tx2">
        <Legend dot="bg-tx" label={t('Trong mục tiêu', 'On target')} />
        <Legend dot="bg-p-dot" label={t('Vượt', 'Over')} />
        <Legend dot="border border-tx3" label={t('Chưa ghi', 'Not logged')} />
      </div>
    </div>
  )
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn('size-1.5 rounded-full', dot)} />
      {label}
    </div>
  )
}
