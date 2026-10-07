import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

/** Element rises 10px into place (new list rows). Only plays when `enabled`. */
export function useAnimationRise(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!enabled) return
      gsap.from(ref.current, { y: 10, opacity: 0, duration: 0.3, ease: 'soft', clearProps: 'transform,opacity' })
    },
    { scope: ref, dependencies: [enabled] },
  )

  return ref
}
