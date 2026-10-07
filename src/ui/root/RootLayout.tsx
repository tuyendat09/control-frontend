import { Outlet } from 'react-router'
import { Atmosphere } from './components/Atmosphere'
import { PhoneFrame } from './components/PhoneFrame'
import { ToastViewport } from './components/ToastViewport'
import { StatusBar } from '@/ui/shared/components/StatusBar'

/** App shell: phone frame on desktop, full-bleed on devices. Screens live inside it. */
export function RootLayout() {
  return (
    <PhoneFrame>
      <Atmosphere />
      <StatusBar className="text-tx" />
      <Outlet />
      <ToastViewport />
    </PhoneFrame>
  )
}
