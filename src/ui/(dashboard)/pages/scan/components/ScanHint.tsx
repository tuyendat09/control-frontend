import type { LocalizedText } from '@/types'
import { useT } from '@/ui/shared/hooks/useT'

export function ScanHint({ hint }: { hint: LocalizedText }) {
  const t = useT()

  return (
    <p className="absolute inset-x-10 top-[470px] z-[3] text-center text-[13.5px] leading-normal text-[rgba(244,241,236,.78)] transition-opacity duration-[250ms] group-data-[state=found]/scan:opacity-0">
      {t(hint.vi, hint.en)}
    </p>
  )
}
