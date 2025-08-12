// Analytics Provider - Centralized Analytics Management
// Phase 5: Analytics, Testing & Launch Optimization
/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, react-refresh/only-export-components */

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { analytics, CONVERSION_GOALS } from '../utils/analytics'

interface AnalyticsContextValue {
  isInitialized: boolean
  hasConsent: boolean
  trackEvent: (eventName: string, properties?: Record<string, any>) => void
  trackConversion: (goalId: keyof typeof CONVERSION_GOALS, additionalData?: Record<string, any>) => void
  trackPageView: (url?: string) => void
  trackFormSubmission: (formType: string, formData?: Record<string, any>) => void
  trackButtonClick: (buttonName: string, location: string, additionalData?: Record<string, any>) => void
  trackSectionView: (sectionName: string) => void
  requestConsent: () => Promise<boolean>
  revokeConsent: () => void
  getAnalyticsData: () => any[]
  clearAnalyticsData: () => void
}

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(undefined)

interface AnalyticsProviderProps {
  children: ReactNode
  autoInit?: boolean
  debugMode?: boolean
}

export function AnalyticsProvider({ 
  children, 
  autoInit = true, 
  debugMode = false 
}: AnalyticsProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    if (autoInit) {
      initializeAnalytics()
    }
  }, [autoInit])

  const initializeAnalytics = async () => {
    try {
      // Check for existing consent
      const existingConsent = localStorage.getItem('analytics_consent') === 'granted'
      setHasConsent(existingConsent)

      if (existingConsent) {
        await setupAnalytics()
      }

      setIsInitialized(true)
      
      if (debugMode) {
        console.log('📊 Analytics Provider initialized', { 
          hasConsent: existingConsent,
          isProduction: process.env.NODE_ENV === 'production'
        })
      }
    } catch (error) {
      console.error('Failed to initialize analytics:', error)
      setIsInitialized(true) // Still set as initialized to not block the app
    }
  }

  const setupAnalytics = async () => {
    // Initialize performance monitoring
    if (typeof window !== 'undefined') {
      window.__analytics = analytics
      
      // Track initial page load
      trackEvent('app_loaded', {
        url: window.location.href,
        referrer: document.referrer || 'direct',
        timestamp: Date.now()
      })
      
      // Set up intersection observer for section tracking
      setupSectionTracking()
      
      // Set up form submission tracking
      setupFormTracking()
      
      // Set up click tracking
      setupClickTracking()
    }
  }

  const setupSectionTracking = () => {
    if (!window.IntersectionObserver) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.id || entry.target.getAttribute('data-section')
            if (sectionName) {
              trackSectionView(sectionName)
            }
          }
        })
      },
      { 
        threshold: 0.5, // Trigger when 50% of section is visible
        rootMargin: '-10% 0px' // Add some margin
      }
    )

    // Observe all sections with IDs or data-section attributes
    const sections = document.querySelectorAll('[id], [data-section]')
    sections.forEach(section => observer.observe(section))
  }

  const setupFormTracking = () => {
    // Track all form submissions automatically
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement
      const formType = form.getAttribute('data-form-type') || 
                      form.className.includes('contact') ? 'contact' : 'unknown'
      
      trackFormSubmission(formType, {
        formId: form.id,
        formAction: form.action,
        method: form.method
      })
    })
  }

  const setupClickTracking = () => {
    // Track button clicks automatically
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      const button = target.closest('button, [role="button"], a[href]')
      
      if (button) {
        const buttonText = button.textContent?.trim() || ''
        const buttonType = button.getAttribute('data-button-type') || 
                          button.tagName.toLowerCase()
        const location = getElementLocation(button)
        
        trackButtonClick(buttonText, location, {
          buttonType,
          href: (button as HTMLAnchorElement).href
        })
      }
    })
  }

  const getElementLocation = (element: Element): string => {
    // Try to find a meaningful parent section
    const section = element.closest('[id], [data-section], section, header, footer, nav, main')
    if (section) {
      return section.id || 
             section.getAttribute('data-section') || 
             section.tagName.toLowerCase()
    }
    return 'unknown'
  }

  const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
    if (!hasConsent) return
    analytics.track(eventName, properties)
  }

  const trackConversion = (goalId: keyof typeof CONVERSION_GOALS, additionalData: Record<string, any> = {}) => {
    if (!hasConsent) return
    const goal = CONVERSION_GOALS[goalId]
    analytics.trackConversion(goal, additionalData)
  }

  const trackPageView = (url?: string) => {
    if (!hasConsent) return
    trackEvent('page_view', {
      url: url || window.location.href,
      title: document.title,
      timestamp: Date.now()
    })
  }

  const trackFormSubmission = (formType: string, formData: Record<string, any> = {}) => {
    if (!hasConsent) return
    analytics.trackFormSubmission(formType, formData)
    
    // Track as conversion if it's a contact form
    if (formType === 'contact') {
      trackConversion('CONTACT_FORM_SUBMIT', formData)
    } else if (formType === 'service-inquiry') {
      trackConversion('SERVICE_INQUIRY', formData)
    }
  }

  const trackButtonClick = (buttonName: string, location: string, additionalData: Record<string, any> = {}) => {
    if (!hasConsent) return
    analytics.trackButtonClick(buttonName, location, additionalData)
  }

  const trackSectionView = (sectionName: string) => {
    if (!hasConsent) return
    analytics.trackSectionView(sectionName)
    
    // Track specific conversion events
    if (sectionName === 'testimonials') {
      trackConversion('TESTIMONIAL_INTERACTION')
    } else if (sectionName === 'case-studies') {
      trackConversion('CASE_STUDY_VIEW')
    }
  }

  const requestConsent = async (): Promise<boolean> => {
    // In a real implementation, this would show a consent modal
    // For now, we'll grant consent for development
    const consent = true
    
    localStorage.setItem('analytics_consent', consent ? 'granted' : 'denied')
    setHasConsent(consent)
    
    if (consent) {
      await setupAnalytics()
    }
    
    trackEvent('consent_updated', { consent })
    
    return consent
  }

  const revokeConsent = () => {
    localStorage.setItem('analytics_consent', 'denied')
    localStorage.removeItem('analytics_events')
    setHasConsent(false)
    
    trackEvent('consent_revoked', {})
  }

  const getAnalyticsData = () => {
    try {
      return JSON.parse(localStorage.getItem('analytics_events') || '[]')
    } catch {
      return []
    }
  }

  const clearAnalyticsData = () => {
    analytics.clearEvents()
    localStorage.removeItem('analytics_events')
  }

  const contextValue: AnalyticsContextValue = {
    isInitialized,
    hasConsent,
    trackEvent,
    trackConversion,
    trackPageView,
    trackFormSubmission,
    trackButtonClick,
    trackSectionView,
    requestConsent,
    revokeConsent,
    getAnalyticsData,
    clearAnalyticsData
  }

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
      {debugMode && <AnalyticsDebugPanel />}
    </AnalyticsContext.Provider>
  )
}

