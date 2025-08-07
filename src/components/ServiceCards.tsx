import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

const services = [
  {
    id: 'vision',
    title: 'Vision',
    deliverables: [
      'Market research & validation',
      'Interactive prototypes',
      'Pitch deck preparation'
    ],
    timeline: '1 week',
    price: '£1k',
    description: 'Transform your concept into a compelling, validated product vision that attracts investors and excites users.'
  },
  {
    id: 'scale', 
    title: 'Scale',
    deliverables: [
      'MVP development',
      'Quality assurance',
      'Launch preparation'
    ],
    timeline: '6+ weeks',
    price: '£10k+',
    description: 'Go from prototype to production-ready product with a scalable foundation built for growth.'
  },
  {
    id: 'thrive',
    title: 'Thrive',
    deliverables: [
      'Ongoing maintenance',
      'Feature enhancements',
      'Technical support'
    ],
    timeline: 'Ongoing',
    price: '£500/month',
    description: 'Keep your product running smoothly while we handle all the technical complexities behind the scenes.'
  }
]

function ServiceCard({ 
  service, 
  index, 
  isHovered: _isHovered, 
  onHover, 
  onLeave
}: { 
  service: typeof services[0]
  index: number
  isHovered?: boolean
  onHover?: () => void
  onLeave?: () => void
}) {
  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="grid lg:grid-cols-12 gap-16 items-start p-8 -m-8 rounded-2xl">
        {/* Number & Title */}
        <div className="lg:col-span-4">
          <div className="sticky top-20">
            <div className="text-h3 font-bold text-pb-accent mb-4">
              0{index + 1}
            </div>
            <h3 className="text-hero font-black text-pb-white mb-8">
              {service.title}
            </h3>

            {/* Pricing */}
            <div className="flex items-center justify-between py-4 border-t border-pb-gray-800">
              <div>
                <div className="text-caption text-pb-gray-500 mb-1">Timeline</div>
                <div className="text-body font-semibold">{service.timeline}</div>
              </div>
              <div className="text-right">
                <div className="text-caption text-pb-gray-500 mb-1">Investment</div>
                <div className="text-body font-semibold">{service.price}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-8">
          <div className="space-y-12">
            {/* Description */}
            <p className="text-body-xl text-pb-gray-300 leading-relaxed">
              {service.description}
            </p>

            {/* Deliverables */}
            <div className="space-y-4">
              {service.deliverables.map((deliverable, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4"
                >
                  <div className="w-1 h-1 bg-pb-electric rounded-full mt-3 flex-shrink-0" />
                  <span className="text-body text-pb-white">{deliverable}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3 text-pb-white group pt-8">
              <span className="text-body-lg font-semibold border-b border-pb-gray-600 group-hover:border-pb-white transition-colors">
                Learn more about {service.title}
              </span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ServiceCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="services" className="py-32 bg-pb-black text-pb-white">
      <div className="container">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="text-caption uppercase tracking-wider text-pb-gray-400 mb-6">
            Our Process
          </div>
          <h2 className="text-display font-black text-pb-white max-w-4xl mx-auto mb-8">
            Three steps to
            <br />
            product success
          </h2>
        </div>

        {/* Services */}
        <div className="space-y-32">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isHovered={hoveredCard === service.id}
              onHover={() => setHoveredCard(service.id)}
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