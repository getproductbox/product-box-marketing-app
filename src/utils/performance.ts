// Performance Monitoring and Optimization
// Phase 5: Analytics, Testing & Launch Optimization
/* eslint-disable @typescript-eslint/no-explicit-any */

interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay  
  cls?: number // Cumulative Layout Shift
  fcp?: number // First Contentful Paint
  ttfb?: number // Time to First Byte
  
  // Custom metrics
  loadTime?: number
  domReady?: number
  resourceLoadTime?: number
  jsHeapSize?: number
  
  // User experience metrics
  timeToInteractive?: number
  visuallyReady?: number
  functionallyReady?: number
}

interface ResourceTiming {
  name: string
  duration: number
  size?: number
  type: 'script' | 'stylesheet' | 'image' | 'font' | 'other'
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {}
  private resourceTimings: ResourceTiming[] = []
  private observers: PerformanceObserver[] = []

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring()
    }
  }

  private initializeMonitoring(): void {
    // Monitor Core Web Vitals
    this.observeCoreWebVitals()
    
    // Monitor resource loading
    this.observeResourceTiming()
    
    // Monitor long tasks
    this.observeLongTasks()
    
    // Monitor layout shifts
    this.observeLayoutShifts()
    
    // Track custom metrics
    this.trackCustomMetrics()
  }

  private observeCoreWebVitals(): void {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.metrics.lcp = lastEntry.startTime
        this.reportMetric('lcp', lastEntry.startTime)
      })
      
      try {
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
        this.observers.push(lcpObserver)
      } catch (error) {
        console.warn('LCP observer not supported:', error)
      }

      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        for (const entry of entries) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime
            this.reportMetric('fcp', entry.startTime)
          }
        }
      })
      
      try {
        fcpObserver.observe({ type: 'paint', buffered: true })
        this.observers.push(fcpObserver)
      } catch (error) {
        console.warn('FCP observer not supported:', error)
      }

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        for (const entry of entries) {
          this.metrics.fid = (entry as any).processingStart - entry.startTime
          this.reportMetric('fid', this.metrics.fid)
        }
      })
      
      try {
        fidObserver.observe({ type: 'first-input', buffered: true })
        this.observers.push(fidObserver)
      } catch (error) {
        console.warn('FID observer not supported:', error)
      }
    }
  }

  private observeResourceTiming(): void {
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceResourceTiming[]
        
        entries.forEach(entry => {
          const timing: ResourceTiming = {
            name: entry.name,
            duration: entry.duration,
            size: entry.transferSize,
            type: this.getResourceType(entry.name)
          }
          
          this.resourceTimings.push(timing)
          
          // Report slow resources
          if (entry.duration > 1000) {
            this.reportMetric('slow_resource', {
              name: entry.name,
              duration: entry.duration,
              type: timing.type
            })
          }
        })
      })
      
      try {
        resourceObserver.observe({ type: 'resource', buffered: true })
        this.observers.push(resourceObserver)
      } catch (error) {
        console.warn('Resource observer not supported:', error)
      }
    }
  }

  private observeLongTasks(): void {
    if ('PerformanceObserver' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        
        entries.forEach(entry => {
          this.reportMetric('long_task', {
            duration: entry.duration,
            startTime: entry.startTime,
            name: entry.name
          })
        })
      })
      
      try {
        longTaskObserver.observe({ type: 'longtask', buffered: true })
        this.observers.push(longTaskObserver)
      } catch (error) {
        console.warn('Long task observer not supported:', error)
      }
    }
  }

  private observeLayoutShifts(): void {
    if ('PerformanceObserver' in window) {
      let clsValue = 0
      
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceEntry[]
        
        entries.forEach(entry => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        })
        
        this.metrics.cls = clsValue
        
        // Report if CLS is getting high
        if (clsValue > 0.1) {
          this.reportMetric('high_cls', clsValue)
        }
      })
      
      try {
        clsObserver.observe({ type: 'layout-shift', buffered: true })
        this.observers.push(clsObserver)
      } catch (error) {
        console.warn('CLS observer not supported:', error)
      }
    }
  }

  private trackCustomMetrics(): void {
    // Time to First Byte
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (navigation) {
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart
        this.metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart
        this.metrics.domReady = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
        
        this.reportMetric('navigation_timing', {
          ttfb: this.metrics.ttfb,
          loadTime: this.metrics.loadTime,
          domReady: this.metrics.domReady
        })
      }
      
      // Memory usage if available
      if ('memory' in performance) {
        const memory = (performance as any).memory
        this.metrics.jsHeapSize = memory.usedJSHeapSize
        
        this.reportMetric('memory_usage', {
          used: memory.usedJSHeapSize,
          limit: memory.jsHeapSizeLimit
        })
      }
    })
  }

  private getResourceType(url: string): ResourceTiming['type'] {
    if (url.includes('.js')) return 'script'
    if (url.includes('.css')) return 'stylesheet'
    if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) return 'image'
    if (url.match(/\.(woff|woff2|ttf|otf)$/)) return 'font'
    return 'other'
  }

  private reportMetric(name: string, value: any): void {
    // Import analytics dynamically to avoid circular dependency
    if (typeof window !== 'undefined' && window.__analytics) {
      window.__analytics.track('performance_metric', {
        metricName: name,
        value,
        timestamp: Date.now(),
        url: window.location.href
      })
    }
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 Performance Metric - ${name}:`, value)
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  public getResourceTimings(): ResourceTiming[] {
    return [...this.resourceTimings]
  }

  public generateReport(): PerformanceReport {
    const resources = this.resourceTimings
    const slowResources = resources.filter(r => r.duration > 1000)
    const totalResourceSize = resources.reduce((sum, r) => sum + (r.size || 0), 0)
    
    return {
      metrics: this.getMetrics(),
      resourceCount: resources.length,
      totalResourceSize,
      slowResources: slowResources.length,
      coreWebVitalsScore: this.calculateCoreWebVitalsScore(),
      recommendations: this.generateRecommendations(),
      timestamp: Date.now()
    }
  }

  private calculateCoreWebVitalsScore(): number {
    let score = 100
    
    // LCP scoring (Good: <2.5s, Needs Improvement: 2.5s-4s, Poor: >4s)
    if (this.metrics.lcp) {
      if (this.metrics.lcp > 4000) score -= 30
      else if (this.metrics.lcp > 2500) score -= 15
    }
    
    // FID scoring (Good: <100ms, Needs Improvement: 100ms-300ms, Poor: >300ms)
    if (this.metrics.fid) {
      if (this.metrics.fid > 300) score -= 25
      else if (this.metrics.fid > 100) score -= 10
    }
    
    // CLS scoring (Good: <0.1, Needs Improvement: 0.1-0.25, Poor: >0.25)
    if (this.metrics.cls) {
      if (this.metrics.cls > 0.25) score -= 25
      else if (this.metrics.cls > 0.1) score -= 10
    }
    
    return Math.max(0, score)
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = []
    
    if (this.metrics.lcp && this.metrics.lcp > 2500) {
      recommendations.push('Optimize Largest Contentful Paint by reducing image sizes or improving server response time')
    }
    
    if (this.metrics.fid && this.metrics.fid > 100) {
      recommendations.push('Reduce First Input Delay by optimizing JavaScript execution')
    }
    
    if (this.metrics.cls && this.metrics.cls > 0.1) {
      recommendations.push('Minimize Cumulative Layout Shift by setting dimensions on images and ads')
    }
    
    if (this.metrics.ttfb && this.metrics.ttfb > 600) {
      recommendations.push('Improve Time to First Byte by optimizing server configuration')
    }
    
    const slowResources = this.resourceTimings.filter(r => r.duration > 1000)
    if (slowResources.length > 0) {
      recommendations.push(`Optimize ${slowResources.length} slow-loading resources`)
    }
    
    return recommendations
  }

  public startUserTiming(name: string): void {
    performance.mark(`${name}-start`)
  }

  public endUserTiming(name: string): number {
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)
    
    const measure = performance.getEntriesByName(name, 'measure')[0]
    const duration = measure ? measure.duration : 0
    
    this.reportMetric('user_timing', {
      name,
      duration
    })
    
    return duration
  }

  public cleanup(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

interface PerformanceReport {
  metrics: PerformanceMetrics
  resourceCount: number
  totalResourceSize: number
  slowResources: number
  coreWebVitalsScore: number
  recommendations: string[]
  timestamp: number
}

// Error Tracking
class ErrorTracker {
  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeErrorTracking()
    }
  }

  private initializeErrorTracking(): void {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.reportError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack,
        timestamp: Date.now()
      })
    })

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        type: 'promise_rejection',
        message: event.reason?.message || 'Unhandled promise rejection',
        stack: event.reason?.stack,
        timestamp: Date.now()
      })
    })

    // Resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target && event.target !== window) {
        const target = event.target as HTMLElement
        this.reportError({
          type: 'resource',
          message: `Failed to load resource: ${target.tagName}`,
          source: (target as any).src || (target as any).href,
          timestamp: Date.now()
        })
      }
    }, true)
  }

  private reportError(error: any): void {
    // Import analytics dynamically
    if (typeof window !== 'undefined' && window.__analytics) {
      window.__analytics.track('error', error)
    }
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 Error tracked:', error)
    }
    
    // Store locally for debugging
    try {
      const storedErrors = JSON.parse(localStorage.getItem('error_log') || '[]')
      storedErrors.push(error)
      
      // Keep only last 50 errors
      if (storedErrors.length > 50) {
        storedErrors.splice(0, storedErrors.length - 50)
      }
      
      localStorage.setItem('error_log', JSON.stringify(storedErrors))
    } catch (e) {
      console.warn('Failed to store error log:', e)
    }
  }

  public reportCustomError(message: string, context?: any): void {
    this.reportError({
      type: 'custom',
      message,
      context,
      timestamp: Date.now()
    })
  }
}

// Initialize monitoring
export const performanceMonitor = new PerformanceMonitor()
export const errorTracker = new ErrorTracker()

// Expose to window for analytics integration
if (typeof window !== 'undefined') {
  window.__performanceMonitor = performanceMonitor
  window.__errorTracker = errorTracker
}

// SEO and Meta Optimization
export class SEOOptimizer {
  public static updatePageMeta(meta: PageMeta): void {
    if (typeof document === 'undefined') return

    // Update title
    if (meta.title) {
      document.title = meta.title
    }

    // Update meta description
    if (meta.description) this.updateMetaTag('description', meta.description)
    
    // Update Open Graph tags
    if (meta.ogTitle) this.updateMetaTag('og:title', meta.ogTitle, 'property')
    if (meta.ogDescription) this.updateMetaTag('og:description', meta.ogDescription, 'property')
    if (meta.ogImage) this.updateMetaTag('og:image', meta.ogImage, 'property')
    if (meta.ogUrl) this.updateMetaTag('og:url', meta.ogUrl, 'property')

    // Update Twitter Card tags
    if (meta.twitterTitle) this.updateMetaTag('twitter:title', meta.twitterTitle, 'name')
    if (meta.twitterDescription) this.updateMetaTag('twitter:description', meta.twitterDescription, 'name')
    if (meta.twitterImage) this.updateMetaTag('twitter:image', meta.twitterImage, 'name')

    // Update canonical URL
    if (meta.canonical) {
      this.updateCanonical(meta.canonical)
    }

    // Update structured data
    if (meta.structuredData) {
      this.updateStructuredData(meta.structuredData)
    }
  }

  private static updateMetaTag(name: string, content: string, attribute: string = 'name'): void {
    if (!content) return

    let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement
    
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute(attribute, name)
      document.head.appendChild(meta)
    }
    
    meta.content = content
  }

  private static updateCanonical(url: string): void {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    
    canonical.href = url
  }

  private static updateStructuredData(data: any): void {
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }
}

interface PageMeta {
  title?: string
  description?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  structuredData?: any
}

// Declare global window extensions
declare global {
  interface Window {
    __performanceMonitor: PerformanceMonitor
    __errorTracker: ErrorTracker
    __analytics: any
  }
}