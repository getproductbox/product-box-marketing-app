import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { mouseEffects, shouldReduceMotion } from '../lib/animations'

interface FloatingDot {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  direction: number
}

interface BackgroundEffectsProps {
  showMouseGradient?: boolean
  showFloatingDots?: boolean
  dotCount?: number
  className?: string
}

export function BackgroundEffects({
  showMouseGradient = true,
  showFloatingDots = true,
  dotCount = 8,
  className = '',
}: BackgroundEffectsProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseVisible, setIsMouseVisible] = useState(false)
  const [floatingDots, setFloatingDots] = useState<FloatingDot[]>([])
  const animationRef = useRef<number>(0)

  // Initialize floating dots
  useEffect(() => {
    if (!showFloatingDots || shouldReduceMotion()) return

    const dots: FloatingDot[] = Array.from({ length: dotCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1, // 1-4px
      opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4
      speed: Math.random() * 0.5 + 0.2, // 0.2-0.7
      direction: Math.random() * Math.PI * 2,
    }))
    
    setFloatingDots(dots)
  }, [showFloatingDots, dotCount])

  // Mouse tracking for gradient
  useEffect(() => {
    if (!showMouseGradient || shouldReduceMotion()) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsMouseVisible(true)
    }

    const handleMouseEnter = () => setIsMouseVisible(true)
    const handleMouseLeave = () => setIsMouseVisible(false)

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [showMouseGradient])

  // Animate floating dots
  useEffect(() => {
    if (!showFloatingDots || shouldReduceMotion() || floatingDots.length === 0) return

    const animateDots = () => {
      setFloatingDots(prevDots => 
        prevDots.map(dot => {
          let newX = dot.x + Math.cos(dot.direction) * dot.speed
          let newY = dot.y + Math.sin(dot.direction) * dot.speed

          // Bounce off edges
          if (newX < 0 || newX > window.innerWidth) {
            dot.direction = Math.PI - dot.direction
            newX = Math.max(0, Math.min(window.innerWidth, newX))
          }
          if (newY < 0 || newY > window.innerHeight) {
            dot.direction = -dot.direction
            newY = Math.max(0, Math.min(window.innerHeight, newY))
          }

          return {
            ...dot,
            x: newX,
            y: newY,
          }
        })
      )

      animationRef.current = requestAnimationFrame(animateDots)
    }

    animationRef.current = requestAnimationFrame(animateDots)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [showFloatingDots, floatingDots.length])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setFloatingDots(prevDots =>
        prevDots.map(dot => ({
          ...dot,
          x: Math.min(dot.x, window.innerWidth),
          y: Math.min(dot.y, window.innerHeight),
        }))
      )
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {/* Mouse-following gradient */}
      {showMouseGradient && !shouldReduceMotion() && (
        <motion.div
          className="absolute rounded-full bg-gradient-radial from-pb-accent/5 via-pb-electric/3 to-transparent"
          style={{
            width: mouseEffects.cursorGradient.size.width,
            height: mouseEffects.cursorGradient.size.height,
            left: mousePosition.x - mouseEffects.cursorGradient.size.width / 2,
            top: mousePosition.y - mouseEffects.cursorGradient.size.height / 2,
            filter: 'blur(60px)',
          }}
          animate={{
            opacity: isMouseVisible ? mouseEffects.cursorGradient.opacity : 0,
            scale: isMouseVisible ? 1 : 0.8,
          }}
          transition={{
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
          }}
        />
      )}

      {/* Floating dots */}
      {showFloatingDots && !shouldReduceMotion() && floatingDots.map(dot => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-pb-white"
          style={{
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
          }}
          animate={{
            opacity: [dot.opacity, dot.opacity * 0.5, dot.opacity],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pb-black/20 via-transparent to-pb-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-pb-black/10 via-transparent to-pb-black/10" />
    </div>
  )
}