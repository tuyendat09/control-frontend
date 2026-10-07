import { createContext } from 'react'
import type { DayState, ExerciseLog } from '@/types'

export interface TrainingValue {
  selectedDay: number
  selectDay: (day: number) => void
  /** Days where the user created a session this visit. */
  madeDays: number[]
  dayKind: (day: number) => DayState
  getExercises: (day: number) => ExerciseLog[]
  createSession: (day: number) => void
  toggleSet: (day: number, exerciseId: string, setId: string) => void
  addSet: (day: number, exerciseId: string) => void
  ghost: boolean
  toggleGhost: () => void
  editingDays: number[]
  startEditing: (day: number) => void
  stopEditing: (day: number) => void
  timer: {
    seconds: number
    running: boolean
    toggle: () => void
    stop: () => void
  }
}

export const TrainingContext = createContext<TrainingValue | null>(null)
