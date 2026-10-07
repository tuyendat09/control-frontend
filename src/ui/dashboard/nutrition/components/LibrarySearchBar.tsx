import { useNavigate } from 'react-router'
import { BarcodeScanIcon, SearchIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'

interface LibrarySearchBarProps {
  query: string
  onQueryChange: (query: string) => void
}

export function LibrarySearchBar({ query, onQueryChange }: LibrarySearchBarProps) {
  const t = useT()
  const navigate = useNavigate()

  return (
    <div className="flex gap-2">
      <label className="flex h-[46px] flex-1 items-center gap-[10px] rounded-[14px] bg-tint px-[14px] text-tx3">
        <SearchIcon size={16} />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={t('Tìm món ăn…', 'Search foods…')}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-tx outline-none placeholder:text-tx3"
        />
      </label>
      <button
        type="button"
        aria-label={t('Quét mã vạch', 'Scan a barcode')}
        onClick={() => navigate('/scan')}
        className="flex size-[46px] flex-none items-center justify-center rounded-[14px] bg-acc text-acc-tx shadow-glow transition-transform duration-[180ms] ease-soft active:scale-[.92]"
      >
        <BarcodeScanIcon size={19} />
      </button>
    </div>
  )
}
