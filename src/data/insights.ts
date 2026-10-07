/** Kcal for Mon…Sun; the last bar is "today". */
export const CALORIES_7D = [1970, 2350, 1600, 2190, 1870, 2560, 1490]

/** 28-cell training heatmap, intensity 0…1. */
export const HEATMAP = Array.from({ length: 28 }, (_, i) => [0, 0.18, 0.5, 0.85, 1][(i * 7 + 3) % 5])

export const TDEE = { value: 2340, bmr: 1690, factor: 1.38 }
export const STREAK_DAYS = 23
export const WEEKLY_VOLUME = { kg: 18240, delta: '+6.2%' }
