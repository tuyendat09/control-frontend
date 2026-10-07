import { CloseIcon, FlashIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'
import { GlassButton } from './GlassButton'

interface ScanTopBarProps {
  flash: boolean
  onClose: () => void
  onToggleFlash: () => void
}

export function ScanTopBar({ flash, onClose, onToggleFlash }: ScanTopBarProps) {
  const t = useT()

  return (
    <div className="absolute inset-x-5 top-16 z-[3] flex items-center justify-between">
      <GlassButton aria-label={t('Đóng', 'Close')} onClick={onClose}>
        <CloseIcon size={16} />
      </GlassButton>
      <div className="text-[14.5px] font-semibold tracking-[.01em]">{t('Quét mã', 'Scan')}</div>
      <GlassButton aria-label={t('Đèn flash', 'Flash')} aria-pressed={flash} active={flash} onClick={onToggleFlash}>
        <FlashIcon size={17} />
      </GlassButton>
    </div>
  )
}
