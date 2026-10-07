import { useState } from 'react'
import { EXERCISE_HISTORY } from '@/data/training'
import { round1 } from '@/lib/format'

export type ProgressTab = 'weight' | 'volume'

/** Derived numbers for the exercise progress sheet (top-set weight trend + kg × rep bars). */
export function useExerciseProgress(exerciseId: string) {
  const [tab, setTab] = useState<ProgressTab>('weight')
  const history = EXERCISE_HISTORY[exerciseId]
  if (!history) return null

  const { weights, rows } = history
  const min = Math.min(...weights)
  const max = Math.max(...weights)
  const step = (max - min) / 3
  const latest = rows[0]

  return {
    tab,
    setTab,
    sessions: history.sessions,
    weights,
    currentTop: weights[weights.length - 1],
    delta: round1(weights[weights.length - 1] - weights[0]),
    /** Four evenly spaced axis labels, min → max. */
    ticks: [0, 1, 2, 3].map((i) => round1(min + step * i)),
    latest,
    latestTotal: latest.kg * latest.reps,
    /** Oldest first, for the bar chart. */
    bars: [...rows].reverse().map((r) => ({ label: r.date, value: r.kg * r.reps })),
    rows,
  }
}
