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

/* ───────── Calendar-day helpers (local days, `YYYY-MM-DD` keys) ───────── */

/** "Today" for the app. Fixed to the sample date until the product moves to the real date. */
export const appToday = () => new Date(SAMPLE_YEAR, SAMPLE_MONTH - 1, SAMPLE_TODAY)

/** Local calendar day as `YYYY-MM-DD` (never UTC). */
export const dateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export const parseDateKey = (key: string) => {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const addDays = (d: Date, n: number) => {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

/** Monday of the week containing `d`. */
export const startOfWeek = (d: Date) => addDays(d, -((d.getDay() + 6) % 7))

const WD_SUN_FIRST_VI = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
const WD_SUN_FIRST_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTH_EN_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Weekday abbreviation for any date: "T4" · "Wed". */
export const weekdayShort = (d: Date, lang: Lang) => (lang === 'vi' ? WD_SUN_FIRST_VI : WD_SUN_FIRST_EN)[d.getDay()]

/** "T4, 12/08" · "Wed, Aug 12" */
export function formatDate(d: Date, lang: Lang) {
  return lang === 'vi'
    ? `${weekdayShort(d, lang)}, ${dd(d.getDate())}/${dd(d.getMonth() + 1)}`
    : `${weekdayShort(d, lang)}, ${MONTH_EN[d.getMonth()]} ${d.getDate()}`
}

/** "10 – 16 Thg 8" · "Aug 10 – 16" */
export function formatWeekRange(monday: Date, lang: Lang) {
  const sunday = addDays(monday, 6)
  return lang === 'vi'
    ? `${monday.getDate()} – ${sunday.getDate()} Thg ${sunday.getMonth() + 1}`
    : `${MONTH_EN[monday.getMonth()]} ${monday.getDate()} – ${sunday.getDate()}`
}

/** "Tháng 8, 2026" · "August 2026" */
export const formatMonth = (d: Date, lang: Lang) =>
  lang === 'vi' ? `Tháng ${d.getMonth() + 1}, ${d.getFullYear()}` : `${MONTH_EN_LONG[d.getMonth()]} ${d.getFullYear()}`
