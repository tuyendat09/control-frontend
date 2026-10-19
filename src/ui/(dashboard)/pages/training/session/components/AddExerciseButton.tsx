import { AddIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'

/** Dashed slot under the exercise list that opens the picker. */
export function AddExerciseButton({ onClick }: { onClick: () => void }) {
  const t = useT()

  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-5 mt-3 flex h-[50px] w-[calc(100%-40px)] items-center justify-center gap-2 rounded-[16px] border-[1.5px] border-dashed border-line-hi text-[14px] font-semibold transition-colors duration-[180ms] hover:bg-tint"
    >
      <AddIcon size={15} strokeWidth={2.2} />
      {t('Thêm bài tập', 'Add exercise')}
    </button>
  )
}
