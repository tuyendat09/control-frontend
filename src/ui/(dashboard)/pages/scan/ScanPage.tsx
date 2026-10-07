import { useRef } from 'react'
import { StatusBar } from '@/ui/shared/components/StatusBar'
import { ScanCamera } from './components/ScanCamera'
import { ScanControls } from './components/ScanControls'
import { ScanHint } from './components/ScanHint'
import { ScanResultSheet } from './components/ScanResultSheet'
import { ScanTopBar } from './components/ScanTopBar'
import { Viewfinder } from './components/Viewfinder'
import { useAnimationScan } from './hooks/useAnimationScan'
import { useScanner } from './hooks/useScanner'

/**
 * Full-screen barcode / QR scanner. The camera layer is always dark, whatever the app theme.
 * Motion is one GSAP timeline per concern in `useAnimationScan` (children carry `data-scan-*` hooks).
 */
export function ScanPage() {
  const scanner = useScanner()
  const root = useRef<HTMLDivElement>(null)
  useAnimationScan(root, { status: scanner.status, mode: scanner.mode, flash: scanner.flash })

  return (
    <div ref={root} className="absolute inset-0 z-[26] overflow-hidden bg-[#0A0C0B] text-[#F4F1EC]">
      <ScanCamera mode={scanner.mode} />
      <StatusBar className="z-[3]" />
      <ScanTopBar flash={scanner.flash} onClose={scanner.close} onToggleFlash={scanner.toggleFlash} />
      <Viewfinder />
      <ScanHint hint={scanner.product.hint} />
      <ScanControls mode={scanner.mode} onModeChange={scanner.switchMode} onManual={scanner.close} />
      <ScanResultSheet scanner={scanner} />
    </div>
  )
}
