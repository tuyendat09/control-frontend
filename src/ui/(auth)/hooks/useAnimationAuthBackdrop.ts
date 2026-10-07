import { useRef } from 'react'
import { gsap, reducedMotion, useGSAP } from '@/lib/motion'

/** Slow 24s drift of the tint blob behind auth. */
export function useAnimationAuthBackdrop() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reducedMotion()) return
      gsap.fromTo(
        ref.current,
        { xPercent: -14, yPercent: -6, scale: 1 },
        { xPercent: 12, yPercent: 8, scale: 1.14, duration: 12, ease: 'drift', repeat: -1, yoyo: true },
      )
    },
    { scope: ref },
  )

  return ref
}
