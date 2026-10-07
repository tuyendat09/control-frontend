import { Navigate, useNavigate, useParams } from 'react-router'
import { BackButton } from '@/ui/shared/components/BackButton'
import { Card } from '@/ui/shared/components/Card'
import { SectionLabel } from '@/ui/shared/components/SectionLabel'
import { Segmented } from '@/ui/shared/components/Segmented'
import { OverlayScreen } from '@/ui/shared/components/Screen'
import { useT } from '@/ui/shared/hooks/useT'
import { useSessionDay } from '../hooks/useSessionDay'
import { HistoryTable } from './components/HistoryTable'
import { VolumeProgress } from './components/VolumeProgress'
import { WeightProgress } from './components/WeightProgress'
import { useExerciseProgress } from './hooks/useExerciseProgress'

export function ExerciseProgressPage() {
  const { day, exerciseId = '' } = useParams()
  const progress = useExerciseProgress(exerciseId)

  if (!progress) return <Navigate to={`/training/day/${day}`} replace />
  return <Progress day={Number(day)} exerciseId={exerciseId} progress={progress} />
}

interface ProgressProps {
  day: number
  exerciseId: string
  progress: NonNullable<ReturnType<typeof useExerciseProgress>>
}

function Progress({ day, exerciseId, progress }: ProgressProps) {
  const t = useT()
  const navigate = useNavigate()
  const { exercises } = useSessionDay(day)
  const name = exercises.find((e) => e.id === exerciseId)?.name ?? exerciseId

  return (
    <OverlayScreen className="z-[14]">
      <header className="flex items-center gap-3 px-5">
        <BackButton onClick={() => navigate(`/training/day/${day}`)} />
        <div>
          <h2 className="m-0 font-serif text-[24px] leading-[1.1] font-normal">{name}</h2>
          <div className="mt-0.5 text-[11.5px] text-tx3">
            {progress.sessions} {t('buổi · 90 ngày', 'sessions · 90 days')}
          </div>
        </div>
      </header>

      <Segmented
        className="mx-5 mt-[18px]"
        itemClassName="text-[12.5px]"
        value={progress.tab}
        onChange={progress.setTab}
        items={[
          { value: 'weight', label: t('Mức tạ top set', 'Top set weight') },
          { value: 'volume', label: 'kg × rep' },
        ]}
      />

      <Card className="mx-5 mt-[14px] p-5">
        {progress.tab === 'weight' ? <WeightProgress progress={progress} /> : <VolumeProgress progress={progress} />}
      </Card>

      <SectionLabel className="mx-6 mt-[18px] mb-[10px]">{t('Lịch sử', 'History')}</SectionLabel>
      <HistoryTable rows={progress.rows} />
    </OverlayScreen>
  )
}
