// Analytics and Conversion Tracking Utilities
// Phase 5: Analytics, Testing & Launch Optimization
/* eslint-disable @typescript-eslint/no-explicit-any */

interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: number
  userId?: string
  sessionId?: string
}

interface ConversionGoal {
  id: string
  name: string
  value?: number
  category: 'lead' | 'engagement' | 'interaction' | 'navigation'
}

class AnalyticsTracker {
  private sessionId: string
  private isEnabled: boolean
  private events: AnalyticsEvent[] = []

  constructor() {
    this.sessionId = this.generateSessionId()
    this.isEnabled = this.checkIfEnabled()
    
    if (this.isEnabled) {
      this.initializeTracking()
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`
  }

  private checkIfEnabled(): boolean {
    // Check for user consent and environment
    if (typeof window === 'undefined') return false
    
    // Check local storage for user consent
    const consent = localStorage.getItem('analytics_consent')
    const isDev = window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')
    
    return consent === 'granted' && !isDev
  }

  private initializeTracking(): void {
    // Track page views
    this.trackPageView()
    
    // Track user engagement
    this.setupEngagementTracking()
    
    // Track performance metrics
    this.setupPerformanceTracking()
  }

  private trackPageView(): void {
    this.track('page_view', {
      url: window.location.href,
      title: document.title,
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: Date.now()
    })
  }

  private setupEngagementTracking(): void {
    // Track scroll depth
    let maxScroll = 0
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        
        // Track milestone scroll depths
        if ([25, 50, 75, 90].includes(scrollPercent)) {
          this.track('scroll_depth', {
            depth: scrollPercent,
            timestamp: Date.now()
          })
        }
      }
    }
    
    window.addEventListener('scroll', trackScrollDepth, { passive: true })

    // Track time on page
    const startTime = Date.now()
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Date.now() - startTime
      this.track('page_exit', {
        timeOnPage,
        maxScrollDepth: maxScroll,
        timestamp: Date.now()
      })
    })
  }

  private setupPerformanceTracking(): void {
    // Track Core Web Vitals
    if ('web-vital' in window) {
      // This would integrate with web-vitals library if installed
      this.track('performance_ready', {
        timestamp: Date.now()
      })
    }

    // Track page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        this.track('page_performance', {
          loadTime: perfData.loadEventEnd - perfData.loadEventStart,
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          firstPaint: this.getFirstPaint(),
          timestamp: Date.now()
        })
      }, 0)
    })
  }

  private getFirstPaint(): number {
    const paintEntries = performance.getEntriesByType('paint')
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint')
    return firstPaint ? firstPaint.startTime : 0
  }

  public track(eventName: string, properties: Record<string, any> = {}): void {
    if (!this.isEnabled) return

    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        timestamp: Date.now()
      }
    }

    this.events.push(event)
    this.sendEvent(event)
  }

  public trackConversion(goal: ConversionGoal, additionalData: Record<string, any> = {}): void {
    this.track('conversion', {
      goalId: goal.id,
      goalName: goal.name,
      goalCategory: goal.category,
      value: goal.value || 0,
      ...additionalData
    })
  }

  public trackFormSubmission(formType: string, formData: Record<string, any> = {}): void {
    this.track('form_submission', {
      formType,
      timestamp: Date.now(),
      ...formData
    })
  }

  public trackButtonClick(buttonName: string, location: string, additionalData: Record<string, any> = {}): void {
    this.track('button_click', {
      buttonName,
      location,
      timestamp: Date.now(),
      ...additionalData
    })
  }

  public trackSectionView(sectionName: string): void {
    this.track('section_view', {
      sectionName,
      timestamp: Date.now(),
      viewport: `${window.innerWidth}x${window.innerHeight}`
    })
  }

  private async sendEvent(event: AnalyticsEvent): Promise<void> {
    try {
      // In a real implementation, this would send to your analytics service
      // For now, we'll log to console in development and store locally
      
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Analytics Event:', event)
      }

      // Store events locally for debugging/backup
      const storedEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]')
      storedEvents.push(event)
      
      // Keep only last 100 events
      if (storedEvents.length > 100) {
        storedEvents.splice(0, storedEvents.length - 100)
      }
      
      localStorage.setItem('analytics_events', JSON.stringify(storedEvents))

      // Example: Send to external analytics service
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(event)
      // })
      
    } catch (error) {
      console.warn('Analytics event failed to send:', error)
    }
  }

  public getSessionEvents(): AnalyticsEvent[] {
    return this.events.filter(event => 
      event.properties?.sessionId === this.sessionId
    )
  }

  public clearEvents(): void {
    this.events = []
    localStorage.removeItem('analytics_events')
  }
}

// Consent Management
export class ConsentManager {
  public static hasConsent(): boolean {
    return localStorage.getItem('analytics_consent') === 'granted'
  }

  public static requestConsent(): Promise<boolean> {
    return new Promise((resolve) => {
      // In a real implementation, this would show a consent banner/modal
      // For now, we'll assume consent for development
      const consent = true // This would come from user interaction
      
      localStorage.setItem('analytics_consent', consent ? 'granted' : 'denied')
      resolve(consent)
    })
  }

  public static revokeConsent(): void {
    localStorage.setItem('analytics_consent', 'denied')
    localStorage.removeItem('analytics_events')
  }
}

// A/B Testing Framework
export class ABTestingFramework {
  private tests: Map<string, ABTest> = new Map()
  private userVariants: Map<string, string> = new Map()

  constructor() {
    this.loadUserVariants()
  }

  private loadUserVariants(): void {
    try {
      const stored = localStorage.getItem('ab_test_variants')
      if (stored) {
        const variants = JSON.parse(stored)
        this.userVariants = new Map(Object.entries(variants))
      }
    } catch (error) {
      console.warn('Failed to load A/B test variants:', error)
    }
  }

  private saveUserVariants(): void {
    try {
      const variants = Object.fromEntries(this.userVariants)
      localStorage.setItem('ab_test_variants', JSON.stringify(variants))
    } catch (error) {
      console.warn('Failed to save A/B test variants:', error)
    }
  }

  public defineTest(test: ABTest): void {
    this.tests.set(test.id, test)
    
    // Assign user to variant if not already assigned
    if (!this.userVariants.has(test.id)) {
      const variant = this.assignVariant(test)
      this.userVariants.set(test.id, variant)
      this.saveUserVariants()
      
      // Track assignment
      analytics.track('ab_test_assigned', {
        testId: test.id,
        testName: test.name,
        variant,
        timestamp: Date.now()
      })
    }
  }

  private assignVariant(test: ABTest): string {
    const random = Math.random()
    let cumulativeWeight = 0
    
    for (const variant of test.variants) {
      cumulativeWeight += variant.weight
      if (random <= cumulativeWeight) {
        return variant.id
      }
    }
    
    return test.variants[0].id // Fallback
  }

  public getVariant(testId: string): string | null {
    return this.userVariants.get(testId) || null
  }

  public isVariant(testId: string, variantId: string): boolean {
    return this.getVariant(testId) === variantId
  }
}

interface ABTest {
  id: string
  name: string
  description?: string
  variants: ABVariant[]
  targetingRules?: TargetingRule[]
}

interface ABVariant {
  id: string
  name: string
  weight: number // 0-1, must sum to 1 across variants
}

interface TargetingRule {
  type: 'url' | 'referrer' | 'device' | 'custom'
  condition: string
  value: string
}

// Export singleton instances
export const analytics = new AnalyticsTracker()
export const abTesting = new ABTestingFramework()

// Conversion goals
export const CONVERSION_GOALS = {
  CONTACT_FORM_SUBMIT: {
    id: 'contact_form_submit',
    name: 'Contact Form Submission',
    category: 'lead' as const,
    value: 100
  },
  SERVICE_INQUIRY: {
    id: 'service_inquiry',
    name: 'Service Inquiry',
    category: 'lead' as const,
    value: 50
  },
  CASE_STUDY_VIEW: {
    id: 'case_study_view',
    name: 'Case Study Viewed',
    category: 'engagement' as const,
    value: 10
  },
  TESTIMONIAL_INTERACTION: {
    id: 'testimonial_interaction',
    name: 'Testimonial Interaction',
    category: 'engagement' as const,
    value: 5
  }
} as const