import { HEATMAP, WEEKLY_VOLUME } from '@/data/insights'
import { fmtInt } from '@/lib/format'
import { Card } from '@/ui/shared/components/Card'
import { useT } from '@/ui/shared/hooks/useT'

/** Weekly volume headline + 28-day training heatmap (opacity steps of ink). */
export function VolumeCard() {
  const t = useT()

  return (
    <Card className="mx-5 mt-[14px] p-5">
      <div className="text-[11px] tracking-[.1em] text-tx3 uppercase">
        {t('Khối lượng tạ · theo tuần', 'Training volume · weekly')}
      </div>
      <div className="mt-[10px] flex items-baseline justify-between">
        <div className="font-serif text-[28px]">
          {fmtInt(WEEKLY_VOLUME.kg)} <span className="text-[14px] text-tx3">kg</span>
        </div>
        <div className="text-[12.5px] text-tx2">{WEEKLY_VOLUME.delta}</div>
      </div>
      <div className="mt-4 flex flex-wrap gap-[5px]" role="img" aria-label={t('Bản đồ nhiệt 28 ngày', '28-day heatmap')}>
        {HEATMAP.map((intensity, i) => (
          <div
            key={i}
            className="size-[10px] rounded-[3px]"
            style={
              intensity === 0
                ? { background: 'var(--line)' }
                : { background: 'var(--tx)', opacity: intensity }
            }
          />
        ))}
      </div>
    </Card>
  )
}
