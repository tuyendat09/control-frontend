import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

/**
 * Checkbox tick with both directions: ticking pops the check in (spring) and fades the empty box out;
 * un-ticking shrinks the check away and brings the box back.
 */
export function useAnimationCheck(done: boolean) {
  const tickRef = useRef<HTMLSpanElement>(null)
  const boxRef = useRef<HTMLSpanElement>(null)
  const first = useRef(true)

  useGSAP(
    () => {
      const instant = first.current
      first.current = false
      const d = (n: number) => (instant ? 0 : n)

      if (done) {
        gsap.timeline()
          .to(boxRef.current, { opacity: 0, duration: d(0.12), ease: 'none' }, 0)
          .fromTo(
            tickRef.current,
            { scale: instant ? 1 : 0.3, opacity: instant ? 1 : 0 },
            { scale: 1, opacity: 1, duration: d(0.42), ease: 'springHard' },
            0,
          )
      } else {
        gsap.timeline()
          .to(tickRef.current, { scale: 0.3, opacity: 0, duration: d(0.16), ease: 'power2.in' }, 0)
          .to(boxRef.current, { opacity: 1, duration: d(0.18), ease: 'none' }, 0.04)
      }
      return () => {
        first.current = true
      }
    },
    { dependencies: [done] },
  )

  return { tickRef, boxRef }
}
