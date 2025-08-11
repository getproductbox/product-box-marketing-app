import React, { useState, useEffect, useMemo } from 'react'
import { Home, Briefcase, FileText, MessageSquare, Users } from 'lucide-react'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
}

export const SmoothScrollNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)

  const navItems: NavItem[] = useMemo(() => [
    { id: 'hero', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'case-studies', label: 'Work', icon: <FileText className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Clients', icon: <Users className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <MessageSquare className="w-4 h-4" /> }
  ], [])

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(Math.min(progress, 100))

      // Find active section
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean)
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-pb-gray-900/20">
        <div
          className="h-full bg-gradient-to-r from-pb-accent to-pb-electric transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-pb-gray-900/90 backdrop-blur-sm border border-pb-gray-800 rounded-2xl p-4 shadow-xl">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  group relative flex items-center space-x-3 w-full p-3 rounded-xl
                  transition-all duration-300 hover:bg-pb-gray-800
                  ${activeSection === item.id 
                    ? 'bg-pb-accent/20 text-pb-accent border border-pb-accent/30' 
                    : 'text-pb-gray-400 hover:text-pb-white'
                  }
                `}
                title={item.label}
              >
                <div className={`
                  flex-shrink-0 transition-all duration-300
                  ${activeSection === item.id ? 'scale-110' : 'group-hover:scale-105'}
                `}>
                  {item.icon}
                </div>
                
                {/* Label - appears on hover */}
                <span className={`
                  text-sm font-medium whitespace-nowrap
                  transition-all duration-300 transform
                  ${activeSection === item.id 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                  }
                `}>
                  {item.label}
                </span>

                {/* Active indicator */}
                {activeSection === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-pb-accent rounded-r-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}