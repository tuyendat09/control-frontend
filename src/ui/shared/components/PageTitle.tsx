import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export function PageTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn('m-0 font-serif text-[29px] font-normal tracking-[-.01em]', className)} {...props} />
}
