import { TestimonialCard } from './design-system/molecules/TestimonialCard'

const testimonials = [
  {
    id: '1',
    quote: "We were just three founders with a climate-focused idea struggling to turn our vision into reality. Product Box didn't just build our platform – they became our operational backbone. Their Vision phase mapped our entire business architecture, the Mobilise phase built our SaaS platform that now serves 500+ companies, and their Support phase keeps us scaling smoothly. Without them, we'd still be stuck in spreadsheets instead of revolutionizing how businesses measure their carbon footprint.",
    client: "Sarah Chen",
    company: "Carbon Compared",
    role: "Co-founder & CEO",
    variant: "featured" as const
  },
  {
    id: '2',
    quote: "As a startup accelerator, we've worked with dozens of development teams, but Product Box is different. They understand that early-stage companies need more than just code – they need operational excellence. Their three-phase approach (Vision, Mobilise, Support) perfectly mirrors how we help startups scale. They've built internal tools for 12 of our portfolio companies, and every single one has seen dramatic improvements in operational efficiency. They're not just developers; they're growth partners.",
    client: "Marcus Rodriguez",
    company: "Vision Pitch",
    role: "Managing Partner",
    variant: "featured" as const
  },
  {
    id: '3',
    quote: "Finding the right technical partner felt impossible until we discovered Product Box. Their ability to understand complex business operations and translate them into elegant software solutions is unmatched. They built our entire workflow management system in 6 weeks, complete with automated processes that saved us 40+ hours per week. But what really impressed us was their Support phase – they've continued optimizing our systems as we've grown from 5 to 50 employees, always staying ahead of our needs.",
    client: "Emma Thompson",
    company: "Digs",
    role: "Operations Director",
    variant: "featured" as const
  }
]

export function TestimonialsSection() {
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
            From early-stage startups to scaling companies, see how our three-phase approach transforms operations and accelerates growth.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
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