import clsx from 'clsx'

/** Single source of truth for the Flowtex logo asset path. */
export const FLOWTEX_LOGO_SRC = '/logo_flowtex.svg'

const LOGO_BY_VARIANT = {
  light: FLOWTEX_LOGO_SRC,
  dark: FLOWTEX_LOGO_SRC,
} as const

const SIZE_CLASSES = {
  xs: 'h-6',
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
  xl: 'h-16',
  '2xl': 'h-20',
} as const

export type FlowtexLogoSize = keyof typeof SIZE_CLASSES | number

export type FlowtexLogoProps = {
  /** `light` for light backgrounds, `dark` for dark backgrounds, `auto` follows system theme. */
  variant?: 'light' | 'dark' | 'auto'
  size?: FlowtexLogoSize
  className?: string
  alt?: string
}

export function FlowtexLogo({
  variant = 'light',
  size = 'sm',
  className,
  alt = 'Flowtex',
}: FlowtexLogoProps) {
  const resolvedVariant =
    variant === 'auto'
      ? undefined
      : variant === 'dark'
        ? 'dark'
        : 'light'

  const src = resolvedVariant ? LOGO_BY_VARIANT[resolvedVariant] : FLOWTEX_LOGO_SRC
  const sizeClass = typeof size === 'number' ? undefined : SIZE_CLASSES[size]
  const sizeStyle =
    typeof size === 'number' ? { height: size, width: 'auto' as const } : undefined

  return (
    <img
      src={src}
      alt={alt}
      className={clsx(
        'w-auto max-w-full object-contain',
        sizeClass,
        variant === 'auto' && 'dark:brightness-105',
        className,
      )}
      style={sizeStyle}
      decoding="async"
    />
  )
}
