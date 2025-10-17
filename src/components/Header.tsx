import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { BookingModal } from './BookingModal'
import { NAV_ITEMS, CTA_TEXT, ROUTES, TEAM_MEMBERS } from '../lib/constants'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-pb-black/80 backdrop-blur-md border-b border-pb-gray-800/50">
        <nav className="container mx-auto px-6 py-4" aria-label="Main navigation">
          <div className="flex items-center justify-between">
            <Link
              to={ROUTES.HOME}
              className="text-h4 font-black text-pb-white hover:text-pb-accent transition-colors"
            >
              Product Box
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-body-sm transition-colors ${
                      isActive
                        ? 'text-pb-white font-semibold underline underline-offset-8'
                        : 'text-pb-gray-300 hover:text-pb-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-pb-accent text-pb-white px-6 py-2 font-semibold rounded-md hover:bg-pb-accent/90 transition-all duration-300"
              >
                {CTA_TEXT.BOOK_DISCOVERY_CALL}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-pb-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div
              id="mobile-menu"
              className="md:hidden mt-4 pb-4 border-t border-pb-gray-800"
            >
              <div className="flex flex-col space-y-4 pt-4">
                {NAV_ITEMS.map((item) => {
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`text-body-sm transition-colors text-left ${
                        isActive
                          ? 'text-pb-white font-semibold underline underline-offset-8'
                          : 'text-pb-gray-300 hover:text-pb-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-pb-accent text-pb-white px-6 py-2 font-semibold rounded-md hover:bg-pb-accent/90 transition-all duration-300 w-fit"
                >
                  {CTA_TEXT.BOOK_DISCOVERY_CALL}
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        teamMembers={TEAM_MEMBERS}
      />
    </>
  )
}
