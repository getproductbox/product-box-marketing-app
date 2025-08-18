import { useEffect } from 'react'
import { SEOHead } from '../components/SEOHead'

export function TermsOfService() {
  useEffect(() => {
    document.title = 'Terms of Service - Product Box'
  }, [])

  return (
    <>
      <SEOHead
        title="Terms of Service - Product Box"
        description="Product Box terms of service governing the use of our website and services."
        canonical="/terms"
      />
      
      <div className="min-h-screen bg-pb-black pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-pb-gray-900 rounded-lg border border-pb-gray-800 p-8 lg:p-12">
            <h1 className="text-h1 font-black text-pb-white mb-8">
              Terms of Service
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
                <h2 className="text-h3 font-bold text-pb-white mb-4">Acceptance of Terms</h2>
                <p className="text-body">
                  By accessing and using the Product Box website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Use of Services</h2>
                <div className="space-y-4">
                  <p className="text-body">
                    Our services include product development consultation, software development, and related technical services. By using our services, you agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide accurate and complete information when requesting services</li>
                    <li>Use our services only for lawful purposes</li>
                    <li>Respect intellectual property rights</li>
                    <li>Communicate professionally and respectfully</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Service Availability</h2>
                <p className="text-body">
                  We strive to maintain high availability of our website and services, but we do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue services at any time without prior notice.
                </p>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Intellectual Property</h2>
                <div className="space-y-4">
                  <p className="text-body">
                    All content on this website, including but not limited to text, graphics, logos, and software, is the property of Product Box or its licensors and is protected by copyright and other intellectual property laws.
                  </p>
                  <p className="text-body">
                    For client work, intellectual property ownership will be defined in separate project agreements.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Privacy and Data</h2>
                <p className="text-body">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices regarding the collection and use of your information.
                </p>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Limitations of Liability</h2>
                <div className="space-y-4">
                  <p className="text-body">
                    To the fullest extent permitted by law, Product Box shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                  </p>
                  <p className="text-body">
                    Our total liability for any claims arising from or related to our services shall not exceed the amount paid by you for the specific services giving rise to the claim.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Indemnification</h2>
                <p className="text-body">
                  You agree to indemnify and hold harmless Product Box from any claims, damages, or expenses arising from your use of our services or violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Governing Law</h2>
                <p className="text-body">
                  These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Product Box operates, without regard to conflict of law principles.
                </p>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Changes to Terms</h2>
                <p className="text-body">
                  We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of our services after any changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-h3 font-bold text-pb-white mb-4">Contact Information</h2>
                <p className="text-body">
                  If you have any questions about these Terms of Service, please contact us at{' '}
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