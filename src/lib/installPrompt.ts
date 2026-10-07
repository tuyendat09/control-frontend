/**
 * PWA install state. `beforeinstallprompt` can fire before React mounts, so it is captured
 * here at import time (imported from main.tsx) and exposed through a tiny external store.
 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true

let deferred: BeforeInstallPromptEvent | null = null
let installed = typeof window !== 'undefined' && isStandalone()
let snapshot = { canPrompt: false, installed }
const listeners = new Set<() => void>()

function publish() {
  snapshot = { canPrompt: deferred !== null, installed }
  listeners.forEach((l) => l())
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferred = e as BeforeInstallPromptEvent
    publish()
  })
  window.addEventListener('appinstalled', () => {
    deferred = null
    installed = true
    publish()
  })
}

export const installStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot: () => snapshot,
  /** Returns false when the browser can't show a native prompt (iOS, already dismissed, unsupported). */
  async prompt() {
    if (!deferred) return false
    const event = deferred
    deferred = null
    publish()
    await event.prompt()
    const { outcome } = await event.userChoice
    return outcome === 'accepted'
  },
}

export const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent)
