import { forwardRef } from 'react'
import type { HTMLAttributes, ElementType } from 'react'
import { clsx } from 'clsx'

type TypographyVariant = 'hero' | 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body-xl' | 'body-lg' | 'body' | 'body-sm' | 'body-xs' | 'caption' | 'label'

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant
  as?: ElementType
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'electric' | 'success' | 'warning' | 'error'
  align?: 'left' | 'center' | 'right' | 'justify'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'
  italic?: boolean
  underline?: boolean
  truncate?: boolean
  noWrap?: boolean
}

const variantElementMap: Record<TypographyVariant, ElementType> = {
  hero: 'h1',
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'body-xl': 'p',
  'body-lg': 'p',
  body: 'p',
  'body-sm': 'p',
  'body-xs': 'p',
  caption: 'span',
  label: 'span',
}

const variantStyles: Record<TypographyVariant, string> = {
  hero: 'text-hero',
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
  h5: 'text-h5',
  h6: 'text-h6',
  'body-xl': 'text-body-xl',
  'body-lg': 'text-body-lg',
  body: 'text-body',
  'body-sm': 'text-body-sm',
  'body-xs': 'text-body-xs',
  caption: 'text-caption',
  label: 'text-label',
}

const colorStyles = {
  primary: 'text-pb-white',
  secondary: 'text-pb-gray-300',
  muted: 'text-pb-gray-400',
  accent: 'text-pb-accent',
  electric: 'text-pb-electric',
  success: 'text-pb-success',
  warning: 'text-pb-warning',
  error: 'text-pb-error',
}

const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
}

const weightStyles = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({
    variant = 'body',
    as,
    color = 'primary',
    align,
    weight,
    italic = false,
    underline = false,
    truncate = false,
    noWrap = false,
    className,
    children,
    ...props
  }, ref) => {
    const Component = as || variantElementMap[variant]

    const styles = clsx(
      variantStyles[variant],
      colorStyles[color],
      align && alignStyles[align],
      weight && weightStyles[weight],
      italic && 'italic',
      underline && 'underline',
      truncate && 'truncate',
      noWrap && 'whitespace-nowrap',
      className
    )

    return (
      <Component ref={ref} className={styles} {...props}>
        {children}
      </Component>
    )
  }
)

Typography.displayName = 'Typography'

// Convenience components for common use cases
export const Heading = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }>(
  ({ level = 1, ...props }, ref) => {
    const variant = `h${level}` as TypographyVariant
    return <Typography ref={ref} variant={variant} {...props} />
  }
)
Heading.displayName = 'Heading'

export const Text = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'> & { size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' }>(
  ({ size = 'base', ...props }, ref) => {
    const variant = size === 'base' ? 'body' : `body-${size}` as TypographyVariant
    return <Typography ref={ref} variant={variant} {...props} />
  }
)
Text.displayName = 'Text'

export const Label = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => {
    return <Typography ref={ref} variant="label" {...props} />
  }
)
Label.displayName = 'Label'

export const Caption = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => {
    return <Typography ref={ref} variant="caption" {...props} />
  }
)
Caption.displayName = 'Caption'