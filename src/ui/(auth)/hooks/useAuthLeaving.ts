import { use } from 'react'
import { AuthLeavingContext } from '../context/AuthLeavingContext'

export function useAuthLeaving() {
  return use(AuthLeavingContext)
}
