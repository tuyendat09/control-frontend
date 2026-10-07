import { Link } from 'react-router'
import { QUICK_COMBOS } from '@/data/nutrition'
import type { QuickCombo } from '@/types'
import { SectionLabel } from '@/ui/shared/components/SectionLabel'
import { useT } from '@/ui/shared/hooks/useT'

interface QuickAddSectionProps {
  onAdd: (combo: QuickCombo) => void
}

export function QuickAddSection({ onAdd }: QuickAddSectionProps) {
  const t = useT()

  return (
    <section>
      <div className="mt-[26px] flex items-center justify-between px-6">
        <SectionLabel>{t('Thêm nhanh', 'Quick add')}</SectionLabel>
        <Link to="/nutrition?tab=library" className="flex-none text-[12.5px] whitespace-nowrap text-tx2">
          {t('Thư viện', 'Library')} →
        </Link>
      </div>
      <div className="no-scrollbar mt-3 flex gap-[10px] overflow-x-auto px-6 pb-1">
        {QUICK_COMBOS.map((combo) => (
          <button
            key={combo.id}
            type="button"
            onClick={() => onAdd(combo)}
            className="flex-none rounded-[16px] border border-line bg-surf2 px-4 py-[13px] text-left transition-[transform,border-color] duration-[180ms] ease-soft hover:border-line-hi active:scale-[.96]"
          >
            <div className="text-[13.5px] font-semibold">{t(combo.name.vi, combo.name.en)}</div>
            <div className="mt-[3px] text-[11.5px] text-tx3">
              {combo.kcal} kcal · <span className="font-semibold text-p-tx">{combo.macros.p}g P</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
