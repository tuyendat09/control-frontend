import { EQUIPMENT_LABEL, EXERCISE_LAST, MUSCLE_GROUPS, MUSCLE_LABEL } from '@/data/exercises'
import { foldText } from '@/lib/text'
import type { Equipment, Exercise, ExerciseLog, Lang, LocalizedText, MuscleGroup } from '@/types'

export type GroupFilter = MuscleGroup | 'all'
export type EquipmentFilter = Equipment | 'all'

export interface PickerSection {
  key: string
  title: LocalizedText
  rows: Exercise[]
  /** Shown on the right of the section label; omitted for short curated lists. */
  count?: number
}

interface SectionArgs {
  library: Exercise[]
  session: ExerciseLog[]
  sessionName: string
  query: string
  group: GroupFilter
  equipment: EquipmentFilter
  suggest: boolean
  lang: Lang
}

const SUGGESTION_LIMIT = 4
const RECENT_LIMIT = 5

export const matchesQuery = (exercise: Exercise, foldedQuery: string) =>
  !foldedQuery ||
  foldText(exercise.name.en).includes(foldedQuery) ||
  foldText(exercise.name.vi).includes(foldedQuery)

/** True when the query is exactly some exercise's name (either language). */
export const hasExactName = (library: Exercise[], foldedQuery: string) =>
  !!foldedQuery && library.some((e) => foldText(e.name.en) === foldedQuery || foldText(e.name.vi) === foldedQuery)

/**
 * What the picker list shows. Browsing (no query, no filter): yours · fits · recent · all.
 * Searching or filtering: results grouped by muscle (or by equipment when only that filter is on).
 */
export function buildSections({ library, session, sessionName, query, group, equipment, suggest, lang }: SectionArgs) {
  const folded = foldText(query.trim())
  const plain = !folded && group === 'all' && equipment === 'all'
  const sections: PickerSection[] = []

  if (!plain) {
    const hits = library.filter(
      (e) => (group === 'all' || e.muscle === group) && (equipment === 'all' || e.equipment === equipment) && matchesQuery(e, folded),
    )
    if (group === 'all' && !folded) {
      if (hits.length) sections.push({ key: equipment, title: EQUIPMENT_LABEL[equipment], rows: hits, count: hits.length })
    } else {
      for (const muscle of MUSCLE_GROUPS) {
        const rows = hits.filter((e) => e.muscle === muscle)
        if (rows.length) sections.push({ key: muscle, title: MUSCLE_LABEL[muscle], rows, count: rows.length })
      }
    }
    return { sections, plain }
  }

  const inSession = new Set(session.map((l) => l.id))

  const mine = library.filter((e) => e.custom)
  if (mine.length) sections.push({ key: 'mine', title: { vi: 'Bài của bạn', en: 'Your exercises' }, rows: mine })

  if (suggest) {
    const muscles = new Set(session.flatMap((l) => library.find((e) => e.id === l.id)?.muscle ?? []))
    const fits = library
      .filter((e) => muscles.has(e.muscle) && !inSession.has(e.id))
      .sort((a, b) => (EXERCISE_LAST[b.id]?.count ?? 0) - (EXERCISE_LAST[a.id]?.count ?? 0))
      .slice(0, SUGGESTION_LIMIT)
    if (fits.length) {
      sections.push({
        key: 'fits',
        title: { vi: `Hợp với ${sessionName}`, en: `Fits ${sessionName}` },
        rows: fits,
      })
    }
  }

  const recent = library
    .filter((e) => EXERCISE_LAST[e.id])
    .sort((a, b) => EXERCISE_LAST[a.id].daysAgo - EXERCISE_LAST[b.id].daysAgo)
    .slice(0, RECENT_LIMIT)
  if (recent.length) sections.push({ key: 'recent', title: { vi: 'Gần đây', en: 'Recent' }, rows: recent })

  const all = [...library].sort((a, b) => a.name[lang].localeCompare(b.name[lang], lang))
  sections.push({ key: 'all', title: { vi: 'Tất cả bài', en: 'All exercises' }, rows: all, count: all.length })

  return { sections, plain }
}
