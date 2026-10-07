import { Screen } from '@/ui/shared/components/Screen'
import { CalorieCard } from './components/CalorieCard'
import { HomeHeader } from './components/HomeHeader'
import { HomeTiles } from './components/HomeTiles'
import { LoggedToday } from './components/LoggedToday'
import { QuickAddSection } from './components/QuickAddSection'
import { useHome } from './hooks/useHome'

export function HomePage() {
  const { totals, targets, entries, addCombo } = useHome()

  return (
    <Screen>
      <HomeHeader />
      <CalorieCard totals={totals} targets={targets} />
      <QuickAddSection onAdd={addCombo} />
      <LoggedToday entries={entries} />
      <HomeTiles />
    </Screen>
  )
}
