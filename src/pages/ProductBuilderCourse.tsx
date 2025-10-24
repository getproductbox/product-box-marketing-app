import { useEffect, useState } from 'react'
import { SEOHead } from '../components/SEOHead'
import { BookingModal } from '../components/BookingModal'
import { CourseBackgroundEffects } from '../components/CourseBackgroundEffects'
import { ScrollProgressIndicator } from '../components/ScrollProgressIndicator'
import { TEAM_MEMBERS } from '../lib/constants'
import { MessageCircle } from 'lucide-react'

export function ProductBuilderCourse() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

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

      <div className="min-h-screen bg-pb-black pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-pb-gray-900 rounded-lg border border-pb-gray-800 p-8 lg:p-12">
            {/* Hero Section */}
            <section id="hero">
              {/* Main Heading */}
              <h1 className="text-display font-black text-pb-white mb-6">
                Become a Product Builder
              </h1>

              {/* Intro Blurb */}
              <p className="text-body text-pb-gray-300 mb-12">
                Stop waiting for engineers to make simple product changes. Learn to ship bug fixes, UI updates, and small features yourself—turning days of back-and-forth into hours of focused work.
              </p>
            </section>

            <div className="space-y-12 text-pb-gray-300">
              {/* Who it's for Section */}
              <section id="who">
                <h2 className="text-h2 font-bold text-pb-white mb-6">Who it's for</h2>
                <ul className="space-y-3 ml-6">
                  <li className="text-body list-disc">
                    PMs / Designers who want to release low-risk changes without engineering
                  </li>
                  <li className="text-body list-disc">
                    Founding PMs / Designers who want to build 0 → 1 without hiring engineers
                  </li>
                </ul>
              </section>

              {/* Real-world use cases Section */}
              <section id="use-cases" className="pt-12 border-t border-pb-gray-800">
                <h2 className="text-h2 font-bold text-pb-white mb-6">Real-world use cases</h2>

                <div className="space-y-6">
                  {/* Emergency Bug Fixes */}
                  <div className="bg-pb-gray-800/30 border border-pb-gray-700 rounded-lg p-6 hover:border-pb-accent/50 transition-colors">
                    <h3 className="text-h3 font-semibold text-pb-accent mb-4">
                      Ship quick fixes 10x faster
                    </h3>
                    <p className="text-body">
                      Launch day and your pricing page shows the wrong numbers? Key feature link goes nowhere? Fix it yourself. Address urgent issues in real-time without scrambling to find available engineers or rolling back the entire release.
                    </p>
                  </div>

                  {/* Analytics Enhancements */}
                  <div className="bg-pb-gray-800/30 border border-pb-gray-700 rounded-lg p-6 hover:border-pb-accent/50 transition-colors">
                    <h3 className="text-h3 font-semibold text-pb-accent mb-4">
                      Add analytics tracking
                    </h3>
                    <p className="text-body">
                      Need to instrument a new flow or add conversion metrics? Do it yourself. Stop creating tickets for simple tracking updates and get the data you need to make informed decisions—without consuming engineering capacity better spent on features.
                    </p>
                  </div>

                  {/* Quick Feature Variants */}
                  <div className="bg-pb-gray-800/30 border border-pb-gray-700 rounded-lg p-6 hover:border-pb-accent/50 transition-colors">
                    <h3 className="text-h3 font-semibold text-pb-accent mb-4">
                      Ship UI changes
                    </h3>
                    <p className="text-body">
                      Add a form field, tweak a user flow, test a different layout—ship it and see what happens. Move from hypothesis to live test in hours instead of weeks, learning from real user behavior instead of endless planning meetings.
                    </p>
                  </div>
                </div>
              </section>

              {/* What you'll learn Section */}
              <section id="learning" className="pt-12 border-t border-pb-gray-800">
                <h2 className="text-h2 font-bold text-pb-white mb-6">What you'll learn</h2>

                <div className="space-y-8">
                  {/* Agentic work fundamentals */}
                  <div>
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
                  <div>
                    <h3 className="text-h3 font-semibold text-pb-accent mb-4">
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
                  <div>
                    <h3 className="text-h3 font-semibold text-pb-accent mb-4">
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
                  <div>
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
              <section id="plus" className="pt-12 border-t border-pb-gray-800">
                <h2 className="text-h2 font-bold text-pb-white mb-6">Plus</h2>
                <ul className="space-y-3 ml-6">
                  <li className="text-body list-disc">
                    access to our growing Agentic Operator slack community
                  </li>
                  <li className="text-body list-disc">
                    your PM Agentic Operator qualification, certified by Product Box
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <button
        onClick={() => setIsBookingModalOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-pb-electric text-pb-black px-6 py-4 rounded-full shadow-lg hover:bg-pb-electric/90 hover:scale-105 transition-all duration-300 font-bold flex items-center gap-2"
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
