import { cn } from '@/lib/cn'
import { fmtNum } from '@/lib/format'

export type MacroKey = 'p' | 'c' | 'f'

const CHIP: Record<MacroKey, string> = {
  p: 'bg-p-bg text-p-tx',
  c: 'bg-c-bg text-c-tx',
  f: 'bg-f-bg text-f-tx',
}

const DOT: Record<MacroKey, string> = {
  p: 'bg-p-dot',
  c: 'bg-c-dot',
  f: 'bg-f-dot',
}

const SIZE = {
  sm: 'rounded-[7px] px-2 py-[3px] text-[10.5px]',
  md: 'rounded-[7px] px-2 py-[3px] text-[11px]',
  lg: 'rounded-[8px] px-[10px] py-[5px] text-[12px]',
}

interface MacroChipProps {
  macro: MacroKey
  grams: number
  size?: keyof typeof SIZE
}

export function MacroChip({ macro, grams, size = 'sm' }: MacroChipProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 font-semibold leading-none', CHIP[macro], SIZE[size])}>
      <span className="font-medium opacity-65">{macro.toUpperCase()}</span>
      {fmtNum(grams)}g
    </span>
  )
}

interface MacroChipsProps {
  macros: { p: number; c: number; f: number }
  size?: keyof typeof SIZE
  className?: string
}

/** P / C / F row. */
export function MacroChips({ macros, size = 'sm', className }: MacroChipsProps) {
  return (
    <div className={cn('flex gap-[5px]', className)}>
      <MacroChip macro="p" grams={macros.p} size={size} />
      <MacroChip macro="c" grams={macros.c} size={size} />
      <MacroChip macro="f" grams={macros.f} size={size} />
    </div>
  )
}

export function MacroSquare({ macro, className }: { macro: MacroKey; className?: string }) {
  return <span className={cn('inline-block size-[7px] rounded-[2px]', DOT[macro], className)} />
}
