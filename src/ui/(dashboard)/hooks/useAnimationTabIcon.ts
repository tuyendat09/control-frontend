import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

export type TabIconKind = 'hop' | 'bars' | 'wobble' | 'pop'

/** Each tab icon plays its own spring every time its tab becomes active (MOTION §3). */
export function useAnimationTabIcon(active: boolean, kind: TabIconKind) {
  const ref = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      if (!active) return
      const el = ref.current
      if (!el) return

      if (kind === 'hop') {
        gsap
          .timeline()
          .to(el, { y: -4, scale: 1.16, duration: 0.156, ease: 'power2.out' })
          .to(el, { y: 1, scale: 0.97, duration: 0.13, ease: 'power1.inOut' })
          .to(el, { y: -1, scale: 1.03, duration: 0.104, ease: 'power1.inOut' })
          .to(el, { y: 0, scale: 1, duration: 0.13, ease: 'power1.out' })
      } else if (kind === 'pop') {
        gsap
          .timeline()
          .to(el, { scale: 1.17, duration: 0.161, ease: 'power2.out' })
          .to(el, { scale: 0.98, duration: 0.124, ease: 'power1.inOut' })
          .to(el, { scale: 1, duration: 0.175, ease: 'power1.out' })
      } else if (kind === 'wobble') {
        gsap.set(el, { transformOrigin: '50% 62%' })
        gsap
          .timeline()
          .to(el, { rotation: -11, scale: 1.08, duration: 0.124, ease: 'power2.out' })
          .to(el, { rotation: 8, scale: 1.05, duration: 0.155, ease: 'power1.inOut' })
          .to(el, { rotation: -4, scale: 1, duration: 0.143, ease: 'power1.inOut' })
          .to(el, { rotation: 2, duration: 0.112, ease: 'power1.inOut' })
          .to(el, { rotation: 0, duration: 0.087, ease: 'power1.out' })
      } else {
        // bars: three strokes squash and overshoot, 60ms apart, anchored at the baseline.
        const bars = gsap.utils.toArray<SVGPathElement>('[data-bar]', el)
        gsap.set(bars, { transformOrigin: '50% 100%' })
        gsap
          .timeline()
          .to(bars, { scaleY: 0.45, duration: 0.175, ease: 'power2.out', stagger: 0.06 })
          .to(bars, { scaleY: 1.14, duration: 0.175, ease: 'power1.inOut', stagger: 0.06 }, '>-0.12')
          .to(bars, { scaleY: 1, duration: 0.15, ease: 'power1.out', stagger: 0.06 }, '>-0.12')
      }
    },
    { scope: ref, dependencies: [active] },
  )

  return ref
}
