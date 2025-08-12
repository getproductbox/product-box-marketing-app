import { ArrowUpRight } from 'lucide-react'
import { cn } from '../lib/utils'
import { useState, useEffect } from 'react'
import { getCaseStudiesData } from '../lib/data'
import { urlFor } from '../lib/sanity'
import type { CaseStudy } from '../types/sanity'

// Individual Case Study Card Component
interface CaseStudyCardProps {
  study: CaseStudy
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

function CaseStudyCard({ study, index, isHovered, onHover, onLeave }: CaseStudyCardProps) {
  const imageUrl = study.image && urlFor(study.image)?.url() || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&q=80'
  
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
    >
      <div className={cn(
        "grid lg:grid-cols-2 gap-8 lg:gap-16 items-center",
        index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
      )}>
        {/* Image */}
        <div className={cn(
          "relative aspect-[16/10] lg:aspect-[4/3] overflow-hidden bg-pb-black rounded-lg",
          index % 2 === 1 ? "lg:col-start-2" : ""
        )}>
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              alt={study.image?.alt || `${study.client} ${study.tagline} case study`}
              loading="lazy"
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
          "space-y-6 lg:space-y-8",
          index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
        )}>
          <div>
            <div className={cn(
              "text-caption uppercase tracking-wider mb-4 transition-colors duration-300",
              isHovered ? "text-pb-accent" : "text-pb-gray-500"
            )}>
              {study.tagline}
            </div>
            
            <h3 className="text-h2 lg:text-h1 font-bold text-pb-black mb-4 lg:mb-6 group-hover:translate-x-1 transition-transform duration-300 break-words hyphens-auto">
              {study.client}
            </h3>
            
            <p className="text-body lg:text-body-lg text-pb-gray-700 leading-relaxed">
              {study.description}
            </p>
          </div>

          {/* Metrics */}
          <div className="space-y-3 lg:space-y-4">
            {study.metrics.map((metric, i) => (
              <div
                key={i}
                className="flex items-start gap-3 lg:gap-4 py-2 lg:py-3 border-b border-pb-gray-100 last:border-0 rounded-md px-2 -mx-2 hover:bg-pb-accent/5 hover:translate-x-2 transition-all duration-300"
              >
                <div className={cn(
                  "rounded-full bg-pb-accent transition-all duration-300 mt-2 flex-shrink-0",
                  isHovered ? "w-2 h-2" : "w-1.5 h-1.5"
                )} />
                <span className="text-body-sm lg:text-body font-medium text-pb-black break-words">{metric}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="group flex items-center gap-3 text-pb-black font-semibold hover:translate-x-2 transition-transform duration-300">
            <span className="text-body-sm lg:text-body border-b-2 border-pb-black/20 group-hover:border-pb-accent transition-colors">
              View full case study
            </span>
            <ArrowUpRight className={cn(
              "w-4 h-4 transition-transform duration-300 flex-shrink-0",
              isHovered ? "translate-x-0.5 -translate-y-0.5 rotate-6" : ""
            )} />
          </button>
        </div>
      </div>
    </div>
  )
}

export function CaseStudies() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCaseStudiesData()
        setCaseStudies(data)
      } catch (error) {
        console.error('Error fetching case studies data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <section id="work" className="py-32 bg-pb-white relative">
        <div className="container relative z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-pb-accent border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </section>
    )
  }

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
          <h2 className="text-display font-black text-pb-black max-w-4xl mx-auto mb-8 leading-tight text-wrap-balance avoid-orphans">
            Case studies that prove we know what we're doing
          </h2>
          <p className="text-body-lg text-pb-gray-600 max-w-2xl mx-auto leading-relaxed">
            Real companies, real results. Each project demonstrates our ability to transform ideas into market-winning products.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-24">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={study._id}
              study={study}
              index={index}
              isHovered={hoveredCard === study._id}
              onHover={() => setHoveredCard(study._id)}
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