import type { ScanMode } from '@/data/scan'
import { cn } from '@/lib/cn'

const CORNER =
  'absolute size-[30px] border-[#F4F1EC] transition-colors duration-300 group-data-[state=found]/scan:border-[#9FD3BC]'

/** Frame (morphs between barcode and QR proportions) with corner brackets and the sweeping scan line. */
export function Viewfinder({ mode }: { mode: ScanMode }) {
  return (
    <div className="absolute inset-x-0 top-[150px] z-[2] flex h-[300px] items-center justify-center">
      <div
        className={cn(
          'relative rounded-[22px] shadow-[0_0_0_999px_rgba(6,8,7,.58)]',
          'group-data-[state=found]/scan:-translate-y-[92px] group-data-[state=found]/scan:scale-[.86]',
          '[transition:width_.5s_var(--ease-expo),height_.5s_var(--ease-expo),translate_.5s_var(--ease-expo),scale_.5s_var(--ease-expo)]',
          mode === 'bar' ? 'h-[156px] w-[276px]' : 'size-[224px]',
        )}
      >
        <div className="absolute inset-0 group-data-[state=found]/scan:animate-lockpop">
          <div className={cn(CORNER, '-top-0.5 -left-0.5 rounded-tl-[22px] border-t-[3px] border-l-[3px]')} />
          <div className={cn(CORNER, '-top-0.5 -right-0.5 rounded-tr-[22px] border-t-[3px] border-r-[3px]')} />
          <div className={cn(CORNER, '-bottom-0.5 -left-0.5 rounded-bl-[22px] border-b-[3px] border-l-[3px]')} />
          <div className={cn(CORNER, '-right-0.5 -bottom-0.5 rounded-br-[22px] border-r-[3px] border-b-[3px]')} />
        </div>
        <div className="absolute inset-x-[14px] h-0.5 animate-sline rounded-[2px] bg-[#9FD3BC] shadow-[0_0_14px_2px_rgba(159,211,188,.55)] transition-opacity duration-200 group-data-[state=found]/scan:opacity-0 group-data-[state=found]/scan:[animation-play-state:paused]" />
      </div>
    </div>
  )
}
