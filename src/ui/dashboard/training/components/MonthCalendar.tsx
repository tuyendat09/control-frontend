import { WD_SHORT_EN, WD_SHORT_VI } from '@/lib/date'
import { Card } from '@/ui/shared/components/Card'
import { ChevronLeftIcon, ChevronRightIcon } from '@/ui/shared/components/Icons'
import { usePreferences } from '@/ui/shared/hooks/usePreferences'
import { useT } from '@/ui/shared/hooks/useT'
import { useCalendar } from '../hooks/useCalendar'
import { CalendarDay } from './CalendarDay'

const NAV_BUTTON =
  'flex size-7 items-center justify-center rounded-[9px] text-tx2 transition-colors duration-[180ms] hover:bg-tint hover:text-tx'

export function MonthCalendar() {
  const t = useT()
  const { lang } = usePreferences()
  const { blanks, cells, selectDay } = useCalendar()
  const weekdays = lang === 'vi' ? WD_SHORT_VI : WD_SHORT_EN

  return (
    <Card className="mx-5 mt-[18px] px-[14px] pt-4 pb-3">
      <div className="flex items-center justify-between px-1.5 pb-3">
        {/* Only the sample month has data, so month navigation is visual for now. */}
        <button type="button" aria-label={t('Tháng trước', 'Previous month')} aria-disabled="true" tabIndex={-1} className={NAV_BUTTON}>
          <ChevronLeftIcon size={15} />
        </button>
        <div className="text-[14px] font-semibold tracking-[-.01em]">{t('Tháng 8, 2026', 'August 2026')}</div>
        <button type="button" aria-label={t('Tháng sau', 'Next month')} aria-disabled="true" tabIndex={-1} className={NAV_BUTTON}>
          <ChevronRightIcon size={15} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 pb-1.5 text-center text-[10.5px] text-tx3">
        {weekdays.map((wd) => (
          <div key={wd}>{wd}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center">
        {blanks.map((i) => (
          <div key={`blank-${i}`} />
        ))}
        {cells.map((cell) => (
          <CalendarDay key={cell.day} cell={cell} onSelect={selectDay} />
        ))}
      </div>

      <div className="mt-[10px] flex items-center gap-[7px] border-t border-line2 px-1.5 pt-3 pb-0.5 text-[11px] text-tx3">
        <span className="size-1 rounded-full bg-tx3" />
        {t('ngày có buổi tập', 'day with a session')}
      </div>
    </Card>
  )
}
