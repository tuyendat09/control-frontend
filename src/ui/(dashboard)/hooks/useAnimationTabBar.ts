import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

/**
 * Tab bar motion:
 *  - pressing (or holding) any item lifts and slightly enlarges the bar, like the Facebook tab bar;
 *    releasing springs it back with an elastic settle.
 *  - the "+" icon rotates to × while the quick-log sheet is open, and back when it closes.
 */
export function useAnimationTabBar(quickLogOpen: boolean) {
  const barRef = useRef<HTMLDivElement>(null)
  const plusRef = useRef<SVGSVGElement>(null)
  const first = useRef(true)

  const press = () => {
    gsap.to(barRef.current, { y: -5, scale: 1.03, duration: 0.18, ease: 'power2.out', overwrite: 'auto' })
  }

  const release = () => {
    gsap.to(barRef.current, { y: 0, scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' })
  }

  useGSAP(
    () => {
      const instant = first.current
      first.current = false
      gsap.to(plusRef.current, { rotation: quickLogOpen ? 135 : 0, duration: instant ? 0 : 0.38, ease: 'plus' })
      return () => {
        first.current = true
      }
    },
    { dependencies: [quickLogOpen] },
  )

  return {
    barRef,
    plusRef,
    barHandlers: {
      onPointerDown: press,
      onPointerUp: release,
      onPointerCancel: release,
      onPointerLeave: release,
    },
  }
}
