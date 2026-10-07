import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

/** Day content slides in 14px (from the right when moving forward, from the left when going back) and fades, 340ms. */
export function useAnimationDayChange(selected: string) {
  const ref = useRef<HTMLDivElement>(null)
  const prev = useRef(selected)

  useGSAP(
    () => {
      if (prev.current === selected) return
      const dir = selected > prev.current ? 1 : -1
      prev.current = selected
      gsap.fromTo(
        ref.current,
        { x: dir * 14, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.34, ease: 'soft', clearProps: 'transform,opacity' },
      )
    },
    { dependencies: [selected] },
  )

  return ref
}
