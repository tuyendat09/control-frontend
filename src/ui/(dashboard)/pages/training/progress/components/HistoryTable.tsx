import { cn } from '@/lib/cn'
import { fmtInt, fmtNum } from '@/lib/format'
import type { ExerciseHistoryRow } from '@/types'
import { CardList } from '@/ui/shared/components/Card'
import { useT } from '@/ui/shared/hooks/useT'

const GRID = 'grid grid-cols-[64px_1fr_1fr] gap-2 px-[18px]'

export function HistoryTable({ rows }: { rows: ExerciseHistoryRow[] }) {
  const t = useT()

  return (
    <CardList className="mx-5">
      <div className={cn(GRID, 'py-[10px] text-[10.5px] tracking-[.08em] text-tx3 uppercase')}>
        <div>{t('Ngày', 'Date')}</div>
        <div className="text-center">Top set</div>
        <div className="text-right">Volume</div>
      </div>
      {rows.map((row, i) => {
        const current = i === 0
        return (
          <div
            key={row.date}
            className={cn(
              GRID,
              'items-center py-[13px] text-[13.5px] tabular-nums transition-colors duration-[180ms]',
              current ? 'bg-tint' : 'hover:bg-tint',
            )}
          >
            <div className={cn('text-[12.5px]', current ? 'font-semibold text-tx' : 'text-tx3')}>{row.date}</div>
            <div className={cn('text-center', current ? 'font-semibold' : 'text-tx2')}>
              {fmtNum(row.kg)} × {row.reps}
            </div>
            <div className={cn('flex items-center justify-end gap-[7px]', !current && 'text-tx2')}>
              {fmtInt(row.volume)}
              {row.pr && (
                <span className="rounded-[6px] bg-p-bg px-[7px] py-0.5 text-[10px] font-bold tracking-[.04em] text-p-tx">PR</span>
              )}
            </div>
          </div>
        )
      })}
    </CardList>
  )
}
