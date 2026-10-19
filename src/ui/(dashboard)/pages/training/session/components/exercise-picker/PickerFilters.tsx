import { EQUIPMENT, EQUIPMENT_LABEL, MUSCLE_GROUPS, MUSCLE_LABEL } from '@/data/exercises'
import { cn } from '@/lib/cn'
import { useT } from '@/ui/shared/hooks/useT'
import type { EquipmentFilter, GroupFilter } from '../../hooks/pickerSections'

interface PickerFiltersProps {
  group: GroupFilter
  equipment: EquipmentFilter
  onGroup: (group: GroupFilter) => void
  onEquipment: (equipment: EquipmentFilter) => void
}

const GROUPS: GroupFilter[] = ['all', ...MUSCLE_GROUPS]
const EQUIPMENTS: EquipmentFilter[] = ['all', ...EQUIPMENT]

/** Muscle-group pills (scroll sideways) with a quieter equipment row under them. */
export function PickerFilters({ group, equipment, onGroup, onEquipment }: PickerFiltersProps) {
  const t = useT()

  return (
    <>
      <div className="no-scrollbar flex flex-none gap-1.5 overflow-x-auto px-5 pt-3 pb-0.5">
        {GROUPS.map((g) => (
          <button
            key={g}
            type="button"
            data-pk="chip"
            aria-pressed={group === g}
            onClick={() => onGroup(g)}
            className={cn(
              'flex-none rounded-full border px-[13px] py-2 text-[12.5px] font-medium transition-all duration-[180ms]',
              group === g ? 'border-acc bg-acc text-acc-tx' : 'border-line bg-surf2 text-tx2 hover:border-line-hi',
            )}
          >
            {t(MUSCLE_LABEL[g].vi, MUSCLE_LABEL[g].en)}
          </button>
        ))}
      </div>
      <div className="flex flex-none gap-1.5 px-5 pt-2">
        {EQUIPMENTS.map((e) => (
          <button
            key={e}
            type="button"
            data-pk="chip"
            aria-pressed={equipment === e}
            onClick={() => onEquipment(e)}
            className={cn(
              'flex-none rounded-[9px] px-2.5 py-[5px] text-[11.5px] transition-all duration-[180ms]',
              equipment === e ? 'bg-tint text-tx' : 'text-tx3 hover:text-tx2',
            )}
          >
            {t(EQUIPMENT_LABEL[e].vi, EQUIPMENT_LABEL[e].en)}
          </button>
        ))}
      </div>
    </>
  )
}
