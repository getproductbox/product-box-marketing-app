import { useState, useEffect } from 'react'
import { TestimonialCard } from './design-system/molecules/TestimonialCard'
import { getTestimonialsData } from '../lib/data'
import type { Testimonial } from '../types/sanity'

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTestimonialsData()
        setTestimonials(data)
      } catch (error) {
        console.error('Error fetching testimonials data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-pb-black via-pb-gray-950 to-pb-black relative overflow-hidden">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-pb-accent border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    )
  }
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-pb-black via-pb-gray-950 to-pb-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pb-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pb-electric/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-caption uppercase tracking-wider text-pb-electric mb-4">
            Client Success Stories
          </div>
          <h2 className="text-h1 font-black text-pb-white mb-6">
            Trusted by <span className="bg-gradient-to-r from-pb-accent to-pb-electric bg-clip-text text-transparent">Growing Companies</span>
          </h2>
          <p className="text-body-lg text-pb-gray-300 max-w-3xl mx-auto">
            From early-stage startups to scaling companies, see how our comprehensive approach transforms operations and accelerates growth.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial._id}
              quote={testimonial.quote}
              client={testimonial.client}
              company={testimonial.company}
              role={testimonial.role}
              variant={testimonial.variant}
              className="h-full"
            />
          ))}
        </div>

        {/* Trust Signals */}
        <div className="mt-16 pt-16 border-t border-pb-gray-800">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
            <div>
              <div className="text-h2 font-bold text-pb-accent mb-2">500+</div>
              <div className="text-body-sm text-pb-gray-400">Companies Served</div>
            </div>
            <div>
              <div className="text-h2 font-bold text-pb-electric mb-2">98%</div>
              <div className="text-body-sm text-pb-gray-400">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-h2 font-bold text-pb-white mb-2">2-4wks</div>
              <div className="text-body-sm text-pb-gray-400">Average Delivery</div>
            </div>
            <div>
              <div className="text-h2 font-bold text-pb-accent mb-2">24/7</div>
              <div className="text-body-sm text-pb-gray-400">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}