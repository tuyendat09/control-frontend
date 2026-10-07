import { cn } from '@/lib/cn'

interface LineChartProps {
  values: number[]
  /** Space kept above the highest / below the lowest point inside the 300×96 viewBox. */
  padTop?: number
  padBottom?: number
  dotClassName?: string
  className?: string
}

const W = 300
const H = 96

/** Minimal trend line with soft area fill and an end dot. */
export function LineChart({ values, padTop = 20, padBottom = 28, dotClassName = 'fill-acc', className }: LineChartProps) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const points = values.map((v, i) => ({
    x: (i / Math.max(1, values.length - 1)) * W,
    y: padTop + ((max - v) / span) * (H - padTop - padBottom),
  }))
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const last = points[points.length - 1]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn('h-24 w-full overflow-visible', className)} aria-hidden="true">
      <path d={`${line} L${W} ${H} L0 ${H} Z`} fill="var(--tx)" opacity=".05" />
      <path d={line} fill="none" stroke="var(--tx)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last.x} cy={last.y} r="4" className={dotClassName} />
    </svg>
  )
}
