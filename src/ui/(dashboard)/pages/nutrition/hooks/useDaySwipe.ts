import { useRef, type PointerEvent } from 'react'

const THRESHOLD = 60

/** Horizontal swipe → previous/next day. Vertical scrolling stays native (`touch-action: pan-y` on the element). */
export function useDaySwipe(onShift: (direction: 1 | -1) => void) {
  const startX = useRef<number | null>(null)

  return {
    onPointerDown: (e: PointerEvent) => {
      startX.current = e.clientX
    },
    onPointerUp: (e: PointerEvent) => {
      if (startX.current === null) return
      const dx = e.clientX - startX.current
      startX.current = null
      if (Math.abs(dx) > THRESHOLD) onShift(dx < 0 ? 1 : -1)
    },
  }
}
