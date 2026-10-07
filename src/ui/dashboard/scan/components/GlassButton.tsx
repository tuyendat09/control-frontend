import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

/** 44px frosted circle for the camera overlay. `active` = flash on. */
export function GlassButton({ active = false, className, type = 'button', ...props }: GlassButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'flex size-11 items-center justify-center rounded-full backdrop-blur-[12px] transition-[background-color,color,transform] duration-200 active:scale-90',
        active ? 'bg-[#F4F1EC] text-[#16231E]' : 'bg-white/12 text-[#F4F1EC]',
        className,
      )}
      {...props}
    />
  )
}
