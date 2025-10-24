import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

interface UseScrollRevealReturn {
  isVisible: boolean
}

export function useScrollReveal(
  ref: RefObject<HTMLElement>,
  options: UseScrollRevealOptions = {}
): UseScrollRevealReturn {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // If ref is null, do nothing
    if (!ref.current) {
      return
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // If user prefers reduced motion, show immediately
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          // If triggerOnce is true, disconnect after first trigger
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!triggerOnce) {
          // Only reset visibility if triggerOnce is false
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(ref.current)

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [ref, threshold, rootMargin, triggerOnce])

  return { isVisible }
}
