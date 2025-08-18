import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { BackgroundGrid } from './BackgroundGrid'
import { BackgroundEffects } from './BackgroundEffects'
import { SmoothScrollNav } from './SmoothScrollNav'
import { ContactFloat } from './ContactFloat'
import { PageLoader } from './design-system/organisms/PageLoader'
import { AnalyticsProvider, ConsentBanner } from '../providers/AnalyticsProvider'
import { useState } from 'react'

export function Layout() {
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
          <Outlet />
          <Footer />
          <ContactFloat />
        </div>
        
        {/* Analytics Consent Banner */}
        <ConsentBanner />
      </div>
    </AnalyticsProvider>
  )
}