import type { ReactNode } from 'react'
import { AuthLeavingContext } from '../context/AuthLeavingContext'
import { useAnimationAuthLeaving } from '../hooks/useAnimationAuthLeaving'
import type { AuthStage } from '../hooks/useAuthStage'

/** Frozen copy of the previous auth page, fading out. Non-interactive. */
export function AuthLeaving({ stage, children }: { stage: AuthStage; children: ReactNode }) {
  const ref = useAnimationAuthLeaving(stage)

  return (
    <AuthLeavingContext value={true}>
      <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2]">
        {children}
      </div>
    </AuthLeavingContext>
  )
}
