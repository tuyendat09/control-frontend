import { STREAK_DAYS, TDEE } from '@/data/insights'
import { fmtInt } from '@/lib/format'
import { Card } from '@/ui/shared/components/Card'
import { useT } from '@/ui/shared/hooks/useT'

const LABEL = 'text-[11px] tracking-[.09em] text-tx3 uppercase'
const VALUE = 'mt-1.5 font-serif text-[26px] leading-none'
const SUB = 'mt-[5px] text-[11.5px] text-tx2'

export function EnergyTiles() {
  const t = useT()

  return (
    <div className="mx-5 mt-[14px] flex gap-3">
      <Card className="flex-1 p-[18px]">
        <div className={LABEL}>TDEE</div>
        <div className={VALUE}>{fmtInt(TDEE.value)}</div>
        <div className={SUB}>
          BMR {fmtInt(TDEE.bmr)} · ×{TDEE.factor}
        </div>
      </Card>
      <Card className="flex-1 p-[18px]">
        <div className={LABEL}>{t('Chuỗi ngày', 'Streak')}</div>
        <div className={VALUE}>{STREAK_DAYS}</div>
        <div className={SUB}>{t('ngày liên tục', 'days in a row')}</div>
      </Card>
    </div>
  )
}
