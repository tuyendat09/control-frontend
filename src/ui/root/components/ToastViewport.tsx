import { useAnimationToast } from '@/ui/shared/hooks/useAnimationToast'
import type { ToastAction } from '@/ui/shared/context/ToastContext'
import { useToast } from '@/ui/shared/hooks/useToast'

/** Single toast, bottom-centered above the tab bar. Replays its timeline for every new message. */
export function ToastViewport() {
  const { toast } = useToast()
  if (!toast) return null
  return <Toast id={toast.id} message={toast.message} action={toast.action} />
}

function Toast({ id, message, action }: { id: number; message: string; action?: ToastAction }) {
  const ref = useAnimationToast(id, Boolean(action))

  return (
    <div
      ref={ref}
      role="status"
      className="absolute bottom-[108px] left-1/2 z-20 flex items-center gap-3 rounded-[14px] bg-acc px-[18px] py-[11px] text-[13px] font-semibold whitespace-nowrap text-acc-tx opacity-0 shadow-[0_8px_24px_-8px_rgba(0,0,0,.4)]"
    >
      {message}
      {action && (
        <button type="button" onClick={action.onClick} className="font-semibold underline underline-offset-[3px] opacity-80 hover:opacity-100">
          {action.label}
        </button>
      )}
    </div>
  )
}
