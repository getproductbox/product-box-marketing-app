import { useState, useEffect } from 'react'
import { ArrowUpRight, Eye, TrendingUp, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getServicesData, getCaseStudiesData, getTestimonialsData } from '../lib/data'
import type { Service, CaseStudy, Testimonial } from '../types/sanity'
import { CaseStudyModal } from '../components/CaseStudyModal'
import { BookingModal } from '../components/BookingModal'
import { TEAM_MEMBERS, CTA_TEXT } from '../lib/constants'

export function ProductStudioPage() {
  const [services, setServices] = useState<Service[]>([])
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const [servicesData, caseStudiesData, testimonialsData] = await Promise.all([
        getServicesData(),
        getCaseStudiesData(),
        getTestimonialsData()
      ])
      setServices(servicesData)
      setCaseStudies(caseStudiesData)
      setTestimonials(testimonialsData)
    }
    fetchData()
  }, [])

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'eye': return <Eye className="w-10 h-10" />
      case 'trending-up': return <TrendingUp className="w-10 h-10" />
      case 'zap': return <Zap className="w-10 h-10" />
      default: return <Eye className="w-10 h-10" />
    }
  }

  return (
    <div className="min-h-screen bg-pb-black text-pb-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-block px-4 py-2 bg-pb-electric/10 border border-pb-electric/30 rounded-full text-pb-electric text-body-sm font-semibold mb-6">
            Product Studio
          </div>

          <h1 className="text-display font-black mb-6 leading-tight">
            We Build <span className="bg-gradient-to-r from-pb-accent to-pb-electric bg-clip-text text-transparent">With AI.<br />Every Day.</span>
          </h1>

          <p className="text-body-xl text-pb-gray-300 mb-10 max-w-2xl mx-auto">
            We don't teach theory. We teach what we do every day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-pb-electric text-pb-black px-8 py-4 font-semibold rounded-lg hover:bg-pb-electric/90 transition-all duration-300"
            >
              {CTA_TEXT.BOOK_DISCOVERY_CALL}
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <Link
              to="/agent-training"
              className="inline-flex items-center justify-center gap-2 border border-pb-gray-600 text-pb-white px-8 py-4 font-semibold rounded-lg hover:border-pb-gray-500 hover:bg-pb-gray-800 transition-all duration-300"
            >
              Explore Agent Training
            </Link>
          </div>
        </div>
      </section>

      {/* Connection to Training */}
      <section className="py-16 px-6 bg-pb-gray-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-pb-accent/10 to-pb-electric/10 border border-pb-accent/30 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-h3 font-bold mb-4">This Is How We Know What We're Teaching</h2>
            <p className="text-body-lg text-pb-gray-300 max-w-2xl mx-auto">
              18+ months of building AI-powered features gives us real-world insights into what works, what doesn't, and how to train teams effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-h2 font-black text-center mb-4">Our Process</h2>
          <p className="text-body-lg text-pb-gray-300 text-center mb-12 max-w-2xl mx-auto">
            How we ship AI-powered products that actually work
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service._id}
                className="bg-pb-gray-900 border border-pb-gray-800 rounded-xl p-8 hover:border-pb-accent transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-pb-accent">
                    {getIcon(service.icon || 'eye')}
                  </div>
                  <div className="text-h5 font-black text-pb-gray-600">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <h3 className="text-h4 font-bold mb-3">{service.title}</h3>
                <p className="text-body text-pb-gray-300 mb-6">
                  {service.fullDescription || service.shortDescription}
                </p>

                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-body-sm text-pb-gray-400">
                        <span className="text-pb-accent mt-1">→</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6 bg-pb-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-h2 font-black text-center mb-4">Real Projects, Real Results</h2>
          <p className="text-body-lg text-pb-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Examples of the AI-powered products we've shipped for clients
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <button
                key={study._id}
                onClick={() => setSelectedCaseStudy(study)}
                className="bg-pb-gray-900 border border-pb-gray-800 rounded-xl p-6 hover:border-pb-accent transition-all duration-300 text-left group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="inline-block px-3 py-1 bg-pb-accent/10 border border-pb-accent/30 rounded-full text-pb-accent text-body-xs font-semibold">
                    {study.service}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-pb-gray-600 group-hover:text-pb-accent transition-colors" />
                </div>

                <h3 className="text-h4 font-bold mb-2">{study.client}</h3>
                <p className="text-body-sm text-pb-gray-400 mb-4">{study.tagline}</p>

                {study.metrics && study.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-pb-gray-800">
                    {study.metrics.slice(0, 2).map((metric, idx) => (
                      <div key={idx}>
                        <div className="text-h5 font-bold text-pb-accent">{metric.value}</div>
                        <div className="text-body-xs text-pb-gray-500">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-h2 font-black text-center mb-12">Client Feedback</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="bg-pb-gray-900 border border-pb-gray-800 rounded-xl p-8"
              >
                <div className="text-h3 text-pb-accent mb-4">"</div>
                <p className="text-body text-pb-gray-300 mb-6 italic">
                  {testimonial.quote}
                </p>
                <div>
                  <div className="font-semibold text-pb-white">{testimonial.client}</div>
                  <div className="text-body-sm text-pb-gray-400">{testimonial.role}</div>
                  <div className="text-body-sm text-pb-accent">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-pb-electric/20 to-pb-accent/20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-black mb-6">Let's Build Together</h2>
          <p className="text-body-lg text-pb-gray-300 mb-8">
            Interested in working with Product Box on your next AI-powered product? Get in touch.
          </p>

          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-pb-electric text-pb-black px-8 py-4 font-semibold rounded-lg hover:bg-pb-electric/90 transition-all duration-300"
          >
            {CTA_TEXT.BOOK_DISCOVERY_CALL}
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={!!selectedCaseStudy}
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        teamMembers={TEAM_MEMBERS}
      />
    </div>
  )
}
