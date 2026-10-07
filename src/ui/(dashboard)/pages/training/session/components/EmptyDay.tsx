import { COPY_FROM } from '@/data/training'
import { Button } from '@/ui/shared/components/Button'
import { CardList } from '@/ui/shared/components/Card'
import { AddIcon, ChevronRightIcon, DumbbellIcon } from '@/ui/shared/components/Icons'
import { SectionLabel } from '@/ui/shared/components/SectionLabel'
import { useT } from '@/ui/shared/hooks/useT'

/** No session on this date: start fresh or copy an old one. */
export function EmptyDay({ onCreate }: { onCreate: () => void }) {
  const t = useT()

  return (
    <>
      <div className="mx-5 mt-4 rounded-[24px] border border-dashed border-line px-6 py-[34px] text-center">
        <div className="mx-auto mb-[14px] flex size-11 items-center justify-center rounded-[14px] bg-tint text-tx3">
          <DumbbellIcon size={20} />
        </div>
        <div className="text-[15px] font-semibold">{t('Ngày này chưa có buổi tập', 'No session logged')}</div>
        <div className="mt-1.5 text-[12.5px] leading-normal text-tx3">
          {t('Tạo buổi mới hoặc chép lại một buổi cũ.', 'Start fresh or copy a previous session.')}
        </div>
        <Button onClick={onCreate} className="mt-5 h-[46px] w-full text-[14px]">
          <AddIcon size={15} strokeWidth={2.2} />
          {t('Tạo buổi tập', 'Create session')}
        </Button>
      </div>

      <SectionLabel className="mx-6 mt-[14px] mb-1.5">{t('Chép nhanh', 'Copy from')}</SectionLabel>
      <CardList className="mx-5">
        {COPY_FROM.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={onCreate}
            className="flex w-full items-center justify-between px-[18px] py-[14px] text-left transition-colors duration-[180ms] hover:bg-tint"
          >
            <div>
              <div className="text-[14px] font-medium">{s.name}</div>
              <div className="mt-0.5 text-[11.5px] text-tx3">
                {s.lifts} {t('bài', 'lifts')} · {s.sets} sets
              </div>
            </div>
            <ChevronRightIcon size={16} strokeWidth={1.8} className="text-tx3" />
          </button>
        ))}
      </CardList>
    </>
  )
}
