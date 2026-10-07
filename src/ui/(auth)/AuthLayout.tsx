import { useNavigate } from 'react-router'
import { BackButton } from '@/ui/shared/components/BackButton'
import { AuthBackdrop } from './components/AuthBackdrop'
import { AuthBrand } from './components/AuthBrand'
import { AuthLeaving } from './components/AuthLeaving'
import { useAnimationAuthBack } from './hooks/useAnimationAuthBack'
import { useAuthStage } from './hooks/useAuthStage'

/**
 * Layout for welcome / sign-in / sign-up.
 * The logo lives here (not in the pages) so it can glide between the two stages.
 */
export function AuthLayout() {
  const navigate = useNavigate()
  const { stage, outlet, leaving } = useAuthStage()
  const backRef = useAnimationAuthBack(stage)

  return (
    <div className="absolute inset-0 overflow-hidden bg-surf">
      <AuthBackdrop />
      <AuthBrand stage={stage} />

      <BackButton
        ref={backRef}
        onClick={() => navigate('/auth')}
        tabIndex={stage === 'form' ? 0 : -1}
        className="absolute top-[86px] left-[26px] z-[4] rounded-[12px]"
      />

      {leaving && (
        <AuthLeaving key={leaving.key} stage={leaving.stage}>
          {leaving.node}
        </AuthLeaving>
      )}
      <div className="absolute inset-0 z-[2]">{outlet}</div>
    </div>
  )
}
