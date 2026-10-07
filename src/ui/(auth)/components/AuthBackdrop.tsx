import { useAnimationAuthBackdrop } from '../hooks/useAnimationAuthBackdrop'

/** Slow-drifting tint blob behind the auth screens. */
export function AuthBackdrop() {
  const ref = useAnimationAuthBackdrop()

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute -top-[90px] -left-[60px] size-[420px] rounded-full bg-[radial-gradient(circle,var(--tint)_0%,transparent_68%)]"
    />
  )
}
