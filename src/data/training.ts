import type { ExerciseHistory, ExerciseLog, DayState } from '@/types'
import { addDays, appToday, dateKey } from '@/lib/date'

const daysAgo = (n: number) => dateKey(addDays(appToday(), -n))

/** Sample history as `YYYY-MM-DD` days, relative to today. */
export const TRAINED_DAYS = [14, 12, 10, 8, 7, 5, 3, 1, 0].map(daysAgo)
export const SESSION_COUNT = 23

export const SESSION_MINUTES: Record<Exclude<DayState, 'empty'>, number> = { today: 42, past: 48 }

/** Home "Session" tile recap. */
export const LAST_SESSION = { name: 'Push A', lifts: 5, sets: 18, minutes: 62 }

interface ExerciseTemplate {
  id: string
  name: string
  lastDate: string
  lastSummary: string
  sets: { kg: number; reps: number; prev: { kg: number; reps: number } }[]
}

const TEMPLATES: ExerciseTemplate[] = [
  {
    id: 'bench-press',
    name: 'Bench Press',
    lastDate: '08/08',
    lastSummary: '4×8 @ 60kg',
    sets: [
      { kg: 62.5, reps: 8, prev: { kg: 60, reps: 8 } },
      { kg: 62.5, reps: 8, prev: { kg: 60, reps: 8 } },
      { kg: 62.5, reps: 7, prev: { kg: 60, reps: 8 } },
      { kg: 62.5, reps: 8, prev: { kg: 60, reps: 7 } },
    ],
  },
  {
    id: 'incline-db-press',
    name: 'Incline DB Press',
    lastDate: '08/08',
    lastSummary: '3×10 @ 20kg',
    sets: [
      { kg: 22, reps: 10, prev: { kg: 20, reps: 10 } },
      { kg: 22, reps: 10, prev: { kg: 20, reps: 10 } },
      { kg: 22, reps: 10, prev: { kg: 20, reps: 10 } },
    ],
  },
  {
    id: 'cable-fly',
    name: 'Cable Fly',
    lastDate: '08/08',
    lastSummary: '3×12 @ 15kg',
    sets: [
      { kg: 15, reps: 12, prev: { kg: 15, reps: 12 } },
      { kg: 15, reps: 12, prev: { kg: 15, reps: 12 } },
      { kg: 15, reps: 12, prev: { kg: 15, reps: 12 } },
    ],
  },
]

export type SessionKind = 'today' | 'past' | 'new'

/** Fresh copy of the sample session with the right "done" flags for each kind. */
export function buildSession(kind: SessionKind): ExerciseLog[] {
  return TEMPLATES.map((ex, exIndex) => ({
    id: ex.id,
    name: ex.name,
    lastDate: ex.lastDate,
    lastSummary: ex.lastSummary,
    sets: ex.sets.map((s, i) => ({
      id: `${ex.id}-${i + 1}`,
      kg: s.kg,
      reps: s.reps,
      prev: s.prev,
      done: kind === 'past' || (kind === 'today' && exIndex === 0 && i < 2),
    })),
  }))
}

export function dayKindOf(day: string, madeDays: string[]): DayState {
  if (day === dateKey(appToday()) || madeDays.includes(day)) return 'today'
  return TRAINED_DAYS.includes(day) ? 'past' : 'empty'
}

export const RECENT_SESSIONS = [
  { day: daysAgo(0), name: 'Push A', sets: 11 },
  { day: daysAgo(1), name: 'Legs', sets: 15 },
  { day: daysAgo(3), name: 'Pull B', sets: 17 },
]

export const COPY_FROM = [
  { id: 'push-a', name: 'Push A', lifts: 5, sets: 18 },
  { id: 'pull-b', name: 'Pull B', lifts: 5, sets: 17 },
  { id: 'legs', name: 'Legs', lifts: 4, sets: 15 },
]

export const EXERCISE_HISTORY: Record<string, ExerciseHistory> = {
  'bench-press': {
    sessions: 12,
    weights: [55, 55, 57.5, 57.5, 60, 59.5, 61.8, 62.5],
    rows: [
      { date: '15/08', kg: 62.5, reps: 8, volume: 3062, pr: true },
      { date: '08/08', kg: 60, reps: 8, volume: 2880 },
      { date: '01/08', kg: 57.5, reps: 8, volume: 2760 },
      { date: '25/07', kg: 57.5, reps: 7, volume: 2415 },
      { date: '18/07', kg: 55, reps: 8, volume: 2640 },
    ],
  },
  'incline-db-press': {
    sessions: 9,
    weights: [16, 18, 18, 20, 20, 22, 22, 22],
    rows: [
      { date: '15/08', kg: 22, reps: 10, volume: 1320, pr: true },
      { date: '08/08', kg: 20, reps: 10, volume: 1200 },
      { date: '01/08', kg: 20, reps: 9, volume: 1080 },
      { date: '25/07', kg: 18, reps: 10, volume: 1080 },
      { date: '18/07', kg: 18, reps: 8, volume: 864 },
    ],
  },
  'cable-fly': {
    sessions: 8,
    weights: [7.5, 10, 10, 12.5, 12.5, 12.5, 15, 15],
    rows: [
      { date: '15/08', kg: 15, reps: 12, volume: 540, pr: true },
      { date: '08/08', kg: 15, reps: 12, volume: 540 },
      { date: '01/08', kg: 12.5, reps: 12, volume: 450 },
      { date: '25/07', kg: 12.5, reps: 10, volume: 375 },
      { date: '18/07', kg: 10, reps: 12, volume: 360 },
    ],
  },
}
