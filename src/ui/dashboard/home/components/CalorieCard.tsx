import { useT } from '@/ui/shared/hooks/useT'
import { CalorieRing } from './CalorieRing'
import { MacroProgress } from './MacroProgress'

interface CalorieCardProps {
  totals: { kcal: number; p: number; c: number; f: number }
  targets: { kcal: number; p: number; c: number; f: number }
}

export function CalorieCard({ totals, targets }: CalorieCardProps) {
  const t = useT()

  return (
    <section className="mx-5 mt-[22px] flex items-center gap-[22px] rounded-[24px] border border-line bg-surf2 px-[22px] py-[26px] shadow-hero">
      <CalorieRing kcal={totals.kcal} target={targets.kcal} />
      <div className="flex flex-1 flex-col gap-[14px]">
        <MacroProgress macro="p" label="Protein" value={totals.p} target={targets.p} index={0} />
        <MacroProgress macro="c" label="Carbs" value={totals.c} target={targets.c} index={1} />
        <MacroProgress macro="f" label={t('Chất béo', 'Fat')} value={totals.f} target={targets.f} index={2} />
      </div>
    </section>
  )
}
