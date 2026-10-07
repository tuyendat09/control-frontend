import type { WeekDay } from '../hooks/useDayLog'
import { WeekDayCell } from './WeekDayCell'

export function WeekStrip({ days, onPick }: { days: WeekDay[]; onPick: (key: string) => void }) {
  return (
    <div className="grid grid-cols-7 gap-[3px]">
      {days.map((day) => (
        <WeekDayCell key={day.key} day={day} onPick={onPick} />
      ))}
    </div>
  )
}
