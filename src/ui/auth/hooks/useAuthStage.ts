import { useEffect, useState, type ReactNode } from 'react'
import { useLocation, useOutlet } from 'react-router'

export type AuthStage = 'welcome' | 'form'

interface Leaving {
  key: string
  stage: AuthStage
  node: ReactNode
}

const stageOf = (pathname: string): AuthStage => (pathname.replace(/\/$/, '') === '/auth' ? 'welcome' : 'form')

/**
 * Drives the welcome ⇄ form transition: tells the layout which stage we're in and
 * keeps the previous page mounted briefly so it can fade out while the logo glides.
 */
export function useAuthStage() {
  const { pathname } = useLocation()
  const outlet = useOutlet()
  const stage = stageOf(pathname)

  const [current, setCurrent] = useState({ pathname, stage, node: outlet })
  const [leaving, setLeaving] = useState<Leaving | null>(null)

  if (current.pathname !== pathname) {
    // Sign-in ⇄ sign-up share a stage, so only welcome ⇄ form needs an exit.
    if (current.stage !== stage) {
      setLeaving({ key: current.pathname, stage: current.stage, node: current.node })
    }
    setCurrent({ pathname, stage, node: outlet })
  }

  useEffect(() => {
    if (!leaving) return
    const id = window.setTimeout(() => setLeaving(null), 700)
    return () => window.clearTimeout(id)
  }, [leaving])

  return { stage, outlet, leaving }
}
