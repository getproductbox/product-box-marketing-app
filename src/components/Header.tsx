import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-pb-black/80 backdrop-blur-md border-b border-pb-gray-800/50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-h4 font-black text-pb-white">
            Product Box
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-body-sm text-pb-gray-300 hover:text-pb-white transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('case-studies')}
              className="text-body-sm text-pb-gray-300 hover:text-pb-white transition-colors"
            >
              Case Studies
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-pb-accent text-pb-white px-6 py-2 font-semibold rounded-md hover:bg-pb-accent/90 transition-all duration-300"
            >
              Get Started
            </button>
          </div>

          <button
            className="md:hidden text-pb-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-pb-gray-800">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-body-sm text-pb-gray-300 hover:text-pb-white transition-colors text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('case-studies')}
                className="text-body-sm text-pb-gray-300 hover:text-pb-white transition-colors text-left"
              >
                Case Studies
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-pb-accent text-pb-white px-6 py-2 font-semibold rounded-md hover:bg-pb-accent/90 transition-all duration-300 w-fit"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}