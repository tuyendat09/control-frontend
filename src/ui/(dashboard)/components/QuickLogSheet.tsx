import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { SAMPLE_TODAY } from '@/lib/date'
import {
  AppleIcon,
  BarcodeScanIcon,
  BarsIcon,
  ChevronRightIcon,
  TrendIcon,
} from '@/ui/shared/components/Icons'
import { Sheet } from '@/ui/shared/components/Sheet'
import { useT } from '@/ui/shared/hooks/useT'
import { useWeightStats } from '@/ui/shared/hooks/useWeightStats'
import { useDashboardUi } from '../hooks/useDashboardUi'

interface QuickLogRowProps {
  icon: ReactNode
  title: string
  subtitle: string
  onClick: () => void
}

function QuickLogRow({ icon, title, subtitle, onClick }: QuickLogRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-sheet-row
      className="flex items-center gap-[14px] rounded-[20px] border border-line bg-surf2 px-[18px] py-4 text-left transition-[transform,border-color] duration-[180ms] ease-soft hover:border-acc active:scale-[.985]"
    >
      <span className="flex size-10 flex-none items-center justify-center rounded-[14px] bg-tint text-acc">{icon}</span>
      <span className="flex-1">
        <span className="block text-[14.5px] font-semibold">{title}</span>
        <span className="mt-0.5 block text-[11.5px] text-tx3">{subtitle}</span>
      </span>
      <ChevronRightIcon size={16} strokeWidth={1.8} className="text-tx3" />
    </button>
  )
}

/** Center "+" action sheet. */
export function QuickLogSheet() {
  const t = useT()
  const navigate = useNavigate()
  const { quickLogOpen, closeQuickLog, openWeight } = useDashboardUi()
  const { lastLabel } = useWeightStats()

  const go = (to: string) => () => {
    closeQuickLog()
    navigate(to)
  }

  return (
    <Sheet open={quickLogOpen} onClose={closeQuickLog} label={t('Ghi nhanh', 'Quick log')}>
      <div className="px-1 pb-[14px]">
        <h2 className="m-0 font-serif text-[23px] leading-[1.1] font-normal">{t('Ghi nhanh', 'Quick log')}</h2>
        <div className="mt-[3px] text-[12.5px] text-tx3">
          {t(`Hôm nay, ${SAMPLE_TODAY}/08`, `Today, Aug ${SAMPLE_TODAY}`)}
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <QuickLogRow
          icon={<AppleIcon size={19} />}
          title={t('Ghi bữa ăn', 'Log a meal')}
          subtitle={t('Chọn từ thư viện hoặc combo quen', 'From your library or a saved combo')}
          onClick={go('/nutrition?tab=library')}
        />
        <QuickLogRow
          icon={<BarsIcon size={19} />}
          title={t('Bắt đầu buổi tập', 'Start a session')}
          subtitle={t('Tạo mới hoặc chép từ buổi cũ', 'Fresh session or copy an old one')}
          onClick={go(`/training/day/${SAMPLE_TODAY}`)}
        />
        <QuickLogRow
          icon={<BarcodeScanIcon size={19} />}
          title={t('Quét mã vạch', 'Scan a barcode')}
          subtitle={t('Đồ đóng gói hoặc mã QR combo', 'Packaged food or a combo QR')}
          onClick={go('/scan')}
        />
        <QuickLogRow
          icon={<TrendIcon size={19} />}
          title={t('Cân nặng hôm nay', 'Today’s weight')}
          subtitle={lastLabel}
          onClick={openWeight}
        />
      </div>
    </Sheet>
  )
}
