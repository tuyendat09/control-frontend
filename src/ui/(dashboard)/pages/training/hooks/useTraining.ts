import { use } from 'react'
import { TrainingContext } from '../context/TrainingContext'

export function useTraining() {
  const ctx = use(TrainingContext)
  if (!ctx) throw new Error('useTraining must be used inside <TrainingProvider>')
  return ctx
}
