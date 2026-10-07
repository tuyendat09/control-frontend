import { useAnimationTabIcon } from '../hooks/useAnimationTabIcon'

interface TabIconProps {
  active: boolean
}

const base = {
  width: 21,
  height: 21,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function HomeTabIcon({ active }: TabIconProps) {
  const ref = useAnimationTabIcon(active, 'hop')
  return (
    <svg ref={ref} {...base}>
      <path d="M3.5 10.4L12 3.6l8.5 6.8V19a1.6 1.6 0 01-1.6 1.6H5.1A1.6 1.6 0 013.5 19z" />
      <path d="M9.6 14.4c1.3 1.4 3.5 1.4 4.8 0" />
    </svg>
  )
}

export function TrainTabIcon({ active }: TabIconProps) {
  const ref = useAnimationTabIcon(active, 'bars')
  return (
    <svg ref={ref} {...base}>
      <path data-bar d="M5 20V11" />
      <path data-bar d="M12 20V5" />
      <path data-bar d="M19 20v-6" />
    </svg>
  )
}

export function NutritionTabIcon({ active }: TabIconProps) {
  const ref = useAnimationTabIcon(active, 'wobble')
  return (
    <svg ref={ref} {...base}>
      <path d="M12 7.6c-1.1-1.4-2.6-2-4.1-1.6C5.4 6.6 3.6 9.4 3.6 13c0 4.3 3.4 8 6.1 8 .9 0 1.5-.4 2.3-.4s1.4.4 2.3.4c2.7 0 6.1-3.7 6.1-8 0-3.6-1.8-6.4-4.3-7-1.5-.4-3 .2-4.1 1.6z" />
      <path d="M12 7.6V5.2c0-1.5 1.2-2.7 2.7-2.7" />
    </svg>
  )
}

export function InsightsTabIcon({ active }: TabIconProps) {
  const ref = useAnimationTabIcon(active, 'pop')
  return (
    <svg ref={ref} {...base}>
      <path d="M4 19.5V4.5M4 15l4.6-4.6 3.4 3.4 6.6-6.6" />
      <path d="M14.6 7.7H19v4.4" />
    </svg>
  )
}
