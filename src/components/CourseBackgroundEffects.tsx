import { useEffect, useState } from 'react'

export function CourseBackgroundEffects() {
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Scroll handler for parallax effect
    const handleScroll = () => {
      if (!prefersReducedMotion) {
        setScrollY(window.scrollY)
      }
    }

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prefersReducedMotion])

  // Calculate parallax offsets
  const getParallaxStyle = (speed: number) => {
    if (prefersReducedMotion) {
      return {}
    }
    const offset = scrollY * speed
    return {
      transform: `translateY(${offset}px)`,
    }
  }

  // Define orbs configuration
  const orbs = [
    {
      color: 'bg-gradient-to-br from-pb-accent/20 to-pb-accent/5',
      size: 'w-96 h-96',
      position: 'top-1/4 left-1/4',
      speed: 0.1,
      showOnMobile: true,
    },
    {
      color: 'bg-gradient-to-br from-pb-electric/20 to-pb-electric/5',
      size: 'w-96 h-96',
      position: 'bottom-1/4 right-1/4',
      speed: -0.15,
      showOnMobile: true,
    },
    {
      color: 'bg-gradient-to-br from-pb-accent/10 to-transparent',
      size: 'w-64 h-64',
      position: 'top-1/2 right-1/3',
      speed: 0.2,
      showOnMobile: false,
    },
    {
      color: 'bg-gradient-to-br from-pb-electric/15 to-transparent',
      size: 'w-80 h-80',
      position: 'bottom-1/3 left-1/3',
      speed: -0.12,
      showOnMobile: false,
    },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb, index) => {
        // Skip non-mobile orbs on mobile devices
        if (isMobile && !orb.showOnMobile) {
          return null
        }

        return (
          <div
            key={index}
            className={`absolute ${orb.size} ${orb.color} ${orb.position} rounded-full blur-3xl transition-transform duration-1000 ease-out`}
            style={getParallaxStyle(orb.speed)}
          />
        )
      })}
    </div>
  )
}
