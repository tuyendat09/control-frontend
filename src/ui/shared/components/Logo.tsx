import { cn } from '@/lib/cn'

interface LogoProps {
  className?: string
  /** Dot orbits the ring (welcome / auth). Otherwise rests at 50°. */
  orbit?: boolean
}

/** Control knob: ring + dot — doubles as the calorie-ring metaphor. */
export function Logo({ className, orbit = false }: LogoProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={cn('size-full', className)} aria-hidden="true">
      <circle cx="20" cy="20" r="15" stroke="var(--acc)" strokeWidth="2.2" />
      {orbit ? (
        <g data-orbit>
          <circle cx="20" cy="12.5" r="3.4" fill="var(--acc)" />
        </g>
      ) : (
        <g transform="rotate(50 20 20)">
          <circle cx="20" cy="12.5" r="3.4" fill="var(--acc)" />
        </g>
      )}
    </svg>
  )
}
