import { useAnimationAuthWelcome } from '../hooks/useAnimationAuthWelcome'
import { WelcomeActions } from './components/WelcomeActions'
import { WelcomeHero } from './components/WelcomeHero'

export function WelcomePage() {
  const scope = useAnimationAuthWelcome()

  return (
    <div ref={scope} className="contents">
      <WelcomeHero />
      <WelcomeActions />
    </div>
  )
}
