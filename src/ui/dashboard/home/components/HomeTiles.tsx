import { useNavigate } from 'react-router'
import { LAST_SESSION } from '@/data/training'
import { PlusIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'
import { useWeightStats } from '@/ui/shared/hooks/useWeightStats'
import { useDashboardUi } from '../../hooks/useDashboardUi'

const TILE =
  'flex-1 rounded-[24px] border border-line bg-surf2 p-[18px] text-left shadow-el transition-transform duration-[180ms] ease-soft active:scale-[.98]'
const TILE_LABEL = 'text-[11px] tracking-[.09em] text-tx3 uppercase'
const TILE_VALUE = 'mt-1.5 font-serif text-[26px] leading-none'

/** Session recap + weight shortcut. */
export function HomeTiles() {
  const t = useT()
  const navigate = useNavigate()
  const { openWeight } = useDashboardUi()
  const { weightLabel, deltaLabel } = useWeightStats()

  return (
    <div className="mx-5 mt-5 flex gap-3">
      <button type="button" className={TILE} onClick={() => navigate('/training')}>
        <div className={TILE_LABEL}>{t('Buổi tập', 'Session')}</div>
        <div className={TILE_VALUE}>{LAST_SESSION.name}</div>
        <div className="mt-1.5 text-[12px] text-tx2">
          {LAST_SESSION.lifts} {t('bài', 'lifts')} · {LAST_SESSION.sets} sets · {LAST_SESSION.minutes}′
        </div>
      </button>

      <button type="button" className={TILE} onClick={openWeight}>
        <div className={TILE_LABEL}>{t('Cân nặng', 'Weight')}</div>
        <div className={TILE_VALUE}>
          {weightLabel}
          <span className="text-[15px] text-tx3"> kg</span>
        </div>
        <div className="mt-1.5 text-[12px] text-tx2">
          {deltaLabel} · 30 {t('ngày', 'days')}
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[11.5px] font-semibold text-acc">
          <PlusIcon size={13} strokeWidth={2.2} />
          {t('Ghi hôm nay', 'Log today')}
        </div>
      </button>
    </div>
  )
}
