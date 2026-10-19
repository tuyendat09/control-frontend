import { CloseIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'

interface PickerHeaderProps {
  hasSelection: boolean
  onClose: () => void
  onClear: () => void
}

export function PickerHeader({ hasSelection, onClose, onClear }: PickerHeaderProps) {
  const t = useT()

  return (
    <header className="flex items-center gap-3 px-5 pt-[58px]">
      <button
        type="button"
        data-pk="head"
        aria-label={t('Đóng', 'Close')}
        onClick={onClose}
        className="flex size-[34px] flex-none items-center justify-center rounded-[14px] bg-tint text-tx2 transition-all duration-[180ms] hover:bg-acc hover:text-acc-tx"
      >
        <CloseIcon size={15} />
      </button>
      <h2 data-pk="head" className="m-0 flex-1 font-serif text-[24px] leading-none font-normal">
        {t('Thêm bài tập', 'Add exercises')}
      </h2>
      {hasSelection && (
        <button
          type="button"
          onClick={onClear}
          className="px-1 py-1.5 text-[12.5px] text-tx2 transition-colors duration-[180ms] hover:text-tx"
        >
          {t('Bỏ chọn', 'Clear')}
        </button>
      )}
    </header>
  )
}
