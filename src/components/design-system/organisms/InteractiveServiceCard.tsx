import React, { useState } from 'react'
import { ChevronRight, Eye, TrendingUp, Zap } from 'lucide-react'

export interface InteractiveServiceCardProps {
  title: string
  phase: string
  description: string
  features: string[]
  icon?: 'eye' | 'trending-up' | 'zap'
  index: number
  className?: string
}

const iconMap = {
  'eye': Eye,
  'trending-up': TrendingUp,
  'zap': Zap
}

export const InteractiveServiceCard: React.FC<InteractiveServiceCardProps> = ({
  title,
  phase,
  description,
  features,
  icon = 'eye',
  index,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const IconComponent = iconMap[icon]

  const colorClasses = {
    0: {
      accent: 'text-pb-accent',
      accentBg: 'bg-pb-accent',
      gradient: 'from-pb-accent/20 to-pb-accent/5',
      border: 'border-pb-accent/30',
      glow: 'shadow-pb-accent/20'
    },
    1: {
      accent: 'text-pb-electric',
      accentBg: 'bg-pb-electric',
      gradient: 'from-pb-electric/20 to-pb-electric/5',
      border: 'border-pb-electric/30',
      glow: 'shadow-pb-electric/20'
    },
    2: {
      accent: 'text-pb-white',
      accentBg: 'bg-pb-white',
      gradient: 'from-pb-white/20 to-pb-white/5',
      border: 'border-pb-white/30',
      glow: 'shadow-pb-white/20'
    }
  }

  const colors = colorClasses[index as keyof typeof colorClasses] || colorClasses[0]

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pb-gray-900/80 to-pb-gray-800/60
        border border-pb-gray-700 hover:${colors.border}
        transition-all duration-500 ease-out
        hover:shadow-xl hover:${colors.glow}
        hover:-translate-y-2 hover:scale-[1.02]
        cursor-pointer
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient Effect */}
      <div 
        className={`
          absolute inset-0 bg-gradient-to-br ${colors.gradient}
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
        `} 
      />

      {/* Card Content */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className={`
            w-14 h-14 rounded-xl ${colors.accentBg} bg-opacity-20
            flex items-center justify-center
            transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-30
          `}>
            <IconComponent className={`w-7 h-7 ${colors.accent}`} />
          </div>
          
          <div className="text-right">
            <div className={`text-sm font-medium ${colors.accent} tracking-wide`}>
              PHASE {index + 1}
            </div>
            <div className="text-xs text-pb-gray-400 uppercase tracking-wider">
              {phase}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-pb-white mb-4 group-hover:text-pb-white transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-pb-gray-300 leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* Features - Revealed on Hover */}
        <div className={`
          transition-all duration-500 ease-out
          ${isHovered 
            ? 'opacity-100 max-h-48 translate-y-0' 
            : 'opacity-0 max-h-0 translate-y-4 overflow-hidden'
          }
        `}>
          <div className="space-y-3 mb-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`
                  flex items-center space-x-3 text-pb-gray-200
                  transform transition-all duration-300
                  ${isHovered ? 'translate-x-0' : 'translate-x-4'}
                `}
                style={{ 
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                <div className={`w-2 h-2 rounded-full ${colors.accentBg} flex-shrink-0`} />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className={`
          transition-all duration-300
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}>
          <button className={`
            w-full flex items-center justify-center space-x-2
            py-3 px-4 rounded-lg
            bg-gradient-to-r ${colors.gradient}
            border ${colors.border}
            text-pb-white font-medium
            hover:scale-105 active:scale-95
            transition-all duration-200
            group/btn
          `}>
            <span>Learn More</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </button>
        </div>

        {/* Floating Number */}
        <div className={`
          absolute top-4 right-4 w-8 h-8 rounded-full
          ${colors.accentBg} bg-opacity-20 backdrop-blur-sm
          flex items-center justify-center
          text-sm font-bold ${colors.accent}
          transition-all duration-300
          ${isHovered ? 'scale-110 bg-opacity-40' : ''}
        `}>
          {index + 1}
        </div>
      </div>

      {/* Animated Border */}
      <div 
        className={`
          absolute inset-0 rounded-2xl
          border-2 ${colors.border} opacity-0
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : ''}
        `}
      />
    </div>
  )
}