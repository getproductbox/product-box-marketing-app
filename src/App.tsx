import { HeroSection } from './components/HeroSection'
import { ServiceCards } from './components/ServiceCards'
import { CaseStudies } from './components/CaseStudies'
import { TestimonialsSection } from './components/TestimonialsSection'
import { ContactSection } from './components/ContactSection'

function App() {
  return (
    <>
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
    </>
  )
}

export default App