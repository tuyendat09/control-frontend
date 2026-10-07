import type { Lang } from '@/types'

/** The prototype is anchored to a fixed sample month: August 2026. */
export const SAMPLE_YEAR = 2026
export const SAMPLE_MONTH = 8
export const SAMPLE_TODAY = 15
export const SAMPLE_NOW = '18:32'
/** Aug 1, 2026 is a Saturday → five blank cells in a Monday-first grid. */
export const MONTH_LEADING_BLANKS = 5
export const MONTH_DAYS = 31

const WD_VI = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
const WD_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const WD_SHORT_VI = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
export const WD_SHORT_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/** Monday-first weekday index (0 = Mon) for a day of the sample month. */
export function weekdayIndex(day: number) {
  return (MONTH_LEADING_BLANKS + day - 1) % 7
}

const dd = (n: number) => String(n).padStart(2, '0')

/** "Thứ 7, 15/08" · "Sat, Aug 15" */
export function formatDayLabel(day: number, lang: Lang) {
  const wi = weekdayIndex(day)
  return lang === 'vi'
    ? `${WD_VI[wi]}, ${dd(day)}/0${SAMPLE_MONTH}`
    : `${WD_EN[wi]}, Aug ${day}`
}

/** "T7 15/08" · "Sat 15/08" */
export function formatShortDay(day: number, lang: Lang) {
  const wi = weekdayIndex(day)
  const wd = lang === 'vi' ? WD_SHORT_VI[wi] : WD_SHORT_EN[wi]
  return `${wd} ${dd(day)}/0${SAMPLE_MONTH}`
}

/** "15/08" */
export function formatDayMonth(day: number) {
  return `${dd(day)}/0${SAMPLE_MONTH}`
}
