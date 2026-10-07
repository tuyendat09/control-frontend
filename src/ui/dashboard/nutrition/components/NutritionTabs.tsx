import { Segmented } from '@/ui/shared/components/Segmented'
import { useT } from '@/ui/shared/hooks/useT'
import type { NutritionTab } from '../hooks/useNutritionTab'

interface NutritionTabsProps {
  tab: NutritionTab
  onChange: (tab: NutritionTab) => void
}

export function NutritionTabs({ tab, onChange }: NutritionTabsProps) {
  const t = useT()

  return (
    <Segmented
      className="mx-5 mt-4"
      value={tab}
      onChange={onChange}
      items={[
        { value: 'log', label: t('Nhật ký', 'Log') },
        { value: 'library', label: t('Thư viện', 'Library') },
      ]}
    />
  )
}
