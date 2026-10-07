import { useId, useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { EyeIcon } from './Icons'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  hint?: string
  /** Right-aligned content on the label row (e.g. "Forgot?"). */
  labelAction?: ReactNode
  className?: string
}

export function Input({ label, hint, labelAction, type = 'text', className, id, ...props }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const isPassword = type === 'password'
  const [revealed, setRevealed] = useState(false)
  const masked = isPassword && !revealed

  return (
    <div className={cn('flex flex-col gap-[7px]', className)}>
      <div className="flex items-baseline justify-between">
        <label htmlFor={inputId} className="text-[11.5px] uppercase tracking-[.06em] text-tx3">
          {label}
        </label>
        {labelAction}
      </div>
      <div className="flex h-[52px] items-center justify-between gap-3 rounded-[16px] border border-line bg-surf2 px-4 shadow-el transition-colors duration-200 focus-within:border-line-hi hover:border-line-hi">
        <input
          id={inputId}
          type={isPassword && revealed ? 'text' : type}
          className={cn(
            'min-w-0 flex-1 bg-transparent text-[14.5px] text-tx outline-none placeholder:text-tx3',
            masked && 'text-[16px] tracking-[.22em] text-tx2',
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            aria-label={revealed ? 'Hide password' : 'Show password'}
            onClick={() => setRevealed((v) => !v)}
            className="flex-none text-tx opacity-45 transition-opacity hover:opacity-80"
          >
            <EyeIcon size={18} />
          </button>
        )}
      </div>
      {hint && <div className="pl-0.5 text-[11.5px] text-tx3">{hint}</div>}
    </div>
  )
}
