import { ArrowUpRight, CheckCircle, Clock, Target, BookOpen, MessageSquare, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function AgentTrainingPage() {
  const [activeTab, setActiveTab] = useState<'hr' | 'sales' | 'ops'>('hr')
  // Section Divider Component
  const SectionDivider = () => (
    <div className="py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="relative flex items-center justify-center">
          <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-pb-gray-700 to-pb-gray-700"></div>
          <div className="mx-6 w-3 h-3 rounded-full bg-gradient-to-r from-pb-accent to-pb-electric shadow-lg shadow-pb-accent/20"></div>
          <div className="flex-grow h-[1px] bg-gradient-to-l from-transparent via-pb-gray-700 to-pb-gray-700"></div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-pb-black text-pb-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block px-4 py-2 bg-pb-accent/10 border border-pb-accent/30 rounded-full text-pb-accent text-body-sm font-semibold mb-6">
            AI Agent Readiness Training
          </div>

          <h1 className="text-display font-black mb-6 leading-tight">
            Get Your Team <span className="bg-gradient-to-r from-pb-accent to-pb-electric bg-clip-text text-transparent">Agent-Ready</span>
          </h1>

          <p className="text-body-xl text-pb-gray-300 mb-8 max-w-2xl mx-auto">
            Half-day workshops that make your team comfortable and productive with AI agents through hands-on practice, not theory.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-pb-accent text-pb-white px-8 py-4 font-semibold rounded-lg hover:bg-pb-accent/90 transition-all duration-300"
            >
              Book Discovery Call
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <a
              href="#details"
              className="inline-flex items-center justify-center gap-2 border border-pb-gray-600 text-pb-white px-8 py-4 font-semibold rounded-lg hover:border-pb-gray-500 hover:bg-pb-gray-800 transition-all duration-300"
            >
              View Details
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* The Problem We Solve - Combined Section with Tabs */}
      <section className="py-20 px-6 bg-pb-gray-900/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-display font-black text-center mb-8 leading-tight">
            You Deployed AI. Your Team Barely Uses It.
          </h2>

          <div className="text-body-lg text-pb-gray-200 space-y-4 mb-12 max-w-3xl mx-auto text-center">
            <p>
              Most teams use ChatGPT for basic tasks like writing emails or summarising documents.
            </p>
            <p>
              But AI agents can do so much more — they can execute workflows, connect to tools, and automate entire processes.
            </p>
            <p className="text-pb-white font-semibold">
              We show your team how to go from basic chat to real automation.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="text-center mb-6">
            <p className="text-body text-pb-gray-400 mb-4">See how this works for your team:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveTab('hr')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'hr'
                    ? 'bg-pb-accent text-pb-white shadow-lg'
                    : 'bg-pb-gray-800 text-pb-gray-300 hover:bg-pb-gray-700'
                }`}
              >
                HR & People Ops
              </button>
              <button
                onClick={() => setActiveTab('sales')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'sales'
                    ? 'bg-pb-accent text-pb-white shadow-lg'
                    : 'bg-pb-gray-800 text-pb-gray-300 hover:bg-pb-gray-700'
                }`}
              >
                Sales & Customer Success
              </button>
              <button
                onClick={() => setActiveTab('ops')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'ops'
                    ? 'bg-pb-accent text-pb-white shadow-lg'
                    : 'bg-pb-gray-800 text-pb-gray-300 hover:bg-pb-gray-700'
                }`}
              >
                Operations
              </button>
            </div>
          </div>

          {/* Before/After Comparison - Content changes based on active tab */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-pb-gray-900 border border-pb-gray-800 rounded-xl p-8">
              <h3 className="text-h4 font-bold mb-6 text-pb-gray-400 text-center">Before Our Workshop</h3>
              <div className="space-y-3">
                {activeTab === 'hr' && (
                  <>
                    <div className="text-body text-pb-gray-400 pl-4 border-l-2 border-pb-gray-700">"Draft an email"</div>
                    <div className="text-body text-pb-gray-400 pl-4 border-l-2 border-pb-gray-700">"Summarise policy doc"</div>
                  </>
                )}
                {activeTab === 'sales' && (
                  <>
                    <div className="text-body text-pb-gray-400 pl-4 border-l-2 border-pb-gray-700">"Write follow-up email"</div>
                    <div className="text-body text-pb-gray-400 pl-4 border-l-2 border-pb-gray-700">"Summarise call notes"</div>
                  </>
                )}
                {activeTab === 'ops' && (
                  <>
                    <div className="text-body text-pb-gray-400 pl-4 border-l-2 border-pb-gray-700">"Answer a question"</div>
                    <div className="text-body text-pb-gray-400 pl-4 border-l-2 border-pb-gray-700">"Draft response"</div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-pb-accent/10 to-pb-electric/10 border-2 border-pb-accent/30 rounded-xl p-8">
              <h3 className="text-h4 font-bold mb-6 text-pb-white text-center">After Our Workshop</h3>
              <div>
                {activeTab === 'hr' && (
                  <div className="text-body text-pb-white">
                    <div className="font-semibold mb-2">"Execute our offboarding:</div>
                    <ul className="space-y-1 pl-4 text-pb-gray-200">
                      <li>- Pull employee data from BambooHR</li>
                      <li>- Generate exit documentation</li>
                      <li>- Update payroll system</li>
                      <li>- Email IT, Finance, and manager</li>
                      <li>- Create knowledge transfer doc</li>
                      <li>- Schedule exit interview"</li>
                    </ul>
                  </div>
                )}
                {activeTab === 'sales' && (
                  <div className="text-body text-pb-white">
                    <div className="font-semibold mb-2">"Prepare for client renewal:</div>
                    <ul className="space-y-1 pl-4 text-pb-gray-200">
                      <li>- Pull usage data from Salesforce</li>
                      <li>- Analyse support ticket history</li>
                      <li>- Generate health score report</li>
                      <li>- Draft personalised renewal proposal</li>
                      <li>- Create executive summary deck</li>
                      <li>- Schedule follow-up based on calendar"</li>
                    </ul>
                  </div>
                )}
                {activeTab === 'ops' && (
                  <div className="text-body text-pb-white">
                    <div className="font-semibold mb-2">"Run monthly reporting:</div>
                    <ul className="space-y-1 pl-4 text-pb-gray-200">
                      <li>- Collect data from 5 systems</li>
                      <li>- Reconcile discrepancies</li>
                      <li>- Generate formatted reports</li>
                      <li>- Distribute to stakeholders</li>
                      <li>- Update tracking spreadsheet</li>
                      <li>- Flag anomalies for review"</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3 text-pb-white">
              <CheckCircle className="w-6 h-6 text-pb-accent flex-shrink-0" />
              <span className="text-body-lg font-semibold">
                No new tools required — works with ChatGPT, Claude, or whatever you've already deployed
              </span>
            </div>
            <p className="text-body text-pb-gray-300">
              Your team doesn't need to be technical — just willing to learn.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* What You Get */}
      <section id="details" className="py-20 px-6 bg-pb-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-h2 font-black text-center mb-12">What You Get</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-pb-gray-900 border border-pb-gray-800 rounded-xl p-8">
              <Clock className="w-10 h-10 text-pb-accent mb-4" />
              <h3 className="text-h4 font-bold mb-3">Half-Day Workshop</h3>
              <p className="text-body text-pb-gray-300">
                3.5 hours of intensive, hands-on training for up to 20 people. Participants work with real AI agents throughout the session.
              </p>
            </div>

            <div className="bg-pb-gray-900 border border-pb-gray-800 rounded-xl p-8">
              <Target className="w-10 h-10 text-pb-electric mb-4" />
              <h3 className="text-h4 font-bold mb-3">Pre-Workshop Discovery</h3>
              <p className="text-body text-pb-gray-300">
                We customize the workshop to your industry, specific use cases, and participant roles through surveys and discovery calls.
              </p>
            </div>

            <div className="bg-pb-gray-900 border border-pb-gray-800 rounded-xl p-8">
              <BookOpen className="w-10 h-10 text-pb-accent mb-4" />
              <h3 className="text-h4 font-bold mb-3">Comprehensive Toolkit</h3>
              <p className="text-body text-pb-gray-300">
                Post-workshop materials including templates, frameworks, decision guides, and best practices for ongoing use.
              </p>
            </div>

            <div className="bg-pb-gray-900 border border-pb-gray-800 rounded-xl p-8">
              <MessageSquare className="w-10 h-10 text-pb-electric mb-4" />
              <h3 className="text-h4 font-bold mb-3">30-Day Email Support</h3>
              <p className="text-body text-pb-gray-300">
                Follow-up questions and guidance included. Premium package adds 90 days of office hours for advanced users.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Workshop Agenda */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-h2 font-black text-center mb-12">Workshop Agenda</h2>

          <div className="space-y-6">
            <div className="bg-pb-gray-900 border-l-4 border-pb-accent rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-h4 font-bold">Part 1: Foundations</h3>
                <span className="text-body-sm text-pb-gray-400">45 minutes</span>
              </div>
              <ul className="space-y-2 text-body text-pb-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pb-accent mt-0.5 flex-shrink-0" />
                  <span>What are AI agents and how do they work</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pb-accent mt-0.5 flex-shrink-0" />
                  <span>What they do well (and poorly)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pb-accent mt-0.5 flex-shrink-0" />
                  <span>Risk awareness and guardrails</span>
                </li>
              </ul>
            </div>

            <div className="bg-pb-gray-900 border-l-4 border-pb-electric rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-h4 font-bold">Part 2: Hands-On Practice</h3>
                <span className="text-body-sm text-pb-gray-400">90 minutes</span>
              </div>
              <ul className="space-y-2 text-body text-pb-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pb-electric mt-0.5 flex-shrink-0" />
                  <span>Guided exercises with increasing complexity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pb-electric mt-0.5 flex-shrink-0" />
                  <span>Apply to real work scenarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pb-electric mt-0.5 flex-shrink-0" />
                  <span>Iterate and improve results</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pb-electric mt-0.5 flex-shrink-0" />
                  <span>10-minute break included</span>
                </li>
              </ul>
            </div>

            <div className="bg-pb-gray-900 border-l-4 border-pb-accent rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-h4 font-bold">Part 3: Application</h3>
                <span className="text-body-sm text-pb-gray-400">45 minutes</span>
              </div>
              <ul className="space-y-2 text-body text-pb-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pb-accent mt-0.5 flex-shrink-0" />
                  <span>Use case workshop</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pb-accent mt-0.5 flex-shrink-0" />
                  <span>Decision framework for agent tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pb-accent mt-0.5 flex-shrink-0" />
                  <span>Applying what you learned to your real work scenarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pb-accent mt-0.5 flex-shrink-0" />
                  <span>Q&A</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Learning Outcomes */}
      <section className="py-20 px-6 bg-pb-gray-900/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-h2 font-black text-center mb-6">Learning Outcomes</h2>
          <p className="text-body-lg text-pb-gray-300 text-center mb-12 max-w-2xl mx-auto">
            By the end of this workshop, participants will be able to:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Explain what agents are and identify appropriate use cases',
              'Effectively prompt and iterate with agents',
              'Recognize when to trust vs. verify agent outputs',
              'Understand key risks and how to mitigate them',
              'Feel confident experimenting within company guidelines',
              'Apply a framework for evaluating agent-appropriate tasks'
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-3 bg-pb-gray-900 border border-pb-gray-800 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-pb-accent flex-shrink-0 mt-0.5" />
                <span className="text-body text-pb-gray-200">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Pricing */}
      <section className="py-20 px-6 bg-pb-gray-900/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-h2 font-black text-center mb-12">Pricing & Packages</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Workshop Package */}
            <div className="bg-pb-gray-900 border border-pb-accent rounded-xl p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pb-accent text-pb-white px-4 py-1 rounded-full text-body-sm font-semibold">
                Limited Availability
              </div>
              <h3 className="text-h3 font-bold mb-2 mt-4">Team Workshop</h3>
              <div className="text-h2 font-black text-pb-accent mb-4">£2,500</div>
              <p className="text-body-sm text-pb-gray-400 mb-6">Up to 20 people</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-body-sm">
                  <CheckCircle className="w-5 h-5 text-pb-accent flex-shrink-0 mt-0.5" />
                  <span>Half-day workshop</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm">
                  <CheckCircle className="w-5 h-5 text-pb-accent flex-shrink-0 mt-0.5" />
                  <span>Pre-workshop customization</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm">
                  <CheckCircle className="w-5 h-5 text-pb-accent flex-shrink-0 mt-0.5" />
                  <span>Comprehensive toolkit</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm">
                  <CheckCircle className="w-5 h-5 text-pb-accent flex-shrink-0 mt-0.5" />
                  <span>30-day email support</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm text-pb-gray-400">
                  <span className="ml-7">*Testimonial required</span>
                </li>
              </ul>

              <a href="#contact" className="block w-full bg-pb-accent text-pb-white text-center py-3 rounded-lg font-semibold hover:bg-pb-accent/90 transition-colors">
                Apply Now
              </a>
            </div>

            {/* Standard Package */}
            <div className="bg-pb-gray-900 border-2 border-pb-electric rounded-xl p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pb-electric text-pb-black px-4 py-1 rounded-full text-body-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-h3 font-bold mb-2 mt-4">Standard</h3>
              <div className="text-h2 font-black text-pb-electric mb-4">£6,500</div>
              <p className="text-body-sm text-pb-gray-400 mb-6">Up to 20 people</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-body-sm">
                  <CheckCircle className="w-5 h-5 text-pb-electric flex-shrink-0 mt-0.5" />
                  <span>Half-day workshop</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm">
                  <CheckCircle className="w-5 h-5 text-pb-electric flex-shrink-0 mt-0.5" />
                  <span>Pre-workshop customization</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm">
                  <CheckCircle className="w-5 h-5 text-pb-electric flex-shrink-0 mt-0.5" />
                  <span>Comprehensive toolkit</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm">
                  <CheckCircle className="w-5 h-5 text-pb-electric flex-shrink-0 mt-0.5" />
                  <span>30-day email support</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm">
                  <CheckCircle className="w-5 h-5 text-pb-electric flex-shrink-0 mt-0.5" />
                  <span>Follow-up metrics</span>
                </li>
              </ul>

              <a href="#contact" className="block w-full bg-pb-electric text-pb-black text-center py-3 rounded-lg font-semibold hover:bg-pb-electric/90 transition-colors">
                Book Discovery Call
              </a>
            </div>

            {/* Premium Package */}
            <div className="bg-pb-gray-900 border border-pb-gray-800 rounded-xl p-8">
              <h3 className="text-h3 font-bold mb-2 mt-8">Premium</h3>
              <div className="text-h2 font-black text-pb-white mb-4">£9,500</div>
              <p className="text-body-sm text-pb-gray-400 mb-6">Up to 20 people</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-body-sm">
                  <CheckCircle className="w-5 h-5 text-pb-white flex-shrink-0 mt-0.5" />
                  <span>Everything in Standard</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm">
                  <CheckCircle className="w-5 h-5 text-pb-white flex-shrink-0 mt-0.5" />
                  <span>90-day office hours</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm">
                  <CheckCircle className="w-5 h-5 text-pb-white flex-shrink-0 mt-0.5" />
                  <span>Monthly check-ins</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm">
                  <CheckCircle className="w-5 h-5 text-pb-white flex-shrink-0 mt-0.5" />
                  <span>Advanced use case support</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm">
                  <CheckCircle className="w-5 h-5 text-pb-white flex-shrink-0 mt-0.5" />
                  <span>Custom enterprise packages available</span>
                </li>
              </ul>

              <a href="#contact" className="block w-full border border-pb-gray-600 text-pb-white text-center py-3 rounded-lg font-semibold hover:bg-pb-gray-800 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-h2 font-black text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: "Do participants need coding experience?",
                a: "No. This workshop is designed for non-technical employees. If you can use email and a web browser, you can succeed in this workshop."
              },
              {
                q: "What if we have more than 20 people?",
                a: "We can run multiple sessions or discuss custom enterprise packages. Contact us to discuss your needs."
              },
              {
                q: "Can this be delivered remotely?",
                a: "Yes. We deliver workshops both in-person and remotely via video conferencing. The hands-on exercises work equally well in both formats."
              },
              {
                q: "How do you customize the workshop?",
                a: "We conduct pre-workshop surveys and discovery calls to understand your industry, specific use cases, and participant roles. The exercises and examples are then tailored accordingly."
              },
              {
                q: "What tools/platforms do participants use?",
                a: "We're tool-agnostic and can adapt to your preferred AI platform. The principles we teach work across any agent system."
              },
              {
                q: "What's included in the toolkit?",
                a: "Templates for agent interactions, decision frameworks, use case worksheets, best practices guide, and risk mitigation checklists."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-pb-gray-900 border border-pb-gray-800 rounded-lg p-6">
                <h3 className="text-h5 font-bold mb-3">{faq.q}</h3>
                <p className="text-body text-pb-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Final CTA */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-pb-accent/20 to-pb-electric/20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-black mb-6">Ready to Get Your Team Agent-Ready?</h2>
          <p className="text-body-lg text-pb-gray-300 mb-8">
            Book a 15-minute discovery call — not a sales pitch, just a conversation to understand your challenges and see if a workshop would help. No pressure, no commitment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/productbox"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-pb-accent text-pb-white px-8 py-4 font-semibold rounded-lg hover:bg-pb-accent/90 transition-all duration-300"
            >
              Book Discovery Call
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <Link
              to="/product-studio"
              className="inline-flex items-center justify-center gap-2 border border-pb-gray-600 text-pb-white px-8 py-4 font-semibold rounded-lg hover:border-pb-gray-500 hover:bg-pb-gray-800 transition-all duration-300"
            >
              View Our Studio Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
