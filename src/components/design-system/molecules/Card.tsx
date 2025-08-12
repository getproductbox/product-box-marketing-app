import { forwardRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled'
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none'
  borderRadius?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  hover?: boolean
  interactive?: boolean
  header?: ReactNode
  footer?: ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'default',
    padding = 'md',
    borderRadius = 'lg',
    hover = false,
    interactive = false,
    header,
    footer,
    className,
    children,
    ...props
  }, ref) => {
    const baseStyles = [
      'transition-all duration-200 ease-custom',
      'overflow-hidden',
    ]

    const variantStyles = {
      default: [
        'bg-pb-gray-800/50 border border-pb-gray-700',
        'backdrop-blur-sm',
      ],
      elevated: [
        'bg-pb-gray-800/80 border border-pb-gray-600',
        'shadow-medium backdrop-blur-sm',
      ],
      outlined: [
        'bg-transparent border-2 border-pb-gray-600',
      ],
      filled: [
        'bg-pb-gray-800 border border-pb-gray-700',
      ],
    }

    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    }

    const borderRadiusStyles = {
      sm: 'rounded-md',
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
      '2xl': 'rounded-3xl',
    }

    const hoverStyles = hover ? [
      'hover:shadow-hard hover:border-pb-gray-500',
      'hover:-translate-y-1 hover:scale-[1.02]',
    ] : []

    const interactiveStyles = interactive ? [
      'cursor-pointer focus:outline-none focus:ring-2 focus:ring-pb-accent/50',
      'active:scale-[0.98] active:transition-transform active:duration-100',
    ] : []

    return (
      <div
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          borderRadiusStyles[borderRadius],
          padding !== 'none' && paddingStyles[padding],
          hoverStyles,
          interactiveStyles,
          className
        )}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {header && (
          <div className={clsx(
            'border-b border-pb-gray-700 pb-4 mb-6',
            padding === 'none' && 'px-6 pt-6'
          )}>
            {header}
          </div>
        )}
        
        <div className={padding === 'none' && (header || footer) ? 'px-6' : ''}>
          {children}
        </div>
        
        {footer && (
          <div className={clsx(
            'border-t border-pb-gray-700 pt-4 mt-6',
            padding === 'none' && 'px-6 pb-6'
          )}>
            {footer}
          </div>
        )}
      </div>
    )
  }
)

Card.displayName = 'Card'