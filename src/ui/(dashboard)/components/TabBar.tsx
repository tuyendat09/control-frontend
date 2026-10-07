import type { ReactNode } from 'react'
import { NavLink } from 'react-router'
import { cn } from '@/lib/cn'
import { PlusIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'
import { useDashboardUi } from '../hooks/useDashboardUi'
import { HomeTabIcon, InsightsTabIcon, NutritionTabIcon, TrainTabIcon } from './TabIcons'

interface TabItemProps {
  to: string
  end?: boolean
  label: string
  icon: (active: boolean) => ReactNode
}

function TabItem({ to, end, label, icon }: TabItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'flex flex-1 flex-col items-center gap-1 rounded-[16px] py-2 transition-[color,transform] duration-200 active:scale-90',
          isActive ? 'font-semibold text-acc' : 'text-tx2',
        )
      }
    >
      {({ isActive }) => (
        <>
          {icon(isActive)}
          <span className="text-[10px] tracking-[.005em]">{label}</span>
        </>
      )}
    </NavLink>
  )
}

/** Floating pill: Home · Train · [+] · Nutrition · Insights. */
export function TabBar() {
  const t = useT()
  const { quickLogOpen, openQuickLog, closeQuickLog } = useDashboardUi()

  return (
    <nav className="absolute inset-x-0 bottom-0 z-[8] px-4 pb-[26px]">
      <div className="flex h-16 items-center rounded-[32px] border border-line bg-surf2 px-[6px] shadow-tabbar">
        <TabItem to="/" end label="Home" icon={(a) => <HomeTabIcon active={a} />} />
        <TabItem to="/training" label={t('Tập', 'Train')} icon={(a) => <TrainTabIcon active={a} />} />

        <button
          type="button"
          aria-label={t('Ghi nhanh', 'Quick log')}
          aria-expanded={quickLogOpen}
          onClick={quickLogOpen ? closeQuickLog : openQuickLog}
          className="mx-1 flex size-14 flex-none items-center justify-center rounded-full bg-acc text-acc-tx shadow-glow transition-transform duration-200 ease-soft hover:scale-[1.07] active:scale-[.92]"
        >
          <PlusIcon
            size={23}
            strokeWidth={2.3}
            className={cn('transition-transform duration-[380ms] ease-plus', quickLogOpen && 'rotate-[135deg]')}
          />
        </button>

        <TabItem to="/nutrition" label={t('Dinh dưỡng', 'Nutrition')} icon={(a) => <NutritionTabIcon active={a} />} />
        <TabItem to="/insights" label={t('Số liệu', 'Insights')} icon={(a) => <InsightsTabIcon active={a} />} />
      </div>
    </nav>
  )
}
