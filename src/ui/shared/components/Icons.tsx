import type { ReactNode, SVGProps } from 'react'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  size?: number
}

function Svg({ size = 16, strokeWidth = 2, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h14M13 6.5l5.5 5.5L13 17.5" />
  </Svg>
)

export const ChevronLeftIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M15 5l-7 7 7 7" />
  </Svg>
)

export const ChevronRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 5l7 7-7 7" />
  </Svg>
)

/** Compact plus (FAB, steppers, tiles). */
export const PlusIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </Svg>
)

/** Wider plus (add rows, empty states). */
export const AddIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
)

export const MinusIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 12h13" />
  </Svg>
)

export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12.5l5 5L20 6.5" />
  </Svg>
)

export const EyeIcon = (p: IconProps) => (
  <Svg strokeWidth={1.6} {...p}>
    <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" />
    <circle cx="12" cy="12" r="2.6" />
  </Svg>
)

export const SearchIcon = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </Svg>
)

export const BarcodeScanIcon = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2" />
    <path d="M8 9v6M11 9v6M14 9v6M17 9v6" />
  </Svg>
)

export const CloseIcon = (p: IconProps) => (
  <Svg strokeWidth={2.2} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
)

export const FlashIcon = (p: IconProps) => (
  <Svg strokeWidth={1.9} {...p}>
    <path d="M13 2.5L5 13.5h6l-1 8 8-11h-6l1-8z" />
  </Svg>
)

export const RefreshIcon = (p: IconProps) => (
  <Svg strokeWidth={1.9} {...p}>
    <path d="M20 11a8 8 0 10-2.3 5.7" />
    <path d="M20 5v6h-6" />
  </Svg>
)

export const EditIcon = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <path d="M16.5 3.5l4 4L8 20H4v-4z" />
  </Svg>
)

export const DownloadIcon = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <path d="M12 3v12M7 11l5 5 5-5M4 20h16" />
  </Svg>
)

export const TrendIcon = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <path d="M4 19V5M4 15l5-5 4 4 7-7" />
  </Svg>
)

export const BarsIcon = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <path d="M5 20V11M12 20V5M19 20v-6" />
  </Svg>
)

export const DumbbellIcon = (p: IconProps) => (
  <Svg strokeWidth={1.7} {...p}>
    <path d="M3 9v6M6 6.5v11M18 6.5v11M21 9v6M6 12h12" />
  </Svg>
)

export const AppleIcon = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <path d="M12 7.6c-1.1-1.4-2.6-2-4.1-1.6C5.4 6.6 3.6 9.4 3.6 13c0 4.3 3.4 8 6.1 8 .9 0 1.5-.4 2.3-.4s1.4.4 2.3.4c2.7 0 6.1-3.7 6.1-8 0-3.6-1.8-6.4-4.3-7-1.5-.4-3 .2-4.1 1.6z" />
    <path d="M12 7.6V5.2c0-1.5 1.2-2.7 2.7-2.7" />
  </Svg>
)
