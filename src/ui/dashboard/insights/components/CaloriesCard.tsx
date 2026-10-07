import { BarChart, type BarItem } from '@/ui/shared/components/BarChart'
import { Card } from '@/ui/shared/components/Card'
import { useT } from '@/ui/shared/hooks/useT'

export function CaloriesCard({ bars }: { bars: BarItem[] }) {
  const t = useT()

  return (
    <Card className="mx-5 mt-[14px] p-5">
      <div className="text-[11px] tracking-[.1em] text-tx3 uppercase">{t('Calo 7 ngày', 'Calories · 7 days')}</div>
      <BarChart items={bars} maxBarHeight={96} className="mt-4 h-[104px]" />
    </Card>
  )
}
