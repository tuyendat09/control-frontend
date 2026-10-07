import { clamp, fmtInt } from '@/lib/format'
import { RING_LENGTH, useAnimationRing } from '../hooks/useAnimationHome'

interface CalorieRingProps {
  kcal: number
  target: number
}

export function CalorieRing({ kcal, target }: CalorieRingProps) {
  const progress = clamp(kcal / target, 0, 1)
  const ref = useAnimationRing(progress)

  return (
    <div className="relative size-[118px] flex-none">
      <svg width="118" height="118" viewBox="0 0 118 118" aria-hidden="true">
        <circle cx="59" cy="59" r="51" fill="none" stroke="var(--line)" strokeWidth="9" />
        <circle
          cx="59"
          cy="59"
          r="51"
          fill="none"
          stroke="var(--acc)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={RING_LENGTH}
          transform="rotate(-90 59 59)"
          ref={ref}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-serif text-[32px] leading-none">{fmtInt(kcal)}</div>
        <div className="mt-[3px] text-[10.5px] tracking-[.09em] text-tx3">/ {fmtInt(target)} KCAL</div>
      </div>
    </div>
  )
}
