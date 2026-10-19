import { TRAINED_DAYS } from '@/data/training'
import { addDays, appToday, dateKey, daysInMonth, monthLeadingBlanks } from '@/lib/date'
import { useTraining } from './useTraining'

export interface CalendarCell {
  /** Day of the month, shown in the cell. */
  day: number
  /** Local calendar day, `YYYY-MM-DD`. */
  date: string
  trained: boolean
  selected: boolean
  today: boolean
}

/** Monday-first grid for the current month: leading blanks, then every day. */
export function useCalendar() {
  const { selectedDay, selectDay, madeDays } = useTraining()

  const today = appToday()
  const first = addDays(today, 1 - today.getDate())
  const blanks = Array.from({ length: monthLeadingBlanks(today) }, (_, i) => i)
  const cells: CalendarCell[] = Array.from({ length: daysInMonth(today) }, (_, i) => {
    const date = dateKey(addDays(first, i))
    return {
      day: i + 1,
      date,
      trained: TRAINED_DAYS.includes(date) || madeDays.includes(date),
      selected: date === selectedDay,
      today: date === dateKey(today),
    }
  })

  return { blanks, cells, selectDay }
}
