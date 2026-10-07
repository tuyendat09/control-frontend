import { createBrowserRouter, Navigate } from 'react-router'
import { AuthLayout } from '@/ui/auth/AuthLayout'
import { LoginPage } from '@/ui/auth/login/LoginPage'
import { RegisterPage } from '@/ui/auth/register/RegisterPage'
import { WelcomePage } from '@/ui/auth/welcome/WelcomePage'
import { DashboardLayout } from '@/ui/dashboard/DashboardLayout'
import { HomePage } from '@/ui/dashboard/home/HomePage'
import type { DashboardRouteHandle } from '@/ui/dashboard/hooks/useHideTabBar'
import { InsightsPage } from '@/ui/dashboard/insights/InsightsPage'
import { NutritionPage } from '@/ui/dashboard/nutrition/NutritionPage'
import { ProfilePage } from '@/ui/dashboard/profile/ProfilePage'
import { ScanPage } from '@/ui/dashboard/scan/ScanPage'
import { ExerciseProgressPage } from '@/ui/dashboard/training/progress/ExerciseProgressPage'
import { SessionPage } from '@/ui/dashboard/training/session/SessionPage'
import { TrainingPage } from '@/ui/dashboard/training/TrainingPage'
import { RootLayout } from '@/ui/root/RootLayout'

const fullScreen: DashboardRouteHandle = { hideTabBar: true }

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          { index: true, element: <WelcomePage /> },
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
        ],
      },
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: 'training',
            element: <TrainingPage />,
            children: [
              {
                path: 'day/:day',
                element: <SessionPage />,
                children: [{ path: 'progress/:exerciseId', element: <ExerciseProgressPage /> }],
              },
            ],
          },
          { path: 'nutrition', element: <NutritionPage /> },
          { path: 'insights', element: <InsightsPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'scan', element: <ScanPage />, handle: fullScreen },
        ],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
