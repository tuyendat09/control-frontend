import type { ReactNode } from 'react'

/**
 * 390×844 frame (radius 46) on wide screens; the whole viewport on phones.
 * `container-type` lets children size against the frame width with `cqw`.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg transition-colors duration-[350ms] min-[480px]:px-10 min-[480px]:py-14">
      <div className="relative h-dvh w-full flex-none overflow-hidden bg-surf [container-type:inline-size] transition-colors duration-[350ms] min-[480px]:h-[844px] min-[480px]:w-[390px] min-[480px]:rounded-[46px] min-[480px]:border min-[480px]:border-line min-[480px]:shadow-[0_1px_2px_rgba(26,25,23,.04),0_30px_70px_-34px_rgba(26,25,23,.3)]">
        {children}
      </div>
    </div>
  )
}
