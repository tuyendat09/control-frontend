import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface StepButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'md' | 'lg'
}

/** Round-square stepper button (− / +). */
export function StepButton({ size = 'md', className, type = 'button', ...props }: StepButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'flex flex-none items-center justify-center bg-tint text-tx transition-[transform,background-color,color] duration-[160ms] ease-soft hover:bg-acc hover:text-acc-tx active:scale-90',
        size === 'lg' ? 'size-[52px] rounded-[18px]' : 'size-10 rounded-[14px]',
        className,
      )}
      {...props}
    />
  )
}
