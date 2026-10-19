import { useNavigate } from 'react-router'
import { formatDayMonth } from '@/lib/date'
import { fmtInt } from '@/lib/format'
import { Button } from '@/ui/shared/components/Button'
import { Card } from '@/ui/shared/components/Card'
import { AddIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'
import { useToast } from '@/ui/shared/hooks/useToast'
import { useSessionDay } from '../hooks/useSessionDay'
import { useTraining } from '../hooks/useTraining'
import { DayStatTile } from './DayStatTile'

/** Summary of the day picked in the calendar: live / completed / empty. */
export function DaySummaryCard() {
  const t = useT()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { selectedDay, createSession } = useTraining()
  const session = useSessionDay(selectedDay)

  const open = () => navigate(`/training/day/${selectedDay}`)
  const create = () => {
    createSession(selectedDay)
    showToast(t(`Đã tạo buổi tập cho ngày ${formatDayMonth(selectedDay)}`, `Session created for ${formatDayMonth(selectedDay)}`))
    open()
  }

  return (
    <Card className="mx-5 mt-4 px-5 py-[18px]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[15px] font-semibold">{session.label}</div>
          <div className="mt-[3px] text-[12px] text-tx3">{session.sub}</div>
        </div>
        {session.kind === 'today' && (
          <div className="rounded-[8px] bg-acc px-[10px] py-[5px] text-[10.5px] font-bold tracking-[.06em] text-acc-tx">
            {t('ĐANG TẬP', 'ACTIVE')}
          </div>
        )}
      </div>

      {session.kind === 'empty' ? (
        <Button variant="outline" onClick={create} className="mt-4 h-[46px] w-full gap-2 text-[14px] hover:border-acc hover:bg-acc hover:text-acc-tx">
          <AddIcon size={15} strokeWidth={2.2} />
          {t('Tạo buổi tập', 'Create session')}
        </Button>
      ) : (
        <>
          <div className="mt-4 flex gap-[10px]">
            <DayStatTile label={t('Bài', 'Lifts')}>{session.stats.lifts}</DayStatTile>
            <DayStatTile label="Sets">{session.stats.sets}</DayStatTile>
            <DayStatTile label="Volume">
              {fmtInt(session.stats.volume)}
              <span className="text-[11px] text-tx3"> kg</span>
            </DayStatTile>
          </div>
          <Button onClick={open} className="mt-[14px] h-[46px] w-full text-[14px]">
            {session.kind === 'today' ? t('Tiếp tục buổi tập', 'Continue session') : t('Xem buổi tập', 'View session')}
          </Button>
        </>
      )}
    </Card>
  )
}
