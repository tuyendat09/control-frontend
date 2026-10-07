import { cn } from '@/lib/cn'
import { useAnimationFill } from '@/ui/shared/hooks/useAnimationFill'
import type { WeekDay } from '../hooks/useDayLog'

/** One day in the week strip: weekday, date, and a mini bar of kcal ÷ target. */
export function WeekDayCell({ day, onPick }: { day: WeekDay; onPick: (key: string) => void }) {
  const fill = useAnimationFill(day.pct)

  return (
    <button
      type="button"
      disabled={day.future}
      aria-pressed={day.selected}
      aria-current={day.today ? 'date' : undefined}
      onClick={() => onPick(day.key)}
      className={cn(
        'flex h-16 flex-col items-center justify-center gap-1 rounded-[15px] transition-colors duration-[220ms] disabled:pointer-events-none disabled:opacity-[.32]',
        day.selected ? 'bg-acc text-acc-tx' : 'text-tx hover:shadow-[inset_0_0_0_1px_var(--lineHi)]',
      )}
    >
      <span className="text-[10.5px] tracking-[.04em] opacity-[.72]">{day.weekday}</span>
      <span className={cn('text-[15px] leading-none tabular-nums', (day.selected || day.today) && 'font-semibold')}>{day.date}</span>
      <span
        className={cn('h-[3px] w-5 overflow-hidden rounded-full', day.selected ? 'bg-[rgba(127,127,127,.35)]' : 'bg-line')}
      >
        <span
          ref={fill}
          className={cn('block h-full rounded-full', day.selected ? 'bg-acc-tx' : day.over ? 'bg-p-dot' : 'bg-tx')}
        />
      </span>
    </button>
  )
}
