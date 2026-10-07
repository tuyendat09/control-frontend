import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'
import { useAuthLeaving } from './useAuthLeaving'

/** Welcome entrance: overline → tagline → actions fade up (700ms), 90ms apart. Mark `data-up="1|2|3"`. */
export function useAnimationAuthWelcome() {
  const scope = useRef<HTMLDivElement>(null)
  const leaving = useAuthLeaving()

  useGSAP(
    () => {
      if (leaving) return
      const from = { opacity: 0, y: 12 }
      const to = { opacity: 1, y: 0, duration: 0.7, ease: 'soft', clearProps: 'opacity,transform' }
      gsap
        .timeline()
        .fromTo('[data-up="1"]', from, to, 0.23)
        .fromTo('[data-up="2"]', from, to, 0.32)
        .fromTo('[data-up="3"]', from, to, 0.41)
    },
    { scope },
  )

  return scope
}
