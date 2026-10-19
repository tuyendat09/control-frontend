import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

/** CTA reacts to the selection count: label rolls up/down, and the button springs when it first arms. */
export function useAnimationPickerCta(count: number) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const prev = useRef(count)

  useGSAP(
    () => {
      const before = prev.current
      prev.current = count
      if (before === count) return

      const tl = gsap.timeline({ defaults: { overwrite: 'auto' } })
      tl.fromTo(labelRef.current, { y: count > before ? 9 : -9, opacity: 0 }, { y: 0, opacity: 1, duration: 0.28, ease: 'soft' }, 0)
      if (before === 0) tl.fromTo(buttonRef.current, { scale: 0.95 }, { scale: 1, duration: 0.42, ease: 'spring' }, 0)
    },
    { dependencies: [count] },
  )

  return { buttonRef, labelRef }
}
