import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { BackgroundGrid } from './BackgroundGrid'
import { BackgroundEffects } from './BackgroundEffects'
import { PageLoader } from './design-system/organisms/PageLoader'
import { ScrollToTop } from './ScrollToTop'
import { AnalyticsProvider, ConsentBanner } from '../providers/AnalyticsProvider'
import { useState } from 'react'

export function Layout() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <AnalyticsProvider debugMode={process.env.NODE_ENV === 'development'}>
      {/* Scroll to top on route change */}
      <ScrollToTop />

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

        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="relative z-10">
          <Outlet />
          <Footer />
        </div>

        {/* Analytics Consent Banner */}
        <ConsentBanner />
      </div>
    </AnalyticsProvider>
  )
}