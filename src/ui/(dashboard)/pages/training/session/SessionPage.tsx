import { Navigate, Outlet, useParams } from 'react-router'
import { isDateKey } from '@/lib/date'
import { Button } from '@/ui/shared/components/Button'
import { OverlayScreen } from '@/ui/shared/components/Screen'
import { useT } from '@/ui/shared/hooks/useT'
import { EmptyDay } from './components/EmptyDay'
import { ExerciseCard } from './components/ExerciseCard'
import { GhostToggle } from './components/GhostToggle'
import { PastBanner } from './components/PastBanner'
import { RestTimerCard } from './components/RestTimerCard'
import { SessionHeader } from './components/SessionHeader'
import { useSession } from './hooks/useSession'

export function SessionPage() {
  const params = useParams()
  const day = params.day ?? ''

  if (!isDateKey(day)) return <Navigate to="/training" replace />
  return <Session day={day} />
}

/** The "day sheet": exercises and sets for one date. Progress (nested route) opens on top. */
function Session({ day }: { day: string }) {
  const t = useT()
  const s = useSession(day)

  return (
    <div className="absolute inset-0 z-[12]">
      <OverlayScreen>
        <SessionHeader label={s.label} sub={s.sub} onBack={s.close} />

        {s.kind === 'empty' ? (
          <EmptyDay onCreate={s.create} />
        ) : (
          <>
            <GhostToggle on={s.ghost} onToggle={s.toggleGhost} />
            {s.kind === 'today' && <RestTimerCard timer={s.timer} />}
            {s.kind === 'past' && <PastBanner editing={s.editing} onEdit={s.startEditing} />}

            {s.exercises.map((exercise, i) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                expanded={exercise.id === s.expandedId}
                first={i === 0}
                ghost={s.ghost}
                readOnly={s.readOnly}
                onExpand={() => s.expand(exercise.id)}
                onToggleSet={s.toggleSet}
                onAddSet={() => s.addSet(exercise.id)}
                onOpenProgress={() => s.openProgress(exercise.id)}
              />
            ))}

            {(s.kind === 'today' || s.editing) && (
              <Button onClick={s.finish} className="mx-5 mt-5 h-[50px] w-[calc(100%-40px)] text-[14.5px] hover:opacity-[.88]">
                {s.kind === 'today' ? t('Kết thúc buổi tập', 'Finish session') : t('Lưu thay đổi', 'Save changes')}
              </Button>
            )}
          </>
        )}
      </OverlayScreen>
      <Outlet />
    </div>
  )
}
