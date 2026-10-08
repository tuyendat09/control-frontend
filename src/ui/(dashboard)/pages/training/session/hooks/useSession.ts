import { useState } from 'react'
import { useNavigate } from 'react-router'
import { formatDayMonth } from '@/lib/date'
import { useT } from '@/ui/shared/hooks/useT'
import { useToast } from '@/ui/shared/hooks/useToast'
import { useSessionDay } from '../../hooks/useSessionDay'
import { useTraining } from '../../hooks/useTraining'

/** Logic for the session sheet: which exercise is expanded, tick/add sets, finish or save. */
export function useSession(day: string) {
  const t = useT()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const training = useTraining()
  const session = useSessionDay(day)

  const [openId, setOpenId] = useState<string | null>(null)
  // Default to the first exercise until the user picks another.
  const expandedId = openId ?? session.exercises[0]?.id ?? null

  const readOnly = session.kind === 'past' && !session.editing

  const toggleSet = (exerciseId: string, setId: string) => {
    if (!readOnly) training.toggleSet(day, exerciseId, setId)
  }

  const finish = () => {
    training.timer.stop()
    training.stopEditing(day)
    showToast(
      session.kind === 'past'
        ? t('Đã lưu thay đổi', 'Changes saved')
        : t(`Đã lưu buổi tập · ${session.stats.sets} sets`, `Session saved · ${session.stats.sets} sets`),
    )
    navigate('/training')
  }

  const create = () => {
    training.createSession(day)
    showToast(t(`Đã tạo buổi tập cho ngày ${formatDayMonth(day)}`, `Session created for ${formatDayMonth(day)}`))
  }

  return {
    ...session,
    ghost: training.ghost,
    toggleGhost: training.toggleGhost,
    timer: training.timer,
    expandedId,
    expand: setOpenId,
    readOnly,
    toggleSet,
    addSet: (exerciseId: string) => training.addSet(day, exerciseId),
    startEditing: () => training.startEditing(day),
    finish,
    create,
    close: () => navigate('/training'),
    openProgress: (exerciseId: string) => navigate(`/training/day/${day}/progress/${exerciseId}`),
  }
}
