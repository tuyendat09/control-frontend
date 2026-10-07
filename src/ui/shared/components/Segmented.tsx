import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface SegmentedItem<T extends string> {
  value: T
  label: ReactNode
}

interface SegmentedProps<T extends string> {
  items: SegmentedItem<T>[]
  value: T
  onChange: (value: T) => void
  /** `glass` sits on the always-dark camera layer. */
  variant?: 'default' | 'glass'
  className?: string
  itemClassName?: string
}

/** Sliding-thumb segmented control (`springSoft`, 340ms). */
export function Segmented<T extends string>({
  items,
  value,
  onChange,
  variant = 'default',
  className,
  itemClassName,
}: SegmentedProps<T>) {
  const glass = variant === 'glass'
  const index = Math.max(0, items.findIndex((i) => i.value === value))
  const n = items.length

  return (
    <div
      role="tablist"
      className={cn(
        'relative flex gap-1 p-1',
        glass ? 'rounded-[16px] bg-white/12 backdrop-blur-[12px]' : 'rounded-[14px] bg-tint',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'absolute top-1 bottom-1 left-1 transition-transform duration-[340ms] ease-spring-soft',
          glass ? 'rounded-[12px] bg-[#F4F1EC]' : 'rounded-[12px] bg-surf2 shadow-el',
        )}
        style={{
          width: `calc((100% - ${8 + (n - 1) * 4}px) / ${n})`,
          transform: `translateX(calc(${index * 100}% + ${index * 4}px))`,
        }}
      />
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={cn(
              'relative z-[1] flex-1 rounded-[12px] py-[9px] text-center text-[13px] transition-colors duration-200',
              glass
                ? cn('py-[10px] font-semibold', active ? 'text-[#16231E]' : 'text-[rgba(244,241,236,.8)]')
                : cn(active ? 'font-semibold text-tx' : 'font-medium text-tx2'),
              itemClassName,
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
