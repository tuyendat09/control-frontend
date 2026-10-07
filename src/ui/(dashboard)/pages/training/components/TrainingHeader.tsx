import { SESSION_COUNT } from '@/data/training'
import { PageTitle } from '@/ui/shared/components/PageTitle'
import { useT } from '@/ui/shared/hooks/useT'

export function TrainingHeader() {
  const t = useT()

  return (
    <header className="flex items-end justify-between px-6">
      <PageTitle>{t('Nhật ký tập', 'Training log')}</PageTitle>
      <div className="text-[12.5px] text-tx2">
        {SESSION_COUNT} {t('buổi', 'sessions')}
      </div>
    </header>
  )
}
