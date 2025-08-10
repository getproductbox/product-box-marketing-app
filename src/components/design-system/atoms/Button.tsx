import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className,
    children,
    disabled,
    ...props
  }, ref) => {
    const baseStyles = [
      'inline-flex items-center justify-center gap-2',
      'font-medium transition-all duration-200 ease-custom',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pb-black',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'relative overflow-hidden',
    ]

    const variantStyles = {
      primary: [
        'bg-pb-accent text-pb-white border border-pb-accent',
        'hover:bg-pb-accent/90 hover:border-pb-accent/90 hover:shadow-glow-accent',
        'focus:ring-pb-accent/50',
        'active:scale-[0.98]',
      ],
      secondary: [
        'bg-pb-electric text-pb-black border border-pb-electric',
        'hover:bg-pb-electric/90 hover:border-pb-electric/90 hover:shadow-glow-electric',
        'focus:ring-pb-electric/50',
        'active:scale-[0.98]',
      ],
      tertiary: [
        'bg-transparent text-pb-white border border-pb-gray-600',
        'hover:bg-pb-gray-800 hover:border-pb-gray-500',
        'focus:ring-pb-gray-500/50',
        'active:scale-[0.98]',
      ],
      ghost: [
        'bg-transparent text-pb-gray-300 border border-transparent',
        'hover:bg-pb-gray-800 hover:text-pb-white',
        'focus:ring-pb-gray-500/50',
        'active:scale-[0.98]',
      ],
      danger: [
        'bg-pb-error text-pb-white border border-pb-error',
        'hover:bg-pb-error/90 hover:border-pb-error/90',
        'focus:ring-pb-error/50',
        'active:scale-[0.98]',
      ],
    }

    const sizeStyles = {
      sm: ['px-3 py-1.5 text-body-xs rounded-md', leftIcon || rightIcon ? 'gap-1.5' : ''],
      md: ['px-4 py-2.5 text-body-sm rounded-lg', leftIcon || rightIcon ? 'gap-2' : ''],
      lg: ['px-6 py-3 text-body rounded-lg', leftIcon || rightIcon ? 'gap-2' : ''],
      xl: ['px-8 py-4 text-body-lg rounded-xl', leftIcon || rightIcon ? 'gap-3' : ''],
    }

    const iconSize = {
      sm: 'w-4 h-4',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
      xl: 'w-6 h-6',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className={clsx('animate-spin rounded-full border-2 border-current border-t-transparent', iconSize[size])} />
        ) : (
          <>
            {leftIcon && <span className={iconSize[size]}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={iconSize[size]}>{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'