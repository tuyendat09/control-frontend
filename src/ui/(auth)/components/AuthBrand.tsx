import { Logo } from '@/ui/shared/components/Logo'
import { useAnimationAuthBrand } from '../hooks/useAnimationAuthBrand'
import type { AuthStage } from '../hooks/useAuthStage'

/** Shared-element logo + wordmark. Motion lives in `useAnimationAuthBrand`. */
export function AuthBrand({ stage }: { stage: AuthStage }) {
  const { markRef, wordRef, sonarRef } = useAnimationAuthBrand(stage)

  return (
    <>
      <div ref={markRef} className="absolute top-0 left-0 z-[3] size-16">
        <div ref={sonarRef}>
          {[0, 1, 2].map((i) => (
            <div key={i} data-sonar className="absolute -inset-[22px] rounded-full border border-acc opacity-0" />
          ))}
        </div>
        <Logo orbit />
      </div>

      <div
        ref={wordRef}
        className="absolute top-0 left-0 z-[3] font-serif text-[48px] leading-none tracking-[-.022em] whitespace-nowrap"
      >
        Control
      </div>
    </>
  )
}
