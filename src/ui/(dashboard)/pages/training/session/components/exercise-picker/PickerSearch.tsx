import { CloseIcon, SearchIcon } from '@/ui/shared/components/Icons'
import { useT } from '@/ui/shared/hooks/useT'

interface PickerSearchProps {
  value: string
  onChange: (value: string) => void
}

export function PickerSearch({ value, onChange }: PickerSearchProps) {
  const t = useT()

  return (
    <div
      data-pk="search"
      className="mx-5 mt-4 flex h-[46px] items-center gap-2.5 rounded-[15px] border border-line bg-surf2 px-3.5 shadow-el transition-colors duration-200 focus-within:border-line-hi"
    >
      <SearchIcon size={16} className="flex-none text-tx3" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('Tìm bài tập (vd: đẩy ngực, squat)', 'Search exercises')}
        aria-label={t('Tìm bài tập', 'Search exercises')}
        className="min-w-0 flex-1 border-0 bg-transparent text-[14.5px] text-tx outline-none placeholder:text-tx3"
      />
      {value && (
        <button
          type="button"
          aria-label={t('Xóa', 'Clear search')}
          onClick={() => onChange('')}
          className="flex size-[22px] flex-none items-center justify-center rounded-full bg-tint text-tx2 transition-colors duration-[180ms] hover:bg-acc hover:text-acc-tx"
        >
          <CloseIcon size={10} strokeWidth={3} />
        </button>
      )}
    </div>
  )
}
