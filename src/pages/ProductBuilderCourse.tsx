import { useEffect, useState, useRef } from 'react'
import { SEOHead } from '../components/SEOHead'
import { BookingModal } from '../components/BookingModal'
import { CourseBackgroundEffects } from '../components/CourseBackgroundEffects'
import { ScrollProgressIndicator } from '../components/ScrollProgressIndicator'
import { Container } from '../components/Container'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { TEAM_MEMBERS } from '../lib/constants'
import { MessageCircle, CheckCircle2 } from 'lucide-react'

export function ProductBuilderCourse() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  // Create refs for scroll reveal animations
  const heroRef = useRef<HTMLDivElement | null>(null)
  const whoRef = useRef<HTMLDivElement | null>(null)
  const useCasesRef = useRef<HTMLDivElement | null>(null)
  const learningRef = useRef<HTMLDivElement | null>(null)
  const plusRef = useRef<HTMLDivElement | null>(null)

  // Apply scroll reveal hooks
  const heroReveal = useScrollReveal(heroRef as React.RefObject<HTMLElement>, { triggerOnce: true })
  const whoReveal = useScrollReveal(whoRef as React.RefObject<HTMLElement>, { triggerOnce: true, threshold: 0.2 })
  const useCasesReveal = useScrollReveal(useCasesRef as React.RefObject<HTMLElement>, { triggerOnce: true, threshold: 0.2 })
  const learningReveal = useScrollReveal(learningRef as React.RefObject<HTMLElement>, { triggerOnce: true, threshold: 0.2 })
  const plusReveal = useScrollReveal(plusRef as React.RefObject<HTMLElement>, { triggerOnce: true, threshold: 0.2 })

  const sections = [
    { id: 'hero', label: 'Intro' },
    { id: 'who', label: 'Who' },
    { id: 'use-cases', label: 'Cases' },
    { id: 'learning', label: 'Learn' },
    { id: 'plus', label: 'Plus' },
  ]

  useEffect(() => {
    document.title = 'The Product Builder Course - Product Box'
  }, [])

  return (
    <>
      <SEOHead
        title="The Product Builder Course - Product Box"
        description="Master AI-powered product building. Learn agentic work practices, code design, deployment, and build complete software projects without traditional engineering."
        canonical="/product-builder-course"
      />

      <CourseBackgroundEffects />
      <ScrollProgressIndicator sections={sections} />

      <div className="min-h-screen bg-pb-black pt-32 pb-16 relative z-10">
        <Container size="wide">
          <div className="bg-gradient-to-b from-pb-gray-900 to-pb-gray-900/50 rounded-2xl border border-pb-gray-700/50 backdrop-blur-sm p-8 lg:p-16 shadow-hard">
            {/* Hero Section */}
            <section
              ref={heroRef}
              id="hero"
              className={`transition-all duration-1000 ${
                heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Main Heading */}
              <h1 className="text-display font-black bg-gradient-to-r from-pb-accent via-pb-electric to-pb-accent bg-clip-text text-transparent mb-6 leading-tight">
                Become a Product Builder
              </h1>

              {/* Intro Blurb */}
              <p className="text-body text-pb-gray-300 mb-12 max-w-2xl leading-relaxed">
                Stop waiting for engineers to make simple product changes. Learn to ship bug fixes, UI updates, and small features yourself—turning <span className="text-pb-electric font-semibold">days of back-and-forth</span> into <span className="text-pb-accent font-semibold">hours of focused work</span>.
              </p>

              {/* CTA Button - enhanced styling */}
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-pb-accent to-pb-electric hover:shadow-glow-accent text-pb-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                Book Discovery Call
              </button>
            </section>

            <div className="space-y-16 text-pb-gray-300">
              {/* Who it's for Section */}
              <section
                ref={whoRef}
                id="who"
                className={`pt-12 border-t border-pb-gray-700/50 transition-all duration-1000 ${
                  whoReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-h2 font-bold bg-gradient-to-r from-pb-white to-pb-gray-300 bg-clip-text text-transparent mb-8">
                  Who it's for
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-pb-accent/10 to-transparent border border-pb-accent/30 rounded-xl p-6 hover:border-pb-accent/60 hover:shadow-glow-accent transition-all duration-300">
                    <div className="flex items-start gap-3 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-pb-accent flex-shrink-0 mt-0.5" />
                      <p className="text-body font-medium text-pb-white">
                        PMs / Designers
                      </p>
                    </div>
                    <p className="text-body text-pb-gray-400 ml-8">
                      Who want to release low-risk changes without engineering
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-pb-electric/10 to-transparent border border-pb-electric/30 rounded-xl p-6 hover:border-pb-electric/60 hover:shadow-glow-electric transition-all duration-300">
                    <div className="flex items-start gap-3 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-pb-electric flex-shrink-0 mt-0.5" />
                      <p className="text-body font-medium text-pb-white">
                        Founding Teams
                      </p>
                    </div>
                    <p className="text-body text-pb-gray-400 ml-8">
                      Who want to build 0 → 1 without hiring engineers
                    </p>
                  </div>
                </div>
              </section>

              {/* Real-world use cases Section */}
              <section
                ref={useCasesRef}
                id="use-cases"
                className={`pt-12 border-t border-pb-gray-700/50 transition-all duration-1000 ${
                  useCasesReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-h2 font-bold bg-gradient-to-r from-pb-white to-pb-gray-300 bg-clip-text text-transparent mb-8">
                  Real-world use cases
                </h2>

                <div className="space-y-6">
                  {/* Emergency Bug Fixes */}
                  <div className="group bg-gradient-to-br from-pb-accent/15 via-pb-gray-800/50 to-pb-gray-900/50 border border-pb-accent/30 rounded-xl p-8 hover:border-pb-accent/60 hover:shadow-glow-accent transition-all duration-300 hover:translate-y-[-4px]">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-pb-accent mt-2 flex-shrink-0" />
                      <h3 className="text-h3 font-semibold text-pb-accent">
                        Ship quick fixes 10x faster
                      </h3>
                    </div>
                    <p className="text-body text-pb-gray-300 ml-5">
                      Launch day and your pricing page shows the wrong numbers? Key feature link goes nowhere? <span className="text-pb-white font-medium">Fix it yourself</span>. Address urgent issues in real-time without scrambling to find available engineers or rolling back the entire release.
                    </p>
                  </div>

                  {/* Analytics Enhancements */}
                  <div className="group bg-gradient-to-br from-pb-electric/15 via-pb-gray-800/50 to-pb-gray-900/50 border border-pb-electric/30 rounded-xl p-8 hover:border-pb-electric/60 hover:shadow-glow-electric transition-all duration-300 hover:translate-y-[-4px]">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-pb-electric mt-2 flex-shrink-0" />
                      <h3 className="text-h3 font-semibold text-pb-electric">
                        Add analytics tracking
                      </h3>
                    </div>
                    <p className="text-body text-pb-gray-300 ml-5">
                      Need to instrument a new flow or add conversion metrics? <span className="text-pb-white font-medium">Do it yourself</span>. Stop creating tickets for simple tracking updates and get the data you need to make informed decisions—without consuming engineering capacity better spent on features.
                    </p>
                  </div>

                  {/* Quick Feature Variants */}
                  <div className="group bg-gradient-to-br from-pb-success/15 via-pb-gray-800/50 to-pb-gray-900/50 border border-pb-success/30 rounded-xl p-8 hover:border-pb-success/60 transition-all duration-300 hover:translate-y-[-4px]">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-pb-success mt-2 flex-shrink-0" />
                      <h3 className="text-h3 font-semibold text-pb-success">
                        Ship UI changes
                      </h3>
                    </div>
                    <p className="text-body text-pb-gray-300 ml-5">
                      Add a form field, tweak a user flow, test a different layout—<span className="text-pb-white font-medium">ship it and see what happens</span>. Move from hypothesis to live test in hours instead of weeks, learning from real user behavior instead of endless planning meetings.
                    </p>
                  </div>
                </div>
              </section>

              {/* What you'll learn Section */}
              <section
                ref={learningRef}
                id="learning"
                className={`pt-12 border-t border-pb-gray-700/50 transition-all duration-1000 ${
                  learningReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-h2 font-bold bg-gradient-to-r from-pb-white to-pb-gray-300 bg-clip-text text-transparent mb-8">
                  What you'll learn
                </h2>

                <div className="space-y-8">
                  {/* Agentic work fundamentals */}
                  <div className="bg-gradient-to-br from-pb-accent/10 to-transparent border border-pb-accent/30 rounded-xl p-6 transition-all duration-300 hover:border-pb-accent/60 hover:shadow-glow-accent">
                    <h3 className="text-h3 font-semibold text-pb-accent mb-4">
                      Agentic work fundamentals
                    </h3>
                    <ul className="space-y-2 ml-6">
                      <li className="text-body list-disc">reviewing AI-generated code</li>
                      <li className="text-body list-disc">experimenting with AI workflows</li>
                      <li className="text-body list-disc">navigating unknowns and unblocking yourself</li>
                      <li className="text-body list-disc">adapting to rapid change</li>
                      <li className="text-body list-disc">installing your agent (if required)</li>
                      <li className="text-body list-disc">creating safe spaces to work in</li>
                      <li className="text-body list-disc">sharing knowledge with your agent</li>
                    </ul>
                  </div>

                  {/* Working with your agent */}
                  <div className="bg-gradient-to-br from-pb-electric/10 to-transparent border border-pb-electric/30 rounded-xl p-6 transition-all duration-300 hover:border-pb-electric/60 hover:shadow-glow-electric">
                    <h3 className="text-h3 font-semibold text-pb-electric mb-4">
                      Working with your agent
                    </h3>
                    <ul className="space-y-2 ml-6">
                      <li className="text-body list-disc">switching between planning & building modes</li>
                      <li className="text-body list-disc">setting goals</li>
                      <li className="text-body list-disc">ideating safely</li>
                      <li className="text-body list-disc">focusing on good-enough</li>
                      <li className="text-body list-disc">saving your work to GitHub</li>
                      <li className="text-body list-disc">creating a memory for your agent</li>
                      <li className="text-body list-disc">connecting specific tools, such as Github or Linear</li>
                      <li className="text-body list-disc">avoiding agent overload</li>
                    </ul>
                  </div>

                  {/* Building and shipping code */}
                  <div className="bg-gradient-to-br from-pb-success/10 to-transparent border border-pb-success/30 rounded-xl p-6 transition-all duration-300 hover:border-pb-success/60">
                    <h3 className="text-h3 font-semibold text-pb-success mb-4">
                      Building and shipping code
                    </h3>
                    <ul className="space-y-2 ml-6">
                      <li className="text-body list-disc">setting context</li>
                      <li className="text-body list-disc">code creation workflow</li>
                      <li className="text-body list-disc">testing your changes locally</li>
                      <li className="text-body list-disc">working in branches</li>
                      <li className="text-body list-disc">creating, testing & reviewing PRs (pull requests)</li>
                      <li className="text-body list-disc">deploying & hosting your code</li>
                      <li className="text-body list-disc">connecting your domain</li>
                    </ul>
                  </div>

                  {/* One new software project */}
                  <div className="bg-gradient-to-br from-pb-accent/10 to-transparent border border-pb-accent/20 rounded-xl p-6 transition-all duration-300">
                    <h3 className="text-h3 font-semibold text-pb-accent mb-4">
                      One new software project
                    </h3>
                    <ul className="space-y-2 ml-6">
                      <li className="text-body list-disc">'co-authored' by you, in English</li>
                      <li className="text-body list-disc">synced to Github</li>
                      <li className="text-body list-disc">deployed on Vercel</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Plus Section */}
              <section
                ref={plusRef}
                id="plus"
                className={`pt-12 border-t border-pb-gray-700/50 transition-all duration-1000 ${
                  plusReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-h2 font-bold bg-gradient-to-r from-pb-white to-pb-gray-300 bg-clip-text text-transparent mb-8">
                  Plus
                </h2>
                <div className="bg-gradient-to-br from-pb-accent/10 via-pb-gray-800/50 to-pb-gray-900/50 border border-pb-accent/30 rounded-xl p-8 hover:border-pb-accent/60 hover:shadow-glow-accent transition-all duration-300">
                  <ul className="space-y-4">
                    <li className="text-body flex items-start gap-3">
                      <span className="text-pb-accent font-bold mt-0.5">✓</span>
                      <span>access to our growing Agentic Operator slack community</span>
                    </li>
                    <li className="text-body flex items-start gap-3">
                      <span className="text-pb-accent font-bold mt-0.5">✓</span>
                      <span>your PM Agentic Operator qualification, certified by Product Box</span>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </div>

      {/* Floating CTA */}
      <button
        onClick={() => setIsBookingModalOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-pb-accent to-pb-electric hover:shadow-glow-accent text-pb-black px-8 py-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 font-bold flex items-center gap-2 active:scale-95"
      >
        <MessageCircle className="w-5 h-5" />
        Book Discovery Call
      </button>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        teamMembers={TEAM_MEMBERS}
      />
    </>
  )
}
