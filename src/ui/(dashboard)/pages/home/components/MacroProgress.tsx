import { clamp, fmtNum } from '@/lib/format'
import { MacroSquare, type MacroKey } from '@/ui/shared/components/MacroChip'
import { cn } from '@/lib/cn'

const BAR: Record<MacroKey, string> = { p: 'bg-p-dot', c: 'bg-c-dot', f: 'bg-f-dot' }

interface MacroProgressProps {
  macro: MacroKey
  label: string
  value: number
  target: number
  /** 0, 1, 2 — staggers the bar draw (70ms apart). */
  index: number
}

export function MacroProgress({ macro, label, value, target, index }: MacroProgressProps) {
  const pct = clamp(value / target, 0, 1) * 100

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-[12.5px]">
        <span className="flex items-center gap-1.5 text-tx2">
          <MacroSquare macro={macro} />
          {label}
        </span>
        <span className="font-semibold">
          {fmtNum(value)}
          <span className="font-normal text-tx3">/{target}g</span>
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-line">
        <div
          className={cn(
            'h-1.5 origin-left animate-mbar rounded-full transition-[width] duration-700 ease-draw',
            BAR[macro],
          )}
          style={{ width: `${pct}%`, animationDelay: `${index * 70}ms` }}
        />
      </div>
    </div>
  )
}
