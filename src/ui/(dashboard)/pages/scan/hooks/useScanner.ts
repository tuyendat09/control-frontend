import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { SCAN_PRODUCTS, type ScanMode } from '@/data/scan'
import { SAMPLE_NOW } from '@/lib/date'
import { round1 } from '@/lib/format'
import type { MealType } from '@/types'
import { useGoBack } from '@/ui/shared/hooks/useGoBack'
import { useT } from '@/ui/shared/hooks/useT'
import { useToast } from '@/ui/shared/hooks/useToast'
import { useTracker } from '@/ui/shared/hooks/useTracker'

export type ScanStatus = 'live' | 'found'

/** The prototype auto-detects after this long; a real build resolves from the camera stream. */
const DETECT_MS = 2300
const MAX_QTY = 9

export function useScanner() {
  const t = useT()
  const navigate = useNavigate()
  const goBack = useGoBack('/nutrition?tab=library')
  const { showToast } = useToast()
  const { addEntry } = useTracker()

  const [mode, setMode] = useState<ScanMode>('bar')
  const [status, setStatus] = useState<ScanStatus>('live')
  const [flash, setFlash] = useState(false)
  const [qty, setQty] = useState(1)
  const [meal, setMeal] = useState<MealType>('dinner')
  const [attempt, setAttempt] = useState(0)

  // Simulated detection: lock on to the code a moment after the scanner goes live.
  useEffect(() => {
    if (status !== 'live') return
    const id = window.setTimeout(() => setStatus('found'), DETECT_MS)
    return () => window.clearTimeout(id)
  }, [status, mode, attempt])

  const restart = () => {
    setStatus('live')
    setQty(1)
    setAttempt((n) => n + 1)
  }

  const product = SCAN_PRODUCTS[mode]
  const kcal = Math.round(product.kcal * qty)
  const macros = { p: round1(product.p * qty), c: round1(product.c * qty), f: round1(product.f * qty) }
  const unit = t(product.unit.vi, product.unit.en[qty > 1 ? 1 : 0])
  const mealName: Record<MealType, string> = {
    breakfast: t('bữa sáng', 'breakfast'),
    lunch: t('bữa trưa', 'lunch'),
    dinner: t('bữa tối', 'dinner'),
    snack: t('bữa phụ', 'snack'),
  }

  const addToMeal = () => {
    const name = t(product.name.vi, product.name.en)
    addEntry({
      time: SAMPLE_NOW,
      name,
      meal,
      kcal,
      macros,
      items: [{ id: crypto.randomUUID(), name, qty: `${qty} ${unit}`, kcal, macros }],
    })
    showToast(t(`Đã thêm ${kcal} kcal từ mã quét`, `Added ${kcal} kcal from scan`))
    navigate('/')
  }

  return {
    mode,
    switchMode: (next: ScanMode) => {
      setMode(next)
      restart()
    },
    status,
    rescan: restart,
    flash,
    toggleFlash: () => setFlash((f) => !f),
    qty,
    stepQty: (step: number) => setQty((q) => Math.min(MAX_QTY, Math.max(1, q + step))),
    meal,
    setMeal,
    product,
    kcal,
    macros,
    serving: `${qty} ${unit} · ${product.grams * qty}g`,
    ctaLabel: t(`Thêm vào ${mealName[meal]}`, `Add to ${mealName[meal]}`),
    addToMeal,
    close: goBack,
  }
}
