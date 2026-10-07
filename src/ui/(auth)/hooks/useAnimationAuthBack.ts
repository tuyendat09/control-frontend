import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'
import type { AuthStage } from './useAuthStage'

/** Back button fades/slides in with the form and out again on the way back. */
export function useAnimationAuthBack(stage: AuthStage) {
  const ref = useRef<HTMLButtonElement>(null)
  const seen = useRef(false)

  useGSAP(
    () => {
      const show = stage === 'form'
      const props = { autoAlpha: show ? 1 : 0, x: show ? 0 : -8, scale: show ? 1 : 0.85 }
      if (!seen.current) gsap.set(ref.current, props)
      else gsap.to(ref.current, { ...props, duration: show ? 0.5 : 0.4, ease: 'expo' })
      seen.current = true
      return () => {
        seen.current = false
      }
    },
    { dependencies: [stage] },
  )

  return ref
}
