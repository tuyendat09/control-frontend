import { TRAINED_DAYS } from '@/data/training'
import { MONTH_DAYS, MONTH_LEADING_BLANKS, SAMPLE_TODAY } from '@/lib/date'
import { useTraining } from './useTraining'

export interface CalendarCell {
  day: number
  trained: boolean
  selected: boolean
  today: boolean
}

/** Monday-first grid for the sample month: leading blanks, then 1…31. */
export function useCalendar() {
  const { selectedDay, selectDay, madeDays } = useTraining()

  const blanks = Array.from({ length: MONTH_LEADING_BLANKS }, (_, i) => i)
  const cells: CalendarCell[] = Array.from({ length: MONTH_DAYS }, (_, i) => {
    const day = i + 1
    return {
      day,
      trained: TRAINED_DAYS.includes(day) || madeDays.includes(day),
      selected: day === selectedDay,
      today: day === SAMPLE_TODAY,
    }
  })

  return { blanks, cells, selectDay }
}
