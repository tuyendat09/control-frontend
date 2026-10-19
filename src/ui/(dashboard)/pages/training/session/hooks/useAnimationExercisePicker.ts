import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

const ROW_STAGGER_LIMIT = 10

/**
 * Presence + choreography for the exercise picker. One timeline plays both ways:
 *   sheet rises 24px · header parts drop in · search settles · chips slide in ·
 *   first rows cascade · CTA springs up from the bottom.
 * Closing reverses the whole thing a touch faster and unmounts once it has finished.
 * Mark parts with `data-pk="head|search|chip|row|cta"`.
 */
export function useAnimationExercisePicker(open: boolean) {
  const [mounted, setMounted] = useState(open)
  if (open && !mounted) setMounted(true)

  const rootRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      if (!mounted) return
      const parts = (name: string) => gsap.utils.toArray<HTMLElement>(`[data-pk="${name}"]`, rootRef.current)

      const tl = gsap.timeline({ paused: true, onReverseComplete: () => setMounted(false) })
      tl.fromTo(rootRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'soft' }, 0)
        .fromTo(parts('head'), { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'soft', stagger: 0.05 }, 0.06)
        .fromTo(parts('search'), { y: 12, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'soft' }, 0.12)
        .fromTo(parts('chip'), { x: 18, opacity: 0 }, { x: 0, opacity: 1, duration: 0.42, ease: 'soft', stagger: 0.03 }, 0.16)
        .fromTo(
          parts('row').slice(0, ROW_STAGGER_LIMIT),
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.42, ease: 'soft', stagger: 0.04 },
          0.22,
        )
        .fromTo(parts('cta'), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'spring' }, 0.3)
      tlRef.current = tl
      return () => {
        tlRef.current = null
      }
    },
    { scope: rootRef, dependencies: [mounted] },
  )

  useGSAP(
    () => {
      const tl = tlRef.current
      if (!tl) return
      if (open) tl.timeScale(1).play()
      else tl.timeScale(1.6).reverse()
    },
    { dependencies: [open, mounted] },
  )

  return { mounted, rootRef }
}
