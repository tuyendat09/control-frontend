import type { ScanMode } from '@/data/scan'
import { Segmented } from '@/ui/shared/components/Segmented'
import { useT } from '@/ui/shared/hooks/useT'

interface ScanControlsProps {
  mode: ScanMode
  onModeChange: (mode: ScanMode) => void
  onManual: () => void
}

export function ScanControls({ mode, onModeChange, onManual }: ScanControlsProps) {
  const t = useT()

  return (
    <div data-scan-controls className="absolute inset-x-0 bottom-11 z-[3] flex flex-col items-center gap-5">
      <Segmented
        variant="glass"
        className="w-[228px]"
        value={mode}
        onChange={onModeChange}
        items={[
          { value: 'bar', label: t('Mã vạch', 'Barcode') },
          { value: 'qr', label: 'QR' },
        ]}
      />
      <button
        type="button"
        onClick={onManual}
        className="px-3 py-2 text-[13px] text-[rgba(244,241,236,.7)] transition-colors duration-200 hover:text-[#F4F1EC]"
      >
        {t('Nhập mã thủ công', 'Enter code manually')}
      </button>
    </div>
  )
}
