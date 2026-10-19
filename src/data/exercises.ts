import { addDays, appToday, dateKey, formatDayMonth } from '@/lib/date'
import type { Equipment, Exercise, ExerciseLast, ExerciseLog, LocalizedText, MuscleGroup } from '@/types'

/** Suggestions section ("Fits {session}") in the exercise picker. */
export const SHOW_SUGGESTIONS = true

export const MUSCLE_GROUPS: MuscleGroup[] = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core']
export const EQUIPMENT: Equipment[] = ['barbell', 'dumbbell', 'cable', 'machine', 'body']

export const MUSCLE_LABEL: Record<MuscleGroup | 'all', LocalizedText> = {
  all: { vi: 'Tất cả', en: 'All' },
  chest: { vi: 'Ngực', en: 'Chest' },
  back: { vi: 'Lưng', en: 'Back' },
  legs: { vi: 'Chân', en: 'Legs' },
  shoulders: { vi: 'Vai', en: 'Shoulders' },
  arms: { vi: 'Tay', en: 'Arms' },
  core: { vi: 'Bụng', en: 'Core' },
}

export const EQUIPMENT_LABEL: Record<Equipment | 'all', LocalizedText> = {
  all: { vi: 'Mọi dụng cụ', en: 'Any' },
  barbell: { vi: 'Đòn', en: 'Barbell' },
  dumbbell: { vi: 'Tạ đơn', en: 'Dumbbell' },
  cable: { vi: 'Cáp', en: 'Cable' },
  machine: { vi: 'Máy', en: 'Machine' },
  body: { vi: 'Thân', en: 'Body' },
}

const ex = (
  id: string,
  en: string,
  vi: string,
  muscle: MuscleGroup,
  equipment: Equipment,
  pattern: Exercise['pattern'],
): Exercise => ({ id, name: { vi, en }, muscle, equipment, pattern })

/** Seed library. Real app: the `exercises` table. */
export const SEED_EXERCISES: Exercise[] = [
  ex('bench-press', 'Bench Press', 'Đẩy ngực', 'chest', 'barbell', 'push-horizontal'),
  ex('incline-db-press', 'Incline DB Press', 'Đẩy ngực dốc lên', 'chest', 'dumbbell', 'push-horizontal'),
  ex('cable-fly', 'Cable Fly', 'Ép ngực cáp', 'chest', 'cable', 'push-horizontal'),
  ex('pushup', 'Push-up', 'Hít đất', 'chest', 'body', 'push-horizontal'),
  ex('dips', 'Dips', 'Dips', 'chest', 'body', 'push-vertical'),
  ex('deadlift', 'Deadlift', 'Deadlift', 'back', 'barbell', 'hinge'),
  ex('pullup', 'Pull-up', 'Hít xà', 'back', 'body', 'pull-vertical'),
  ex('lat-pd', 'Lat Pulldown', 'Kéo xà', 'back', 'machine', 'pull-vertical'),
  ex('bb-row', 'Barbell Row', 'Kéo tạ gập người', 'back', 'barbell', 'pull-horizontal'),
  ex('cable-row', 'Seated Cable Row', 'Kéo cáp ngồi', 'back', 'cable', 'pull-horizontal'),
  ex('squat', 'Back Squat', 'Squat', 'legs', 'barbell', 'squat'),
  ex('goblet', 'Goblet Squat', 'Goblet squat', 'legs', 'dumbbell', 'squat'),
  ex('rdl', 'Romanian Deadlift', 'RDL', 'legs', 'barbell', 'hinge'),
  ex('leg-press', 'Leg Press', 'Đạp đùi', 'legs', 'machine', 'squat'),
  ex('lunge', 'Walking Lunge', 'Chùng chân', 'legs', 'dumbbell', 'squat'),
  ex('hip-thrust', 'Hip Thrust', 'Đẩy hông', 'legs', 'barbell', 'hinge'),
  ex('ohp', 'Overhead Press', 'Đẩy vai', 'shoulders', 'barbell', 'push-vertical'),
  ex('lat-raise', 'Lateral Raise', 'Dang tay ngang', 'shoulders', 'dumbbell', 'push-vertical'),
  ex('face-pull', 'Face Pull', 'Kéo cáp mặt', 'shoulders', 'cable', 'pull-horizontal'),
  ex('curl', 'Biceps Curl', 'Cuốn tạ tay', 'arms', 'dumbbell', 'curl'),
  ex('hammer', 'Hammer Curl', 'Cuốn búa', 'arms', 'dumbbell', 'curl'),
  ex('tri-pd', 'Triceps Pushdown', 'Đẩy cáp tay sau', 'arms', 'cable', 'extend'),
  ex('tri-ext', 'Overhead Triceps Ext.', 'Duỗi tay sau đầu', 'arms', 'dumbbell', 'extend'),
  ex('plank', 'Plank', 'Plank', 'core', 'body', 'hold'),
  ex('crunch', 'Cable Crunch', 'Gập bụng cáp', 'core', 'cable', 'curl'),
  ex('leg-raise', 'Hanging Leg Raise', 'Treo nâng chân', 'core', 'body', 'hold'),
]

