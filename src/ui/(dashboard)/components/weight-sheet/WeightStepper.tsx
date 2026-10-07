import type { ChangeEvent, KeyboardEvent } from 'react'
import { Card } from '@/ui/shared/components/Card'
import { MinusIcon, PlusIcon } from '@/ui/shared/components/Icons'
import { StepButton } from '@/ui/shared/components/StepButton'
import { useT } from '@/ui/shared/hooks/useT'

interface WeightStepperProps {
  value: number
  editing: boolean
  text: string
  onStep: (step: number) => void
  onStartEdit: () => void
  onTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  onCommit: () => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
}

const VALUE_CLASS = 'font-serif text-[52px] leading-none tracking-[-.01em]'

export function WeightStepper({
  value,
  editing,
  text,
  onStep,
  onStartEdit,
  onTextChange,
  onCommit,
  onKeyDown,
}: WeightStepperProps) {
  const t = useT()

  return (
    <Card className="mt-5 flex items-center justify-between gap-[14px] px-[18px] py-[22px]">
      <StepButton size="lg" aria-label="−0.1 kg" onClick={() => onStep(-0.1)}>
        <MinusIcon size={19} strokeWidth={2.4} />
      </StepButton>

      <div className="flex-1 text-center">
        {editing ? (
          <input
            autoFocus
            type="number"
            step="0.1"
            inputMode="decimal"
            value={text}
            onChange={onTextChange}
            onBlur={onCommit}
            onKeyDown={onKeyDown}
            onFocus={(e) => e.currentTarget.select()}
            className={`${VALUE_CLASS} w-full border-0 border-b-[1.5px] border-acc bg-transparent pb-0.5 text-center text-tx outline-none`}
          />
        ) : (
          <button
            type="button"
            onClick={onStartEdit}
            className={`${VALUE_CLASS} w-full cursor-text border-b border-dashed border-line pb-0.5 transition-colors duration-200 hover:border-line-hi`}
          >
            {value.toFixed(1)}
          </button>
        )}
        <div className="mt-1.5 text-[11px] tracking-[.11em] text-tx3 uppercase">
          KG · {t('bấm số để nhập', 'tap to type')}
        </div>
      </div>

      <StepButton size="lg" aria-label="+0.1 kg" onClick={() => onStep(0.1)}>
        <PlusIcon size={19} strokeWidth={2.4} />
      </StepButton>
    </Card>
  )
}
