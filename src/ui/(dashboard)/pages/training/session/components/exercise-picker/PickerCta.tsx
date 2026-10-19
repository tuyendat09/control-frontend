import { cn } from '@/lib/cn'
import { useT } from '@/ui/shared/hooks/useT'
import { useAnimationPickerCta } from '../../hooks/useAnimationPickerCta'

interface PickerCtaProps {
  count: number
  onConfirm: () => void
}

/** Sticky confirm button; inert until something is picked. */
export function PickerCta({ count, onConfirm }: PickerCtaProps) {
  const t = useT()
  const { buttonRef, labelRef } = useAnimationPickerCta(count)

  return (
    <div
      data-pk="cta"
      className="absolute inset-x-0 bottom-0 bg-linear-to-t from-surf from-70% to-transparent px-5 pt-4 pb-[30px]"
    >
      <button
        ref={buttonRef}
        type="button"
        disabled={count === 0}
        onClick={onConfirm}
        className={cn(
          'flex h-[52px] w-full items-center justify-center rounded-[16px] text-[14.5px] font-semibold transition-[background-color,color,scale] duration-200 ease-soft active:scale-[.98]',
          count ? 'bg-acc text-acc-tx' : 'bg-tint text-tx3',
        )}
      >
        <span ref={labelRef}>
          {count ? t(`Thêm ${count} bài`, `Add ${count} ${count > 1 ? 'exercises' : 'exercise'}`) : t('Chọn bài để thêm', 'Pick exercises')}
        </span>
      </button>
    </div>
  )
}
