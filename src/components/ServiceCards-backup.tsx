import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { useScrollAnimation, useStaggeredScrollAnimation, useMouseProximity } from '../hooks/useScrollAnimation'
import { variants, transitions } from '../lib/animations'

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

// Individual Service Card Component with enhanced animations
interface ServiceCardProps {
  service: typeof services[0]
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  inView: boolean
}

function ServiceCard({ service, index, isHovered, onHover, onLeave, inView }: ServiceCardProps) {
  const mouseProximity = useMouseProximity(150, 0.3)

  return (
    <motion.div
      ref={mouseProximity.ref as any}
      variants={variants.slideUpBlurScale}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group cursor-pointer"
      whileHover={{ 
        y: -8,
        transition: transitions.fast 
      }}
    >
      <motion.div 
        className="grid lg:grid-cols-12 gap-16 items-start p-8 -m-8 rounded-2xl transition-all duration-500"
        animate={{
          backgroundColor: isHovered ? 'rgba(255, 107, 53, 0.05)' : 'rgba(0, 0, 0, 0)',
          boxShadow: isHovered 
            ? '0 20px 40px rgba(255, 107, 53, 0.1)' 
            : '0 0 0 rgba(0, 0, 0, 0)',
        }}
        transition={transitions.medium}
      >
        {/* Number & Title */}
        <div className="lg:col-span-4">
          <div className="sticky top-20">
            <motion.div 
              className="text-h3 font-bold text-pb-accent mb-4"
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                textShadow: isHovered ? '0 0 20px rgba(255, 107, 53, 0.5)' : '0 0 0 rgba(0, 0, 0, 0)',
              }}
              transition={transitions.fast}
            >
              0{index + 1}
            </motion.div>
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
            <motion.p 
              className="text-body-xl text-pb-gray-300 leading-relaxed"
              animate={{ opacity: isHovered ? 1 : 0.8 }}
              transition={transitions.fast}
            >
              {service.description}
            </motion.p>

            {/* Deliverables */}
            <div className="space-y-4">
              {service.deliverables.map((deliverable, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: (index * 0.2) + (i * 0.1) + 0.4 
                  }}
                  className="flex items-start gap-4"
                  whileHover={{ x: 4 }}
                >
                  <motion.div 
                    className="w-1 h-1 bg-pb-electric rounded-full mt-3 flex-shrink-0"
                    animate={{
                      scale: isHovered ? 1.5 : 1,
                      boxShadow: isHovered ? '0 0 10px rgba(0, 217, 255, 0.7)' : '0 0 0 rgba(0, 0, 0, 0)',
                    }}
                    transition={transitions.fast}
                  />
                  <span className="text-body text-pb-white">{deliverable}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              whileHover={{ x: 4 }}
              transition={transitions.fast}
              className="flex items-center gap-3 text-pb-white group pt-8"
            >
              <span className="text-body-lg font-semibold border-b border-pb-gray-600 group-hover:border-pb-white transition-colors">
                Learn more about {service.title}
              </span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ServiceCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Animation hooks
  const headerAnimation = useScrollAnimation({
    variant: 'fadeUpBlur',
    delay: 0.2,
  })

  const servicesAnimation = useStaggeredScrollAnimation(services.length, {
    variant: 'slideUpBlurScale',
    delay: 0.4,
    staggerDelay: 0.2,
  })

  const bottomAnimation = useScrollAnimation({
    variant: 'fadeUp',
    delay: 0.8,
  })

  return (
    <section id="services" className="py-32 bg-pb-black text-pb-white" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          ref={headerAnimation.ref}
          variants={headerAnimation.variants}
          initial={headerAnimation.initial}
          animate={headerAnimation.animate}
          transition={headerAnimation.transition}
          className="mb-20 text-center"
        >
          <div className="text-caption uppercase tracking-wider text-pb-gray-400 mb-6">
            Our Process
          </div>
          <h2 className="text-display font-black text-pb-white max-w-4xl mx-auto mb-8">
            Three steps to
            <br />
            product success
          </h2>
        </motion.div>

        {/* Services */}
        <motion.div
          variants={servicesAnimation.variants}
          initial={servicesAnimation.initial}
          animate={servicesAnimation.animate}
          transition={servicesAnimation.transition}
          className="space-y-32"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isHovered={hoveredCard === service.id}
              onHover={() => setHoveredCard(service.id)}
              onLeave={() => setHoveredCard(null)}
              inView={inView}
            />
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          ref={bottomAnimation.ref}
          variants={bottomAnimation.variants}
          initial={bottomAnimation.initial}
          animate={bottomAnimation.animate}
          transition={bottomAnimation.transition}
          className="mt-32 pt-20 border-t border-pb-gray-800 text-center"
        >
          <h3 className="text-h2 font-bold text-pb-white mb-8 max-w-3xl mx-auto">
            Ready to start your journey?
          </h3>
          <p className="text-body-lg text-pb-gray-300 max-w-2xl mx-auto mb-12">
            Book a free consultation to discuss your project and see which service is right for you.
          </p>
          <motion.button 
            className="bg-pb-accent text-pb-white px-12 py-4 font-semibold hover:bg-pb-accent/90 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Free Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}