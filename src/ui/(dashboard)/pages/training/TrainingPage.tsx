import { Outlet } from 'react-router'
import { Screen } from '@/ui/shared/components/Screen'
import { DaySummaryCard } from './components/DaySummaryCard'
import { MonthCalendar } from './components/MonthCalendar'
import { RecentSessions } from './components/RecentSessions'
import { TrainingHeader } from './components/TrainingHeader'
import { TrainingProvider } from './context/TrainingProvider'

/**
 * Overview (calendar + selected day). The session sheet and exercise progress render
 * into <Outlet/> on top of it, so the calendar keeps its scroll position underneath.
 */
export function TrainingPage() {
  return (
    <TrainingProvider>
      <div className="absolute inset-0">
        <Screen>
          <TrainingHeader />
          <MonthCalendar />
          <DaySummaryCard />
          <RecentSessions />
        </Screen>
        <Outlet />
      </div>
    </TrainingProvider>
  )
}
