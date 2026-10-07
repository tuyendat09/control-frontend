import type { ExerciseLog } from '@/types'
import { Card } from '@/ui/shared/components/Card'
import { ChevronRightIcon, TrendIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'
import { SetTable } from './SetTable'

interface ExerciseCardProps {
  exercise: ExerciseLog
  expanded: boolean
  first: boolean
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
  first,
  ghost,
  readOnly,
  onExpand,
  onToggleSet,
  onAddSet,
  onOpenProgress,
}: ExerciseCardProps) {
  const t = useT()
  const margin = first ? 'mt-4' : 'mt-[10px]'

  if (!expanded) {
    const topKg = Math.max(...exercise.sets.map((s) => s.kg))
    return (
      <button
        type="button"
        onClick={onExpand}
        className={`mx-5 ${margin} flex w-[calc(100%-40px)] items-center justify-between rounded-[24px] border border-line bg-surf2 px-[18px] py-4 text-left shadow-el transition-colors duration-200 hover:border-line-hi`}
      >
        <div>
          <div className="text-[15px] font-semibold">{exercise.name}</div>
          <div className="mt-0.5 text-[11.5px] text-tx3">
            {exercise.sets.length} sets · {topKg}kg
            {ghost && ` · ${t('trước', 'last')} ${exercise.lastSummary}`}
          </div>
        </div>
        <ChevronRightIcon size={17} strokeWidth={1.8} className="text-tx3" />
      </button>
    )
  }

  return (
    <Card className={`mx-5 ${margin} overflow-hidden`}>
      <div className="flex items-center justify-between border-b border-line px-[18px] py-[15px]">
        <div className="flex-1">
          <div className="text-[15px] font-semibold">{exercise.name}</div>
          {ghost && (
            <div className="mt-[3px] text-[11.5px] text-tx3">
              {t(`Gần nhất ${exercise.lastDate}`, `Last on ${exercise.lastDate}`)} · {exercise.lastSummary}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onOpenProgress}
          className="flex items-center gap-1.5 rounded-[10px] bg-tint px-[11px] py-1.5 text-[11.5px] text-tx2 transition-all duration-[180ms] hover:bg-acc hover:text-acc-tx"
        >
          <TrendIcon size={13} />
          {t('Tiến độ', 'Progress')}
        </button>
      </div>
      <SetTable
        exercise={exercise}
        ghost={ghost}
        readOnly={readOnly}
        onToggleSet={(setId) => onToggleSet(exercise.id, setId)}
        onAddSet={onAddSet}
      />
    </Card>
  )
}
