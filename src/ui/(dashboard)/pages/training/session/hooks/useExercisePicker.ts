import { useState } from 'react'
import { SHOW_SUGGESTIONS } from '@/data/exercises'
import { SESSION_NAME } from '@/data/training'
import { formatDayMonth } from '@/lib/date'
import { foldText } from '@/lib/text'
import { usePreferences } from '@/ui/shared/hooks/usePreferences'
import { useT } from '@/ui/shared/hooks/useT'
import { useToast } from '@/ui/shared/hooks/useToast'
import { useTraining } from '../../hooks/useTraining'
import { buildSections, hasExactName, type EquipmentFilter, type GroupFilter } from './pickerSections'

/** State and actions of the "Add exercise" sheet for one day. Closing discards the selection. */
export function useExercisePicker(day: string) {
  const t = useT()
  const { lang } = usePreferences()
  const { showToast } = useToast()
  const training = useTraining()
  const session = training.getExercises(day)

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<GroupFilter>('all')
  const [equipment, setEquipment] = useState<EquipmentFilter>('all')
  const [selected, setSelected] = useState<string[]>([])
  // Exercises appended by the last confirm: their session cards play the reveal.
  const [added, setAdded] = useState<string[]>([])

  const { sections, plain } = buildSections({
    library: training.library,
    session,
    sessionName: SESSION_NAME,
    query,
    group,
    equipment,
    suggest: SHOW_SUGGESTIONS,
    lang,
  })

  const name = query.trim()
  const folded = foldText(name)
  const resetInput = () => {
    setQuery('')
    setSelected([])
  }

  const show = () => {
    setAdded([])
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
    resetInput()
  }

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const confirm = () => {
    if (!selected.length) return
    const have = new Set(session.map((e) => e.id))
    const fresh = selected.filter((id) => !have.has(id))
    training.addExercises(day, selected)
    setAdded(fresh)
    if (fresh.length) {
      showToast(
        t(`Đã thêm ${fresh.length} bài vào ${formatDayMonth(day)}`, `Added ${fresh.length} to ${formatDayMonth(day)}`),
      )
    }
    setOpen(false)
    resetInput()
  }

  // A new exercise defaults to the active filters; the user fixes group/equipment later.
  const draftMuscle = group === 'all' ? 'chest' : group
  const draftEquipment = equipment === 'all' ? 'body' : equipment

  const create = () => {
    if (!name) return
    const exercise = training.createExercise(name, draftMuscle, draftEquipment)
    setSelected((prev) => [...prev, exercise.id])
    setQuery('')
  }

  return {
    open,
    show,
    close,
    query,
    setQuery,
    group,
    setGroup,
    equipment,
    setEquipment,
    selected,
    toggle,
    clearSelection: () => setSelected([]),
    confirm,
    sections,
    sessionIds: new Set(session.map((e) => e.id)),
    added,
    noMatch: !plain && !sections.length && !!folded,
    canCreate: !!folded && !hasExactName(training.library, folded),
    draftMuscle,
    draftEquipment,
    create,
  }
}

export type ExercisePicker = ReturnType<typeof useExercisePicker>
