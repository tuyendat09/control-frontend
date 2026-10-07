import type { Macros } from '@/types'
import { Card } from '@/ui/shared/components/Card'
import { MacroChips } from '@/ui/shared/components/MacroChip'
import { MinusIcon, PlusIcon } from '@/ui/shared/components/Icons'
import { StepButton } from '@/ui/shared/components/StepButton'

interface ServingCardProps {
  kcal: number
  serving: string
  qty: number
  macros: Macros
  onStep: (step: number) => void
}

export function ServingCard({ kcal, serving, qty, macros, onStep }: ServingCardProps) {
  return (
    <Card className="mt-4 px-4 pt-4 pb-[18px]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-serif text-[36px] leading-none tabular-nums">
            {kcal}
            <span className="ml-1.5 font-sans text-[12px] tracking-[.09em] text-tx3">KCAL</span>
          </div>
          <div className="mt-1.5 text-[12px] text-tx2">{serving}</div>
        </div>
        <div className="flex items-center gap-2">
          <StepButton aria-label="−1" onClick={() => onStep(-1)}>
            <MinusIcon size={15} strokeWidth={2.4} />
          </StepButton>
          <div className="min-w-[22px] text-center text-[16px] font-semibold tabular-nums">{qty}</div>
          <StepButton aria-label="+1" onClick={() => onStep(1)}>
            <PlusIcon size={15} strokeWidth={2.4} />
          </StepButton>
        </div>
      </div>
      <MacroChips macros={macros} size="lg" className="mt-[14px] gap-1.5" />
    </Card>
  )
}
