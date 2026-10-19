import { Card } from '@/ui/shared/components/Card'
import { SectionLabel } from '@/ui/shared/components/SectionLabel'
import { useT } from '@/ui/shared/hooks/useT'
import type { PickerSection as Section } from '../../hooks/pickerSections'
import { PickerRow } from './PickerRow'

interface PickerSectionProps {
  section: Section
  selected: string[]
  sessionIds: Set<string>
  onToggle: (id: string) => void
}

export function PickerSection({ section, selected, sessionIds, onToggle }: PickerSectionProps) {
  const t = useT()

  return (
    <section>
      <SectionLabel className="mx-6 mt-4 mb-2 flex justify-between">
        <span>{t(section.title.vi, section.title.en)}</span>
        {section.count !== undefined && <span className="tabular-nums">{section.count}</span>}
      </SectionLabel>
      <Card className="mx-5 overflow-hidden rounded-[22px]">
        {section.rows.map((exercise, i) => (
          <PickerRow
            key={exercise.id}
            exercise={exercise}
            order={selected.indexOf(exercise.id) + 1}
            inSession={sessionIds.has(exercise.id)}
            first={i === 0}
            onToggle={() => onToggle(exercise.id)}
          />
        ))}
      </Card>
    </section>
  )
}
