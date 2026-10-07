/** Dark-mode ambient glow + film grain (both fade to nothing in light mode). */
export function Atmosphere() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(120%_62%_at_50%_-8%,var(--amb1)_0%,transparent_62%)] transition-opacity duration-[450ms]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(78%_44%_at_8%_106%,var(--amb2)_0%,transparent_70%)] transition-opacity duration-[450ms]" />
      <div
        className="film-grain pointer-events-none absolute inset-0 z-[1] transition-opacity duration-[450ms]"
        style={{ opacity: 'var(--grain)' }}
      />
    </>
  )
}
