import { Button } from '@/ui/shared/components/Button'
import { CheckIcon, PlusIcon, RefreshIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'
import type { useScanner } from '../hooks/useScanner'
import { MealPicker } from './MealPicker'
import { ServingCard } from './ServingCard'

type Scanner = ReturnType<typeof useScanner>

/** Result sheet that rises once a code is locked: product, servings, meal, add. */
export function ScanResultSheet({ scanner }: { scanner: Scanner }) {
  const t = useT()
  const { product } = scanner

  return (
    <div
      inert={scanner.status !== 'found'}
      className="absolute inset-x-0 bottom-0 z-[4] translate-y-[104%] rounded-t-[32px] bg-surf px-5 pt-3 pb-[30px] text-tx transition-[translate] duration-[550ms] ease-expo group-data-[state=found]/scan:translate-y-0"
    >
      <div className="mx-auto mb-4 h-1 w-[38px] rounded-full bg-line" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[10.5px] tracking-[.11em] text-tx3 uppercase">
            <CheckIcon size={12} strokeWidth={2.4} />
            {t(product.status.vi, product.status.en)}
          </div>
          <h2 className="m-0 mt-1.5 font-serif text-[25px] leading-[1.12] font-normal">{t(product.name.vi, product.name.en)}</h2>
          <div className="mt-1 text-[12.5px] text-tx3 tabular-nums">{t(product.meta.vi, product.meta.en)}</div>
        </div>
        <button
          type="button"
          aria-label={t('Quét lại', 'Rescan')}
          onClick={scanner.rescan}
          className="flex size-10 flex-none items-center justify-center rounded-[14px] bg-tint text-tx2 transition-all duration-[180ms] hover:bg-acc hover:text-acc-tx"
        >
          <RefreshIcon size={17} />
        </button>
      </div>

      <ServingCard
        kcal={scanner.kcal}
        serving={scanner.serving}
        qty={scanner.qty}
        macros={scanner.macros}
        onStep={scanner.stepQty}
      />
      <MealPicker value={scanner.meal} onChange={scanner.setMeal} />

      <Button glow onClick={scanner.addToMeal} className="mt-[18px] w-full">
        <PlusIcon size={16} strokeWidth={2.2} />
        {scanner.ctaLabel}
      </Button>
    </div>
  )
}
