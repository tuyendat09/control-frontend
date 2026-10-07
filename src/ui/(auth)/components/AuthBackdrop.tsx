/** Slow-drifting tint blob behind the auth screens. */
export function AuthBackdrop() {
  return (
    <div className="pointer-events-none absolute -top-[90px] -left-[60px] size-[420px] animate-drift rounded-full bg-[radial-gradient(circle,var(--tint)_0%,transparent_68%)]" />
  )
}
