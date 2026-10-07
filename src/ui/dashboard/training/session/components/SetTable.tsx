import type { ExerciseLog } from '@/types'
import { AddIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'
import { setGrid } from './setGrid'
import { SetRow } from './SetRow'

interface SetTableProps {
  exercise: ExerciseLog
  ghost: boolean
  readOnly: boolean
  onToggleSet: (setId: string) => void
  onAddSet: () => void
}

export function SetTable({ exercise, ghost, readOnly, onToggleSet, onAddSet }: SetTableProps) {
  const t = useT()
  const activeId = exercise.sets.find((s) => !s.done)?.id

  return (
    <div>
      <div
        className="grid items-center gap-1.5 border-b border-line2 px-[18px] py-[10px] text-[10.5px] tracking-[.08em] text-tx3 uppercase"
        style={setGrid(ghost)}
      >
        <div>Set</div>
        <div className="text-center">Kg</div>
        <div className="text-center">Rep</div>
        <div className="text-center">Rest</div>
        {ghost && <div className="text-center">{t('Trước', 'Last')}</div>}
        <div />
      </div>

      <div className="divide-y divide-line2">
        {exercise.sets.map((set, i) => (
          <SetRow
            key={set.id}
            index={i + 1}
            set={set}
            status={set.done ? 'done' : set.id === activeId ? 'active' : 'pending'}
            ghost={ghost}
            readOnly={readOnly}
            onToggle={() => onToggleSet(set.id)}
          />
        ))}
      </div>

      {!readOnly && (
        <button
          type="button"
          onClick={onAddSet}
          className="flex w-full items-center justify-center gap-[7px] border-t border-line2 px-[18px] py-3 text-[12.5px] text-tx2 transition-colors duration-200 hover:bg-tint"
        >
          <AddIcon size={13} strokeWidth={2.2} />
          {t('Thêm set', 'Add set')}
        </button>
      )}
    </div>
  )
}
