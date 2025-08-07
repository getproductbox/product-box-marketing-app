import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Linkedin, Twitter, Github, ArrowUpRight } from 'lucide-react'

export function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-pb-black text-pb-white py-20" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-display font-black text-pb-white max-w-4xl mx-auto mb-8">
            Ready to build
            <br />
            something amazing?
          </h2>
          <p className="text-body-lg text-pb-gray-300 max-w-2xl mx-auto mb-12">
            Let's talk about your project. We respond to every inquiry within 24 hours.
          </p>
          <button className="group bg-pb-accent text-pb-white px-12 py-4 font-semibold hover:bg-pb-accent/90 transition-all duration-300 flex items-center gap-3 mx-auto">
            <span>Get in Touch</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-pb-gray-800 pt-16"
        >
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Brand */}
            <div>
              <h3 className="text-h3 font-bold mb-6">Product Box</h3>
              <p className="text-body text-pb-gray-400 mb-8 max-w-sm">
                Digital product studio turning startup ideas into market-winning products.
              </p>
              <div className="flex gap-4">
                <a
                  href="mailto:hello@getproductbox.com"
                  className="w-12 h-12 border border-pb-gray-700 rounded-full flex items-center justify-center hover:border-pb-white hover:bg-pb-white hover:text-pb-black transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 border border-pb-gray-700 rounded-full flex items-center justify-center hover:border-pb-white hover:bg-pb-white hover:text-pb-black transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 border border-pb-gray-700 rounded-full flex items-center justify-center hover:border-pb-white hover:bg-pb-white hover:text-pb-black transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 border border-pb-gray-700 rounded-full flex items-center justify-center hover:border-pb-white hover:bg-pb-white hover:text-pb-black transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-body-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Vision', desc: 'Prototype & Validate' },
                  { name: 'Scale', desc: 'Build & Launch' },
                  { name: 'Thrive', desc: 'Maintain & Grow' }
                ].map((service) => (
                  <li key={service.name}>
                    <a 
                      href={`#${service.name.toLowerCase()}`} 
                      className="group flex items-start gap-3 text-pb-gray-400 hover:text-pb-white transition-colors"
                    >
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-body-sm opacity-70">{service.desc}</div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 mt-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-body-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-4">
                {[
                  'About Us',
                  'Our Work', 
                  'Case Studies',
                  'Blog',
                  'Careers'
                ].map((link) => (
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase().replace(' ', '-')}`}
                      className="text-pb-gray-400 hover:text-pb-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-pb-gray-800">
            <p className="text-body-sm text-pb-gray-500">
              © {currentYear} Product Box. All rights reserved.
            </p>
            <div className="flex gap-8 text-body-sm">
              <a href="#privacy" className="text-pb-gray-500 hover:text-pb-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-pb-gray-500 hover:text-pb-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}