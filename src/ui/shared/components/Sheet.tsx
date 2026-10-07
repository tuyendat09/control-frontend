import { useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SheetProps {
  onClose: () => void
  children: ReactNode
  /** Tailwind z-index class, e.g. `z-[22]`. */
  zIndex?: string
  scrimClassName?: string
  className?: string
  label?: string
}

/** Bottom sheet with blurred scrim. Mount it only while open. */
export function Sheet({ onClose, children, zIndex = 'z-[22]', scrimClassName, className, label }: SheetProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className={cn('absolute inset-0', zIndex)}>
      <div
        onClick={onClose}
        className={cn('absolute inset-0 animate-fadein backdrop-blur-[3px]', scrimClassName ?? 'bg-[rgba(20,19,17,.42)]')}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={cn(
          'absolute inset-x-0 bottom-0 animate-sheet rounded-t-[32px] border-t border-line2 bg-surf px-4 pt-3 pb-[30px]',
          className,
        )}
      >
        <div className="mx-auto mb-4 h-1 w-[38px] rounded-full bg-line" />
        {children}
      </div>
    </div>
  )
}
