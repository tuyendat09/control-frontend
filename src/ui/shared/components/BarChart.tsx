import { cn } from '@/lib/cn'

export interface BarItem {
  label: string
  value: number
}

interface BarChartProps {
  items: BarItem[]
  /** Height in px of the tallest bar. */
  maxBarHeight: number
  /** `zero`: bars grow from 0. `min-max`: shortest bar sits at 50% so small progress stays visible. */
  scale?: 'zero' | 'min-max'
  gap?: number
  barClassName?: string
  activeBarClassName?: string
  labelClassName?: string
  activeLabelClassName?: string
  className?: string
}

/** Column chart; the last item is the highlighted ("current") one. */
export function BarChart({
  items,
  maxBarHeight,
  scale = 'zero',
  gap = 9,
  barClassName = 'rounded-[8px] bg-tx3 opacity-35',
  activeBarClassName = 'rounded-[8px] bg-acc',
  labelClassName = 'text-[10.5px] text-tx3',
  activeLabelClassName = 'text-acc',
  className,
}: BarChartProps) {
  const values = items.map((i) => i.value)
  const max = Math.max(...values)
  const min = Math.min(...values)

  const heightOf = (v: number) => {
    if (scale === 'min-max') {
      const ratio = max === min ? 1 : 0.5 + ((v - min) / (max - min)) * 0.5
      return ratio * maxBarHeight
    }
    return (v / max) * maxBarHeight
  }

  return (
    <div className={cn('flex items-end', className)} style={{ gap }}>
      {items.map((item, i) => {
        const active = i === items.length - 1
        return (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={cn('w-full', active ? activeBarClassName : barClassName)}
              style={{ height: heightOf(item.value) }}
            />
            <span className={cn(labelClassName, active && activeLabelClassName)}>{item.label}</span>
          </div>
        )
      })}
    </div>
  )
}
