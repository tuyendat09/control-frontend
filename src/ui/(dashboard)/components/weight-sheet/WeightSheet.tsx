import { CheckIcon } from '@/ui/shared/components/Icons'
import { Button } from '@/ui/shared/components/Button'
import { Sheet } from '@/ui/shared/components/Sheet'
import { useT } from '@/ui/shared/hooks/useT'
import { useWeightStats } from '@/ui/shared/hooks/useWeightStats'
import { appToday, dateKey, formatDayLabel } from '@/lib/date'
import { usePreferences } from '@/ui/shared/hooks/usePreferences'
import { useDashboardUi } from '../../hooks/useDashboardUi'
import { useWeightDraft } from '../../hooks/useWeightDraft'
import { RecentWeights } from './RecentWeights'
import { WeightJumpChips } from './WeightJumpChips'
import { WeightStepper } from './WeightStepper'

/** Today's weight entry. */
export function WeightSheet() {
  const t = useT()
  const { weightOpen, closeWeight } = useDashboardUi()

  return (
    <Sheet
      open={weightOpen}
      onClose={closeWeight}
      zIndex="z-[24]"
      scrimClassName="bg-[rgba(12,16,14,.44)]"
      className="px-5"
      label={t('Cân nặng hôm nay', 'Today’s weight')}
    >
      <WeightSheetBody />
    </Sheet>
  )
}

/** Mounted only while the sheet is, so the draft always starts from the latest value. */
function WeightSheetBody() {
  const t = useT()
  const { lang } = usePreferences()
  const { closeWeight } = useDashboardUi()
  const { lastLabel } = useWeightStats()
  const draft = useWeightDraft(closeWeight)

  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <h2 className="m-0 font-serif text-[23px] leading-[1.1] font-normal">{t('Cân nặng hôm nay', 'Today’s weight')}</h2>
          <div className="mt-[3px] text-[12.5px] text-tx3">
            {formatDayLabel(dateKey(appToday()), lang)} · {t('buổi sáng, bụng rỗng', 'morning, fasted')}
          </div>
        </div>
        <div className="text-[11.5px] whitespace-nowrap text-tx3">{lastLabel}</div>
      </div>

      <WeightStepper
        value={draft.draft}
        editing={draft.editing}
        text={draft.text}
        onStep={draft.nudge}
        onStartEdit={draft.startEdit}
        onTextChange={draft.onTextChange}
        onCommit={draft.commit}
        onKeyDown={draft.onKeyDown}
      />
      <WeightJumpChips onJump={draft.nudge} />
      <RecentWeights />

      <Button glow={false} onClick={draft.save} className="mt-[18px] h-[52px] w-full">
        <CheckIcon size={16} strokeWidth={2.2} />
        {t('Lưu cân nặng', 'Save weight')}
      </Button>
    </>
  )
}
