import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

/**
 * Selection ring of a picker row. `order` is the tap order (0 = not selected).
 * Selecting pops the ring (.6 → overshoot → 1), renumbering bumps it, deselecting dips it.
 */
export function useAnimationSelectRing(order: number) {
  const ringRef = useRef<HTMLSpanElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const prev = useRef(order)

  useGSAP(
    () => {
      const before = prev.current
      prev.current = order
      if (before === order) return

      if (before === 0) {
        gsap.fromTo(ringRef.current, { scale: 0.6 }, { scale: 1, duration: 0.28, ease: 'spring', overwrite: 'auto' })
      } else if (order === 0) {
        gsap.fromTo(ringRef.current, { scale: 0.86 }, { scale: 1, duration: 0.22, ease: 'soft', overwrite: 'auto' })
      } else {
        gsap
          .timeline({ defaults: { overwrite: 'auto' } })
          .fromTo(ringRef.current, { scale: 1.14 }, { scale: 1, duration: 0.26, ease: 'spring' }, 0)
          .fromTo(numberRef.current, { y: -5, opacity: 0 }, { y: 0, opacity: 1, duration: 0.22, ease: 'soft' }, 0)
      }
    },
    { dependencies: [order] },
  )

  return { ringRef, numberRef }
}
