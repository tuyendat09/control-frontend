const CORNER = 'absolute size-[30px] border-[#F4F1EC]'

/** Frame (size driven by `useAnimationScan`) with corner brackets and the sweeping scan line. */
export function Viewfinder() {
  return (
    <div className="absolute inset-x-0 top-[150px] z-[2] flex h-[300px] items-center justify-center">
      <div data-scan-frame className="relative h-[156px] w-[276px] rounded-[22px] shadow-[0_0_0_999px_rgba(6,8,7,.58)]">
        <div data-scan-lock className="absolute inset-0">
          <div data-scan-corner className={`${CORNER} -top-0.5 -left-0.5 rounded-tl-[22px] border-t-[3px] border-l-[3px]`} />
          <div data-scan-corner className={`${CORNER} -top-0.5 -right-0.5 rounded-tr-[22px] border-t-[3px] border-r-[3px]`} />
          <div data-scan-corner className={`${CORNER} -bottom-0.5 -left-0.5 rounded-bl-[22px] border-b-[3px] border-l-[3px]`} />
          <div data-scan-corner className={`${CORNER} -right-0.5 -bottom-0.5 rounded-br-[22px] border-r-[3px] border-b-[3px]`} />
        </div>
        <div
          data-scan-line
          className="absolute inset-x-[14px] h-0.5 rounded-[2px] bg-[#9FD3BC] shadow-[0_0_14px_2px_rgba(159,211,188,.55)]"
        />
      </div>
    </div>
  )
}
