import { Link } from 'react-router-dom'

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
              We turn your ideas into market-winning products. From vision to scale to thrive.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-pb-gray-800 rounded-full"></div>
              <div className="w-10 h-10 bg-pb-gray-800 rounded-full"></div>
              <div className="w-10 h-10 bg-pb-gray-800 rounded-full"></div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-body font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-body-sm text-pb-gray-300">
              <li><a href="#" className="hover:text-pb-white transition-colors">Vision</a></li>
              <li><a href="#" className="hover:text-pb-white transition-colors">Scale</a></li>
              <li><a href="#" className="hover:text-pb-white transition-colors">Thrive</a></li>
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
            © 2024 Product Box. All rights reserved.
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