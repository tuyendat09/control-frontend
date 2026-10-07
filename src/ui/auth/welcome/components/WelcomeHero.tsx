import { useT } from '@/ui/shared/hooks/useT'

export function WelcomeHero() {
  const t = useT()

  return (
    <div className="absolute inset-x-0 top-[358px] flex flex-col items-center px-8 text-center">
      <div className="animate-upin text-[10.5px] tracking-[.24em] text-tx3 uppercase [animation-delay:.23s]">
        Nutrition &amp; Training
      </div>
      <p className="mt-[22px] max-w-[268px] animate-upin text-[15.5px] leading-[1.6] text-tx2 [animation-delay:.32s]">
        {t(
          'Mỗi bữa ăn, mỗi set tạ — ghi lại, đo được, và nằm trong tầm kiểm soát.',
          'Every meal, every set — logged, measured, and under your control.',
        )}
      </p>
    </div>
  )
}
