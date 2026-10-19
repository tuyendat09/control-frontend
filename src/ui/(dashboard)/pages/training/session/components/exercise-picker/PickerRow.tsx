import { EQUIPMENT_LABEL, EXERCISE_LAST, MUSCLE_LABEL, formatLast, lastDate } from '@/data/exercises'
import { cn } from '@/lib/cn'
import type { Exercise } from '@/types'
import { useT } from '@/ui/shared/hooks/useT'
import { useAnimationSelectRing } from '../../hooks/useAnimationSelectRing'

interface PickerRowProps {
  exercise: Exercise
  /** Tap order, 1-based; 0 when not selected. */
  order: number
  inSession: boolean
  first: boolean
  onToggle: () => void
}

export function PickerRow({ exercise, order, inSession, first, onToggle }: PickerRowProps) {
  const t = useT()
  const { ringRef, numberRef } = useAnimationSelectRing(order)
  const selected = order > 0

  const last = EXERCISE_LAST[exercise.id]
  // In VI the English name rides along as an alias.
  const alias = t(exercise.name.en !== exercise.name.vi ? exercise.name.en : '', '')
  const detail = last
    ? t(`Gần nhất ${lastDate(last)} · ${formatLast(last)}`, `Last ${lastDate(last)} · ${formatLast(last)}`)
    : [
        t(MUSCLE_LABEL[exercise.muscle].vi, MUSCLE_LABEL[exercise.muscle].en),
        t(EQUIPMENT_LABEL[exercise.equipment].vi, EQUIPMENT_LABEL[exercise.equipment].en),
        exercise.custom ? t('Tự tạo', 'Custom') : '',
      ]
        .filter(Boolean)
        .join(' · ')

  return (
    <button
      type="button"
      data-pk="row"
      aria-pressed={selected}
      onClick={onToggle}
      className={cn(
        'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-[180ms] hover:bg-tint',
        !first && 'border-t border-line2',
        selected && 'bg-tint',
      )}
    >
      <div className="min-w-0 flex-1">
        <div className={cn('flex items-center gap-[7px] text-[14.5px]', selected ? 'font-semibold' : 'font-medium')}>
          <span className="truncate">{t(exercise.name.vi, exercise.name.en)}</span>
          {inSession && (
            <span className="flex-none rounded-[6px] bg-tint px-1.5 py-0.5 text-[10.5px] font-medium text-tx3">
              {t('đã có', 'in session')}
            </span>
          )}
        </div>
        <div className="mt-0.5 text-[11.5px] text-tx3">{[alias, detail].filter(Boolean).join(' · ')}</div>
      </div>
      <span
        ref={ringRef}
        className={cn(
          'flex size-[26px] flex-none items-center justify-center rounded-full border-[1.5px] text-[12px] font-bold text-acc-tx transition-colors duration-[180ms]',
          selected ? 'border-acc bg-acc' : 'border-line-hi',
        )}
      >
        <span ref={numberRef} className="tabular-nums">
          {selected ? order : ''}
        </span>
      </span>
    </button>
  )
}
