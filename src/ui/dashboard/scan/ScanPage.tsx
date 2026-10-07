import { StatusBar } from '@/ui/shared/components/StatusBar'
import { ScanCamera } from './components/ScanCamera'
import { ScanControls } from './components/ScanControls'
import { ScanHint } from './components/ScanHint'
import { ScanResultSheet } from './components/ScanResultSheet'
import { ScanTopBar } from './components/ScanTopBar'
import { Viewfinder } from './components/Viewfinder'
import { useScanner } from './hooks/useScanner'

/**
 * Full-screen barcode / QR scanner. The camera layer is always dark, whatever the app theme.
 * State is exposed as data attributes so children can react with `group-data-[…]/scan:` variants.
 */
export function ScanPage() {
  const scanner = useScanner()

  return (
    <div
      data-state={scanner.status}
      data-flash={scanner.flash}
      className="group/scan absolute inset-0 z-[26] animate-fadein-slow overflow-hidden bg-[#0A0C0B] text-[#F4F1EC]"
    >
      <ScanCamera mode={scanner.mode} />
      <StatusBar className="z-[3]" />
      <ScanTopBar flash={scanner.flash} onClose={scanner.close} onToggleFlash={scanner.toggleFlash} />
      <Viewfinder mode={scanner.mode} />
      <ScanHint hint={scanner.product.hint} />
      <ScanControls mode={scanner.mode} onModeChange={scanner.switchMode} onManual={scanner.close} />
      <ScanResultSheet scanner={scanner} />
    </div>
  )
}
