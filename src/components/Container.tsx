import type { ReactNode, HTMLAttributes } from 'react'

export type ContainerSize = 'wide' | 'default' | 'narrow'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize
  children: ReactNode
  className?: string
}

/**
 * Reusable container component with standardized max-width variants.
 *
 * Size variants:
 * - wide: max-w-6xl - For heroes, showcases, and visual sections
 * - default: max-w-4xl - For standard content sections
 * - narrow: max-w-2xl - For reading content and forms
 *
 * Includes responsive horizontal padding (px-6 lg:px-8) and auto centering (mx-auto).
 *
 * @example
 * <Container size="wide">
 *   <h1>Hero Section</h1>
 * </Container>
 *
 * @example
 * <Container size="narrow" className="mt-8">
 *   <p>Long-form reading content...</p>
 * </Container>
 */
export function Container({
  size = 'default',
  children,
  className = '',
  ...rest
}: ContainerProps) {
  // Map size to Tailwind max-width classes
  const sizeClasses: Record<ContainerSize, string> = {
    wide: 'max-w-6xl',
    default: 'max-w-4xl',
    narrow: 'max-w-2xl',
  }

  // Combine base classes with size-specific and custom classes
  const classes = [
    sizeClasses[size],
    'mx-auto',
    'px-6',
    'lg:px-8',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
