import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/** Surface card: ink-alpha border + elevation shadow. */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-[24px] border border-line bg-surf2 shadow-el', className)} {...props} />
}

/** Card whose rows are separated by hairlines. */
export function CardList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <Card className={cn('divide-y divide-line2 overflow-hidden', className)} {...props} />
}
