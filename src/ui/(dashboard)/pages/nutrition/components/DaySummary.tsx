import { cn } from '@/lib/cn'
import { formatDate } from '@/lib/date'
import { fmtInt } from '@/lib/format'
import { MacroSquare, type MacroKey } from '@/ui/shared/components/MacroChip'
import { useAnimationFill } from '@/ui/shared/hooks/useAnimationFill'
import { usePreferences } from '@/ui/shared/hooks/usePreferences'
import { useT } from '@/ui/shared/hooks/useT'
import type { DayLog } from '../hooks/useDayLog'

const FILL: Record<MacroKey, string> = { p: 'bg-p-dot', c: 'bg-c-dot', f: 'bg-f-dot' }

function MacroStat({ macro, label, value, target }: { macro: MacroKey; label: string; value: number; target: number }) {
  const fill = useAnimationFill(Math.min(100, (value / target) * 100))

  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11.5px] text-tx2">
        <MacroSquare macro={macro} />
        {label}
      </div>
      <div className="mt-[5px] text-[13px] font-semibold tabular-nums">
        {Math.round(value)}
        <span className="font-normal text-tx3">/{target}g</span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line">
        <div ref={fill} className={cn('h-full rounded-full', FILL[macro])} />
      </div>
    </div>
  )
}

/** kcal vs target, status chip, and P/C/F bars for the selected day. */
export function DaySummary({ log }: { log: DayLog }) {
  const t = useT()
  const { lang } = usePreferences()
  const { totals, targets, status } = log
  const fill = useAnimationFill(Math.min(100, (totals.kcal / targets.kcal) * 100), 0.6)

  const dayLabel = formatDate(log.selected, lang)

  return (
    <section className="mx-5 mt-3 rounded-[24px] border border-line bg-surf2 px-5 pt-5 pb-[18px] shadow-hero">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] tracking-[.11em] text-tx3 uppercase">
            {log.isToday ? `${t('Hôm nay', 'Today')} · ${dayLabel}` : dayLabel}
          </div>
          <div className="mt-2 font-serif text-[34px] leading-none tabular-nums">
            {fmtInt(totals.kcal)}
            <span className="ml-1.5 font-sans text-[12px] tracking-[.06em] text-tx3">/ {fmtInt(targets.kcal)} KCAL</span>
          </div>
        </div>
        <div
          className={cn(
            'rounded-[9px] bg-tint px-[10px] py-1.5 text-[12px] font-semibold whitespace-nowrap',
            status.kind === 'over' ? 'text-p-tx' : 'text-tx2',
          )}
        >
          {status.label}
        </div>
      </div>

      <div className="mt-[14px] h-1.5 overflow-hidden rounded-full bg-line">
        <div ref={fill} className="h-full rounded-full bg-acc" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-[14px]">
        <MacroStat macro="p" label={t('Đạm', 'Protein')} value={totals.p} target={targets.p} />
        <MacroStat macro="c" label={t('Tinh bột', 'Carbs')} value={totals.c} target={targets.c} />
        <MacroStat macro="f" label={t('Béo', 'Fat')} value={totals.f} target={targets.f} />
      </div>
    </section>
  )
}
