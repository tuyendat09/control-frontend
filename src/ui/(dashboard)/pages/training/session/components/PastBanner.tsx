import { useT } from '@/ui/shared/hooks/useT'

interface PastBannerProps {
  editing: boolean
  onEdit: () => void
}

export function PastBanner({ editing, onEdit }: PastBannerProps) {
  const t = useT()

  return (
    <div className="mx-5 mt-[14px] flex items-center justify-between gap-3 rounded-[18px] bg-tint px-[18px] py-[14px]">
      <div className="text-[12.5px] leading-[1.45] text-tx2">
        {editing
          ? t('Đang sửa buổi tập. Nhớ lưu thay đổi.', 'Editing session. Remember to save.')
          : t('Buổi tập đã kết thúc. Vẫn sửa được nếu ghi nhầm.', 'Session finished. You can still edit it.')}
      </div>
      {!editing && (
        <button
          type="button"
          onClick={onEdit}
          className="rounded-[14px] border border-line bg-surf px-[14px] py-2 text-[12.5px] font-semibold whitespace-nowrap transition-all duration-[180ms] hover:border-acc hover:bg-acc hover:text-acc-tx"
        >
          {t('Sửa', 'Edit')}
        </button>
      )}
    </div>
  )
}
