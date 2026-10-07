import { cn } from '@/lib/cn'

/** Fake OS status bar — only shown inside the desktop phone frame. */
export function StatusBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 top-0 z-[9] hidden h-[54px] items-end justify-between px-[26px] pb-2 text-[13.5px] font-semibold min-[480px]:flex',
        className,
      )}
    >
      <div>9:41</div>
      <div className="flex items-center gap-[5px]">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none" aria-hidden="true">
          <rect x=".5" y=".5" width="18" height="10" rx="3" stroke="currentColor" opacity=".4" />
          <rect x="2" y="2" width="13.5" height="7" rx="1.8" fill="currentColor" />
          <path d="M20.5 4v3c.9-.3 1.2-.9 1.2-1.5S21.4 4.3 20.5 4z" fill="currentColor" opacity=".5" />
        </svg>
      </div>
    </div>
  )
}
