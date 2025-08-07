import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface NumberCounterProps {
  value: string
  duration?: number
  delay?: number
  className?: string
}

export function NumberCounter({ value, duration = 1500, delay = 0, className = '' }: NumberCounterProps) {
  const [displayValue, setDisplayValue] = useState('£0')
  
  useEffect(() => {
    const timer = setTimeout(() => {
      // Extract numeric value from price string (e.g., "£1k" -> 1, "£10k+" -> 10, "£500/month" -> 500)
      const numMatch = value.match(/£(\d+(?:\.\d+)?)/)
      if (!numMatch) {
        setDisplayValue(value)
        return
      }
      
      const targetNum = parseFloat(numMatch[1])
      const isThousands = value.includes('k')
      const isMonthly = value.includes('/month')
      const hasPlus = value.includes('+')
      
      let currentNum = 0
      const increment = targetNum / (duration / 16) // 60fps
      
      const countUp = () => {
        currentNum += increment
        if (currentNum >= targetNum) {
          currentNum = targetNum
          let finalValue = `£${Math.round(currentNum)}`
          if (isThousands) finalValue += 'k'
          if (hasPlus) finalValue += '+'
          if (isMonthly) finalValue += '/month'
          setDisplayValue(finalValue)
        } else {
          let currentValue = `£${Math.round(currentNum)}`
          if (isThousands) currentValue += 'k'
          if (hasPlus) currentValue += '+'
          if (isMonthly) currentValue += '/month'
          setDisplayValue(currentValue)
          requestAnimationFrame(countUp)
        }
      }
      
      requestAnimationFrame(countUp)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [value, duration, delay])
  
  return (
    <motion.span 
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      {displayValue}
    </motion.span>
  )
}