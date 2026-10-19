import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

const ROW_STAGGER_LIMIT = 12

/** The result list re-cascades (8px rise, 25ms apart) whenever its `signature` changes — filters, section set. */
export function useAnimationPickerList(signature: string) {
  const ref = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  useGSAP(
    () => {
      // The opening cascade belongs to the sheet timeline.
      if (first.current) {
        first.current = false
        return
      }
      const rows = gsap.utils.toArray<HTMLElement>('[data-pk="row"]', ref.current).slice(0, ROW_STAGGER_LIMIT)
      gsap.fromTo(
        rows,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.32, ease: 'soft', stagger: 0.025, clearProps: 'transform,opacity', overwrite: 'auto' },
      )
      return () => {
        first.current = true
      }
    },
    { scope: ref, dependencies: [signature] },
  )

  return ref
}
