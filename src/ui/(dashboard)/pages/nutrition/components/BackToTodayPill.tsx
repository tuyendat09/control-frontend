import { RefreshIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'

export function BackToTodayPill({ onClick }: { onClick: () => void }) {
  const t = useT()

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-full border border-line bg-surf2 px-3 py-[7px] text-[12px] font-semibold shadow-el transition-[transform,border-color] duration-[180ms] ease-soft hover:border-line-hi active:scale-[.96]"
    >
      <RefreshIcon size={12} strokeWidth={2.2} />
      {t('Về hôm nay', 'Back to today')}
    </button>
  )
}
