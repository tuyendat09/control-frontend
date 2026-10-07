import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

/** Toast: in (264ms) → hold → out (440ms), 2.2s total (4.5s when it carries an action). Replays whenever `id` changes. */
export function useAnimationToast(id: number, hasAction = false) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.set(ref.current, { xPercent: -50 })
      gsap
        .timeline()
        .fromTo(ref.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.264, ease: 'power2.out' })
        .to(ref.current, { opacity: 0, y: -6, duration: 0.44, ease: 'power1.in' }, hasAction ? '+=3.8' : '+=1.496')
    },
    { scope: ref, dependencies: [id] },
  )

  return ref
}
