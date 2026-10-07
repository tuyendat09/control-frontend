import type { LocalizedText } from '@/types'

export type ScanMode = 'bar' | 'qr'

export interface ScanProduct {
  kcal: number
  p: number
  c: number
  f: number
  /** Grams per unit */
  grams: number
  status: LocalizedText
  name: LocalizedText
  meta: LocalizedText
  unit: { vi: string; en: [string, string] }
  hint: LocalizedText
}

export const SCAN_PRODUCTS: Record<ScanMode, ScanProduct> = {
  bar: {
    kcal: 62,
    p: 5.2,
    c: 7.8,
    f: 1.2,
    grams: 100,
    status: { vi: 'Đã nhận diện · EAN-13', en: 'Matched · EAN-13' },
    name: { vi: 'Sữa chua ít đường', en: 'Low-sugar yogurt' },
    meta: { vi: 'Vinamilk · 8 934673 102347', en: 'Vinamilk · 8 934673 102347' },
    unit: { vi: 'hũ', en: ['cup', 'cups'] },
    hint: { vi: 'Đưa mã vạch trên bao bì vào khung', en: 'Line up the barcode on the package' },
  },
  qr: {
    kcal: 520,
    p: 42,
    c: 55,
    f: 12,
    grams: 350,
    status: { vi: 'Combo từ QR', en: 'Combo from QR' },
    name: { vi: 'Meal prep · Gà + khoai lang', en: 'Meal prep · Gà + khoai lang' },
    meta: { vi: 'Từ Coach Minh · 1 hộp 350g', en: 'From Coach Minh · 1 box 350g' },
    unit: { vi: 'hộp', en: ['box', 'boxes'] },
    hint: { vi: 'Quét QR combo từ coach hoặc bạn tập', en: 'Scan a combo QR from a coach or friend' },
  },
}
