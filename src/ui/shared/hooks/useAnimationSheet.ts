import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

/**
 * Presence + timeline for bottom sheets. One timeline drives both directions:
 *   scrim fades · panel rises 26px · `[data-sheet-row]` children stagger in.
 * Closing reverses it (a touch faster), and the sheet only unmounts once it has finished.
 */
export function useAnimationSheet(open: boolean) {
  const [mounted, setMounted] = useState(open)
  if (open && !mounted) setMounted(true)

  const rootRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  // Build the timeline whenever the sheet (re)mounts.
  useGSAP(
    () => {
      if (!mounted) return
      const rows = gsap.utils.toArray<HTMLElement>('[data-sheet-row]', rootRef.current)
      const tl = gsap.timeline({ paused: true, onReverseComplete: () => setMounted(false) })
      tl.fromTo(scrimRef.current, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: 'none' }, 0).fromTo(
        panelRef.current,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'soft' },
        0,
      )
      if (rows.length) {
        tl.fromTo(rows, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: 'soft', stagger: 0.05 }, 0.04)
      }
      tlRef.current = tl
      return () => {
        tlRef.current = null
      }
    },
    { scope: rootRef, dependencies: [mounted] },
  )

  // Play in / play out.
  useGSAP(
    () => {
      const tl = tlRef.current
      if (!tl) return
      if (open) tl.timeScale(1).play()
      else tl.timeScale(1.6).reverse()
    },
    { dependencies: [open, mounted] },
  )

  return { mounted, rootRef, scrimRef, panelRef }
}
