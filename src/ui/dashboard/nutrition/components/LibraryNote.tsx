import { useT } from '@/ui/shared/hooks/useT'

export function LibraryNote() {
  const t = useT()

  return (
    <p className="mt-[14px] rounded-[24px] border border-dashed border-line p-4 text-[13px] leading-normal text-tx2">
      {t(
        'Món tự nhập lưu trên máy bạn. Sau này đồng bộ với API dinh dưỡng.',
        'Custom foods live on your device. Nutrition API sync comes later.',
      )}
    </p>
  )
}
