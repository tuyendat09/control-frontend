/** 1420 → "1,420" */
export function fmtInt(n: number) {
  return Math.round(n).toLocaleString('en-US')
}

/** Round to one decimal, avoiding float drift. */
export function round1(n: number) {
  return Math.round(n * 10) / 10
}

/** Trim trailing .0 → 3.6 / 3 */
export function fmtNum(n: number) {
  return String(round1(n))
}

/** −1.6 / +0.2 using a real minus sign. */
export function fmtDelta(n: number) {
  const v = round1(n)
  return `${v <= 0 ? '−' : '+'}${Math.abs(v).toFixed(1)}`
}

/** 2:00 */
export function fmtClock(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = String(totalSeconds % 60).padStart(2, '0')
  return `${m}:${s}`
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

/** Case/diacritic-insensitive text for search. */
export function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .toLowerCase()
}
