import { useEffect, useState } from 'react'

export const REST_SECONDS = 120

/** Rest countdown shown on the session sheet. Starts automatically when a set is ticked. */
export function useRestTimer() {
  const [seconds, setSeconds] = useState(REST_SECONDS)
  const [running, setRunning] = useState(false)
  const active = running && seconds > 0

  useEffect(() => {
    if (!active) return
    const id = window.setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(id)
  }, [active])

  const restart = () => {
    setSeconds(REST_SECONDS)
    setRunning(true)
  }

  const toggle = () => {
    if (active) return setRunning(false)
    if (seconds === 0) setSeconds(REST_SECONDS)
    setRunning(true)
  }

  const stop = () => setRunning(false)

  return { seconds, running: active, restart, toggle, stop }
}
