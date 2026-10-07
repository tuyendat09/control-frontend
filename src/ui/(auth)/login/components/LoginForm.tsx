import { Link } from 'react-router'
import { ArrowRightIcon } from '@/ui/shared/components/Icons'
import { Button } from '@/ui/shared/components/Button'
import { Input } from '@/ui/shared/components/Input'
import { useT } from '@/ui/shared/hooks/useT'
import { AuthHeading } from '../../components/AuthHeading'
import { AuthSwitch } from '../../components/AuthSwitch'
import { useLoginForm } from '../hooks/useLoginForm'

export function LoginForm() {
  const t = useT()
  const { values, setField, onSubmit } = useLoginForm()

  return (
    <>
      <form onSubmit={onSubmit} className="absolute inset-x-0 top-[158px] flex flex-col px-8">
        <AuthHeading
          title={t('Chào mừng trở lại', 'Welcome back')}
          subtitle={t('Đăng nhập để tiếp tục theo dõi.', 'Sign in to pick up where you left off.')}
        />

        <div className="flex flex-col gap-3">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="an.nguyen@gmail.com"
            value={values.email}
            onChange={setField('email')}
            className="animate-fi [animation-delay:.27s]"
          />
          <Input
            label={t('Mật khẩu', 'Password')}
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={values.password}
            onChange={setField('password')}
            className="animate-fi [animation-delay:.34s]"
            labelAction={
              <Link to="/auth/login" className="text-[11.5px] text-tx3 transition-colors duration-200 hover:text-tx">
                {t('Quên?', 'Forgot?')}
              </Link>
            }
          />
        </div>

        <Button type="submit" glow className="mt-[26px] animate-fi [animation-delay:.41s]">
          {t('Đăng nhập', 'Sign in')}
          <ArrowRightIcon size={16} />
        </Button>
      </form>

      <AuthSwitch
        prompt={t('Chưa có tài khoản?', 'No account yet?')}
        to="/auth/register"
        linkLabel={t('Đăng ký', 'Sign up')}
      />
    </>
  )
}
