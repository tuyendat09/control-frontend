import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

/** Calorie ring circumference (r = 51). */
export const RING_LENGTH = 320.4

/** Ring draws from empty on entry (1.15s), then glides to each new value. */
export function useAnimationRing(progress: number) {
  const ref = useRef<SVGCircleElement>(null)
  const first = useRef(true)

  useGSAP(
    () => {
      const entering = first.current
      first.current = false
      if (entering) gsap.set(ref.current, { strokeDashoffset: RING_LENGTH })
      gsap.to(ref.current, {
        strokeDashoffset: RING_LENGTH * (1 - progress),
        duration: entering ? 1.15 : 0.7,
        ease: 'draw',
        overwrite: 'auto',
      })
    },
    { dependencies: [progress] },
  )

  return ref
}

/** Macro bar grows from the left on entry (staggered by `index`), then follows value changes. */
export function useAnimationBar(pct: number, index: number) {
  const ref = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  useGSAP(
    () => {
      const entering = first.current
      first.current = false
      if (entering) gsap.set(ref.current, { width: '0%' })
      gsap.to(ref.current, {
        width: `${pct}%`,
        duration: entering ? 0.8 : 0.7,
        delay: entering ? index * 0.07 : 0,
        ease: 'draw',
        overwrite: 'auto',
      })
    },
    { dependencies: [pct] },
  )

  return ref
}
