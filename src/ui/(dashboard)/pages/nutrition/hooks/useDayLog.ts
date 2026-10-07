import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { TARGETS } from '@/data/nutrition'
import { addDays, appToday, dateKey, parseDateKey, startOfWeek, weekdayShort } from '@/lib/date'
import { fmtInt } from '@/lib/format'
import type { MealEntry, MealType } from '@/types'
import { usePreferences } from '@/ui/shared/hooks/usePreferences'
import { useT } from '@/ui/shared/hooks/useT'
import { useToast } from '@/ui/shared/hooks/useToast'
import { useTracker } from '@/ui/shared/hooks/useTracker'

export const MEALS: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack']
const OVER = 1.05
const DAY_MS = 864e5

export interface WeekDay {
  key: string
  weekday: string
  date: number
  pct: number
  selected: boolean
  today: boolean
  future: boolean
  over: boolean
}

export type CalendarCell =
  | { kind: 'blank'; key: string }
  | { kind: 'day'; key: string; date: number; selected: boolean; today: boolean; future: boolean; status: 'none' | 'on' | 'over' }

export interface LogItem {
  entryId: string
  id: string
  name: string
  qty: string
  kcal: number
  macros: { p: number; c: number; f: number }
}

const sumKcal = (entries: MealEntry[]) => entries.reduce((s, e) => s + e.kcal, 0)

/**
 * State and derived data for the "Meals by day" log: selected day (kept in `?date=`), week strip,
 * month dropdown, day totals, per-meal items, copy-from-previous-day, remove with undo.
 */
