import { use } from 'react'
import { TrackerContext } from '../context/TrackerContext'

export function useTracker() {
  const ctx = use(TrackerContext)
  if (!ctx) throw new Error('useTracker must be used inside <TrackerProvider>')
  return ctx
}
