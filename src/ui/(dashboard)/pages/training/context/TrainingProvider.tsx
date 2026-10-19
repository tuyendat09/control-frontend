import { useMemo, useState, type ReactNode } from 'react'
import { useMatch } from 'react-router'
import { buildSession, dayKindOf, type SessionKind } from '@/data/training'
import { appToday, dateKey, isDateKey } from '@/lib/date'
import { SEED_EXERCISES, logFromExercise } from '@/data/exercises'
import type { Exercise, ExerciseLog } from '@/types'
import { useRestTimer } from '../hooks/useRestTimer'
import { TrainingContext, type TrainingValue } from './TrainingContext'

/** What a day looks like before the user touches it. */
function seedKind(day: string, madeDays: string[]): SessionKind | null {
  const kind = dayKindOf(day, madeDays)
  if (kind === 'empty') return null
  if (day === dateKey(appToday())) return 'today'
  return kind === 'past' ? 'past' : 'new'
}

/**
 * Training state that must outlive the overview ⇄ session ⇄ progress navigation:
 * selected day, per-day set logs, ghost column toggle and the rest timer.
 */
export function TrainingProvider({ children }: { children: ReactNode }) {
  const deepLinked = useMatch('/training/day/:day/*')?.params.day ?? ''
  const [selectedDay, setSelectedDay] = useState(isDateKey(deepLinked) ? deepLinked : dateKey(appToday()))
  const [madeDays, setMadeDays] = useState<string[]>([])
  const [sessions, setSessions] = useState<Record<string, ExerciseLog[]>>({})
  const [customExercises, setCustomExercises] = useState<Exercise[]>([])
  const [ghost, setGhost] = useState(true)
  const [editingDays, setEditingDays] = useState<string[]>([])
  const timer = useRestTimer()

  const value = useMemo<TrainingValue>(() => {
    const seed = (day: string, made = madeDays) => {
      const kind = seedKind(day, made)
      return kind ? buildSession(kind) : []
    }
    const read = (day: string) => sessions[day] ?? seed(day)
    const library = [...SEED_EXERCISES, ...customExercises]

    const update = (day: string, fn: (exercises: ExerciseLog[]) => ExerciseLog[]) =>
      setSessions((prev) => ({ ...prev, [day]: fn(prev[day] ?? seed(day)) }))

    return {
      selectedDay,
      selectDay: setSelectedDay,
      madeDays,
      dayKind: (day) => dayKindOf(day, madeDays),
      getExercises: read,
      createSession: (day, copy = false) => {
        setMadeDays((prev) => (prev.includes(day) ? prev : [...prev, day]))
        setSessions((prev) => ({ ...prev, [day]: copy ? buildSession('new') : [] }))
        timer.stop()
      },
      library,
      createExercise: (name, muscle, equipment) => {
        const exercise: Exercise = {
          id: `c-${crypto.randomUUID()}`,
          name: { vi: name, en: name },
          muscle,
          equipment,
          custom: true,
        }
        setCustomExercises((prev) => [...prev, exercise])
        return exercise
      },
      addExercises: (day, ids) =>
        update(day, (exercises) => {
          const have = new Set(exercises.map((e) => e.id))
          const added = ids
            .filter((id) => !have.has(id))
            .flatMap((id) => library.find((e) => e.id === id) ?? [])
            .map(logFromExercise)
          return [...exercises, ...added]
        }),
      toggleSet: (day, exerciseId, setId) => {
        const current = read(day)
          .find((e) => e.id === exerciseId)
          ?.sets.find((s) => s.id === setId)
        if (!current) return
        update(day, (exercises) =>
          exercises.map((ex) =>
            ex.id !== exerciseId
              ? ex
              : { ...ex, sets: ex.sets.map((s) => (s.id === setId ? { ...s, done: !s.done } : s)) },
          ),
        )
        // Ticking a set starts the rest countdown.
        if (!current.done) timer.restart()
      },
      addSet: (day, exerciseId) =>
        update(day, (exercises) =>
          exercises.map((ex) => {
            if (ex.id !== exerciseId) return ex
            const last = ex.sets[ex.sets.length - 1]
            return {
              ...ex,
              sets: [...ex.sets, { id: `${ex.id}-${crypto.randomUUID()}`, kg: last.kg, reps: last.reps, done: false }],
            }
          }),
        ),
      ghost,
      toggleGhost: () => setGhost((g) => !g),
      editingDays,
      startEditing: (day) => setEditingDays((prev) => (prev.includes(day) ? prev : [...prev, day])),
      stopEditing: (day) => setEditingDays((prev) => prev.filter((d) => d !== day)),
      timer: { seconds: timer.seconds, running: timer.running, toggle: timer.toggle, stop: timer.stop },
    }
    // `timer` functions are stable enough per render; recompute when timer state changes.
  }, [selectedDay, madeDays, sessions, customExercises, ghost, editingDays, timer])

  return <TrainingContext value={value}>{children}</TrainingContext>
}
