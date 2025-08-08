import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import type { ContactInfo } from '../types/sanity'

type FormStatus = 'idle' | 'success'

interface ContactFormProps {
  contactInfo?: ContactInfo | null
}

export function ContactForm({ contactInfo }: ContactFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')

  const handleSubmit = () => {
    // Netlify handles the submission, show success after brief delay
    setTimeout(() => setFormStatus('success'), 500)
  }

  if (formStatus === 'success') {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-pb-gray-900 rounded-lg border border-pb-gray-800">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-pb-accent mx-auto mb-4" />
          <h3 className="text-h3 font-bold text-pb-white mb-2">Message Sent!</h3>
          <p className="text-body text-pb-gray-300 mb-6">
            Thanks for reaching out! We'll get back to you within 48 hours.
          </p>
          <button
            onClick={() => setFormStatus('idle')}
            className="text-pb-accent hover:text-pb-electric transition-colors"
          >
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-h2 font-black text-pb-white mb-4">
          Let's Build Something Amazing
        </h2>
        <p className="text-body-lg text-pb-gray-300">
          Ready to turn your idea into a product? Tell us about your project.
        </p>
        {contactInfo && (
          <p className="text-body text-pb-gray-400 mt-4">
            Or reach us directly at{' '}
            <a href={`mailto:${contactInfo.email}`} className="text-pb-accent hover:text-pb-electric transition-colors">
              {contactInfo.email}
            </a>
          </p>
        )}
      </div>

      <form
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <input type="hidden" name="form-name" value="contact" />
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-body-sm font-medium text-pb-white mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 bg-pb-gray-800 border border-pb-gray-700 rounded-md text-pb-white placeholder-pb-gray-400 focus:outline-none focus:ring-2 focus:ring-pb-accent focus:border-pb-accent transition-colors"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-body-sm font-medium text-pb-white mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-pb-gray-800 border border-pb-gray-700 rounded-md text-pb-white placeholder-pb-gray-400 focus:outline-none focus:ring-2 focus:ring-pb-accent focus:border-pb-accent transition-colors"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-body-sm font-medium text-pb-white mb-2">
            Company
          </label>
          <input
            type="text"
            name="company"
            className="w-full px-4 py-3 bg-pb-gray-800 border border-pb-gray-700 rounded-md text-pb-white placeholder-pb-gray-400 focus:outline-none focus:ring-2 focus:ring-pb-accent focus:border-pb-accent transition-colors"
            placeholder="Your company name"
          />
        </div>

        <div>
          <label className="block text-body-sm font-medium text-pb-white mb-2">
            Project Description *
          </label>
          <textarea
            name="projectDescription"
            required
            rows={5}
            className="w-full px-4 py-3 bg-pb-gray-800 border border-pb-gray-700 rounded-md text-pb-white placeholder-pb-gray-400 focus:outline-none focus:ring-2 focus:ring-pb-accent focus:border-pb-accent transition-colors resize-none"
            placeholder="Tell us about your project idea, goals, and what you're looking to build..."
          />
        </div>

        <div>
          <label className="block text-body-sm font-medium text-pb-white mb-2">
            Budget Range
          </label>
          <select
            name="budgetRange"
            className="w-full px-4 py-3 bg-pb-gray-800 border border-pb-gray-700 rounded-md text-pb-white focus:outline-none focus:ring-2 focus:ring-pb-accent focus:border-pb-accent transition-colors"
          >
            <option value="">Select budget range</option>
            <option value="under-25k">Under $25k</option>
            <option value="25k-50k">$25k - $50k</option>
            <option value="50k-100k">$50k - $100k</option>
            <option value="100k-plus">$100k+</option>
            <option value="discuss">Let's discuss</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-pb-accent to-pb-electric hover:from-pb-electric hover:to-pb-accent text-pb-black font-bold text-body-lg rounded-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-pb-accent focus:ring-offset-2 focus:ring-offset-pb-black"
        >
          <Send className="w-5 h-5" />
          Send Message
        </button>
      </form>
    </div>
  )
}