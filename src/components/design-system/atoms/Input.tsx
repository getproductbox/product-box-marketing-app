import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isRequired?: boolean
  variant?: 'default' | 'filled'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    isRequired = false,
    variant = 'default',
    className,
    id,
    ...props
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    const baseInputStyles = [
      'w-full px-4 py-3 text-body-sm text-pb-white',
      'border rounded-lg transition-all duration-200',
      'placeholder:text-pb-gray-400',
      'focus:outline-none focus:ring-2 focus:ring-pb-accent/50',
      'disabled:bg-pb-gray-800 disabled:text-pb-gray-500 disabled:cursor-not-allowed',
    ]

    const variantStyles = {
      default: [
        'bg-transparent border-pb-gray-600',
        'hover:border-pb-gray-500',
        'focus:border-pb-accent',
      ],
      filled: [
        'bg-pb-gray-800 border-pb-gray-700',
        'hover:bg-pb-gray-700 hover:border-pb-gray-600',
        'focus:bg-pb-gray-700 focus:border-pb-accent',
      ],
    }

    const errorStyles = error ? [
      'border-pb-error',
      'focus:border-pb-error focus:ring-pb-error/50',
    ] : []

    const iconStyles = {
      left: leftIcon ? 'pl-11' : '',
      right: rightIcon ? 'pr-11' : '',
    }

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-label text-pb-gray-300 mb-2">
            {label}
            {isRequired && <span className="text-pb-error ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pb-gray-400 w-5 h-5">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              baseInputStyles,
              variantStyles[variant],
              errorStyles,
              iconStyles.left,
              iconStyles.right,
              className
            )}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pb-gray-400 w-5 h-5">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className="mt-2">
            {error ? (
              <p className="text-body-xs text-pb-error">{error}</p>
            ) : helperText ? (
              <p className="text-body-xs text-pb-gray-400">{helperText}</p>
            ) : null}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'