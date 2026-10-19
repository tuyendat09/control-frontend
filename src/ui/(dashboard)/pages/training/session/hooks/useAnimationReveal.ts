import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

/** Time for the picker to clear the way before new cards appear. */
const AFTER_SHEET = 0.22
const STEP = 0.07

/** A just-added session card rises 6px and fades in (400ms), staggered by its place among the new ones. */
export function useAnimationReveal(enabled: boolean, order: number) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!enabled) return
      gsap.fromTo(
        ref.current,
        { y: 6, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'soft', delay: AFTER_SHEET + order * STEP, clearProps: 'transform,opacity' },
      )
    },
    { scope: ref, dependencies: [enabled] },
  )

  return ref
}
