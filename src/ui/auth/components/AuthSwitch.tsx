import type { ReactNode } from 'react'
import { Link } from 'react-router'

interface AuthSwitchProps {
  prompt: ReactNode
  to: string
  linkLabel: string
}

/** "No account yet? Sign up" footer. */
export function AuthSwitch({ prompt, to, linkLabel }: AuthSwitchProps) {
  return (
    <div className="absolute inset-x-0 bottom-11 animate-fi px-8 text-center text-[13.5px] text-tx2 [animation-delay:.41s]">
      {prompt}{' '}
      <Link to={to} replace className="font-semibold text-tx underline underline-offset-[3px]">
        {linkLabel}
      </Link>
    </div>
  )
}
