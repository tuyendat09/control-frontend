import { useLocation, useNavigate } from 'react-router'

/** Back one step in history, or to `fallback` when the page was opened directly. */
export function useGoBack(fallback = '/') {
  const navigate = useNavigate()
  const { key } = useLocation()
  return () => (key === 'default' ? navigate(fallback, { replace: true }) : navigate(-1))
}
