import { useState } from 'react'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { ServiceCards } from './components/ServiceCards'
import { CaseStudies } from './components/CaseStudies'
import { TestimonialsSection } from './components/TestimonialsSection'
import { ContactSection } from './components/ContactSection'
import { ContactFloat } from './components/ContactFloat'
import { Footer } from './components/Footer'
import { BackgroundEffects } from './components/BackgroundEffects'
import { BackgroundGrid } from './components/BackgroundGrid'
import { SmoothScrollNav } from './components/SmoothScrollNav'
import { PageLoader } from './components/design-system/organisms/PageLoader'
import { AnalyticsProvider, ConsentBanner } from './providers/AnalyticsProvider'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <AnalyticsProvider debugMode={process.env.NODE_ENV === 'development'}>
      {/* Page Loader */}
      <PageLoader 
        onComplete={() => setIsLoading(false)}
      />

      <div className={`min-h-screen relative transition-opacity duration-300 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}>
        {/* Global Background Layer */}
        <BackgroundGrid />
        <BackgroundEffects />
        
        {/* Smooth Scroll Navigation */}
        <SmoothScrollNav />
        
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <div className="relative z-10">
          <div id="hero" data-section="hero">
            <HeroSection />
          </div>
          <div id="services" data-section="services">
            <ServiceCards />
          </div>
          <div id="case-studies" data-section="case-studies">
            <CaseStudies />
          </div>
          <div id="testimonials" data-section="testimonials">
            <TestimonialsSection />
          </div>
          <div id="contact" data-section="contact">
            <ContactSection />
          </div>
          <Footer />
          <ContactFloat />
        </div>
        
        {/* Analytics Consent Banner */}
        <ConsentBanner />
      </div>
    </AnalyticsProvider>
  )
}

export default App