const JUMPS = [-0.5, -0.1, 0.1, 0.5]

const label = (n: number) => `${n < 0 ? '−' : '+'}${Math.abs(n)}`

export function WeightJumpChips({ onJump }: { onJump: (step: number) => void }) {
  return (
    <div className="mt-[14px] flex items-center justify-between gap-2">
      {JUMPS.map((step) => (
        <button
          key={step}
          type="button"
          onClick={() => onJump(step)}
          className="flex-1 rounded-[14px] border border-line py-[10px] text-center text-[12.5px] font-semibold text-tx2 transition-all duration-[180ms] hover:border-line-hi hover:text-tx"
        >
          {label(step)}
        </button>
      ))}
    </div>
  )
}
