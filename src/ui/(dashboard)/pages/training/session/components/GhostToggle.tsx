import { Toggle } from '@/ui/shared/components/Toggle'
import { useT } from '@/ui/shared/hooks/useT'

interface GhostToggleProps {
  on: boolean
  onToggle: () => void
}

/** Show last session's values beside the current ones. */
export function GhostToggle({ on, onToggle }: GhostToggleProps) {
  const t = useT()

  return (
    <div className="flex justify-end px-6 pt-4">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={onToggle}
        className="flex items-center gap-[9px] rounded-[12px] border border-line px-[11px] py-[7px] transition-colors duration-200 hover:border-line-hi"
      >
        <span className="text-[11.5px] text-tx2">{t('Buổi trước', 'Last time')}</span>
        <Toggle checked={on} size="sm" />
      </button>
    </div>
  )
}
