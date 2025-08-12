import { ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getHeroData } from '../lib/data'
import type { Hero } from '../types/sanity'
import { useAnalytics } from '../providers/AnalyticsProvider'
import { useABTesting, AB_TESTS } from '../hooks/useABTesting'

export function HeroSection() {
  const [heroData, setHeroData] = useState<Hero | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const analytics = useAnalytics()
  
  // A/B test for CTA button text
  const ctaButtonTest = useABTesting(AB_TESTS.HERO_CTA_BUTTON)
  
  // A/B test for headline text
  const headlineTest = useABTesting(AB_TESTS.HERO_HEADLINE)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHeroData()
        setHeroData(data)
      } catch (error) {
        console.error('Error fetching hero data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (isLoading || !heroData) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 py-20 pt-32 bg-gradient-to-br from-pb-black via-pb-gray-900 to-pb-black text-pb-white relative overflow-hidden">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-pb-accent border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 pt-32 bg-gradient-to-br from-pb-black via-pb-gray-900 to-pb-black text-pb-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pb-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pb-electric/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <div className="text-caption uppercase tracking-wider text-pb-electric mb-6">
          {heroData.subtitle}
        </div>
        
        <h1 className="text-hero font-black mb-8 leading-none text-wrap-balance avoid-orphans">
          {(() => {
            // Use A/B test headline if available, otherwise use CMS data
            const displayTitle = (() => {
              if (headlineTest.variant && !headlineTest.isLoading) {
                const testVariant = AB_TESTS.HERO_HEADLINE.variants.find(v => v.id === headlineTest.variant)
                return testVariant?.name || heroData.title
              }
              return heroData.title
            })()
            
            // Parse gradient markers: *word* becomes gradient
            return displayTitle.split(' ').map((word, index) => {
              if (word.startsWith('*') && word.endsWith('*') && word.length > 2) {
                const cleanWord = word.slice(1, -1)
                return (
                  <span key={index} className="bg-gradient-to-r from-pb-accent to-pb-electric bg-clip-text text-transparent">
                    {cleanWord}{' '}
                  </span>
                )
              }
              return word + ' '
            })
          })()}
        </h1>
        
        <p className="text-body-xl text-pb-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          {heroData.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            href={heroData.primaryButtonLink} 
            className="bg-pb-accent text-pb-white px-8 py-4 font-semibold rounded-md hover:bg-pb-accent/90 hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-pb-accent/20 flex items-center gap-3"
            data-button-type="cta-primary"
            onClick={() => {
              analytics.trackButtonClick(
                ctaButtonTest.variant && !ctaButtonTest.isLoading
                  ? AB_TESTS.HERO_CTA_BUTTON.variants.find(v => v.id === ctaButtonTest.variant)?.name || heroData.primaryButtonText
                  : heroData.primaryButtonText,
                'hero',
                { 
                  testVariant: ctaButtonTest.variant,
                  buttonType: 'primary'
                }
              )
              ctaButtonTest.trackConversion('CONTACT_FORM_SUBMIT')
            }}
          >
            {ctaButtonTest.variant && !ctaButtonTest.isLoading
              ? AB_TESTS.HERO_CTA_BUTTON.variants.find(v => v.id === ctaButtonTest.variant)?.name || heroData.primaryButtonText
              : heroData.primaryButtonText
            }
            <ArrowUpRight className="w-5 h-5" />
          </a>
          
          <a 
            href={heroData.secondaryButtonLink} 
            className="text-pb-white border border-pb-gray-600 px-8 py-4 font-semibold rounded-md hover:border-pb-white hover:bg-pb-white/5 transition-all duration-300"
            data-button-type="cta-secondary"
            onClick={() => {
              analytics.trackButtonClick(heroData.secondaryButtonText, 'hero', { 
                buttonType: 'secondary'
              })
            }}
          >
            {heroData.secondaryButtonText}
          </a>
        </div>

        <div className="mt-20 grid gap-8 max-w-4xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {heroData.stats.map((stat, index) => (
            <div key={stat._key} className="text-center">
              <div className={`text-h2 font-bold mb-2 ${
                index === 0 ? 'text-pb-accent' : 
                index === 1 ? 'text-pb-electric' : 
                'text-pb-white'
              }`}>
                {stat.value}
              </div>
              <div className="text-body-sm text-pb-gray-400 max-w-[200px] mx-auto">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}