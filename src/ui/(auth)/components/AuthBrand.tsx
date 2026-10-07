import { cn } from '@/lib/cn'
import { Logo } from '@/ui/shared/components/Logo'
import type { AuthStage } from '../hooks/useAuthStage'

/**
 * Shared-element logo + wordmark. Only `transform` is animated (same duration + curve for both),
 * so the mark and wordmark stay locked together mid-flight instead of drifting.
 * `cqw` = 1% of the phone-frame width, which keeps the welcome layout centered at any width.
 */
const MARK: Record<AuthStage, string> = {
  welcome: 'translate(calc(50cqw - 32px), 196px) scale(1)',
  form: 'translate(76px, 86px) scale(.53125)',
}

const WORDMARK: Record<AuthStage, string> = {
  welcome: 'translate(calc(50cqw - 50%), 298px) scale(1)',
  form: 'translate(122px, 93px) scale(.375)',
}

export function AuthBrand({ stage }: { stage: AuthStage }) {
  return (
    <>
      <div
        className="absolute top-0 left-0 z-[3] size-16 origin-top-left transition-transform duration-[660ms] ease-expo"
        style={{ transform: MARK[stage] }}
      >
        <div
          className={cn(
            'transition-opacity duration-[450ms] ease-in-out',
            stage === 'form' && 'opacity-0',
          )}
        >
          {[0, 1.4, 2.8].map((delay) => (
            <div
              key={delay}
              className="absolute -inset-[22px] animate-sonar rounded-full border border-acc opacity-0"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
        <Logo orbit />
      </div>

      <div
        className="absolute top-0 left-0 z-[3] origin-top-left font-serif text-[48px] leading-none tracking-[-.022em] whitespace-nowrap transition-transform duration-[660ms] ease-expo"
        style={{ transform: WORDMARK[stage] }}
      >
        Control
      </div>
    </>
  )
}
