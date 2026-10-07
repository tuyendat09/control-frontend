import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  /** Accent glow under primary buttons. */
  glow?: boolean
}

export function Button({ variant = 'primary', glow = false, className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-[54px] items-center justify-center gap-2 rounded-[16px] text-[15px] font-semibold',
        'transition-[transform,opacity,background-color,border-color,color] duration-[180ms] ease-soft active:scale-[.98]',
        variant === 'primary' && 'bg-acc text-acc-tx hover:opacity-90',
        variant === 'primary' && glow && 'shadow-glow',
        variant === 'outline' && 'border border-line hover:border-line-hi hover:bg-tint',
        className,
      )}
      {...props}
    />
  )
}
