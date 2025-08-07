import type { Variants } from 'framer-motion'

// Unified timing system
export const TIMING = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.0,
  verySlow: 1.5,
} as const

// Consistent easing curves
export const EASING = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.68, -0.55, 0.265, 1.55],
  ease: 'easeInOut',
  easeOut: 'easeOut',
  linear: 'linear',
} as const

// Standard transitions
export const transitions = {
  fast: { duration: TIMING.fast, ease: EASING.easeOut },
  medium: { duration: TIMING.medium, ease: EASING.ease },
  slow: { duration: TIMING.slow, ease: EASING.smooth },
  verySlow: { duration: TIMING.verySlow, ease: EASING.smooth },
  spring: { type: 'spring', damping: 25, stiffness: 300 },
  springBounce: { type: 'spring', damping: 15, stiffness: 400 },
} as const

// Common animation variants
export const variants = {
  // Fade animations
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },

  // Blur animations
  fadeBlur: {
    hidden: { opacity: 0, filter: 'blur(4px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  fadeUpBlur: {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },

  // Scale animations
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },

  // Combined effects
  slideUpScale: {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  slideUpBlurScale: {
    hidden: { opacity: 0, y: 40, scale: 0.95, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  },

  // Hover effects
  lift: {
    rest: { y: 0, scale: 1 },
    hover: { y: -8, scale: 1.02 },
  },
  glow: {
    rest: { boxShadow: '0 0 0 rgba(255, 107, 53, 0)' },
    hover: { boxShadow: '0 20px 40px rgba(255, 107, 53, 0.15)' },
  },
  tilt: {
    rest: { rotateX: 0, rotateY: 0 },
    hover: { rotateX: -2, rotateY: 2 },
  },
} as const

// Animation presets for common use cases
export const animationPresets = {
  // Section entrance
  sectionEnter: {
    variants: variants.fadeUpBlur,
    transition: transitions.slow,
  },
  
  // Card animations
  cardEnter: {
    variants: variants.slideUpBlurScale,
    transition: transitions.medium,
  },
  cardHover: {
    variants: variants.lift,
    transition: transitions.fast,
  },

  // Text animations
  textReveal: {
    variants: variants.fadeUpBlur,
    transition: transitions.medium,
  },
  
  // Button animations
  buttonHover: {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
    transition: transitions.fast,
  },
} as const

// Stagger configurations
export const staggerConfig = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  fast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  },
  slow: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  },
} as const

// Mouse interaction configs
export const mouseEffects = {
  cursorGradient: {
    size: { width: 400, height: 400 },
    blur: 'blur-3xl',
    opacity: 0.05,
  },
  proximityDistance: 150,
  proximityStrength: 0.3,
} as const

// Scroll orchestration configuration
export const scrollOrchestration = {
  smoothScrollDuration: 1200,
  sectionOffset: 80, // Offset from top when scrolling to sections
  transitionOverlap: 0.2, // Overlap between section transitions (0-1)
} as const

// Section transition variants
export const sectionTransitions = {
  slideFromRight: {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: transitions.slow },
    exit: { x: '-100%', opacity: 0, transition: transitions.medium },
  },
  slideFromLeft: {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: transitions.slow },
    exit: { x: '100%', opacity: 0, transition: transitions.medium },
  },
  fadeSlideUp: {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: transitions.slow },
    exit: { y: -60, opacity: 0, transition: transitions.medium },
  },
  scaleBlur: {
    hidden: { scale: 0.95, opacity: 0, filter: 'blur(8px)' },
    visible: { scale: 1, opacity: 1, filter: 'blur(0px)', transition: transitions.slow },
    exit: { scale: 1.05, opacity: 0, filter: 'blur(8px)', transition: transitions.medium },
  },
} as const

// Scroll animation configs
export const scrollConfig = {
  threshold: 0.1,
  rootMargin: '-50px',
  triggerOnce: true,
} as const

// Helper functions
export const createStaggeredVariant = (
  baseVariant: Variants,
  _staggerDelay: number = 0.1
): Variants => ({
  hidden: baseVariant.hidden,
  visible: {
    ...baseVariant.visible,
  },
})

export const createDelayedTransition = (
  baseTransition: any,
  delay: number
): any => ({
  ...baseTransition,
  delay,
})

// Responsive animation utilities
export const getReducedMotionVariant = (_variant: Variants): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
})

// Animation utility for respecting user preferences
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}