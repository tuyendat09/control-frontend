import { formatDate } from '@/lib/date'
import { Button } from '@/ui/shared/components/Button'
import { CopyIcon } from '@/ui/shared/components/Icons'
import { usePreferences } from '@/ui/shared/hooks/usePreferences'
import { useT } from '@/ui/shared/hooks/useT'
import type { DayLog } from '../hooks/useDayLog'

/** Shown when the selected day has no entries at all. */
export function EmptyDayCard({ log }: { log: DayLog }) {
  const t = useT()
  const { lang } = usePreferences()
  const from = formatDate(log.previousDay, lang)

  return (
    <div className="mx-5 mt-3 flex flex-col items-center gap-1.5 rounded-[24px] border border-dashed border-line-hi px-[22px] py-[26px] text-center">
      <div className="font-serif text-[22px]">{t('Ngày này chưa ghi gì', 'Nothing logged this day')}</div>
      <div className="max-w-[250px] text-[13px] leading-normal text-tx2">
        {t('Ăn giống hôm trước? Chép lại rồi sửa cho nhanh.', 'Ate the same as the day before? Copy it, then adjust.')}
      </div>
      <Button glow onClick={log.copyPrevious} className="mt-3 h-[46px] px-[18px] text-[14px]">
        <CopyIcon size={15} />
        {t(`Chép từ ${from}`, `Copy from ${from}`)}
      </Button>
    </div>
  )
}
