import type { MealEntry } from '@/types'
import { CardList } from '@/ui/shared/components/Card'
import { SectionLabel } from '@/ui/shared/components/SectionLabel'
import { useT } from '@/ui/shared/hooks/useT'
import { MealRow } from './MealRow'

export function LoggedToday({ entries }: { entries: MealEntry[] }) {
  const t = useT()

  return (
    <section>
      <SectionLabel className="mt-[26px] px-6">{t('Hôm nay đã ăn', 'Logged today')}</SectionLabel>
      <CardList className="mx-5 mt-3">
        {entries.map((entry) => (
          <MealRow key={entry.id} entry={entry} />
        ))}
      </CardList>
    </section>
  )
}
