import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion'

/**
 * Week card ⇄ month dropdown. One card, one height tween (measured, not guessed):
 *   open  — card grows (expo) · week strip lifts away · month cells cascade in · legend last · selected day pops
 *   close — cells fade bottom-up · card shrinks · week strip settles back
 *   month change while open — card re-measures (5 vs 6 rows) and the cells re-cascade
 * Both layers stay mounted (stacked, absolute) so the card is never swapped abruptly.
 */
export function useAnimationDateNavigator(open: boolean, monthKey: number, label: string) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const weekRef = useRef<HTMLDivElement>(null)
  const monthRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<SVGSVGElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  const ready = useRef(false)
  const prevOpen = useRef(open)
  const prevKey = useRef(monthKey)
  const prevLabel = useRef(label)

  useGSAP(
    () => {
      const body = bodyRef.current
      const week = weekRef.current
      const month = monthRef.current
      if (!body || !week || !month) return

      const cells = gsap.utils.toArray<HTMLElement>('[data-month-cell]', month)
      const head = month.querySelector('[data-month-head]')
      const legend = month.querySelector('[data-month-legend]')

      // First run: settle into the closed state without animating.
      if (!ready.current) {
        ready.current = true
        gsap.set(body, { height: week.offsetHeight })
        gsap.set(month, { autoAlpha: 0 })
        gsap.set(chevronRef.current, { rotation: 0 })
        // StrictMode (dev) reverts this effect and runs it again — start from "not ready" so it re-initializes.
        return () => {
          ready.current = false
        }
      }

      const toggled = prevOpen.current !== open
      const monthChanged = prevKey.current !== monthKey
      prevOpen.current = open
      prevKey.current = monthKey

      gsap.killTweensOf([body, week, month, cells, head, legend])

      if (toggled) {
        gsap.to(chevronRef.current, { rotation: open ? 180 : 0, duration: 0.3, ease: 'plus' })

        if (open) {
          gsap.set(month, { autoAlpha: 1 })
          gsap.set(cells, { opacity: 0 })
          const selected = cells.find((c) => c.getAttribute('aria-pressed') === 'true')
          const tl = gsap
            .timeline()
            .to(body, { height: month.offsetHeight, duration: 0.5, ease: 'expo' }, 0)
            .to(week, { autoAlpha: 0, y: -6, duration: 0.16, ease: 'power1.in' }, 0)
            .fromTo(head, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'none' }, 0.12)
            .fromTo(
              cells,
              { opacity: 0, y: 8, scale: 0.94 },
              { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'expo', stagger: { each: 0.011, from: 'start' } },
              0.1,
            )
            .fromTo(legend, { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.3, ease: 'soft' }, 0.32)
          if (selected) {
            tl.fromTo(selected, { scale: 0.8 }, { scale: 1, duration: 0.5, ease: 'spring', immediateRender: false }, 0.42)
          }
        } else {
          gsap
            .timeline()
            .to(cells, { opacity: 0, y: -4, duration: 0.14, ease: 'power1.in', stagger: { each: 0.004, from: 'end' } }, 0)
            .to([head, legend], { opacity: 0, duration: 0.12, ease: 'none' }, 0)
            .to(body, { height: week.offsetHeight, duration: 0.42, ease: 'expo' }, 0.06)
            .set(month, { autoAlpha: 0 }, 0.22)
            .fromTo(week, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'soft' }, 0.16)
        }
        return
      }

      if (open && monthChanged) {
        gsap.to(body, { height: month.offsetHeight, duration: 0.4, ease: 'expo' })
        gsap.fromTo(cells, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3, ease: 'soft', stagger: { each: 0.008 } })
      }
    },
    { dependencies: [open, monthKey] },
  )

  // The label rolls in from below when opening, from above when closing.
  useGSAP(
    () => {
      if (prevLabel.current === label) return
      prevLabel.current = label
      gsap.fromTo(labelRef.current, { y: open ? 8 : -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: 'expo' })
    },
    { dependencies: [label] },
  )

  return { bodyRef, weekRef, monthRef, chevronRef, labelRef }
}
