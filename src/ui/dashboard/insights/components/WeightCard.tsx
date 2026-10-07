import { Card } from '@/ui/shared/components/Card'
import { PlusIcon } from '@/ui/shared/components/Icons'
import { LineChart } from '@/ui/shared/components/LineChart'
import { useT } from '@/ui/shared/hooks/useT'
import { useDashboardUi } from '../../hooks/useDashboardUi'

interface WeightCardProps {
  weightLabel: string
  deltaLabel: string
  lastLabel: string
  series: number[]
  axis: string[]
}

export function WeightCard({ weightLabel, deltaLabel, lastLabel, series, axis }: WeightCardProps) {
  const t = useT()
  const { openWeight } = useDashboardUi()

  return (
    <Card className="mx-5 mt-5 p-5">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] tracking-[.1em] text-tx3 uppercase">{t('Cân nặng · 90 ngày', 'Weight · 90 days')}</div>
          <div className="mt-1 font-serif text-[34px] leading-[1.15]">
            {weightLabel} <span className="text-[16px] text-tx3">kg</span>
          </div>
          <div className="mt-1 text-[11.5px] text-tx3">
            {deltaLabel} · {lastLabel}
          </div>
        </div>
        <button
          type="button"
          onClick={openWeight}
          className="flex items-center gap-1.5 rounded-full bg-acc px-[13px] py-2 text-[12px] font-semibold whitespace-nowrap text-acc-tx transition-[transform,opacity] duration-[180ms] ease-soft hover:opacity-90 active:scale-95"
        >
          <PlusIcon size={13} strokeWidth={2.3} />
          {t('Ghi cân', 'Log')}
        </button>
      </div>
      <LineChart values={series} className="mt-[14px]" />
      <div className="mt-2 flex justify-between text-[10.5px] text-tx3">
        {axis.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </Card>
  )
}
