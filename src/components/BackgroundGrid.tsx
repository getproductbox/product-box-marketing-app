import { useEffect, useRef, useState } from 'react'
import { shouldReduceMotion } from '../lib/animations'

interface BackgroundGridProps {
  intensity?: number // 0-1, how visible the grid is
  distortion?: number // 0-1, how much mouse distorts the grid
  gridSize?: number // Size of grid cells in pixels
  className?: string
}

export function BackgroundGrid({
  intensity = 0.3,
  distortion = 0.2,
  gridSize = 60,
  className = '',
}: BackgroundGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Track mouse position
  useEffect(() => {
    if (shouldReduceMotion()) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Draw grid
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || shouldReduceMotion()) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Grid styling
      ctx.strokeStyle = `rgba(148, 163, 184, ${intensity * 0.15})` // slate-400 with opacity
      ctx.lineWidth = 0.5
      ctx.lineCap = 'round'

      const cols = Math.ceil(canvas.width / gridSize) + 1
      const rows = Math.ceil(canvas.height / gridSize) + 1

      // Draw vertical lines
      for (let i = 0; i < cols; i++) {
        const x = i * gridSize
        
        ctx.beginPath()
        
        for (let j = 0; j < rows; j++) {
          const y = j * gridSize
          
          // Calculate distortion based on mouse distance
          let distortedX = x
          let distortedY = y
          
          if (distortion > 0) {
            const mouseDistance = Math.sqrt(
              Math.pow(mousePosition.x - x, 2) + Math.pow(mousePosition.y - y, 2)
            )
            
            // Apply distortion only within a certain radius
            const maxDistance = 200
            if (mouseDistance < maxDistance) {
              const distortionStrength = (1 - mouseDistance / maxDistance) * distortion
              const angle = Math.atan2(mousePosition.y - y, mousePosition.x - x)
              
              // Subtle wave effect
              distortedX = x + Math.sin(angle + Date.now() * 0.001) * distortionStrength * 10
              distortedY = y + Math.cos(angle + Date.now() * 0.001) * distortionStrength * 5
            }
          }
          
          if (j === 0) {
            ctx.moveTo(distortedX, distortedY)
          } else {
            ctx.lineTo(distortedX, distortedY)
          }
        }
        
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let j = 0; j < rows; j++) {
        const y = j * gridSize
        
        ctx.beginPath()
        
        for (let i = 0; i < cols; i++) {
          const x = i * gridSize
          
          // Calculate distortion
          let distortedX = x
          let distortedY = y
          
          if (distortion > 0) {
            const mouseDistance = Math.sqrt(
              Math.pow(mousePosition.x - x, 2) + Math.pow(mousePosition.y - y, 2)
            )
            
            const maxDistance = 200
            if (mouseDistance < maxDistance) {
              const distortionStrength = (1 - mouseDistance / maxDistance) * distortion
              const angle = Math.atan2(mousePosition.y - y, mousePosition.x - x)
              
              distortedX = x + Math.sin(angle + Date.now() * 0.001) * distortionStrength * 10
              distortedY = y + Math.cos(angle + Date.now() * 0.001) * distortionStrength * 5
            }
          }
          
          if (i === 0) {
            ctx.moveTo(distortedX, distortedY)
          } else {
            ctx.lineTo(distortedX, distortedY)
          }
        }
        
        ctx.stroke()
      }

      // Add some accent dots at intersections near mouse
      ctx.fillStyle = `rgba(0, 217, 255, ${intensity * 0.4})` // pb-electric
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize
          const y = j * gridSize
          
          const mouseDistance = Math.sqrt(
            Math.pow(mousePosition.x - x, 2) + Math.pow(mousePosition.y - y, 2)
          )
          
          if (mouseDistance < 100) {
            const opacity = (1 - mouseDistance / 100) * intensity
            ctx.globalAlpha = opacity
            
            ctx.beginPath()
            ctx.arc(x, y, 1, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
      
      ctx.globalAlpha = 1

      if (!shouldReduceMotion()) {
        animationRef.current = requestAnimationFrame(drawGrid)
      }
    }

    if (!shouldReduceMotion()) {
      animationRef.current = requestAnimationFrame(drawGrid)
    } else {
      // Static grid for reduced motion
      drawGrid()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, mousePosition, intensity, distortion, gridSize])

  if (shouldReduceMotion()) {
    // Fallback to CSS grid for reduced motion
    return (
      <div 
        className={`fixed inset-0 pointer-events-none z-0 ${className}`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, ${intensity * 0.1}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, ${intensity * 0.1}) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        imageRendering: 'pixelated', // Crisp lines
      }}
    />
  )
}