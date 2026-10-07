import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { ChevronLeftIcon } from './Icons'

export function BackButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label="Back"
      className={cn(
        'flex size-[34px] flex-none items-center justify-center rounded-[14px] bg-tint text-tx2 transition-all duration-[180ms] hover:bg-acc hover:text-acc-tx',
        className,
      )}
      {...props}
    >
      <ChevronLeftIcon size={16} />
    </button>
  )
}
