import { createContext } from 'react'
import type { DayState, Equipment, Exercise, ExerciseLog, MuscleGroup } from '@/types'

export interface TrainingValue {
  /** Days are local calendar days, `YYYY-MM-DD`. */
  selectedDay: string
  selectDay: (day: string) => void
  /** Days where the user created a session this visit. */
  madeDays: string[]
  dayKind: (day: string) => DayState
  getExercises: (day: string) => ExerciseLog[]
  /** Empty by default; `copy` starts from the sample lifts. */
  createSession: (day: string, copy?: boolean) => void
  /** Exercise library: seed + the user's own. */
  library: Exercise[]
  createExercise: (name: string, muscle: MuscleGroup, equipment: Equipment) => Exercise
  /** Appends to that day's session in the given order, skipping ones already in it. */
  addExercises: (day: string, ids: string[]) => void
  toggleSet: (day: string, exerciseId: string, setId: string) => void
  addSet: (day: string, exerciseId: string) => void
  ghost: boolean
  toggleGhost: () => void
  editingDays: string[]
  startEditing: (day: string) => void
  stopEditing: (day: string) => void
  timer: {
    seconds: number
    running: boolean
    toggle: () => void
    stop: () => void
  }
}

export const TrainingContext = createContext<TrainingValue | null>(null)
