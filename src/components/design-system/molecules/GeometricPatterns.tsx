import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface GeometricPatternsProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'grid' | 'dots' | 'hexagons' | 'triangles' | 'circles' | 'lines'
  intensity?: 'low' | 'medium' | 'high'
  color?: 'accent' | 'electric' | 'white' | 'gray'
  animated?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const GeometricPatterns = forwardRef<HTMLDivElement, GeometricPatternsProps>(
  (
    {
      variant = 'dots',
      intensity = 'medium',
      color = 'accent',
      animated = false,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const intensityOpacity = {
      low: 'opacity-20',
      medium: 'opacity-40',
      high: 'opacity-60',
    }

    const colorClasses = {
      accent: 'text-pb-accent',
      electric: 'text-pb-electric',
      white: 'text-white',
      gray: 'text-pb-gray-500',
    }

    const sizeScale = {
      sm: 0.8,
      md: 1,
      lg: 1.5,
    }

    const baseClasses = clsx(
      'absolute inset-0 pointer-events-none select-none',
      intensityOpacity[intensity],
      colorClasses[color],
      animated && 'animate-pulse',
      className
    )

    const scale = sizeScale[size]

    const renderGrid = () => (
      <div className={baseClasses} ref={ref} {...props}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="grid-pattern"
              x="0"
              y="0"
              width={4 * scale}
              height={4 * scale}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${4 * scale} 0 L 0 0 0 ${4 * scale}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
    )

    const renderDots = () => (
      <div className={baseClasses} ref={ref} {...props}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="dots-pattern"
              x="0"
              y="0"
              width={8 * scale}
              height={8 * scale}
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx={4 * scale}
                cy={4 * scale}
                r={0.8 * scale}
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-pattern)" />
        </svg>
      </div>
    )

    const renderHexagons = () => (
      <div className={baseClasses} ref={ref} {...props}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="hexagons-pattern"
              x="0"
              y="0"
              width={12 * scale}
              height={10.39 * scale}
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points={`${6 * scale},${1 * scale} ${10.39 * scale},${3.5 * scale} ${10.39 * scale},${8.5 * scale} ${6 * scale},${11 * scale} ${1.61 * scale},${8.5 * scale} ${1.61 * scale},${3.5 * scale}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons-pattern)" />
        </svg>
      </div>
    )

    const renderTriangles = () => (
      <div className={baseClasses} ref={ref} {...props}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="triangles-pattern"
              x="0"
              y="0"
              width={8 * scale}
              height={8 * scale}
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points={`${4 * scale},${1 * scale} ${7 * scale},${7 * scale} ${1 * scale},${7 * scale}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#triangles-pattern)" />
        </svg>
      </div>
    )

    const renderCircles = () => (
      <div className={baseClasses} ref={ref} {...props}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="circles-pattern"
              x="0"
              y="0"
              width={10 * scale}
              height={10 * scale}
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx={5 * scale}
                cy={5 * scale}
                r={3 * scale}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circles-pattern)" />
        </svg>
      </div>
    )

    const renderLines = () => (
      <div className={baseClasses} ref={ref} {...props}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="lines-pattern"
              x="0"
              y="0"
              width={6 * scale}
              height={6 * scale}
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1={3 * scale}
                x2={6 * scale}
                y2={3 * scale}
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <line
                x1={3 * scale}
                y1="0"
                x2={3 * scale}
                y2={6 * scale}
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lines-pattern)" />
        </svg>
      </div>
    )

    const renderPattern = () => {
      switch (variant) {
        case 'grid':
          return renderGrid()
        case 'dots':
          return renderDots()
        case 'hexagons':
          return renderHexagons()
        case 'triangles':
          return renderTriangles()
        case 'circles':
          return renderCircles()
        case 'lines':
          return renderLines()
        default:
          return renderDots()
      }
    }

    return renderPattern()
  }
)

GeometricPatterns.displayName = 'GeometricPatterns'

// Additional decorative geometric elements
export interface DecorativeShapesProps extends HTMLAttributes<HTMLDivElement> {
  shapes?: Array<{
    type: 'circle' | 'square' | 'triangle' | 'hexagon'
    size: number
    x: number
    y: number
    color?: 'accent' | 'electric' | 'white' | 'gray'
    opacity?: number
    animated?: boolean
  }>
  className?: string
}

export const DecorativeShapes = forwardRef<HTMLDivElement, DecorativeShapesProps>(
  ({ shapes = [], className, ...props }, ref) => {
    const colorMap = {
      accent: '#FF6B35',
      electric: '#00D9FF',
      white: '#FFFFFF',
      gray: '#6B7280',
    }

    return (
      <div
        ref={ref}
        className={clsx('absolute inset-0 pointer-events-none select-none overflow-hidden', className)}
        {...props}
      >
        <svg width="100%" height="100%" className="w-full h-full">
          {shapes.map((shape, index) => {
            const color = colorMap[shape.color || 'accent']
            const opacity = shape.opacity || 0.3
            const animationClass = shape.animated ? 'animate-float' : ''

            switch (shape.type) {
              case 'circle':
                return (
                  <circle
                    key={index}
                    cx={`${shape.x}%`}
                    cy={`${shape.y}%`}
                    r={shape.size}
                    fill={color}
                    opacity={opacity}
                    className={animationClass}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                    }}
                  />
                )
              case 'square':
                return (
                  <rect
                    key={index}
                    x={`${shape.x}%`}
                    y={`${shape.y}%`}
                    width={shape.size * 2}
                    height={shape.size * 2}
                    fill={color}
                    opacity={opacity}
                    className={animationClass}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                    }}
                    transform={`translate(-${shape.size}, -${shape.size})`}
                  />
                )
              case 'triangle':
                return (
                  <polygon
                    key={index}
                    points={`${shape.x}%,${shape.y - shape.size}% ${shape.x + shape.size}%,${shape.y + shape.size}% ${shape.x - shape.size}%,${shape.y + shape.size}%`}
                    fill={color}
                    opacity={opacity}
                    className={animationClass}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                    }}
                  />
                )
              case 'hexagon': {
                const hexPoints = Array.from({ length: 6 }, (_, i) => {
                  const angle = (i * Math.PI) / 3
                  const x = shape.x + shape.size * Math.cos(angle)
                  const y = shape.y + shape.size * Math.sin(angle)
                  return `${x}%,${y}%`
                }).join(' ')
                
                return (
                  <polygon
                    key={index}
                    points={hexPoints}
                    fill={color}
                    opacity={opacity}
                    className={animationClass}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                    }}
                  />
                )
              }
              default:
                return null
            }
          })}
        </svg>
      </div>
    )
  }
)

DecorativeShapes.displayName = 'DecorativeShapes'