import { ArrowUpRight } from 'lucide-react'
import { cn } from '../lib/utils'
import { useState } from 'react'

const caseStudies = [
  {
    id: 1,
    client: 'TechFlow',
    service: 'Scale',
    tagline: 'AI Analytics Platform',
    description: 'Transformed a complex data visualization concept into a market-leading product that secured $2M in seed funding.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&q=80',
    metrics: ['8 weeks to market', '+250% user growth', '$2M raised'],
    year: '2024'
  },
  {
    id: 2,
    client: 'GreenCart',
    service: 'Vision',
    tagline: 'Sustainable E-commerce',
    description: 'Created a comprehensive brand identity and digital platform for sustainable shopping that attracted major VC interest.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&q=80',
    metrics: ['3 week prototype', '15 VCs interested', '92% user validation'],
    year: '2024'
  },
  {
    id: 3,
    client: 'HealthHub',
    service: 'Thrive',
    tagline: 'Telemedicine Platform',
    description: 'Scaled a healthcare platform from 5K to 50K patients while maintaining 99.9% uptime and reducing operational costs.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&q=80',
    metrics: ['99.9% uptime', '10x patient growth', '40% cost reduction'],
    year: '2023'
  },
  {
    id: 4,
    client: 'EduLearn',
    service: 'Scale',
    tagline: 'Learning Platform',
    description: 'Built a comprehensive LMS with advanced features that was acquired for $5M within 18 months of launch.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&q=80',
    metrics: ['10 week build', '25K+ students', '$5M acquisition'],
    year: '2023'
  }
]

// Individual Case Study Card Component
interface CaseStudyCardProps {
  study: typeof caseStudies[0]
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

function CaseStudyCard({ study, index, isHovered, onHover, onLeave }: CaseStudyCardProps) {

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
    >
      <div className={cn(
        "grid lg:grid-cols-2 gap-16 items-center",
        index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
      )}>
        {/* Image */}
        <div className={cn(
          "relative aspect-[4/3] overflow-hidden bg-pb-black rounded-lg",
          index % 2 === 1 ? "lg:col-start-2" : ""
        )}>
          <div className="relative w-full h-full">
            <img
              src={study.image}
              alt={study.client}
              className={cn(
                "w-full h-full object-cover transition-transform duration-500",
                isHovered ? "scale-110" : "scale-105"
              )}
            />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-pb-black/40 via-transparent to-transparent" />
          
          {/* Hover Overlay */}
          <div className={cn(
            "absolute inset-0 bg-pb-black/60 flex items-center justify-center transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <div className="text-center text-pb-white">
              <div className="text-body-sm mb-4 opacity-90">View Case Study</div>
              <ArrowUpRight className={cn(
                "w-12 h-12 mx-auto transition-transform duration-300",
                isHovered ? "rotate-45" : "rotate-0"
              )} />
            </div>
          </div>

          {/* Year Badge */}
          <div className={cn(
            "absolute top-6 right-6 backdrop-blur-sm text-pb-electric px-3 py-1 text-body-sm font-medium border rounded-md transition-all duration-300",
            isHovered 
              ? "bg-pb-electric/10 border-pb-electric/40 shadow-lg shadow-pb-electric/20" 
              : "bg-pb-electric/5 border-pb-electric/20"
          )}>
            {study.year}
          </div>
        </div>

        {/* Content */}
        <div className={cn(
          "space-y-8",
          index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
        )}>
          <div>
            <div className={cn(
              "text-caption uppercase tracking-wider mb-4 transition-colors duration-300",
              isHovered ? "text-pb-accent" : "text-pb-gray-500"
            )}>
              {study.service} • {study.tagline}
            </div>
            
            <h3 className="text-h1 font-bold text-pb-black mb-6 group-hover:translate-x-1 transition-transform duration-300">
              {study.client}
            </h3>
            
            <p className="text-body-lg text-pb-gray-700 leading-relaxed">
              {study.description}
            </p>
          </div>

          {/* Metrics */}
          <div className="space-y-4">
            {study.metrics.map((metric, i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-3 border-b border-pb-gray-100 last:border-0 rounded-md px-2 -mx-2 hover:bg-pb-accent/5 hover:translate-x-2 transition-all duration-300"
              >
                <div className={cn(
                  "rounded-full bg-pb-accent transition-all duration-300",
                  isHovered ? "w-2 h-2" : "w-1.5 h-1.5"
                )} />
                <span className="text-body font-medium text-pb-black">{metric}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="group flex items-center gap-3 text-pb-black font-semibold hover:translate-x-2 transition-transform duration-300">
            <span className="border-b-2 border-pb-black/20 group-hover:border-pb-accent transition-colors">
              View full case study
            </span>
            <ArrowUpRight className={cn(
              "w-4 h-4 transition-transform duration-300",
              isHovered ? "translate-x-0.5 -translate-y-0.5 rotate-6" : ""
            )} />
          </button>
        </div>
      </div>
    </div>
  )
}

export function CaseStudies() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="work" className="py-32 bg-pb-white relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-pb-gray-50 via-transparent to-pb-gray-50" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="text-caption uppercase tracking-wider mb-6 bg-gradient-to-r from-pb-accent to-pb-electric bg-clip-text text-transparent">
            Selected Work
          </div>
          <h2 className="text-display font-black text-pb-black max-w-4xl mx-auto mb-8">
            Case studies that prove
            <br />
            we know what we're doing
          </h2>
          <p className="text-body-lg text-pb-gray-600 max-w-2xl mx-auto">
            Real companies, real results. Each project demonstrates our ability to 
            transform ideas into market-winning products.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-24">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              index={index}
              isHovered={hoveredCard === study.id}
              onHover={() => setHoveredCard(study.id)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 text-center relative">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-pb-accent/5 via-pb-electric/5 to-pb-accent/5 rounded-3xl blur-3xl -z-10" />
          
          <div className="text-caption uppercase tracking-wider mb-6 bg-gradient-to-r from-pb-accent to-pb-electric bg-clip-text text-transparent">
            Ready to Join Them?
          </div>
          
          <h3 className="text-h2 font-bold text-pb-black mb-8 max-w-2xl mx-auto">
            Let's build your success story
          </h3>
          
          <button className="bg-pb-accent text-pb-white px-12 py-4 font-semibold rounded-md hover:bg-pb-accent/90 hover:scale-105 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pb-accent/30 transition-all duration-300">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  )
}