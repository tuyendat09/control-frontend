import { useNavigate } from 'react-router'
import { ArrowRightIcon } from '@/ui/shared/components/Icons'
import { Button } from '@/ui/shared/components/Button'
import { useT } from '@/ui/shared/hooks/useT'

export function WelcomeActions() {
  const t = useT()
  const navigate = useNavigate()

  return (
    <div className="absolute inset-x-0 bottom-11 flex animate-upin flex-col gap-[14px] px-8 [animation-delay:.41s]">
      <Button glow onClick={() => navigate('/auth/register')}>
        {t('Bắt đầu', 'Get started')}
        <ArrowRightIcon size={16} />
      </Button>
      <Button variant="outline" onClick={() => navigate('/auth/login')}>
        {t('Tôi đã có tài khoản', 'I already have an account')}
      </Button>
      <p className="mt-1 max-w-[280px] self-center text-center text-[11.5px] leading-normal text-tx3">
        {t(
          'Dữ liệu lưu trên máy của bạn. Không quảng cáo, không bán dữ liệu.',
          'Your data stays on your device. No ads, never sold.',
        )}
      </p>
    </div>
  )
}
