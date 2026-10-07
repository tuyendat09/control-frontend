import { useToast } from '@/ui/shared/hooks/useToast'

/** Single toast, bottom-centered above the tab bar. Re-keyed per message so it replays. */
export function ToastViewport() {
  const { toast } = useToast()
  if (!toast) return null

  return (
    <div
      key={toast.id}
      role="status"
      className="absolute bottom-[108px] left-1/2 z-20 animate-toast rounded-[14px] bg-acc px-[18px] py-[11px] text-[13px] font-semibold whitespace-nowrap text-acc-tx shadow-[0_8px_24px_-8px_rgba(0,0,0,.4)]"
    >
      {toast.message}
    </div>
  )
}
