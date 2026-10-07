import { useNavigate } from 'react-router'
import { cn } from '@/lib/cn'
import { BackButton } from '@/ui/shared/components/BackButton'
import { AuthBackdrop } from './components/AuthBackdrop'
import { AuthBrand } from './components/AuthBrand'
import { useAuthStage } from './hooks/useAuthStage'

/**
 * Layout for welcome / sign-in / sign-up.
 * The logo lives here (not in the pages) so it can glide between the two stages.
 */
export function AuthLayout() {
  const navigate = useNavigate()
  const { stage, outlet, leaving } = useAuthStage()

  return (
    <div className="absolute inset-0 overflow-hidden bg-surf">
      <AuthBackdrop />
      <AuthBrand stage={stage} />

      <BackButton
        onClick={() => navigate('/auth')}
        tabIndex={stage === 'form' ? 0 : -1}
        className={cn(
          'absolute top-[86px] left-[26px] z-[4] rounded-[12px] transition-[opacity,transform,background-color,color] duration-[400ms]',
          stage === 'welcome' && 'pointer-events-none -translate-x-2 scale-[.85] opacity-0',
        )}
      />

      {leaving && (
        <div
          key={leaving.key}
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 z-[2] [&_*]:animate-none!',
            leaving.stage === 'welcome' ? 'animate-stage-out-up' : 'animate-stage-out-down',
          )}
        >
          {leaving.node}
        </div>
      )}
      <div className="absolute inset-0 z-[2]">{outlet}</div>
    </div>
  )
}
