import { cn } from '@/lib/cn'
import { formatMonth, formatWeekRange } from '@/lib/date'
import { CalendarIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@/ui/shared/components/Icons'
import { usePreferences } from '@/ui/shared/hooks/usePreferences'
import { useT } from '@/ui/shared/hooks/useT'
import { useAnimationDateNavigator } from '../hooks/useAnimationDateNavigator'
import type { DayLog } from '../hooks/useDayLog'
import { MonthGrid } from './MonthGrid'
import { WeekStrip } from './WeekStrip'

const NAV =
  'flex size-[30px] items-center justify-center rounded-[10px] text-tx2 transition-colors duration-[180ms] hover:bg-tint hover:text-tx disabled:pointer-events-none disabled:opacity-30'

/** Week card. Tap the label to expand it in place into a month grid. */
export function DateNavigator({ log }: { log: DayLog }) {
  const t = useT()
  const { lang } = usePreferences()
  const label = log.calOpen ? formatMonth(log.month, lang) : formatWeekRange(log.monday, lang)
  const { bodyRef, weekRef, monthRef, chevronRef, labelRef } = useAnimationDateNavigator(log.calOpen, log.monthKey, label)

  return (
    <div className="mx-5 mt-3 rounded-[24px] border border-line bg-surf2 px-[10px] pt-3 pb-[10px] shadow-el">
      <div className="flex items-center justify-between px-1 pb-[10px]">
        <button type="button" aria-label={t('Trước', 'Previous')} onClick={log.navPrev} className={NAV}>
          <ChevronLeftIcon size={15} />
        </button>

        <button
          type="button"
          aria-expanded={log.calOpen}
          onClick={log.toggleCalendar}
          className="flex items-center gap-[7px] rounded-[10px] px-[10px] py-1.5 text-[13.5px] font-semibold tracking-[-.01em] transition-[background-color,transform] duration-[180ms] hover:bg-tint active:scale-[.97]"
        >
          <CalendarIcon size={14} />
          <span ref={labelRef}>{label}</span>
          <ChevronDownIcon ref={chevronRef} size={11} className="text-tx3" />
        </button>

        <button type="button" aria-label={t('Sau', 'Next')} disabled={log.nextDisabled} onClick={log.navNext} className={cn(NAV)}>
          <ChevronRightIcon size={15} />
        </button>
      </div>

      <div ref={bodyRef} className="relative overflow-hidden">
        <div ref={weekRef} className="absolute inset-x-0 top-0">
          <WeekStrip days={log.week} onPick={log.pickDay} />
        </div>
        <div ref={monthRef} className="absolute inset-x-0 top-0">
          <MonthGrid cells={log.cells} onPick={log.pickDay} />
        </div>
      </div>
    </div>
  )
}
