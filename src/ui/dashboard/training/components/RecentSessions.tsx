import { useNavigate } from 'react-router'
import { RECENT_SESSIONS } from '@/data/training'
import { formatShortDay } from '@/lib/date'
import { CardList } from '@/ui/shared/components/Card'
import { ChevronRightIcon } from '@/ui/shared/components/Icons'
import { SectionLabel } from '@/ui/shared/components/SectionLabel'
import { usePreferences } from '@/ui/shared/hooks/usePreferences'
import { useT } from '@/ui/shared/hooks/useT'
import { useTraining } from '../hooks/useTraining'

export function RecentSessions() {
  const t = useT()
  const { lang } = usePreferences()
  const navigate = useNavigate()
  const { selectDay } = useTraining()

  const jump = (day: number) => {
    selectDay(day)
    navigate(`/training/day/${day}`)
  }

  return (
    <section>
      <SectionLabel className="mx-6 mt-[22px] mb-[10px]">{t('Gần đây', 'Recent')}</SectionLabel>
      <CardList className="mx-5">
        {RECENT_SESSIONS.map((s) => (
          <button
            key={s.day}
            type="button"
            onClick={() => jump(s.day)}
            className="flex w-full items-center justify-between px-[18px] py-[14px] text-left transition-colors duration-[180ms] hover:bg-tint"
          >
            <div>
              <div className="text-[14px] font-medium">{formatShortDay(s.day, lang)}</div>
              <div className="mt-0.5 text-[11.5px] text-tx3">
                {s.name} · {s.sets} sets
              </div>
            </div>
            <ChevronRightIcon size={16} strokeWidth={1.8} className="text-tx3" />
          </button>
        ))}
      </CardList>
    </section>
  )
}
