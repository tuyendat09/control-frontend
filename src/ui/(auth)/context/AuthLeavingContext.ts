import { createContext } from 'react'

/** True inside the "old page" copy that is fading out, so its entrance animations don't replay. */
export const AuthLeavingContext = createContext(false)
