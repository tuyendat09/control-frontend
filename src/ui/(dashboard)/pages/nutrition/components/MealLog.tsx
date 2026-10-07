import { LockIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'
import { useAnimationDayChange } from '../hooks/useAnimationDayLog'
import type { DayLog } from '../hooks/useDayLog'
import { useDaySwipe } from '../hooks/useDaySwipe'
import { DateNavigator } from './DateNavigator'
import { DaySummary } from './DaySummary'
import { EmptyDayCard } from './EmptyDayCard'
import { MealGroup } from './MealGroup'

/** Nutrition → Log: pick a day, see its summary and meals. Swipe sideways to change day. */
export function MealLog({ log }: { log: DayLog }) {
  const t = useT()
  const dayRef = useAnimationDayChange(log.selectedKey)
  const swipe = useDaySwipe(log.shift)

  return (
    <>
      <DateNavigator log={log} />

      <div ref={dayRef} style={{ touchAction: 'pan-y' }} {...swipe}>
        <DaySummary log={log} />
        {log.isEmpty && <EmptyDayCard log={log} />}

        <div className="px-5">
          {log.sections.map((section) => (
            <MealGroup key={section.meal} section={section} log={log} />
          ))}
        </div>

        <div className="mx-6 mt-[22px] flex items-center gap-2 text-[11.5px] leading-normal text-tx3">
          <LockIcon size={13} className="flex-none" />
          {t('Mỗi ngày lưu riêng trên máy bạn. Vuốt ngang để đổi ngày.', 'Each day is saved on your device. Swipe sideways to change day.')}
        </div>
      </div>
    </>
  )
}
