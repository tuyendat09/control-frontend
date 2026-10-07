import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/** Scrollable tab screen: clears the status bar (top) and the floating tab bar (bottom). */
export function Screen({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('no-scrollbar absolute inset-0 overflow-y-auto pt-[62px] pb-[118px]', className)} {...props} />
}

/** Full-pane sheet over a screen (day sheet, exercise progress). Enter/exit comes from the route transition. */
export function OverlayScreen({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('no-scrollbar absolute inset-0 overflow-y-auto bg-surf pt-[62px] pb-10', className)}
      {...props}
    />
  )
}
