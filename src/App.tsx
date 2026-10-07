import { RouterProvider } from 'react-router'
import { router } from './router'
import { PreferencesProvider } from '@/ui/shared/context/PreferencesProvider'
import { ToastProvider } from '@/ui/shared/context/ToastProvider'
import { TrackerProvider } from '@/ui/shared/context/TrackerProvider'

export default function App() {
  return (
    <PreferencesProvider>
      <ToastProvider>
        <TrackerProvider>
          <RouterProvider router={router} />
        </TrackerProvider>
      </ToastProvider>
    </PreferencesProvider>
  )
}
