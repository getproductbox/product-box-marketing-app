import { useEffect } from 'react'
import { SEOHead } from '../components/SEOHead'

export function HROperatorCourse() {
  useEffect(() => {
    document.title = 'The HR Operator Course - Product Box'
  }, [])

  return (
    <>
      <SEOHead
        title="The HR Operator Course - Product Box"
        description="Master AI-powered HR operations. Learn agentic work practices, agent setup, and build custom processes for your team."
        canonical="/hr-operator-course"
      />

      <div className="min-h-screen bg-pb-black pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-pb-gray-900 rounded-lg border border-pb-gray-800 p-8 lg:p-12">
            {/* Main Heading */}
            <h1 className="text-display font-black text-pb-white mb-6">
              The HR Operator Course
            </h1>

            <div className="space-y-12 text-pb-gray-300">
              {/* Who it's for Section */}
              <section>
                <h2 className="text-h2 font-bold text-pb-white mb-6">Who it's for:</h2>
                <ul className="space-y-3 ml-6">
                  <li className="text-body list-disc">
                    HR people who want to streamline processes and deliver more without hiring
                  </li>
                  <li className="text-body list-disc">
                    HR leaders who want to scale without hiring a big team
                  </li>
                </ul>
              </section>

              {/* What you'll learn Section */}
              <section>
                <h2 className="text-h2 font-bold text-pb-white mb-6">What you'll learn:</h2>

                <div className="space-y-8">
                  {/* Agentic work best practices */}
                  <div>
                    <h3 className="text-h3 font-semibold text-pb-accent mb-4">
                      Agentic work best practices:
                    </h3>
                    <ul className="space-y-2 ml-6">
                      <li className="text-body list-disc">mindset: reviewing</li>
                      <li className="text-body list-disc">mindset: experimenting</li>
                      <li className="text-body list-disc">mindset: the unknown and unblocking yourself</li>
                    </ul>
                  </div>

                  {/* Starting up an agent */}
                  <div>
                    <h3 className="text-h3 font-semibold text-pb-accent mb-4">
                      Starting up an agent, including:
                    </h3>
                    <ul className="space-y-2 ml-6">
                      <li className="text-body list-disc">installing your agent (if required)</li>
                      <li className="text-body list-disc">creating safe spaces to work in</li>
                      <li className="text-body list-disc">sharing knowledge with your agent</li>
                      <li className="text-body list-disc">collaborating with your agent</li>
                      <li className="text-body list-disc">switching between planning and building modes</li>
                      <li className="text-body list-disc">setting goals</li>
                      <li className="text-body list-disc">ideating safely</li>
                      <li className="text-body list-disc">focusing on good-enough</li>
                      <li className="text-body list-disc">saving your work</li>
                      <li className="text-body list-disc">connecting your agent to your tools</li>
                      <li className="text-body list-disc">creating a memory for your agent</li>
                      <li className="text-body list-disc">connecting a tool, such as HiBob or Google Workspace</li>
                      <li className="text-body list-disc">not overloading your agent</li>
                      <li className="text-body list-disc">safely running a process with your agent</li>
                      <li className="text-body list-disc">providing a process to run e.g. offboarding</li>
                      <li className="text-body list-disc">when to check-in</li>
                      <li className="text-body list-disc">iterating and sharing</li>
                    </ul>
                  </div>

                  {/* One ready-to-deploy agentic process */}
                  <div>
                    <h3 className="text-h3 font-semibold text-pb-accent mb-4">
                      One ready-to-deploy agentic process:
                    </h3>
                    <ul className="space-y-2 ml-6">
                      <li className="text-body list-disc">customised to your needs</li>
                      <li className="text-body list-disc">connected to your tools</li>
                      <li className="text-body list-disc">shareable to your team</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Plus Section */}
              <section className="pt-6 border-t border-pb-gray-800">
                <h2 className="text-h2 font-bold text-pb-white mb-6">Plus:</h2>
                <ul className="space-y-3 ml-6">
                  <li className="text-body list-disc">
                    access to our growing Agentic Operator slack community
                  </li>
                  <li className="text-body list-disc">
                    your HR Agentic Operator qualification, certified by Product Box
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
