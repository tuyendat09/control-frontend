import { fmtNum } from '@/lib/format'
import { BarChart } from '@/ui/shared/components/BarChart'
import { useT } from '@/ui/shared/hooks/useT'
import type { useExerciseProgress } from '../hooks/useExerciseProgress'

type Progress = NonNullable<ReturnType<typeof useExerciseProgress>>

export function VolumeProgress({ progress }: { progress: Progress }) {
  const t = useT()

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] tracking-[.1em] text-tx3 uppercase">{t('Top set gần nhất', 'Latest top set')}</div>
          <div className="mt-1 font-serif text-[32px] leading-[1.15]">
            {fmtNum(progress.latest.kg)} <span className="text-[15px] text-tx3">× {progress.latest.reps}</span>
          </div>
        </div>
        <div className="pb-1.5 text-[12.5px] text-tx2">
          {fmtNum(progress.latestTotal)} kg {t('tổng', 'total')}
        </div>
      </div>
      <BarChart
        items={progress.bars}
        maxBarHeight={88}
        scale="min-max"
        gap={8}
        className="mt-4 h-24"
        barClassName="rounded-[7px] bg-tx3 opacity-35"
        activeBarClassName="rounded-[7px] bg-tx"
        labelClassName="text-[10px] text-tx3"
        activeLabelClassName="text-tx"
      />
    </div>
  )
}
