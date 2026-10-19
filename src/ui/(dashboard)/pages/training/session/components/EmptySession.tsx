import { useAnimationRise } from '@/ui/shared/hooks/useAnimationRise'
import { useT } from '@/ui/shared/hooks/useT'

/** A session with no exercises yet. */
export function EmptySession() {
  const t = useT()
  const ref = useAnimationRise(true)

  return (
    <div
      ref={ref}
      className="mx-5 mt-[22px] flex flex-col items-center gap-2 rounded-[24px] border border-dashed border-line-hi px-[22px] py-7 text-center"
    >
      <div className="font-serif text-[22px]">{t('Buổi này chưa có bài', 'No exercises yet')}</div>
      <div className="text-[12.5px] text-tx2">{t('Thêm bài, hoặc chép từ buổi trước.', 'Add some, or copy a past session.')}</div>
    </div>
  )
}
