import type { Lang } from '@/types'

const WD_VI = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
const WD_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const WD_SHORT_VI = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
export const WD_SHORT_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const dd = (n: number) => String(n).padStart(2, '0')

/** "Thứ 7, 15/08" · "Sat, Aug 15" — `key` is a `YYYY-MM-DD` day. */
export function formatDayLabel(key: string, lang: Lang) {
  const d = parseDateKey(key)
  const wi = (d.getDay() + 6) % 7
  return lang === 'vi'
    ? `${WD_VI[wi]}, ${dd(d.getDate())}/${dd(d.getMonth() + 1)}`
    : `${WD_EN[wi]}, ${MONTH_EN[d.getMonth()]} ${d.getDate()}`
}

/** "T7 15/08" · "Sat 15/08" */
export function formatShortDay(key: string, lang: Lang) {
  const d = parseDateKey(key)
  const wd = (lang === 'vi' ? WD_SHORT_VI : WD_SHORT_EN)[(d.getDay() + 6) % 7]
  return `${wd} ${formatDayMonth(key)}`
}

/** "15/08" */
export function formatDayMonth(key: string) {
  const d = parseDateKey(key)
  return `${dd(d.getDate())}/${dd(d.getMonth() + 1)}`
}

/* ───────── Calendar-day helpers (local days, `YYYY-MM-DD` keys) ───────── */

/** "Today" for the app: the device's local calendar day (midnight boundary). */
export const appToday = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

/** Local wall-clock time, `HH:mm`. */
export const nowTime = () => {
  const now = new Date()
  return `${dd(now.getHours())}:${dd(now.getMinutes())}`
}

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

/** Whole local days from `from` to `to` (positive when `to` is later). */
export const daysBetween = (from: Date, to: Date) =>
  Math.round((Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) - Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())) / 86400000)

/** True for a real calendar day written as `YYYY-MM-DD`. */
export const isDateKey = (key: string) => /^\d{4}-\d{2}-\d{2}$/.test(key) && dateKey(parseDateKey(key)) === key

export const daysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()

/** Blank cells before day 1 in a Monday-first month grid. */
export const monthLeadingBlanks = (d: Date) => (new Date(d.getFullYear(), d.getMonth(), 1).getDay() + 6) % 7

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
