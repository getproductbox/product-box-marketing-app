import { forwardRef, useEffect, useRef, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface AnimatedGradientBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'hero' | 'section' | 'subtle'
  interactive?: boolean
  speed?: 'slow' | 'normal' | 'fast'
  intensity?: 'low' | 'medium' | 'high'
}

export const AnimatedGradientBackground = forwardRef<HTMLDivElement, AnimatedGradientBackgroundProps>(
  ({
    variant = 'section',
    interactive = true,
    speed = 'normal',
    intensity = 'medium',
    className,
    children,
    ...props
  }, ref) => {
    const interactiveRef = useRef<HTMLDivElement>(null)
    const curXRef = useRef(0)
    const curYRef = useRef(0)
    const tgXRef = useRef(0)
    const tgYRef = useRef(0)
    const animationFrameRef = useRef<number | null>(null)
    const [isSafari, setIsSafari] = useState(false)

    // Detect Safari browser
    useEffect(() => {
      setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
    }, [])

    // Set up CSS variables for our brand colors
    useEffect(() => {
      const root = document.documentElement
      
      // Brand color variants in RGB format for CSS variables
      const colors = {
        hero: {
          first: '255, 107, 53',      // pb-accent (orange)
          second: '0, 217, 255',      // pb-electric (cyan)
          third: '255, 184, 0',       // pb-warning (yellow)
          fourth: '0, 217, 108',      // pb-success (green)
          fifth: '255, 107, 53',      // pb-accent again
          pointer: '0, 217, 255',     // pb-electric
        },
        section: {
          first: '255, 107, 53',      // pb-accent
          second: '0, 217, 255',      // pb-electric
          third: '102, 102, 102',     // pb-gray-500
          fourth: '51, 51, 51',       // pb-gray-600
          fifth: '255, 107, 53',      // pb-accent
          pointer: '0, 217, 255',     // pb-electric
        },
        subtle: {
          first: '51, 51, 51',        // pb-gray-600
          second: '26, 26, 26',       // pb-gray-700
          third: '13, 13, 13',        // pb-gray-800
          fourth: '245, 245, 245',    // pb-gray-100
          fifth: '102, 102, 102',     // pb-gray-500
          pointer: '255, 107, 53',    // pb-accent
        }
      }

      const colorSet = colors[variant]
      const sizeMap = { hero: '120%', section: '80%', subtle: '60%' }
      const opacityMap = { low: '0.3', medium: '0.6', high: '0.8' }

      root.style.setProperty('--bg-gradient-first', colorSet.first)
      root.style.setProperty('--bg-gradient-second', colorSet.second)
      root.style.setProperty('--bg-gradient-third', colorSet.third)
      root.style.setProperty('--bg-gradient-fourth', colorSet.fourth)
      root.style.setProperty('--bg-gradient-fifth', colorSet.fifth)
      root.style.setProperty('--bg-gradient-pointer', colorSet.pointer)
      root.style.setProperty('--bg-gradient-size', sizeMap[variant])
      root.style.setProperty('--bg-gradient-opacity', opacityMap[intensity])
      root.style.setProperty('--bg-gradient-blend', 'multiply')

      return () => {
        // Clean up CSS variables
        root.style.removeProperty('--bg-gradient-first')
        root.style.removeProperty('--bg-gradient-second')
        root.style.removeProperty('--bg-gradient-third')
        root.style.removeProperty('--bg-gradient-fourth')
        root.style.removeProperty('--bg-gradient-fifth')
        root.style.removeProperty('--bg-gradient-pointer')
        root.style.removeProperty('--bg-gradient-size')
        root.style.removeProperty('--bg-gradient-opacity')
        root.style.removeProperty('--bg-gradient-blend')
      }
    }, [variant, intensity])

    // Interactive mouse movement animation
    useEffect(() => {
      if (!interactive) return

      function animateMovement() {
        if (!interactiveRef.current) {
          animationFrameRef.current = requestAnimationFrame(animateMovement)
          return
        }

        const easingFactor = speed === 'fast' ? 15 : speed === 'slow' ? 35 : 25
        curXRef.current += (tgXRef.current - curXRef.current) / easingFactor
        curYRef.current += (tgYRef.current - curYRef.current) / easingFactor

        interactiveRef.current.style.transform = `translate(${Math.round(curXRef.current)}px, ${Math.round(curYRef.current)}px)`

        animationFrameRef.current = requestAnimationFrame(animateMovement)
      }

      animationFrameRef.current = requestAnimationFrame(animateMovement)

      return () => {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }, [interactive, speed])

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!interactiveRef.current) return

      const rect = interactiveRef.current.getBoundingClientRect()
      tgXRef.current = event.clientX - rect.left
      tgYRef.current = event.clientY - rect.top
    }

    const speedClass = {
      slow: 'duration-[8s]',
      normal: 'duration-[5s]',
      fast: 'duration-[3s]'
    }

    return (
      <div
        ref={ref}
        className={clsx(
          'absolute inset-0 overflow-hidden',
          variant === 'hero' && 'bg-gradient-to-br from-pb-black via-pb-gray-900 to-pb-black',
          variant === 'section' && 'bg-gradient-to-br from-pb-gray-900/50 to-pb-black/50',
          variant === 'subtle' && 'bg-gradient-to-br from-pb-gray-800/30 to-pb-gray-900/30',
          className
        )}
        onMouseMove={interactive ? handleMouseMove : undefined}
        {...props}
      >
        {/* SVG Filter for Advanced Blending */}
        <svg className="absolute -z-10 opacity-0">
          <defs>
            <filter id="pb-gradient-blur">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="12"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        {/* Gradient Container */}
        <div
          className={clsx(
            'absolute inset-0 opacity-60',
            isSafari ? 'blur-2xl' : '[filter:url(#pb-gradient-blur)_blur(20px)]'
          )}
        >
          {/* Primary Gradient Orb */}
          <div
            className={clsx(
              'absolute w-[var(--bg-gradient-size)] h-[var(--bg-gradient-size)]',
              'top-[calc(50%-var(--bg-gradient-size)/2)] left-[calc(50%-var(--bg-gradient-size)/2)]',
              '[background:radial-gradient(circle_at_center,rgba(var(--bg-gradient-first),var(--bg-gradient-opacity))_0%,rgba(var(--bg-gradient-first),0)_50%)]',
              '[mix-blend-mode:var(--bg-gradient-blend)]',
              'animate-float',
              speedClass[speed]
            )}
          />

          {/* Secondary Gradient Orb */}
          <div
            className={clsx(
              'absolute w-[var(--bg-gradient-size)] h-[var(--bg-gradient-size)]',
              'top-[calc(50%-var(--bg-gradient-size)/2)] left-[calc(50%-var(--bg-gradient-size)/2)]',
              '[background:radial-gradient(circle_at_center,rgba(var(--bg-gradient-second),calc(var(--bg-gradient-opacity)*0.8))_0%,rgba(var(--bg-gradient-second),0)_50%)]',
              '[mix-blend-mode:var(--bg-gradient-blend)]',
              '[transform-origin:calc(50%-300px)]',
              'animate-pulse-soft',
              speedClass[speed]
            )}
          />

          {/* Tertiary Gradient Orb */}
          <div
            className={clsx(
              'absolute w-[calc(var(--bg-gradient-size)*0.8)] h-[calc(var(--bg-gradient-size)*0.8)]',
              'top-[calc(50%-var(--bg-gradient-size)*0.4)] left-[calc(50%-var(--bg-gradient-size)*0.4)]',
              '[background:radial-gradient(circle_at_center,rgba(var(--bg-gradient-third),calc(var(--bg-gradient-opacity)*0.6))_0%,rgba(var(--bg-gradient-third),0)_50%)]',
              '[mix-blend-mode:var(--bg-gradient-blend)]',
              '[transform-origin:calc(50%+300px)]',
              'animate-bounce-gentle',
              speedClass[speed]
            )}
          />

          {/* Quaternary Accent */}
          <div
            className={clsx(
              'absolute w-[calc(var(--bg-gradient-size)*0.6)] h-[calc(var(--bg-gradient-size)*0.6)]',
              'top-[calc(50%-var(--bg-gradient-size)*0.3)] left-[calc(50%-var(--bg-gradient-size)*0.3)]',
              '[background:radial-gradient(circle_at_center,rgba(var(--bg-gradient-fourth),calc(var(--bg-gradient-opacity)*0.4))_0%,rgba(var(--bg-gradient-fourth),0)_50%)]',
              '[mix-blend-mode:var(--bg-gradient-blend)]',
              '[transform-origin:calc(50%-200px)]',
              'animate-float',
              speedClass[speed],
              'animation-delay-1000'
            )}
          />

          {/* Interactive Pointer Gradient */}
          {interactive && (
            <div
              ref={interactiveRef}
              className={clsx(
                'absolute w-full h-full -top-1/2 -left-1/2',
                '[background:radial-gradient(circle_at_center,rgba(var(--bg-gradient-pointer),calc(var(--bg-gradient-opacity)*0.7))_0%,rgba(var(--bg-gradient-pointer),0)_50%)]',
                '[mix-blend-mode:var(--bg-gradient-blend)]',
                'opacity-50 transition-opacity duration-300 hover:opacity-70'
              )}
            />
          )}
        </div>

        {/* Content Layer */}
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      </div>
    )
  }
)

AnimatedGradientBackground.displayName = 'AnimatedGradientBackground'