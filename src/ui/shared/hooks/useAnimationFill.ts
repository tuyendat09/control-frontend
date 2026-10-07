import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

/** Progress fill: shows its value instantly on mount, then eases its width whenever `pct` changes. */
export function useAnimationFill(pct: number, duration = 0.55) {
  const ref = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  useGSAP(
    () => {
      gsap.to(ref.current, { width: `${pct}%`, duration: first.current ? 0 : duration, ease: 'draw', overwrite: 'auto' })
      first.current = false
      return () => {
        first.current = true
      }
    },
    { dependencies: [pct] },
  )

  return ref
}
