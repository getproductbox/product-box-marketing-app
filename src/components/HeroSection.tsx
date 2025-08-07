import { ArrowUpRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-pb-black via-pb-gray-900 to-pb-black text-pb-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pb-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pb-electric/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <div className="text-caption uppercase tracking-wider text-pb-electric mb-6">
          Welcome to Product Box
        </div>
        
        <h1 className="text-hero font-black mb-8 leading-none">
          Turn your{' '}
          <span className="bg-gradient-to-r from-pb-accent to-pb-electric bg-clip-text text-transparent">
            idea
          </span>
          {' '}into a{' '}
          <span className="bg-gradient-to-r from-pb-electric to-pb-accent bg-clip-text text-transparent">
            product
          </span>
        </h1>
        
        <p className="text-body-xl text-pb-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          We're the product development partner that takes you from initial concept to market success. 
          <span className="text-pb-white font-medium"> Vision. Scale. Thrive.</span> 
          {' '}Three phases, one incredible journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="bg-pb-accent text-pb-white px-8 py-4 font-semibold rounded-md hover:bg-pb-accent/90 hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-pb-accent/20 flex items-center gap-3">
            Start Your Journey
            <ArrowUpRight className="w-5 h-5" />
          </button>
          
          <button className="text-pb-white border border-pb-gray-600 px-8 py-4 font-semibold rounded-md hover:border-pb-white hover:bg-pb-white/5 transition-all duration-300">
            View Our Work
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-h2 font-bold text-pb-accent mb-2">48hrs</div>
            <div className="text-body-sm text-pb-gray-400">Response time</div>
          </div>
          <div className="text-center">
            <div className="text-h2 font-bold text-pb-electric mb-2">100+</div>
            <div className="text-body-sm text-pb-gray-400">Products launched</div>
          </div>
          <div className="text-center">
            <div className="text-h2 font-bold text-pb-white mb-2">$50M+</div>
            <div className="text-body-sm text-pb-gray-400">Value created</div>
          </div>
        </div>
      </div>
    </section>
  )
}