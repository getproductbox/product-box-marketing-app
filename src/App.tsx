import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { ServiceCards } from './components/ServiceCards'
import { CaseStudies } from './components/CaseStudies'
import { ContactSection } from './components/ContactSection'
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
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <div id="services">
          <ServiceCards />
        </div>
        <div id="case-studies">
          <CaseStudies />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
        <Footer />
        <ContactFloat />
      </div>
    </div>
  )
}

export default App