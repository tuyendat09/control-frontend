import type { CSSProperties } from 'react'

/** Columns: Set · Kg · Rep · Rest · [Last] · ✓ */
export const setGrid = (ghost: boolean): CSSProperties => ({
  gridTemplateColumns: ghost ? '30px 1fr 52px 46px 68px 30px' : '34px 1fr 1fr 1fr 34px',
})
