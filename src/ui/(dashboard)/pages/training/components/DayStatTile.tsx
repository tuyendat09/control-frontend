import type { ReactNode } from 'react'

export function DayStatTile({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex-1 rounded-[14px] bg-tint px-3 py-[11px]">
      <div className="text-[10px] tracking-[.08em] text-tx3 uppercase">{label}</div>
      <div className="mt-[3px] font-serif text-[21px] leading-none">{children}</div>
    </div>
  )
}
