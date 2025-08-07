import { HeroSection } from './components/HeroSection'
import { ServiceCards } from './components/ServiceCards'
import { CaseStudies } from './components/CaseStudies'
import { ContactFloat } from './components/ContactFloat'
import { Footer } from './components/Footer'
import { BackgroundEffects } from './components/BackgroundEffects'
import { BackgroundGrid } from './components/BackgroundGrid'

function App() {
  return (
    <div className="min-h-screen relative">
      {/* Global Background Layer */}
      <BackgroundGrid />
      <BackgroundEffects />
      
      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <ServiceCards />
        <CaseStudies />
        <Footer />
        <ContactFloat />
      </div>
    </div>
  )
}

export default App