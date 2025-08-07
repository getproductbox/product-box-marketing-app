import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowDown } from 'lucide-react'
import { useTextRevealAnimation, useScrollAnimation, useSmoothScroll, useSectionVisibility } from '../hooks/useScrollAnimation'
import { transitions } from '../lib/animations'

export function HeroSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Smooth scroll navigation
  const { scrollToSection } = useSmoothScroll()
  const activeSection = useSectionVisibility(['hero', 'services', 'work', 'contact'])

  // Text reveal animations
  const heroText1 = useTextRevealAnimation('We build products', {
    variant: 'fadeUpBlur',
    delay: 0.3,
    staggerDelay: 0.08,
  })

  const heroText2 = useTextRevealAnimation('that actually work', {
    variant: 'fadeUpBlur', 
    delay: 0.7,
    staggerDelay: 0.1,
  })

  const subtitleAnimation = useScrollAnimation({
    variant: 'fadeUpBlur',
    delay: 1.1,
  })

  const statsAnimation = useScrollAnimation({
    variant: 'fadeUp',
    delay: 1.3,
  })

  return (
    <section id="hero" className="min-h-screen bg-pb-black text-pb-white relative overflow-hidden" ref={ref}>
      <div className="container h-screen flex flex-col justify-between py-8">
        {/* Enhanced Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center relative z-20"
        >
          <motion.div 
            className="text-body font-medium cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('hero')}
          >
            Product Box
          </motion.div>
          <div className="flex gap-8 text-body-sm">
            {[
              { label: 'Work', id: 'work' },
              { label: 'Services', id: 'services' },
              { label: 'Contact', id: 'contact' }
            ].map(({ label, id }) => (
              <motion.button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`transition-colors hover:text-pb-electric relative ${
                  activeSection === id ? 'text-pb-accent' : 'text-pb-gray-300'
                }`}
                whileHover={{ y: -2 }}
                transition={transitions.fast}
              >
                {label}
                {activeSection === id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-pb-accent rounded-full"
                    layoutId="activeIndicator"
                    transition={transitions.fast}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.nav>

        {/* Main Content */}
        <div className="flex-1 flex items-center">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="text-caption uppercase tracking-wider text-pb-gray-400 mb-6">
                Digital Product Studio
              </div>
              
              <h1 className="text-hero font-black mb-8 max-w-5xl">
                {/* First line with progressive reveal */}
                <motion.div
                  ref={heroText1.ref}
                  variants={heroText1.containerVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="mb-2"
                >
                  {heroText1.textParts.map((word, index) => (
                    <motion.span
                      key={index}
                      variants={heroText1.itemVariants}
                      className="inline-block mr-6"
                    >
                      {word === 'products' ? (
                        <span className="text-pb-accent">{word}</span>
                      ) : (
                        word
                      )}
                    </motion.span>
                  ))}
                </motion.div>
                
                {/* Second line with progressive reveal */}
                <motion.div
                  ref={heroText2.ref}
                  variants={heroText2.containerVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  {heroText2.textParts.map((word, index) => (
                    <motion.span
                      key={index}
                      variants={heroText2.itemVariants}
                      className="inline-block mr-6"
                    >
                      {word === 'actually' ? (
                        <span className="italic text-pb-electric">{word}</span>
                      ) : (
                        word
                      )}
                    </motion.span>
                  ))}
                </motion.div>
              </h1>
              
              <motion.p 
                ref={subtitleAnimation.ref}
                variants={subtitleAnimation.variants}
                initial={subtitleAnimation.initial}
                animate={subtitleAnimation.animate}
                transition={subtitleAnimation.transition}
                className="text-body-xl text-pb-gray-300 max-w-2xl mb-12 leading-relaxed"
              >
                From startup idea to market leader. We've launched 50+ products 
                in 3-6 weeks that have raised over $50M in funding.
              </motion.p>
              
              <motion.div 
                className="flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <motion.button 
                  className="group bg-pb-accent text-pb-white px-8 py-4 font-semibold hover:bg-pb-accent/90 transition-all duration-300 flex items-center gap-3"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Your Project</span>
                  <ArrowDown className="w-4 h-4 rotate-[-45deg] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
                
                <motion.button 
                  className="text-pb-white border border-pb-electric px-8 py-4 font-semibold hover:border-pb-electric hover:text-pb-electric transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Our Work
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats Strip */}
        <motion.div
          ref={statsAnimation.ref}
          variants={statsAnimation.variants}
          initial={statsAnimation.initial}
          animate={statsAnimation.animate}
          transition={statsAnimation.transition}
          className="grid grid-cols-3 md:grid-cols-5 gap-8 border-t border-pb-gray-800 pt-8"
        >
          {[
            { number: '50+', label: 'Products Launched' },
            { number: '$50M+', label: 'Funding Raised' },
            { number: '3-6', label: 'Weeks to Launch' },
            { number: '70%', label: 'Cost Reduction' },
            { number: '24hr', label: 'Response Time' },
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <div className="text-h3 font-bold mb-1">{stat.number}</div>
              <div className="text-body-sm text-pb-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="text-caption text-pb-gray-500 uppercase tracking-wider">Scroll</div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-pb-gray-500" />
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pb-gray-900/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pb-accent to-pb-electric" />
    </section>
  )
}