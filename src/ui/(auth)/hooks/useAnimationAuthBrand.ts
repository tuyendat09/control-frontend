import { useRef } from 'react'
import { gsap, reducedMotion, useGSAP } from '@/lib/motion'
import type { AuthStage } from './useAuthStage'

const MARK_SIZE = 64

/**
 * Shared-element logo + wordmark. Both are driven by ONE timeline with the same duration and curve
 * (transform only), so their relative position interpolates linearly and they never drift apart.
 * Also runs the idle loops: orbiting dot and the three sonar rings.
 */
export function useAnimationAuthBrand(stage: AuthStage) {
  const markRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLDivElement>(null)
  const sonarRef = useRef<HTMLDivElement>(null)
  const seen = useRef(false)

  // Stage transition (welcome ⇄ form).
  useGSAP(
    () => {
      const mark = markRef.current
      const word = wordRef.current
      const sonar = sonarRef.current
      const frame = mark?.parentElement
      if (!mark || !word || !sonar || !frame) return

      const layout = () =>
        stage === 'welcome'
          ? {
              mark: { x: (frame.clientWidth - MARK_SIZE) / 2, y: 196, scale: 1 },
              word: { x: (frame.clientWidth - word.offsetWidth) / 2, y: 298, scale: 1 },
            }
          : {
              mark: { x: 76, y: 86, scale: 0.53125 },
              word: { x: 122, y: 93, scale: 0.375 },
            }
      const sonarAlpha = stage === 'welcome' ? 1 : 0

      gsap.set([mark, word], { transformOrigin: '0 0' })

      if (!seen.current || reducedMotion()) {
        const l = layout()
        gsap.set(mark, l.mark)
        gsap.set(word, l.word)
        gsap.set(sonar, { opacity: sonarAlpha })
      } else {
        const l = layout()
        gsap
          .timeline({ defaults: { duration: 0.66, ease: 'expo' } })
          .to(mark, l.mark, 0)
          .to(word, l.word, 0)
          .to(sonar, { opacity: sonarAlpha, duration: 0.45, ease: 'power1.inOut' }, 0)
      }
      seen.current = true

      // Keep the welcome layout centered on resize / once the web font has loaded.
      const settle = () => {
        const l = layout()
        gsap.set(mark, l.mark)
        gsap.set(word, l.word)
      }
      window.addEventListener('resize', settle)
      void document.fonts?.ready.then(() => {
        if (!gsap.isTweening(word)) settle()
      })
      return () => {
        window.removeEventListener('resize', settle)
        seen.current = false
      }
    },
    { dependencies: [stage] },
  )

  // Idle loops (skipped under reduced motion).
  useGSAP(
    () => {
      if (reducedMotion()) return
      gsap.to('[data-orbit]', { rotation: 360, svgOrigin: '20 20', duration: 18, ease: 'none', repeat: -1 })

      gsap.utils.toArray<HTMLElement>('[data-sonar]').forEach((ring, i) => {
        gsap
          .timeline({ repeat: -1, delay: i * 1.4 })
          .fromTo(ring, { scale: 0.66 }, { scale: 1.5, duration: 4.2, ease: 'power1.out' }, 0)
          .fromTo(ring, { opacity: 0 }, { opacity: 0.3, duration: 0.756, ease: 'none' }, 0)
          .to(ring, { opacity: 0, duration: 3.444, ease: 'none' }, 0.756)
      })
    },
    { scope: markRef },
  )

  return { markRef, wordRef, sonarRef }
}
