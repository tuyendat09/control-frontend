import { Button } from '@/ui/shared/components/Button'
import { PageTitle } from '@/ui/shared/components/PageTitle'
import { Screen } from '@/ui/shared/components/Screen'
import { useT } from '@/ui/shared/hooks/useT'
import { ProfileCard } from './components/ProfileCard'
import { SettingsList } from './components/SettingsList'
import { TargetsList } from './components/TargetsList'
import { useProfile } from './hooks/useProfile'

export function ProfilePage() {
  const t = useT()
  const { weightLabel, exportData, signOut } = useProfile()

  return (
    <Screen>
      <PageTitle className="px-6">{t('Hồ sơ', 'Profile')}</PageTitle>
      <ProfileCard weightLabel={weightLabel} />
      <TargetsList />
      <SettingsList onExport={exportData} />
      <Button
        variant="outline"
        onClick={signOut}
        className="mx-5 mt-[22px] h-[50px] w-[calc(100%-40px)] text-[14.5px] font-medium text-tx2 hover:text-tx"
      >
        {t('Đăng xuất', 'Sign out')}
      </Button>
    </Screen>
  )
}