// Debug panel for development
function AnalyticsDebugPanel() {
  const analytics = useAnalytics()
  const [events, setEvents] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(analytics.getAnalyticsData().slice(-10)) // Show last 10 events
    }, 1000)

    return () => clearInterval(interval)
  }, [analytics])

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 10000,
      background: '#000',
      color: '#fff',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '12px',
      maxWidth: '400px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
    }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
      >
        📊 Analytics Debug {isOpen ? '▼' : '▲'}
      </button>
      
      {isOpen && (
        <div style={{ marginTop: '10px' }}>
          <div>
            <strong>Status:</strong> {analytics.hasConsent ? '✅ Active' : '❌ No Consent'}
          </div>
          <div>
            <strong>Events:</strong> {events.length}
          </div>
          <div style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '10px' }}>
            {events.map((event, index) => (
              <div key={index} style={{ 
                marginBottom: '5px', 
                padding: '5px', 
                background: '#333', 
                borderRadius: '3px',
                fontSize: '10px'
              }}>
                <strong>{event.name}</strong>
                <div>{JSON.stringify(event.properties, null, 2)}</div>
              </div>
            ))}
          </div>
          <button 
            onClick={analytics.clearAnalyticsData}
            style={{ 
              background: '#d32f2f', 
              border: 'none', 
              color: '#fff', 
              padding: '5px 10px',
              borderRadius: '3px',
              cursor: 'pointer',
              marginTop: '10px',
              fontSize: '10px'
            }}
          >
            Clear Events
          </button>
        </div>
      )}
    </div>
  )
}

// Custom hook to use analytics
export function useAnalytics(): AnalyticsContextValue {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

// HOC for automatic page view tracking
export function withPageTracking<P extends object>(
  Component: React.ComponentType<P>,
  pageName?: string
) {
  return function TrackedPage(props: P) {
    const analytics = useAnalytics()
    
    useEffect(() => {
      analytics.trackPageView()
      if (pageName) {
        analytics.trackEvent('page_section_view', { section: pageName })
      }
    }, [analytics])
    
    return <Component {...props} />
  }
}

// Component for consent banner
export function ConsentBanner({ 
  onAccept, 
  onDecline,
  className = ''
}: {
  onAccept?: () => void
  onDecline?: () => void
  className?: string
}) {
  const analytics = useAnalytics()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show banner if no consent decision has been made
    const consent = localStorage.getItem('analytics_consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = async () => {
    await analytics.requestConsent()
    setIsVisible(false)
    onAccept?.()
  }

  const handleDecline = () => {
    analytics.revokeConsent()
    setIsVisible(false)
    onDecline?.()
  }

  if (!isVisible) return null

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-pb-gray-900 border-t border-pb-gray-800 p-4 z-50 ${className}`}>
      <div className="container flex items-center justify-between">
        <div className="text-pb-gray-200 text-sm">
          We use analytics to improve your experience and understand how our site is used.
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleDecline}
            className="text-pb-gray-400 hover:text-pb-white text-sm underline"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="bg-pb-accent text-pb-white px-4 py-2 rounded-lg text-sm hover:bg-pb-accent/80 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}