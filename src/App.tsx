import { ArrowUpRight } from 'lucide-react'
import { PathCard } from './components/PathCard'
import { EXTERNAL_URLS, CTA_TEXT, ROUTES } from './lib/constants'

function App() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pb-12 pt-32 bg-gradient-to-br from-pb-black via-pb-gray-900 to-pb-black text-pb-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pb-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pb-electric/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Headline */}
          <h1 className="text-hero font-black mb-16 leading-[0.9]">
            <span className="bg-gradient-to-r from-pb-accent to-pb-electric bg-clip-text text-transparent">
              Build
            </span>{' '}
            products.
            <br />
            <span className="bg-gradient-to-r from-pb-accent to-pb-electric bg-clip-text text-transparent">
              Prepare
            </span>{' '}
            teams.
          </h1>

          {/* Two Path Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <PathCard
              title="AI Training"
              description="Hands-on workshops that get your team agent-ready"
              linkTo={ROUTES.AGENT_TRAINING}
              accentColor="electric"
              buttonText={CTA_TEXT.LEARN_MORE}
            />
            <PathCard
              title="Product Studio"
              description="AI-powered products from discovery to deployment"
              linkTo={ROUTES.PRODUCT_STUDIO}
              accentColor="accent"
              buttonText={CTA_TEXT.LEARN_MORE}
            />
          </div>

          {/* Below Cards CTA */}
          <div className="mt-12">
            <p className="text-body-xl text-pb-gray-300 mb-6">
              Not sure which path is right for you?
            </p>
            <a
              href={EXTERNAL_URLS.CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-pb-accent text-pb-white px-8 py-4 font-semibold rounded-lg hover:bg-pb-accent/90 hover:scale-105 transition-all duration-300 shadow-xl"
            >
              {CTA_TEXT.BOOK_DISCOVERY_CALL}
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
