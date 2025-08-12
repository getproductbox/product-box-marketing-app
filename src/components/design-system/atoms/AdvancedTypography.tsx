import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface AdvancedTypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: 'hero-xl' | 'hero-gradient' | 'section-title' | 'featured-text' | 'eyebrow' | 'quote' | 'stat' | 'caption-detailed'
  gradient?: boolean
  animate?: boolean
  highlight?: string[]
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  spacing?: 'tight' | 'normal' | 'relaxed' | 'loose'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'blockquote'
}

export const AdvancedTypography = forwardRef<HTMLDivElement, AdvancedTypographyProps>(
  (
    {
      variant = 'section-title',
      gradient = false,
      animate = false,
      highlight = [],
      maxWidth = 'none',
      spacing = 'normal',
      as: Component = 'p',
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Process text to highlight specific words
    const processText = (text: string) => {
      if (highlight.length === 0) return text
      
      let processedText = text
      highlight.forEach((word, index) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi')
        processedText = processedText.replace(
          regex,
          `<mark class="highlight-${index}">${word}</mark>`
        )
      })
      return processedText
    }

    const baseClasses = clsx(
      'transition-all duration-500 ease-out',
      {
        'animate-fade-in-up': animate,
      }
    )

    const variantClasses = {
      'hero-xl': clsx(
        'text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight',
        'bg-clip-text text-transparent bg-gradient-to-r from-white via-pb-gray-100 to-white',
        gradient && 'from-pb-accent via-pb-electric to-pb-accent'
      ),
      'hero-gradient': clsx(
        'text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight',
        'bg-clip-text text-transparent bg-gradient-to-r from-pb-accent via-pb-electric to-pb-accent',
        'drop-shadow-lg'
      ),
      'section-title': clsx(
        'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight',
        'text-white relative',
        'after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:bg-gradient-to-r after:from-pb-accent after:to-pb-electric after:rounded-full'
      ),
      'featured-text': clsx(
        'text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed',
        'text-pb-gray-100 relative',
        'pl-6 border-l-4 border-pb-accent/50'
      ),
      'eyebrow': clsx(
        'text-xs md:text-sm uppercase font-bold tracking-widest',
        'text-pb-accent mb-2',
        'relative inline-block',
        'after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-gradient-to-r after:from-pb-accent after:to-transparent'
      ),
      'quote': clsx(
        'text-lg md:text-xl lg:text-2xl font-medium leading-relaxed italic',
        'text-pb-gray-200 relative',
        'pl-8 before:absolute before:left-0 before:top-0 before:content-["""] before:text-4xl before:text-pb-accent before:font-serif before:-mt-2'
      ),
      'stat': clsx(
        'text-4xl md:text-5xl lg:text-6xl font-black leading-none',
        'bg-clip-text text-transparent bg-gradient-to-r from-pb-electric to-pb-accent',
        'drop-shadow-lg'
      ),
      'caption-detailed': clsx(
        'text-sm md:text-base leading-relaxed',
        'text-pb-gray-400',
        'border-t border-pb-gray-800 pt-4 mt-4'
      ),
    }

    const maxWidthClasses = {
      none: '',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
    }

    const spacingClasses = {
      tight: 'leading-tight',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    }

    const combinedClassName = clsx(
      baseClasses,
      variantClasses[variant],
      maxWidthClasses[maxWidth],
      spacingClasses[spacing],
      className
    )

    // Handle text highlighting
    if (typeof children === 'string' && highlight.length > 0) {
      return (
        <Component
          ref={ref as any} // eslint-disable-line @typescript-eslint/no-explicit-any
          className={combinedClassName}
          dangerouslySetInnerHTML={{ __html: processText(children) }}
          {...props}
        />
      )
    }

    return (
      <Component
        ref={ref as any} // eslint-disable-line @typescript-eslint/no-explicit-any
        className={combinedClassName}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

AdvancedTypography.displayName = 'AdvancedTypography'

// Specialized typography components
export interface TextBlockProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  eyebrow?: string
  body?: string
  cta?: React.ReactNode
  alignment?: 'left' | 'center' | 'right'
  spacing?: 'tight' | 'normal' | 'relaxed'
}

export const TextBlock = forwardRef<HTMLDivElement, TextBlockProps>(
  (
    {
      title,
      subtitle,
      eyebrow,
      body,
      cta,
      alignment = 'left',
      spacing = 'normal',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const alignmentClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }

    const spacingClasses = {
      tight: 'space-y-2',
      normal: 'space-y-4',
      relaxed: 'space-y-6',
    }

    return (
      <div
        ref={ref}
        className={clsx(
          spacingClasses[spacing],
          alignmentClasses[alignment],
          className
        )}
        {...props}
      >
        {eyebrow && (
          <AdvancedTypography variant="eyebrow" as="span">
            {eyebrow}
          </AdvancedTypography>
        )}
        
        {title && (
          <AdvancedTypography variant="section-title" as="h2">
            {title}
          </AdvancedTypography>
        )}
        
        {subtitle && (
          <AdvancedTypography variant="featured-text" as="p">
            {subtitle}
          </AdvancedTypography>
        )}
        
        {body && (
          <p className="text-pb-gray-300 text-lg leading-relaxed">
            {body}
          </p>
        )}
        
        {children}
        
        {cta && (
          <div className="pt-2">
            {cta}
          </div>
        )}
      </div>
    )
  }
)

TextBlock.displayName = 'TextBlock'

// Quote component with attribution
export interface QuoteBlockProps extends HTMLAttributes<HTMLQuoteElement> {
  quote: string
  author?: string
  role?: string
  company?: string
  avatar?: string
  size?: 'sm' | 'md' | 'lg'
}

export const QuoteBlock = forwardRef<HTMLQuoteElement, QuoteBlockProps>(
  (
    {
      quote,
      author,
      role,
      company,
      avatar,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'text-lg',
      md: 'text-xl md:text-2xl',
      lg: 'text-2xl md:text-3xl lg:text-4xl',
    }

    return (
      <blockquote
        ref={ref}
        className={clsx(
          'relative p-6 md:p-8 bg-gradient-to-br from-pb-gray-900/50 to-pb-gray-800/30',
          'border border-pb-gray-700 rounded-2xl backdrop-blur-sm',
          'before:absolute before:top-4 before:left-6 before:content-["""] before:text-6xl before:text-pb-accent/30 before:font-serif before:leading-none',
          className
        )}
        {...props}
      >
        <div className="relative z-10 space-y-6">
          <p className={clsx(
            sizeClasses[size],
            'font-medium leading-relaxed text-white italic pl-8'
          )}>
            {quote}
          </p>
          
          {(author || role || company) && (
            <div className="flex items-center gap-4 pt-4 border-t border-pb-gray-700">
              {avatar && (
                <img
                  src={avatar}
                  alt={author || 'Quote author'}
                  className="w-12 h-12 rounded-full object-cover border-2 border-pb-accent/20"
                />
              )}
              <div>
                {author && (
                  <div className="font-semibold text-white">{author}</div>
                )}
                {(role || company) && (
                  <div className="text-pb-gray-400 text-sm">
                    {role}{role && company && ', '}{company}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </blockquote>
    )
  }
)

QuoteBlock.displayName = 'QuoteBlock'

// Statistics display component
export interface StatBlockProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
  description?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

export const StatBlock = forwardRef<HTMLDivElement, StatBlockProps>(
  (
    {
      value,
      label,
      description,
      trend,
      trendValue,
      className,
      ...props
    },
    ref
  ) => {
    const trendColors = {
      up: 'text-pb-success',
      down: 'text-pb-error',
      neutral: 'text-pb-gray-400',
    }

    const trendIcons = {
      up: '↗',
      down: '↘',
      neutral: '→',
    }

    return (
      <div
        ref={ref}
        className={clsx(
          'text-center p-6 rounded-xl bg-gradient-to-br from-pb-gray-900/80 to-pb-gray-800/50',
          'border border-pb-gray-700 backdrop-blur-sm',
          'hover:from-pb-gray-800/80 hover:to-pb-gray-700/50 transition-all duration-300',
          className
        )}
        {...props}
      >
        <AdvancedTypography variant="stat" as="div" className="mb-2">
          {value}
        </AdvancedTypography>
        
        <div className="text-lg font-semibold text-white mb-1">
          {label}
        </div>
        
        {description && (
          <div className="text-pb-gray-400 text-sm mb-3">
            {description}
          </div>
        )}
        
        {trend && trendValue && (
          <div className={clsx(
            'inline-flex items-center gap-1 text-sm font-medium',
            trendColors[trend]
          )}>
            <span>{trendIcons[trend]}</span>
            {trendValue}
          </div>
        )}
      </div>
    )
  }
)

StatBlock.displayName = 'StatBlock'