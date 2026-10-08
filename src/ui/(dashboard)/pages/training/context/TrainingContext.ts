import { createContext } from 'react'
import type { DayState, ExerciseLog } from '@/types'

export interface TrainingValue {
  /** Days are local calendar days, `YYYY-MM-DD`. */
  selectedDay: string
  selectDay: (day: string) => void
  /** Days where the user created a session this visit. */
  madeDays: string[]
  dayKind: (day: string) => DayState
  getExercises: (day: string) => ExerciseLog[]
  createSession: (day: string) => void
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
