import { useMemo, useState, type ReactNode } from 'react'
import { useMatch } from 'react-router'
import { buildSession, dayKindOf, type SessionKind } from '@/data/training'
import { SAMPLE_TODAY } from '@/lib/date'
import type { ExerciseLog } from '@/types'
import { useRestTimer } from '../hooks/useRestTimer'
import { TrainingContext, type TrainingValue } from './TrainingContext'

/** What a day looks like before the user touches it. */
function seedKind(day: number, madeDays: number[]): SessionKind | null {
  const kind = dayKindOf(day, madeDays)
  if (kind === 'empty') return null
  if (day === SAMPLE_TODAY) return 'today'
  return kind === 'past' ? 'past' : 'new'
}

/**
 * Training state that must outlive the overview ⇄ session ⇄ progress navigation:
 * selected day, per-day set logs, ghost column toggle and the rest timer.
 */
export function TrainingProvider({ children }: { children: ReactNode }) {
  const deepLinked = Number(useMatch('/training/day/:day/*')?.params.day)
  const [selectedDay, setSelectedDay] = useState(deepLinked > 0 ? deepLinked : SAMPLE_TODAY)
  const [madeDays, setMadeDays] = useState<number[]>([])
  const [sessions, setSessions] = useState<Record<number, ExerciseLog[]>>({})
  const [ghost, setGhost] = useState(true)
  const [editingDays, setEditingDays] = useState<number[]>([])
  const timer = useRestTimer()

  const value = useMemo<TrainingValue>(() => {
    const seed = (day: number, made = madeDays) => {
      const kind = seedKind(day, made)
      return kind ? buildSession(kind) : []
    }
    const read = (day: number) => sessions[day] ?? seed(day)

    const update = (day: number, fn: (exercises: ExerciseLog[]) => ExerciseLog[]) =>
      setSessions((prev) => ({ ...prev, [day]: fn(prev[day] ?? seed(day)) }))

    return {
      selectedDay,
      selectDay: setSelectedDay,
      madeDays,
      dayKind: (day) => dayKindOf(day, madeDays),
      getExercises: read,
      createSession: (day) => {
        setMadeDays((prev) => (prev.includes(day) ? prev : [...prev, day]))
        setSessions((prev) => ({ ...prev, [day]: buildSession('new') }))
        timer.stop()
      },
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
  }, [selectedDay, madeDays, sessions, ghost, editingDays, timer])

  return <TrainingContext value={value}>{children}</TrainingContext>
}
