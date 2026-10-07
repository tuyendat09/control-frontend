import { useRef } from 'react'
import type { ScanMode } from '@/data/scan'
import { gsap, reducedMotion, useGSAP } from '@/lib/motion'
import type { ScanStatus } from './useScanner'

interface ScanMotion {
  status: ScanStatus
  mode: ScanMode
  flash: boolean
}

const MINT = '#9FD3BC'
const FRAME: Record<ScanMode, { width: number; height: number }> = {
  bar: { width: 276, height: 156 },
  qr: { width: 224, height: 224 },
}

/**
 * Scanner motion. Target elements are marked `data-scan-*` inside the page root.
 *
 * Lock timeline (550ms, plays on detect, REVERSES on rescan):
 *   0     camera + frame rise 92px and shrink to .86 (expo) · corners turn mint · scan line off
 *   0     hint + controls fade out · result sheet slides up
 *   0–.5  frame "lock pop" .94 → 1
 */
export function useAnimationScan(scope: React.RefObject<HTMLElement | null>, { status, mode, flash }: ScanMotion) {
  const lockRef = useRef<gsap.core.Timeline | null>(null)
  const lineRef = useRef<gsap.core.Tween | null>(null)
  const modeSeen = useRef(false)

  // Build once: initial poses, lock timeline, scan-line sweep.
  useGSAP(
    () => {
      gsap.set('[data-scan-cam]', { transformOrigin: '50% 300px', filter: 'brightness(1) saturate(1)' })
      gsap.set('[data-scan-result]', { yPercent: 104 })

      lockRef.current = gsap
        .timeline({ paused: true, defaults: { ease: 'expo' } })
        .to('[data-scan-cam]', { y: -92, scale: 0.86, duration: 0.5 }, 0)
        .to('[data-scan-frame]', { y: -92, scale: 0.86, duration: 0.5 }, 0)
        .to('[data-scan-corner]', { borderColor: MINT, duration: 0.3, ease: 'none' }, 0)
        .to('[data-scan-lock]', { scale: 0.94, duration: 0.2, ease: 'power2.out' }, 0)
        .to('[data-scan-lock]', { scale: 1, duration: 0.3, ease: 'spring' }, 0.2)
        .to('[data-scan-line]', { opacity: 0, duration: 0.2, ease: 'none' }, 0)
        .to('[data-scan-hint]', { autoAlpha: 0, duration: 0.25, ease: 'none' }, 0)
        .to('[data-scan-controls]', { autoAlpha: 0, y: 16, duration: 0.4 }, 0)
        .to('[data-scan-result]', { yPercent: 0, duration: 0.55 }, 0)

      if (!reducedMotion()) {
        lineRef.current = gsap.fromTo(
          '[data-scan-line]',
          { top: '8%' },
          { top: '92%', duration: 1.7, ease: 'sweep', repeat: -1, yoyo: true },
        )
      } else {
        gsap.set('[data-scan-line]', { top: '50%' })
      }

      return () => {
        lockRef.current = null
        lineRef.current = null
      }
    },
    { scope },
  )

  // Detect → play lock; rescan → reverse it.
  useGSAP(
    () => {
      const tl = lockRef.current
      if (!tl) return
      if (status === 'found') {
        lineRef.current?.pause()
        tl.timeScale(1).play()
      } else {
        lineRef.current?.resume()
        tl.timeScale(1.2).reverse()
      }
    },
    { scope, dependencies: [status] },
  )

  // Frame morphs between barcode and QR proportions.
  useGSAP(
    () => {
      const first = !modeSeen.current
      modeSeen.current = true
      gsap.to('[data-scan-frame]', { ...FRAME[mode], duration: first ? 0 : 0.5, ease: 'expo', overwrite: 'auto' })
      return () => {
        modeSeen.current = false
      }
    },
    { scope, dependencies: [mode] },
  )

  // Flash brightens the camera feed.
  useGSAP(
    () => {
      gsap.to('[data-scan-cam]', {
        filter: flash ? 'brightness(1.45) saturate(1.1)' : 'brightness(1) saturate(1)',
        duration: 0.3,
        ease: 'none',
      })
    },
    { scope, dependencies: [flash] },
  )
}
