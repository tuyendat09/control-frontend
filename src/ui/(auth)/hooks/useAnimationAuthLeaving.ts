import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'
import type { AuthStage } from './useAuthStage'

/** The page we're leaving fades out while the logo glides: welcome drifts up, form drifts down. */
export function useAnimationAuthLeaving(stage: AuthStage) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to(ref.current, {
        opacity: 0,
        y: stage === 'welcome' ? -18 : 20,
        duration: 0.45,
        ease: 'expo',
      })
    },
    { scope: ref },
  )

  return ref
}
