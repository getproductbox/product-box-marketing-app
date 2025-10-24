import { useEffect, useState } from 'react'

export interface Section {
  id: string
  label: string
}

interface ScrollProgressIndicatorProps {
  sections: Section[]
}

export function ScrollProgressIndicator({ sections }: ScrollProgressIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently in view
      let currentSection = 0

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Section is in view if its top is above the middle of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            currentSection = index
          }
        }
      })

      setActiveSection(currentSection)
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          aria-label={`Navigate to ${section.label} section`}
          className="group relative"
        >
          {/* Dot */}
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeSection
                ? 'bg-pb-accent scale-125'
                : 'bg-pb-gray-600 hover:bg-pb-gray-400 hover:scale-110'
            }`}
          />

          {/* Label tooltip */}
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-medium text-pb-white bg-pb-gray-900 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {section.label}
          </span>
        </button>
      ))}
    </div>
  )
}
