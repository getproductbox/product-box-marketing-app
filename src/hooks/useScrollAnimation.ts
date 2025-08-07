import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'
import { useEffect, useRef, useCallback, useState } from 'react'
import { variants, transitions, scrollConfig, shouldReduceMotion, scrollOrchestration } from '../lib/animations'
import type { Variants, Transition } from 'framer-motion'

export interface ScrollAnimationOptions {
  variant?: keyof typeof variants
  customVariants?: Variants
  transition?: keyof typeof transitions | Transition
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
  staggerDelay?: number
  disabled?: boolean
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    variant = 'fadeUp',
    customVariants,
    transition = 'medium',
    threshold = scrollConfig.threshold,
    rootMargin = scrollConfig.rootMargin,
    triggerOnce = scrollConfig.triggerOnce,
    delay = 0,
    disabled = false,
  } = options

  const controls = useAnimation()
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce,
  })

  // Choose variants based on motion preferences
  const animationVariants = shouldReduceMotion() 
    ? variants.fadeIn 
    : customVariants || variants[variant]

  // Choose transition
  const animationTransition = typeof transition === 'string' 
    ? { ...transitions[transition], delay }
    : { ...transition, delay }

  useEffect(() => {
    if (disabled) return

    if (inView) {
      controls.start('visible')
    } else if (!triggerOnce) {
      controls.start('hidden')
    }
  }, [inView, controls, triggerOnce, disabled])

  return {
    ref,
    inView,
    controls,
    variants: animationVariants,
    transition: animationTransition,
    animate: controls,
    initial: 'hidden',
  }
}

// Specialized hook for staggered animations
export const useStaggeredScrollAnimation = (
  _itemCount: number,
  options: ScrollAnimationOptions & { staggerDelay?: number } = {}
) => {
  const {
    staggerDelay = 0.1,
    ...baseOptions
  } = options

  const baseAnimation = useScrollAnimation(baseOptions)
  
  // Create staggered variants
  const staggeredVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: baseOptions.delay || 0,
      },
    },
  }

  return {
    ...baseAnimation,
    variants: staggeredVariants,
    itemVariants: baseAnimation.variants,
  }
}

// Hook for text reveal animations (word by word or letter by letter)
export const useTextRevealAnimation = (
  text: string,
  options: ScrollAnimationOptions & { 
    mode?: 'words' | 'letters'
    staggerDelay?: number 
  } = {}
) => {
  const {
    mode = 'words',
    staggerDelay = 0.05,
    ...baseOptions
  } = options

  const animation = useScrollAnimation(baseOptions)
  
  // Split text based on mode
  const textParts = mode === 'words' 
    ? text.split(' ')
    : text.split('')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: baseOptions.delay || 0,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: transitions.medium,
    },
  }

  return {
    ...animation,
    textParts,
    containerVariants,
    itemVariants,
  }
}

// Hook for parallax scroll effects
export const useParallaxScroll = (strength: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null)
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  })

  useEffect(() => {
    if (!inView || shouldReduceMotion()) return

    const handleScroll = () => {
      const element = elementRef.current
      if (!element) return

      const scrolled = window.pageYOffset
      const rate = scrolled * -strength
      
      element.style.transform = `translate3d(0, ${rate}px, 0)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [inView, strength])

  // Combine refs
  const combinedRef = (node: HTMLElement | null) => {
    if (node) {
      elementRef.current = node
      ref(node)
    }
  }

  return { ref: combinedRef, inView }
}

// Hook for mouse proximity effects
export const useMouseProximity = (
  maxDistance: number = 150,
  strength: number = 0.3
) => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (shouldReduceMotion()) return

    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      )

      if (distance < maxDistance) {
        const proximityRatio = 1 - (distance / maxDistance)
        const moveX = (e.clientX - centerX) * proximityRatio * strength
        const moveY = (e.clientY - centerY) * proximityRatio * strength
        
        element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(${1 + proximityRatio * 0.05})`
      } else {
        element.style.transform = 'translate3d(0, 0, 0) scale(1)'
      }
    }

    const handleMouseLeave = () => {
      element.style.transform = 'translate3d(0, 0, 0) scale(1)'
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [maxDistance, strength])

  return { ref: elementRef }
}

// Hook for scroll progress
export const useScrollProgress = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  })

  useEffect(() => {
    if (!inView) return

    const handleScroll = () => {
      const element = (ref as any).current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementHeight = rect.height

      // Calculate progress (0 to 1)
      const start = windowHeight
      const end = -elementHeight
      const progress = Math.max(0, Math.min(1, (start - elementTop) / (start - end)))

      element.style.setProperty('--scroll-progress', progress.toString())
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [inView, ref])

  return { ref, inView }
}

// Hook for smooth scroll navigation
export const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId: string, offset: number = scrollOrchestration.sectionOffset) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    const elementPosition = element.offsetTop - offset
    const startPosition = window.pageYOffset
    const distance = elementPosition - startPosition
    const duration = scrollOrchestration.smoothScrollDuration

    let start: number | null = null

    const easeInOutQuad = (t: number): number => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

    const animateScroll = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = timestamp - start
      const progressRatio = Math.min(progress / duration, 1)
      
      window.scrollTo(0, startPosition + distance * easeInOutQuad(progressRatio))

      if (progress < duration) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return { scrollToSection, scrollToTop }
}

// Hook for section visibility tracking
export const useSectionVisibility = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    
    sectionIds.forEach(id => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { 
          threshold: 0.3,
          rootMargin: '-20% 0px -20% 0px'
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [sectionIds])

  return activeSection
}