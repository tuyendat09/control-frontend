import { useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useAnimationSheet } from '../hooks/useAnimationSheet'

interface SheetProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  /** Tailwind z-index class, e.g. `z-[22]`. */
  zIndex?: string
  scrimClassName?: string
  className?: string
  label?: string
}

/**
 * Bottom sheet with blurred scrim. Always rendered by its owner; it animates in when `open`
 * flips true, animates out when false, and unmounts its children only after the exit finishes.
 * Mark children with `data-sheet-row` to have them stagger in.
 */
export function Sheet({ open, onClose, children, zIndex = 'z-[22]', scrimClassName, className, label }: SheetProps) {
  const { mounted, rootRef, scrimRef, panelRef } = useAnimationSheet(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!mounted) return null

  return (
    <div ref={rootRef} className={cn('absolute inset-0', zIndex, !open && 'pointer-events-none')}>
      <div
        ref={scrimRef}
        onClick={onClose}
        className={cn('absolute inset-0 backdrop-blur-[3px]', scrimClassName ?? 'bg-[rgba(20,19,17,.42)]')}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={cn(
          'absolute inset-x-0 bottom-0 rounded-t-[32px] border-t border-line2 bg-surf px-4 pt-3 pb-[30px]',
          className,
        )}
      >
        <div className="mx-auto mb-4 h-1 w-[38px] rounded-full bg-line" />
        {children}
      </div>
    </div>
  )
}
