import { CardList } from '@/ui/shared/components/Card'
import { DownloadIcon } from '@/ui/shared/components/Icons'
import { SectionLabel } from '@/ui/shared/components/SectionLabel'
import { Toggle } from '@/ui/shared/components/Toggle'
import { usePreferences } from '@/ui/shared/hooks/usePreferences'
import { useInstallApp } from '@/ui/shared/hooks/useInstallApp'
import { useT } from '@/ui/shared/hooks/useT'
import { SettingRow } from './SettingRow'

export function SettingsList({ onExport }: { onExport: () => void }) {
  const t = useT()
  const { theme, lang, toggleTheme, toggleLang } = usePreferences()
  const { installed, install } = useInstallApp()

  return (
    <section>
      <SectionLabel className="mx-6 mt-5 mb-[10px]">{t('Cài đặt', 'Settings')}</SectionLabel>
      <CardList className="mx-5">
        <SettingRow
          role="switch"
          checked={theme === 'dark'}
          label={t('Giao diện tối', 'Dark mode')}
          onClick={toggleTheme}
          value={<Toggle checked={theme === 'dark'} />}
        />
        <SettingRow
          label={t('Ngôn ngữ', 'Language')}
          onClick={toggleLang}
          value={<span className="text-tx2">{lang === 'vi' ? 'Tiếng Việt' : 'English'}</span>}
        />
        {!installed && (
          <SettingRow
            label={t('Cài ứng dụng về máy', 'Install app')}
            onClick={install}
            value={<DownloadIcon size={16} className="text-tx3" />}
          />
        )}
        <SettingRow
          label={t('Xuất dữ liệu (JSON)', 'Export data (JSON)')}
          onClick={onExport}
          value={<DownloadIcon size={16} className="text-tx3" />}
        />
      </CardList>
    </section>
  )
}
