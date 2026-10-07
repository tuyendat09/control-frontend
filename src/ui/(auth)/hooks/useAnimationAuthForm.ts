import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'
import { useAuthLeaving } from './useAuthLeaving'

/**
 * Form entrance: heading → fields → password → CTA (+ footer) at .20 / .27 / .34 / .41s.
 * Mark each group `data-fi="1|2|3|4"`.
 */
export function useAnimationAuthForm() {
  const scope = useRef<HTMLDivElement>(null)
  const leaving = useAuthLeaving()

  useGSAP(
    () => {
      if (leaving) return
      const from = { opacity: 0, y: 16 }
      const to = { opacity: 1, y: 0, duration: 0.58, ease: 'expo', clearProps: 'opacity,transform' }
      // fromTo (not from): buttons carry CSS transitions, so their "end" value can't be read reliably.
      gsap
        .timeline()
        .fromTo('[data-fi="1"]', from, to, 0.2)
        .fromTo('[data-fi="2"]', from, to, 0.27)
        .fromTo('[data-fi="3"]', from, to, 0.34)
        .fromTo('[data-fi="4"]', from, to, 0.41)
    },
    { scope },
  )

  return scope
}
