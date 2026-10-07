import { cn } from '@/lib/cn'
import { formatDayMonth } from '@/lib/date'
import { fmtDelta, round1 } from '@/lib/format'
import { Card } from '@/ui/shared/components/Card'
import { SectionLabel } from '@/ui/shared/components/SectionLabel'
import { useT } from '@/ui/shared/hooks/useT'
import { useWeightStats } from '@/ui/shared/hooks/useWeightStats'

/** Last four weigh-ins, newest first, with the change vs. the previous entry. */
export function RecentWeights() {
  const t = useT()
  const { entries } = useWeightStats()

  const rows = entries
    .map((e, i) => ({ ...e, delta: i === 0 ? 0 : round1(e.kg - entries[i - 1].kg) }))
    .slice(-4)
    .reverse()

  return (
    <>
      <div className="mt-[18px] flex items-center justify-between px-0.5">
        <SectionLabel className="text-[10.5px]">{t('Lần ghi gần đây', 'Recent entries')}</SectionLabel>
        <div className="text-[11.5px] text-tx3">{t('4 lần cuối', 'last 4')}</div>
      </div>
      <Card className="mt-[10px] divide-y divide-line2 overflow-hidden rounded-[20px]">
        {rows.map((row) => (
          <div
            key={row.day}
            className="grid grid-cols-[64px_1fr_auto] items-center gap-[10px] px-4 py-3 text-[13.5px] tabular-nums transition-colors duration-[180ms] hover:bg-tint"
          >
            <div className="text-[12.5px] text-tx3">{formatDayMonth(row.day)}</div>
            <div className="font-medium">
              {row.kg.toFixed(1)} <span className="font-normal text-tx3">kg</span>
            </div>
            <div className={cn('text-[12px]', row.delta > 0 ? 'text-p-tx' : 'text-f-tx')}>{fmtDelta(row.delta)}</div>
          </div>
        ))}
      </Card>
    </>
  )
}
