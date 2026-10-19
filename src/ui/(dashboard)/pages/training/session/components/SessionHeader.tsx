import { BackButton } from '@/ui/shared/components/BackButton'

interface SessionHeaderProps {
  overline: string
  title: string
  /** Right-hand count, e.g. "3 bài". */
  meta: string
  onBack: () => void
}

export function SessionHeader({ overline, title, meta, onBack }: SessionHeaderProps) {
  return (
    <header className="flex items-end gap-3 px-5">
      <BackButton onClick={onBack} className="mb-1" />
      <div className="min-w-0 flex-1">
        <div className="text-[11px] tracking-[.11em] text-tx3 uppercase">{overline}</div>
        <h2 className="m-0 mt-1.5 font-serif text-[32px] leading-[1.05] font-normal">{title}</h2>
      </div>
      <div className="pr-1 pb-[5px] text-[12px] text-tx2">{meta}</div>
    </header>
  )
}
