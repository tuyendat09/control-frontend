import { TARGETS } from '@/data/nutrition'
import { fmtInt } from '@/lib/format'
import { CardList } from '@/ui/shared/components/Card'
import { SectionLabel } from '@/ui/shared/components/SectionLabel'
import { useT } from '@/ui/shared/hooks/useT'
import { SettingRow } from './SettingRow'

export function TargetsList() {
  const t = useT()

  return (
    <section>
      <SectionLabel className="mx-6 mt-5 mb-[10px]">{t('Mục tiêu', 'Targets')}</SectionLabel>
      <CardList className="mx-5">
        <SettingRow label={t('Calo mỗi ngày', 'Daily calories')} value={`${fmtInt(TARGETS.kcal)} kcal`} />
        <SettingRow label="Macro" value={`${TARGETS.p} / ${TARGETS.c} / ${TARGETS.f} g`} />
        <SettingRow label={t('Mục tiêu cân nặng', 'Goal weight')} value={`${TARGETS.goalWeight} kg`} />
      </CardList>
    </section>
  )
}
