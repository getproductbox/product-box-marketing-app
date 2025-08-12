import React from 'react'

export interface TestimonialCardProps {
  quote: string
  client: string
  company: string
  role?: string
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  client,
  company,
  role,
  variant = 'default',
  className = ''
}) => {
  const baseClasses = "bg-pb-gray-900/50 backdrop-blur-sm border border-pb-gray-800 rounded-lg p-6 relative"
  
  const variantClasses = {
    default: "hover:border-pb-gray-700 transition-all duration-300",
    compact: "p-4 text-sm",
    featured: "border-pb-accent/30 bg-gradient-to-br from-pb-gray-900/70 to-pb-gray-800/50 shadow-lg hover:shadow-pb-accent/10 hover:border-pb-accent/50 transition-all duration-300"
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {/* Quote mark */}
      <div className="absolute -top-2 -left-2 w-6 h-6 bg-pb-accent rounded-full flex items-center justify-center">
        <svg className="w-3 h-3 text-pb-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
        </svg>
      </div>

      <blockquote className={`text-pb-gray-200 ${variant === 'compact' ? 'text-sm' : 'text-base'} leading-relaxed mb-4`}>
        "{quote}"
      </blockquote>

      <footer className="flex items-center justify-between">
        <div>
          <div className={`font-semibold text-pb-white ${variant === 'compact' ? 'text-sm' : ''}`}>
            {client}
          </div>
          {role && (
            <div className={`text-pb-gray-400 ${variant === 'compact' ? 'text-xs' : 'text-sm'}`}>
              {role}
            </div>
          )}
          <div className={`font-medium text-pb-accent ${variant === 'compact' ? 'text-xs' : 'text-sm'}`}>
            {company}
          </div>
        </div>
      </footer>
    </div>
  )
}