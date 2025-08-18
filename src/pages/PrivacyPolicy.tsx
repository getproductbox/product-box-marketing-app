import { useEffect } from 'react'
import { SEOHead } from '../components/SEOHead'

export function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy - Product Box'
  }, [])

  return (
    <>
      <SEOHead
        title="Privacy Policy - Product Box"
        description="Product Box privacy policy outlining how we collect, use, and protect your personal information."
        canonical="/privacy"
      />
      
      <div className="min-h-screen bg-pb-black pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-pb-gray-900 rounded-lg border border-pb-gray-800 p-8 lg:p-12">
            <h1 className="text-h1 font-black text-pb-white mb-8">
              Privacy Policy
            </h1>
            
            <p className="text-body text-pb-gray-300 mb-8">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <div className="space-y-8 text-pb-gray-300">
              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Information We Collect</h2>
                <div className="space-y-4">
                  <p className="text-body">
                    When you contact us through our website, we collect information that you voluntarily provide, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Your name and email address</li>
                    <li>Company name (if provided)</li>
                    <li>Project description and requirements</li>
                    <li>Budget range information</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">How We Use Information</h2>
                <div className="space-y-4">
                  <p className="text-body">
                    We use the information you provide to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Respond to your inquiries and provide consultation services</li>
                    <li>Understand your project requirements and provide accurate estimates</li>
                    <li>Communicate about potential collaboration opportunities</li>
                    <li>Improve our services and website functionality</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Data Protection</h2>
                <div className="space-y-4">
                  <p className="text-body">
                    We are committed to protecting your personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>We do not sell, rent, or share your personal information with third parties</li>
                    <li>Information is stored securely and accessed only by authorized personnel</li>
                    <li>We retain information only as long as necessary to provide our services</li>
                    <li>You may request deletion of your information at any time</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Cookies and Analytics</h2>
                <p className="text-body">
                  Our website may use cookies and analytics tools to improve user experience and understand how visitors interact with our site. You can control cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Third-Party Services</h2>
                <p className="text-body">
                  Our website may integrate with third-party services for functionality such as contact forms and analytics. These services have their own privacy policies and data handling practices.
                </p>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Your Rights</h2>
                <div className="space-y-4">
                  <p className="text-body">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt out of communications at any time</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Updates to This Policy</h2>
                <p className="text-body">
                  We may update this privacy policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Contact Information</h2>
                <p className="text-body">
                  If you have any questions about this privacy policy or how we handle your information, please contact us at{' '}
                  <a 
                    href="mailto:hello@getproductbox.com" 
                    className="text-pb-accent hover:text-pb-electric transition-colors"
                  >
                    hello@getproductbox.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}