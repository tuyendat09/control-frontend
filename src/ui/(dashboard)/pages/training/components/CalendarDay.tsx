import { cn } from '@/lib/cn'
import type { CalendarCell } from '../hooks/useCalendar'

interface CalendarDayProps {
  cell: CalendarCell
  onSelect: (date: string) => void
}

export function CalendarDay({ cell, onSelect }: CalendarDayProps) {
  return (
    <button
      type="button"
      aria-pressed={cell.selected}
      aria-current={cell.today ? 'date' : undefined}
      onClick={() => onSelect(cell.date)}
      className={cn(
        'flex h-[38px] flex-col items-center justify-center gap-[3px] rounded-[14px] text-[13px] transition-colors duration-[180ms]',
        cell.selected ? 'bg-acc font-semibold text-acc-tx' : 'text-tx2 hover:bg-tint hover:text-tx',
      )}
    >
      <span>{cell.day}</span>
      <span
        className={cn(
          'size-1 rounded-full',
          cell.trained ? (cell.selected ? 'bg-acc-tx opacity-75' : 'bg-tx3') : 'bg-transparent',
        )}
      />
    </button>
  )
}
