import { cn } from '@/lib/cn'

interface ToggleProps {
  checked: boolean
  size?: 'sm' | 'md'
  className?: string
}

/**
 * Visual switch only — put it inside a `<button role="switch">` row so the whole row is the hit target.
 */
export function Toggle({ checked, size = 'md', className }: ToggleProps) {
  const sm = size === 'sm'
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex flex-none rounded-full transition-colors duration-[250ms]',
        sm ? 'h-5 w-[34px] p-[2.5px]' : 'h-[26px] w-11 p-[3px]',
        checked ? 'bg-tx' : 'bg-line',
        className,
      )}
    >
      <span
        className={cn(
          'rounded-full bg-surf shadow-[0_1px_3px_rgba(0,0,0,.2)] transition-transform duration-[250ms] ease-soft',
          sm ? 'size-[15px]' : 'size-5',
          checked && (sm ? 'translate-x-[14px]' : 'translate-x-[18px]'),
        )}
      />
    </span>
  )
}
