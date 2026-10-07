import { useTodayTotals } from '@/ui/shared/hooks/useTodayTotals'
import { useMealLog } from '../hooks/useMealLog'
import { MealGroup } from './MealGroup'

export function MealLog({ onAddFood }: { onAddFood: () => void }) {
  const { entries } = useTodayTotals()
  const groups = useMealLog(entries)

  return (
    <div className="mt-5 px-5">
      {groups.map((group) => (
        <MealGroup key={group.meal} group={group} onAddFood={onAddFood} />
      ))}
    </div>
  )
}
