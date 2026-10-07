import { Link } from 'react-router'
import { useT } from '@/ui/shared/hooks/useT'

export function HomeHeader() {
  const t = useT()

  return (
    <header className="flex items-center justify-between px-6">
      <div>
        <div className="text-[12.5px] tracking-[.04em] text-tx3">{t('T7, 15 THG 8', 'SAT, AUG 15')}</div>
        <h1 className="m-0 mt-0.5 font-serif text-[29px] font-normal tracking-[-.01em]">{t('Chào An', 'Hello An')}</h1>
      </div>
      <Link
        to="/profile"
        className="flex items-center gap-[9px] rounded-full border border-line bg-surf2 py-[5px] pr-3 pl-[5px] shadow-el transition-[transform,border-color] duration-[180ms] ease-soft hover:border-line-hi active:scale-[.96]"
      >
        <span className="flex size-[34px] items-center justify-center rounded-full bg-tint text-[12.5px] font-semibold text-tx2">
          AN
        </span>
        <span className="flex flex-col leading-[1.15]">
          <span className="text-[11.5px] font-semibold">An</span>
          <span className="text-[10px] text-tx3">{t('Hồ sơ', 'Profile')}</span>
        </span>
      </Link>
    </header>
  )
}
