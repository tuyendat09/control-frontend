import { LineChart } from '@/ui/shared/components/LineChart'
import { useT } from '@/ui/shared/hooks/useT'
import type { useExerciseProgress } from '../hooks/useExerciseProgress'

type Progress = NonNullable<ReturnType<typeof useExerciseProgress>>

export function WeightProgress({ progress }: { progress: Progress }) {
  const t = useT()
  const delta = `${progress.delta >= 0 ? '+' : '−'}${Math.abs(progress.delta)}`

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] tracking-[.1em] text-tx3 uppercase">{t('Top set hiện tại', 'Current top set')}</div>
          <div className="mt-1 font-serif text-[32px] leading-[1.15]">
            {progress.currentTop} <span className="text-[15px] text-tx3">kg</span>
          </div>
        </div>
        <div className="pb-1.5 text-[12.5px] text-tx2">{delta} kg / 90d</div>
      </div>
      <LineChart values={progress.weights} padTop={22} padBottom={18} dotClassName="fill-tx" className="mt-[14px]" />
      <div className="mt-2 flex justify-between text-[10.5px] text-tx3">
        {progress.ticks.map((tick, i) => (
          <span key={tick}>{i === progress.ticks.length - 1 ? `${tick} kg` : tick}</span>
        ))}
      </div>
    </div>
  )
}
