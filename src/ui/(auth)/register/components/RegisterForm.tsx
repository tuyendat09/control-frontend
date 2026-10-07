import { ArrowRightIcon } from '@/ui/shared/components/Icons'
import { Button } from '@/ui/shared/components/Button'
import { Input } from '@/ui/shared/components/Input'
import { useT } from '@/ui/shared/hooks/useT'
import { AuthHeading } from '../../components/AuthHeading'
import { AuthSwitch } from '../../components/AuthSwitch'
import { useAnimationAuthForm } from '../../hooks/useAnimationAuthForm'
import { useRegisterForm } from '../hooks/useRegisterForm'

export function RegisterForm() {
  const t = useT()
  const { values, setField, onSubmit } = useRegisterForm()
  const scope = useAnimationAuthForm()

  return (
    <div ref={scope} className="contents">
      <form onSubmit={onSubmit} className="absolute inset-x-0 top-[158px] flex flex-col px-8">
        <AuthHeading
          title={t('Tạo tài khoản', 'Create account')}
          subtitle={t('Mất 30 giây, không cần thẻ.', 'Takes 30 seconds, no card needed.')}
        />

        <div className="flex flex-col gap-3">
          <div data-fi="2" className="flex flex-col gap-3">
            <Input
              label={t('Tên hiển thị', 'Display name')}
              autoComplete="name"
              placeholder="An Nguyễn"
              value={values.name}
              onChange={setField('name')}
            />
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="an.nguyen@gmail.com"
              value={values.email}
              onChange={setField('email')}
            />
          </div>
          <div data-fi="3">
          <Input
            label={t('Mật khẩu', 'Password')}
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            hint={t('Tối thiểu 8 ký tự', 'At least 8 characters')}
            value={values.password}
            onChange={setField('password')}
          />
          </div>
        </div>

        <Button type="submit" glow data-fi="4" className="mt-[26px]">
          {t('Tạo tài khoản', 'Create account')}
          <ArrowRightIcon size={16} />
        </Button>
      </form>

      <AuthSwitch
        prompt={t('Đã có tài khoản?', 'Already registered?')}
        to="/auth/login"
        linkLabel={t('Đăng nhập', 'Sign in')}
      />
    </div>
  )
}
