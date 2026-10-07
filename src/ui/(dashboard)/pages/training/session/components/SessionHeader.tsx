import { BackButton } from '@/ui/shared/components/BackButton'

interface SessionHeaderProps {
  label: string
  sub: string
  onBack: () => void
}

export function SessionHeader({ label, sub, onBack }: SessionHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-5">
      <BackButton onClick={onBack} />
      <div className="flex-1">
        <h2 className="m-0 font-serif text-[24px] leading-[1.1] font-normal">{label}</h2>
        <div className="mt-0.5 text-[11.5px] text-tx3">{sub}</div>
      </div>
    </header>
  )
}
