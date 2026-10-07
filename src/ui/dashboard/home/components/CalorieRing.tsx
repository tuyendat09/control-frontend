import { clamp, fmtInt } from '@/lib/format'

/** r = 51 → circumference 320.4 (matches the `ringin` keyframe). */
const CIRCUMFERENCE = 320.4

interface CalorieRingProps {
  kcal: number
  target: number
}

export function CalorieRing({ kcal, target }: CalorieRingProps) {
  const progress = clamp(kcal / target, 0, 1)

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
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          transform="rotate(-90 59 59)"
          className="animate-ring transition-[stroke-dashoffset] duration-700 ease-draw"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-serif text-[32px] leading-none">{fmtInt(kcal)}</div>
        <div className="mt-[3px] text-[10.5px] tracking-[.09em] text-tx3">/ {fmtInt(target)} KCAL</div>
      </div>
    </div>
  )
}
