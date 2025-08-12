import { ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getServicesData } from '../lib/data'
import type { Service } from '../types/sanity'

function ServiceCard({ 
  service, 
  index, 
  onHover, 
  onLeave
}: { 
  service: Service
  index: number
  onHover?: () => void
  onLeave?: () => void
}) {
  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start p-6 lg:p-8 -m-6 lg:-m-8 rounded-2xl group-hover:bg-gradient-to-br group-hover:from-pb-gray-900/50 group-hover:to-pb-gray-800/30 transition-all duration-500">
        {/* Number & Title */}
        <div className="lg:col-span-4">
          <div className="sticky top-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-h2 lg:text-h1 font-black text-pb-accent">
                0{index + 1}
              </div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-pb-accent to-pb-electric" />
            </div>
            <h3 className="text-h1 lg:text-hero font-black text-pb-white mb-6 lg:mb-8 text-wrap-balance avoid-orphans leading-tight no-break-short group-hover:text-pb-accent transition-colors duration-300">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-8">
          <div className="space-y-8 lg:space-y-12">
            {/* Short Description */}
            <p className="text-body-lg lg:text-body-xl text-pb-gray-300 leading-relaxed">
              {service.shortDescription}
            </p>

            {/* Full Description */}
            <p className="text-body text-pb-gray-400 leading-relaxed">
              {service.fullDescription}
            </p>

            {/* Features */}
            <div className="space-y-4 lg:space-y-5">
              <h4 className="text-body-lg font-semibold text-pb-white mb-4">Key Deliverables</h4>
              <div className="grid gap-3 lg:gap-4">
                {service.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-lg bg-pb-gray-900/40 border border-pb-gray-800 group-hover:border-pb-gray-700 transition-colors duration-300"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-pb-accent to-pb-electric rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-body text-pb-gray-300 group-hover:text-pb-white transition-colors duration-300 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-8 lg:pt-10">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pb-accent/10 to-pb-electric/10 border border-pb-accent/20 rounded-lg group-hover:from-pb-accent/20 group-hover:to-pb-electric/20 group-hover:border-pb-accent/40 transition-all duration-300 cursor-pointer">
                <span className="text-body lg:text-body-lg font-semibold text-pb-accent">
                  Learn more about {service.title}
                </span>
                <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-pb-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ServiceCards() {
  const [, setHoveredCard] = useState<string | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServicesData()
        setServices(data)
      } catch (error) {
        console.error('Error fetching services data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <section id="services" className="py-32 bg-pb-black text-pb-white">
        <div className="container">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-pb-accent border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-32 bg-pb-black text-pb-white">
      <div className="container">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="text-caption uppercase tracking-wider text-pb-gray-400 mb-6">
            Our Process
          </div>
          <h2 className="text-display font-black text-pb-white max-w-4xl mx-auto mb-8 leading-tight text-wrap-balance avoid-orphans">
            Three steps to product success
          </h2>
        </div>

        {/* Services */}
        <div className="space-y-32">
          {services.map((service, index) => (
            <ServiceCard
              key={service._id}
              service={service}
              index={index}
              onHover={() => setHoveredCard(service._id)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-32 pt-20 border-t border-pb-gray-800 text-center">
          <h3 className="text-h2 font-bold text-pb-white mb-8 max-w-3xl mx-auto">
            Ready to start your journey?
          </h3>
          <p className="text-body-lg text-pb-gray-300 max-w-2xl mx-auto mb-12">
            Book a free consultation to discuss your project and see which service is right for you.
          </p>
          <button className="bg-pb-accent text-pb-white px-12 py-4 font-semibold hover:bg-pb-accent/90 transition-colors rounded-md">
            Book Free Consultation
          </button>
        </div>
      </div>
    </section>
  )
}