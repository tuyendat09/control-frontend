import { useSyncExternalStore } from 'react'
import { installStore, isIos } from '@/lib/installPrompt'
import { useT } from './useT'
import { useToast } from './useToast'

/** "Install app" action. Falls back to a how-to toast where there's no native prompt. */
export function useInstallApp() {
  const t = useT()
  const { showToast } = useToast()
  const { installed, canPrompt } = useSyncExternalStore(installStore.subscribe, installStore.getSnapshot)

  const install = async () => {
    if (canPrompt) {
      const accepted = await installStore.prompt()
      if (accepted) showToast(t('Đã cài đặt ứng dụng', 'App installed'))
      return
    }
    showToast(
      isIos()
        ? t('Bấm Chia sẻ → Thêm vào MH chính', 'Tap Share → Add to Home Screen')
        : t('Dùng menu trình duyệt → Cài đặt ứng dụng', 'Use the browser menu → Install app'),
    )
  }

  return { installed, install }
}
