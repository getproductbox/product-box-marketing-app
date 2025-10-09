import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-20 bg-pb-black text-pb-white">
      <div className="container">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="text-h3 font-black text-pb-white mb-6">
              Product Box
            </div>
            <p className="text-body text-pb-gray-300 max-w-md mb-8">
              Building AI products and preparing AI-ready teams.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/get-product-box/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pb-gray-800 rounded-full flex items-center justify-center hover:bg-pb-accent transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/productbox"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pb-gray-800 rounded-full flex items-center justify-center hover:bg-pb-accent transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/productbox"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pb-gray-800 rounded-full flex items-center justify-center hover:bg-pb-accent transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-body font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-body-sm text-pb-gray-300">
              <li><Link to="/agent-training" className="hover:text-pb-white transition-colors">Agent Training</Link></li>
              <li><Link to="/product-studio" className="hover:text-pb-white transition-colors">Product Studio</Link></li>
              <li><Link to="/case-studies" className="hover:text-pb-white transition-colors">Case Studies</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-body font-semibold mb-6">Contact</h4>
            <ul className="space-y-3 text-body-sm text-pb-gray-300">
              <li><a href="mailto:hello@getproductbox.com" className="hover:text-pb-white transition-colors">hello@getproductbox.com</a></li>
              <li><a href="#" className="hover:text-pb-white transition-colors">Book a call</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 mt-12 border-t border-pb-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-caption text-pb-gray-400">
            © 2025 Product Box. All rights reserved.
          </p>
          <div className="flex gap-6 text-caption text-pb-gray-400">
            <Link to="/privacy" className="hover:text-pb-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-pb-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}