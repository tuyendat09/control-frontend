import { useAnimationRise } from '@/ui/shared/hooks/useAnimationRise'
import { useT } from '@/ui/shared/hooks/useT'
import { useAnimationPickerList } from '../../hooks/useAnimationPickerList'
import type { ExercisePicker } from '../../hooks/useExercisePicker'
import { PickerCreateRow } from './PickerCreateRow'
import { PickerSection } from './PickerSection'

function NoMatch({ query }: { query: string }) {
  const t = useT()
  const ref = useAnimationRise(true)

  return (
    <div ref={ref} className="mx-5 mt-7 flex flex-col items-center gap-1.5 text-center">
      <div className="font-serif text-[22px]">{t(`Không tìm thấy “${query}”`, `No match “${query}”`)}</div>
      <div className="text-[12.5px] text-tx2">
        {t('Thử bỏ bớt bộ lọc, hoặc tạo bài mới.', 'Loosen the filters, or create it.')}
      </div>
    </div>
  )
}

/** Scrolling results; bottom padding clears the CTA. */
export function PickerList({ picker }: { picker: ExercisePicker }) {
  const name = picker.query.trim()
  const listRef = useAnimationPickerList(
    `${picker.group}|${picker.equipment}|${picker.sections.map((s) => s.key).join(',')}`,
  )

  return (
    <div ref={listRef} className="no-scrollbar flex-1 overflow-y-auto pt-1.5 pb-[120px]">
      {picker.sections.map((section) => (
        <PickerSection
          key={section.key}
          section={section}
          selected={picker.selected}
          sessionIds={picker.sessionIds}
          onToggle={picker.toggle}
        />
      ))}
      {picker.noMatch && <NoMatch query={name} />}
      {picker.canCreate && (
        <PickerCreateRow
          name={name}
          muscle={picker.draftMuscle}
          equipment={picker.draftEquipment}
          onCreate={picker.create}
        />
      )}
    </div>
  )
}
