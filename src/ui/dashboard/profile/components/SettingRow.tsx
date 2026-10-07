import type { ReactNode } from 'react'

interface SettingRowProps {
  label: string
  value?: ReactNode
  /** Makes the row a button (settings you can tap). */
  onClick?: () => void
  role?: 'switch'
  checked?: boolean
}

const ROW = 'flex w-full items-center justify-between px-[18px] py-[15px] text-[14px]'

/** One row in a settings / targets list. */
export function SettingRow({ label, value, onClick, role, checked }: SettingRowProps) {
  if (!onClick) {
    return (
      <div className={ROW}>
        <span>{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
    )
  }

  return (
    <button
      type="button"
      role={role}
      aria-checked={role === 'switch' ? checked : undefined}
      onClick={onClick}
      className={`${ROW} text-left transition-colors duration-[180ms] hover:bg-tint`}
    >
      <span>{label}</span>
      {value}
    </button>
  )
}
