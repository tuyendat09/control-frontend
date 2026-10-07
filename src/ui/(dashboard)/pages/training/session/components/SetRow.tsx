import { cn } from '@/lib/cn'
import { fmtNum } from '@/lib/format'
import type { SetLog } from '@/types'
import { CheckIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'
import { setGrid } from './setGrid'

type SetStatus = 'done' | 'active' | 'pending'

interface SetRowProps {
  index: number
  set: SetLog
  status: SetStatus
  ghost: boolean
  readOnly: boolean
  onToggle: () => void
}

export function SetRow({ index, set, status, ghost, readOnly, onToggle }: SetRowProps) {
  const t = useT()
  const value = cn('text-center', status === 'active' ? 'font-semibold' : status === 'done' ? 'font-medium' : 'font-normal')

  return (
    <div
      className={cn(
        'grid items-center gap-1.5 px-[18px] py-[11px] text-[14px] tabular-nums transition-colors duration-[180ms]',
        status === 'active' ? 'bg-tint' : 'hover:bg-tint',
        status === 'pending' && 'text-tx3',
      )}
      style={setGrid(ghost)}
    >
      <div className={cn('text-[12.5px]', status === 'active' ? 'font-semibold text-tx' : 'text-tx3')}>{index}</div>
      <div className={value}>{fmtNum(set.kg)}</div>
      <div className={value}>{set.reps}</div>
      <div className="text-center text-[13px] text-tx2">{status === 'active' ? '—' : '2:00'}</div>
      {ghost && (
        <div className="text-center text-[12.5px] text-tx3 tabular-nums">
          {set.prev ? `${fmtNum(set.prev.kg)} × ${set.prev.reps}` : '—'}
        </div>
      )}
      <div className="flex justify-center">
        <button
          type="button"
          role="checkbox"
          aria-checked={set.done}
          aria-label={t(`Set ${index} hoàn thành`, `Set ${index} done`)}
          disabled={readOnly}
          onClick={onToggle}
          className="-m-[3px] flex size-[26px] items-center justify-center disabled:cursor-default"
        >
          {set.done ? (
            <span className="flex animate-tickpop items-center justify-center text-acc">
              <CheckIcon size={17} strokeWidth={2.4} />
            </span>
          ) : (
            <span
              className={cn(
                'size-5 rounded-[6px] border-[1.5px] transition-all duration-[180ms]',
                status === 'active' ? 'border-tx3' : 'border-line',
                !readOnly && 'hover:border-tx hover:bg-surf',
              )}
            />
          )}
        </button>
      </div>
    </div>
  )
}
