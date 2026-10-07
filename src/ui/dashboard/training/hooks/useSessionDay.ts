import { SESSION_MINUTES } from '@/data/training'
import { formatDayLabel } from '@/lib/date'
import { usePreferences } from '@/ui/shared/hooks/usePreferences'
import { useT } from '@/ui/shared/hooks/useT'
import { useTraining } from './useTraining'

/** Everything the UI needs to know about one calendar day's session. */
export function useSessionDay(day: number) {
  const t = useT()
  const { lang } = usePreferences()
  const { dayKind, getExercises, editingDays } = useTraining()

  const kind = dayKind(day)
  const exercises = getExercises(day)
  const doneSets = exercises.flatMap((e) => e.sets).filter((s) => s.done)
  const stats = {
    lifts: exercises.length,
    sets: doneSets.length,
    totalSets: exercises.reduce((n, e) => n + e.sets.length, 0),
    volume: doneSets.reduce((sum, s) => sum + s.kg * s.reps, 0),
  }

  const minutes = kind === 'empty' ? 0 : SESSION_MINUTES[kind]
  const sub =
    kind === 'today'
      ? t(`${stats.lifts} bài · ${stats.sets} sets · ${minutes}′ · đang tập`, `${stats.lifts} lifts · ${stats.sets} sets · ${minutes}′ · in progress`)
      : kind === 'past'
        ? t(`${stats.lifts} bài · ${stats.sets} sets · ${minutes}′ · đã xong`, `${stats.lifts} lifts · ${stats.sets} sets · ${minutes}′ · completed`)
        : t('Chưa có buổi tập', 'No session yet')

  return {
    day,
    kind,
    exercises,
    stats,
    label: formatDayLabel(day, lang),
    sub,
    editing: editingDays.includes(day),
  }
}