/** Latest work per exercise. Real app: derived from `sets` before the selected date. */
export const EXERCISE_LAST: Record<string, ExerciseLast> = {
  'bench-press': { daysAgo: 7, sets: 4, reps: 8, kg: 60, count: 12 },
  'incline-db-press': { daysAgo: 7, sets: 3, reps: 10, kg: 20, count: 9 },
  'cable-fly': { daysAgo: 7, sets: 3, reps: 12, kg: 15, count: 8 },
  deadlift: { daysAgo: 3, sets: 3, reps: 5, kg: 100, count: 10 },
  pullup: { daysAgo: 3, sets: 4, reps: 6, count: 11 },
  'lat-pd': { daysAgo: 3, sets: 3, reps: 10, kg: 45, count: 7 },
  'cable-row': { daysAgo: 3, sets: 3, reps: 12, kg: 40, count: 6 },
  squat: { daysAgo: 1, sets: 5, reps: 5, kg: 80, count: 14 },
  rdl: { daysAgo: 1, sets: 3, reps: 8, kg: 70, count: 5 },
  'leg-press': { daysAgo: 1, sets: 3, reps: 12, kg: 140, count: 6 },
  ohp: { daysAgo: 7, sets: 4, reps: 6, kg: 40, count: 9 },
  'lat-raise': { daysAgo: 7, sets: 3, reps: 15, kg: 8, count: 8 },
  curl: { daysAgo: 3, sets: 3, reps: 12, kg: 12, count: 7 },
  'tri-pd': { daysAgo: 7, sets: 3, reps: 12, kg: 25, count: 8 },
}

/** "4×8 @ 60kg" · "4×6" when bodyweight. */
export const formatLast = (last: ExerciseLast) =>
  `${last.sets}×${last.reps}${last.kg ? ` @ ${last.kg}kg` : ''}`

/** "08/08" */
export const lastDate = (last: ExerciseLast) => formatDayMonth(dateKey(addDays(appToday(), -last.daysAgo)))

/** A fresh session entry: 3 sets copied from the last time (or empty 3×10). */
export function logFromExercise(exercise: Exercise): ExerciseLog {
  const last = EXERCISE_LAST[exercise.id]
  const kg = last?.kg ?? 0
  const reps = last?.reps ?? 10
  return {
    id: exercise.id,
    name: exercise.name.en,
    nameVi: exercise.name.vi,
    equipment: exercise.equipment,
    lastDate: last ? lastDate(last) : '',
    lastSummary: last ? formatLast(last) : '',
    sets: Array.from({ length: last?.sets ?? 3 }, (_, i) => ({
      id: `${exercise.id}-${i + 1}`,
      kg,
      reps,
      done: false,
      prev: last ? { kg, reps } : undefined,
    })),
  }
}
