import type { ScanMode } from '@/data/scan'

/** Fake camera feed: dim room, a blurred package, and the printed code. */
export function ScanCamera({ mode }: { mode: ScanMode }) {
  return (
    <div data-scan-cam className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_40%,#2B302D_0%,#141816_55%,#0A0C0B_100%)]">
      <div className="absolute top-[300px] left-1/2 -ml-[125px] h-[330px] w-[250px] -rotate-6 rounded-[42px] bg-[linear-gradient(160deg,#EDEAE3_0%,#BDB8AE_100%)] opacity-[.18] blur-[18px]" />
      {mode === 'bar' ? <MockBarcode /> : <MockQr />}
    </div>
  )
}

function MockBarcode() {
  return (
    <div className="absolute top-[252px] left-1/2 -ml-[105px] h-24 w-[210px] -rotate-[2.5deg] rounded-[8px] bg-[#E9E6DF] px-4 pt-3 pb-2 opacity-[.82] blur-[.6px]">
      <div
        className="h-[58px]"
        style={{
          background:
            'repeating-linear-gradient(90deg,#1A1A18 0 2px,transparent 2px 4px,#1A1A18 4px 5px,transparent 5px 8px,#1A1A18 8px 11px,transparent 11px 12px,#1A1A18 12px 13px,transparent 13px 16px)',
        }}
      />
      <div className="mt-[3px] text-center text-[10px] tracking-[.32em] text-[#1A1A18] tabular-nums">8 934673 102347</div>
    </div>
  )
}

function MockQr() {
  const finder = 'absolute size-9 border-[7px] border-[#1A1A18] bg-[#E9E6DF] outline-[5px] outline-[#E9E6DF]'
  return (
    <div className="absolute top-[222px] left-1/2 -ml-[75px] size-[150px] rotate-3 rounded-[10px] bg-[#E9E6DF] p-3 opacity-[.82]">
      <div
        className="relative size-full opacity-90"
        style={{ background: 'repeating-conic-gradient(#1A1A18 0 25%,transparent 0 50%) 0 0/14px 14px' }}
      >
        <div className={`${finder} top-0 left-0`} />
        <div className={`${finder} top-0 right-0`} />
        <div className={`${finder} bottom-0 left-0`} />
      </div>
    </div>
  )
}
