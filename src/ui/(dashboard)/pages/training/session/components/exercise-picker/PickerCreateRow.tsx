import { EQUIPMENT_LABEL, MUSCLE_LABEL } from '@/data/exercises'
import type { Equipment, MuscleGroup } from '@/types'
import { AddIcon } from '@/ui/shared/components/Icons'
import { useAnimationRise } from '@/ui/shared/hooks/useAnimationRise'
import { useT } from '@/ui/shared/hooks/useT'

interface PickerCreateRowProps {
  name: string
  muscle: MuscleGroup
  equipment: Equipment
  onCreate: () => void
}

/** The typed name matched nothing exactly: offer to add it to the library. */
export function PickerCreateRow({ name, muscle, equipment, onCreate }: PickerCreateRowProps) {
  const t = useT()
  const ref = useAnimationRise(true)

  return (
    <div ref={ref} className="mx-5 mt-[14px]">
      <button
        type="button"
        onClick={onCreate}
        className="flex w-full items-center gap-3 rounded-[18px] border-[1.5px] border-dashed border-line-hi px-4 py-[14px] text-left transition-colors duration-[180ms] hover:bg-tint"
      >
        <span className="flex size-[30px] flex-none items-center justify-center rounded-[10px] bg-acc text-acc-tx">
          <AddIcon size={14} strokeWidth={2.4} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <span className="truncate text-[14px] leading-[1.3] font-semibold">{t(`Tạo bài “${name}”`, `Create “${name}”`)}</span>
          <span className="text-[11.5px] leading-[1.35] text-tx3">
            {t(MUSCLE_LABEL[muscle].vi, MUSCLE_LABEL[muscle].en)} · {t(EQUIPMENT_LABEL[equipment].vi, EQUIPMENT_LABEL[equipment].en)} ·{' '}
            {t('sửa sau được', 'edit later')}
          </span>
        </span>
      </button>
    </div>
  )
}
