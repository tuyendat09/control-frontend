import { Card } from '@/ui/shared/components/Card'
import { EditIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'

export function ProfileCard({ weightLabel }: { weightLabel: string }) {
  const t = useT()

  return (
    <Card className="mx-5 mt-5 flex items-center gap-4 p-[22px]">
      <div className="flex size-[62px] flex-none items-center justify-center rounded-full border border-line bg-tint font-serif text-[24px] text-tx2">
        AN
      </div>
      <div className="flex-1">
        <div className="text-[17px] font-semibold">An Nguyễn</div>
        <div className="mt-0.5 text-[13px] text-tx3">
          @annguyen · {weightLabel}kg · 174cm
        </div>
      </div>
      <button
        type="button"
        aria-label={t('Sửa hồ sơ', 'Edit profile')}
        className="flex size-[34px] items-center justify-center rounded-[14px] bg-tint transition-all duration-[180ms] hover:bg-acc hover:text-acc-tx"
      >
        <EditIcon size={15} />
      </button>
    </Card>
  )
}
