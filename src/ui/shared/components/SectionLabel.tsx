import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export function SectionLabel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-[11px] uppercase tracking-[.11em] text-tx3', className)} {...props} />
}
