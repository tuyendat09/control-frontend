import { fmtClock } from '@/lib/format'
import { useT } from '@/ui/shared/hooks/useT'
import type { TrainingValue } from '../../context/TrainingContext'

export function RestTimerCard({ timer }: { timer: TrainingValue['timer'] }) {
  const t = useT()
  const symbol = timer.running ? '❚❚' : timer.seconds === 0 ? '↺' : '▶'

  return (
    <div className="mx-5 mt-[14px] flex items-center justify-between rounded-[24px] bg-acc px-5 py-4 text-acc-tx shadow-hero">
      <div>
        <div className="text-[10.5px] tracking-[.11em] uppercase opacity-60">{t('Nghỉ giữa set', 'Rest timer')}</div>
        <div className="font-serif text-[32px] leading-[1.15] tabular-nums" aria-live="off">
          {fmtClock(timer.seconds)}
        </div>
      </div>
      <button
        type="button"
        aria-label={timer.running ? t('Tạm dừng', 'Pause') : t('Bắt đầu', 'Start')}
        onClick={timer.toggle}
        className="flex size-[50px] items-center justify-center rounded-full bg-acc-tx text-acc transition-transform duration-[180ms] ease-soft hover:scale-[1.06] active:scale-[.92]"
      >
        <span className="text-[12px] font-bold">{symbol}</span>
      </button>
    </div>
  )
}