export function useDayLog() {
  const t = useT()
  const { lang } = usePreferences()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { entries, removeItem, upsertEntry, copyDay } = useTracker()
  const [params, setParams] = useSearchParams()

  const today = appToday()
  const todayKey = dateKey(today)

  // The selected day lives in the URL so leaving to the library and coming back keeps it.
  const raw = params.get('date')
  const selectedKey = raw && /^\d{4}-\d{2}-\d{2}$/.test(raw) && raw <= todayKey ? raw : todayKey
  const selected = parseDateKey(selectedKey)
  const isToday = selectedKey === todayKey

  const [calOpen, setCalOpen] = useState(false)
  const [monthOffset, setMonthOffset] = useState(0)

  const kcalByDate = useMemo(() => {
    const map = new Map<string, number>()
    entries.forEach((e) => map.set(e.date, (map.get(e.date) ?? 0) + e.kcal))
    return map
  }, [entries])
  const kcalOf = (key: string) => kcalByDate.get(key) ?? 0

  const select = (key: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (key === todayKey) next.delete('date')
        else next.set('date', key)
        return next
      },
      { replace: true },
    )

  const shift = (n: number) => {
    const d = addDays(selected, n)
    if (d <= today) select(dateKey(d))
  }

  // ── Week strip ──
  const monday = startOfWeek(selected)
  const weekOffset = Math.round((monday.getTime() - startOfWeek(today).getTime()) / (7 * DAY_MS))
  const isThisWeek = weekOffset >= 0
  const week: WeekDay[] = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(monday, i)
    const key = dateKey(d)
    const future = d > today
    const kcal = future ? 0 : kcalOf(key)
    return {
      key,
      weekday: key === todayKey ? t('Nay', 'Today') : weekdayShort(d, lang),
      date: d.getDate(),
      pct: Math.min(100, Math.round((kcal / TARGETS.kcal) * 100)),
      selected: key === selectedKey,
      today: key === todayKey,
      future,
      over: kcal > TARGETS.kcal * OVER,
    }
  })

  // ── Month dropdown ──
  const month = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1)
  const lead = (month.getDay() + 6) % 7
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells: CalendarCell[] = [
    ...Array.from({ length: lead }, (_, i): CalendarCell => ({ kind: 'blank', key: `blank-${i}` })),
    ...Array.from({ length: daysInMonth }, (_, i): CalendarCell => {
      const d = new Date(month.getFullYear(), month.getMonth(), i + 1)
      const key = dateKey(d)
      const future = d > today
      const kcal = future ? 0 : kcalOf(key)
      return {
        kind: 'day',
        key,
        date: i + 1,
        selected: key === selectedKey,
        today: key === todayKey,
        future,
        status: kcal === 0 ? 'none' : kcal > TARGETS.kcal * OVER ? 'over' : 'on',
      }
    }),
  ]

  const toggleCalendar = () => {
    if (!calOpen) setMonthOffset((selected.getFullYear() - today.getFullYear()) * 12 + selected.getMonth() - today.getMonth())
    setCalOpen((open) => !open)
  }

  const navPrev = () => (calOpen ? setMonthOffset((m) => m - 1) : shift(-7))
  const navNext = () => (calOpen ? setMonthOffset((m) => Math.min(0, m + 1)) : shift(7))
  const nextDisabled = calOpen ? monthOffset >= 0 : isThisWeek
  const pickDay = (key: string) => {
    select(key)
    setCalOpen(false)
  }

  // ── Selected day ──
  const dayEntries = entries.filter((e) => e.date === selectedKey)
  const totals = dayEntries.reduce(
    (a, e) => ({ kcal: a.kcal + e.kcal, p: a.p + e.macros.p, c: a.c + e.macros.c, f: a.f + e.macros.f }),
    { kcal: 0, p: 0, c: 0, f: 0 },
  )
  const isEmpty = dayEntries.length === 0
  const left = TARGETS.kcal - totals.kcal
  const status = isEmpty
    ? { kind: 'empty' as const, label: t('Chưa ghi', 'Not logged') }
    : left >= 0
      ? { kind: 'left' as const, label: t(`Còn ${fmtInt(left)} kcal`, `${fmtInt(left)} kcal left`) }
      : { kind: 'over' as const, label: t(`Vượt ${fmtInt(-left)} kcal`, `${fmtInt(-left)} kcal over`) }

  const sections = MEALS.map((meal) => {
    const items: LogItem[] = dayEntries
      .filter((e) => e.meal === meal)
      .flatMap((e) => e.items.map((i) => ({ entryId: e.id, ...i })))
    return { meal, items, kcal: items.reduce((s, i) => s + i.kcal, 0) }
  })

  // ── Actions ──
  const prev = addDays(selected, -1)
  const prevKey = dateKey(prev)

  const copyPrevious = () => {
    const kcal = sumKcal(entries.filter((e) => e.date === prevKey))
    if (kcal === 0) return showToast(t('Ngày trước đó cũng chưa ghi gì', 'The previous day is empty too'))
    copyDay(prevKey, selectedKey)
    showToast(t(`Đã chép ${fmtInt(kcal)} kcal`, `Copied ${fmtInt(kcal)} kcal`))
  }

  const remove = (item: LogItem) => {
    const snapshot = entries.find((e) => e.id === item.entryId)
    if (!snapshot) return
    removeItem(item.entryId, item.id)
    showToast(t(`Đã xoá ${item.name}`, `Removed ${item.name}`), {
      label: t('Hoàn tác', 'Undo'),
      onClick: () => upsertEntry(snapshot),
    })
  }

  const addFood = (meal: MealType) => navigate(`/nutrition?tab=library&meal=${meal}&date=${selectedKey}`)

  return {
    selectedKey,
    selected,
    isToday,
    week,
    monday,
    calOpen,
    month,
    cells,
    toggleCalendar,
    navPrev,
    navNext,
    nextDisabled,
    pickDay,
    select,
    goToday: () => select(todayKey),
    shift,
    totals,
    targets: TARGETS,
    isEmpty,
    status,
    sections,
    previousDay: prev,
    copyPrevious,
    remove,
    addFood,
    monthKey: monthOffset,
  }
}

export type DayLog = ReturnType<typeof useDayLog>
