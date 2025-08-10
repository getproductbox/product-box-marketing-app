import { forwardRef, useState } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface EnhancedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'electric'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  glowEffect?: boolean
  rippleEffect?: boolean
}

export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      glowEffect = true,
      rippleEffect = true,
      className,
      children,
      onMouseDown,
      disabled,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; size: number; id: number }>>([])

    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (rippleEffect && !disabled && !isLoading) {
        const button = event.currentTarget
        const rect = button.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = event.clientX - rect.left - size / 2
        const y = event.clientY - rect.top - size / 2
        
        const newRipple = {
          x,
          y,
          size,
          id: Date.now()
        }
        
        setRipples(prev => [...prev, newRipple])
        
        setTimeout(() => {
          setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
        }, 600)
      }
      
      onMouseDown?.(event)
    }

    const baseClasses = clsx(
      'relative overflow-hidden inline-flex items-center justify-center',
      'font-medium transition-all duration-200 ease-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pb-black',
      'active:scale-95 transform-gpu',
      'before:absolute before:inset-0 before:rounded-[inherit] before:transition-opacity before:duration-200',
      {
        'w-full': fullWidth,
        'pointer-events-none opacity-50': disabled || isLoading,
      }
    )

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm rounded-lg h-8 gap-1.5',
      md: 'px-4 py-2.5 text-sm rounded-lg h-10 gap-2',
      lg: 'px-6 py-3 text-base rounded-xl h-12 gap-2',
      xl: 'px-8 py-4 text-lg rounded-xl h-14 gap-3',
    }

    const variantClasses = {
      primary: clsx(
        'bg-gradient-to-r from-pb-accent to-pb-accent/90 text-white',
        'hover:from-pb-accent/90 hover:to-pb-accent',
        'focus:ring-pb-accent/50',
        'shadow-lg shadow-pb-accent/25',
        glowEffect && 'hover:shadow-xl hover:shadow-pb-accent/40',
        'before:bg-gradient-to-r before:from-white/10 before:to-white/5',
        'hover:before:opacity-100 before:opacity-0'
      ),
      secondary: clsx(
        'bg-gradient-to-r from-pb-gray-800 to-pb-gray-700 text-white border border-pb-gray-600',
        'hover:from-pb-gray-700 hover:to-pb-gray-600 hover:border-pb-gray-500',
        'focus:ring-pb-gray-500',
        'shadow-lg shadow-black/25',
        glowEffect && 'hover:shadow-xl hover:shadow-pb-gray-700/40',
        'before:bg-gradient-to-r before:from-white/5 before:to-white/10',
        'hover:before:opacity-100 before:opacity-0'
      ),
      tertiary: clsx(
        'bg-transparent text-pb-accent border border-pb-accent/50',
        'hover:bg-pb-accent hover:text-white hover:border-pb-accent',
        'focus:ring-pb-accent/50',
        glowEffect && 'hover:shadow-lg hover:shadow-pb-accent/30',
        'before:bg-pb-accent before:opacity-0 hover:before:opacity-100'
      ),
      ghost: clsx(
        'bg-transparent text-pb-white/80 hover:text-white hover:bg-white/10',
        'focus:ring-pb-white/30',
        glowEffect && 'hover:shadow-lg hover:shadow-white/20',
        'before:bg-white/10 before:opacity-0 hover:before:opacity-100'
      ),
      danger: clsx(
        'bg-gradient-to-r from-pb-error to-pb-error/90 text-white',
        'hover:from-pb-error/90 hover:to-pb-error',
        'focus:ring-pb-error/50',
        'shadow-lg shadow-pb-error/25',
        glowEffect && 'hover:shadow-xl hover:shadow-pb-error/40',
        'before:bg-gradient-to-r before:from-white/10 before:to-white/5',
        'hover:before:opacity-100 before:opacity-0'
      ),
      electric: clsx(
        'bg-gradient-to-r from-pb-electric to-pb-electric/90 text-pb-black',
        'hover:from-pb-electric/90 hover:to-pb-electric',
        'focus:ring-pb-electric/50',
        'shadow-lg shadow-pb-electric/25',
        glowEffect && 'hover:shadow-xl hover:shadow-pb-electric/40',
        'before:bg-gradient-to-r before:from-white/20 before:to-white/10',
        'hover:before:opacity-100 before:opacity-0'
      ),
    }

    return (
      <button
        ref={ref}
        className={clsx(baseClasses, sizeClasses[size], variantClasses[variant], className)}
        disabled={disabled || isLoading}
        onMouseDown={handleMouseDown}
        {...props}
      >
        {/* Ripple Effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className={clsx(
              'absolute rounded-full animate-ping pointer-events-none',
              variant === 'electric' ? 'bg-pb-black/30' : 'bg-white/40'
            )}
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              animationDuration: '0.6s'
            }}
          />
        ))}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Content */}
        <div className={clsx('flex items-center justify-center gap-inherit', {
          'opacity-0': isLoading
        })}>
          {leftIcon && (
            <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:scale-110">
              {leftIcon}
            </span>
          )}
          
          {children && (
            <span className="truncate">
              {children}
            </span>
          )}
          
          {rightIcon && (
            <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:scale-110">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Shine Effect */}
        <div className={clsx(
          'absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300',
          'bg-gradient-to-r from-transparent via-white/20 to-transparent',
          'translate-x-[-100%] hover:translate-x-[100%] hover:opacity-100',
          'transition-transform duration-700 ease-out'
        )} />
      </button>
    )
  }
)

EnhancedButton.displayName = 'EnhancedButton'