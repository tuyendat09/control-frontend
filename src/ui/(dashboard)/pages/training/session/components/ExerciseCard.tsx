import { EQUIPMENT_LABEL } from '@/data/exercises'
import { EXERCISE_HISTORY } from '@/data/training'
import type { ExerciseLog } from '@/types'
import { Card } from '@/ui/shared/components/Card'
import { ChevronRightIcon, TrendIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'
import { useAnimationReveal } from '../hooks/useAnimationReveal'
import { SetTable } from './SetTable'

interface ExerciseCardProps {
  exercise: ExerciseLog
  expanded: boolean
  /** 1-based place in the session. */
  position: number
  /** Place among the exercises just added (0-based), or null when it was already there. */
  revealOrder: number | null
  ghost: boolean
  readOnly: boolean
  onExpand: () => void
  onToggleSet: (exerciseId: string, setId: string) => void
  onAddSet: () => void
  onOpenProgress: () => void
}

export function ExerciseCard({
  exercise,
  expanded,
  position,
  revealOrder,
  ghost,
  readOnly,
  onExpand,
  onToggleSet,
  onAddSet,
  onOpenProgress,
}: ExerciseCardProps) {
  const t = useT()
  const revealRef = useAnimationReveal(revealOrder !== null, revealOrder ?? 0)
  const margin = position === 1 ? 'mt-4' : 'mt-[10px]'
  const name = t(exercise.nameVi, exercise.name)
  const equipment = EQUIPMENT_LABEL[exercise.equipment]
  const hasHistory = exercise.lastSummary !== ''
  const badge = (
    <span className="flex size-[26px] flex-none items-center justify-center rounded-[9px] bg-tint text-[12px] font-semibold text-tx2">
      {position}
    </span>
  )

  if (!expanded) {
    const topKg = Math.max(...exercise.sets.map((s) => s.kg))
    return (
      <div ref={revealRef}>
        <button
          type="button"
          onClick={onExpand}
          className={`mx-5 ${margin} flex w-[calc(100%-40px)] items-center gap-[14px] rounded-[24px] border border-line bg-surf2 px-[18px] py-4 text-left shadow-el transition-colors duration-200 hover:border-line-hi`}
        >
          {badge}
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-semibold">{name}</div>
            <div className="mt-0.5 text-[11.5px] text-tx3">
              {exercise.sets.length} sets{topKg > 0 && ` · ${topKg}kg`}
              {hasHistory
                ? ghost && ` · ${t('trước', 'last')} ${exercise.lastSummary}`
                : ` · ${t('Mới', 'New')} · ${t(equipment.vi, equipment.en)}`}
            </div>
          </div>
          <ChevronRightIcon size={17} strokeWidth={1.8} className="text-tx3" />
        </button>
      </div>
    )
  }

  return (
    <div ref={revealRef}>
      <Card className={`mx-5 ${margin} overflow-hidden`}>
        <div className="flex items-center gap-[14px] border-b border-line px-[18px] py-[15px]">
          {badge}
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-semibold">{name}</div>
            {ghost && (
              <div className="mt-[3px] text-[11.5px] text-tx3">
                {hasHistory
                  ? `${t(`Gần nhất ${exercise.lastDate}`, `Last on ${exercise.lastDate}`)} · ${exercise.lastSummary}`
                  : `${t('Mới', 'New')} · ${t(equipment.vi, equipment.en)}`}
              </div>
            )}
          </div>
          {EXERCISE_HISTORY[exercise.id] && (
            <button
              type="button"
              onClick={onOpenProgress}
              className="flex items-center gap-1.5 rounded-[10px] bg-tint px-[11px] py-1.5 text-[11.5px] text-tx2 transition-all duration-[180ms] hover:bg-acc hover:text-acc-tx"
            >
              <TrendIcon size={13} />
              {t('Tiến độ', 'Progress')}
            </button>
          )}
        </div>
        <SetTable
          exercise={exercise}
          ghost={ghost}
          readOnly={readOnly}
          onToggleSet={(setId) => onToggleSet(exercise.id, setId)}
          onAddSet={onAddSet}
        />
      </Card>
    </div>
  )
}
