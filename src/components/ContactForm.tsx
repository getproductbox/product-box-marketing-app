import { useState } from 'react'
import { Send, CheckCircle, XCircle } from 'lucide-react'
import type { ContactInfo } from '../types/sanity'

interface FormData {
  name: string
  email: string
  company: string
  projectDescription: string
  budgetRange: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface ContactFormProps {
  contactInfo?: ContactInfo | null
}

export function ContactForm({ contactInfo }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectDescription: '',
    budgetRange: ''
  })
  
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setFormStatus('submitting')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormStatus('success')
        setFormData({
          name: '',
          email: '',
          company: '',
          projectDescription: '',
          budgetRange: ''
        })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormStatus('error')
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-body-sm font-medium text-pb-white mb-2">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-4 py-3 bg-pb-gray-800 border rounded-md text-pb-white placeholder-pb-gray-400 focus:outline-none focus:ring-2 focus:ring-pb-accent transition-colors ${
                errors.name ? 'border-red-500' : 'border-pb-gray-700 focus:border-pb-accent'
              }`}
              placeholder="Your full name"
              disabled={formStatus === 'submitting'}
            />
            {errors.name && (
              <p className="mt-2 text-caption text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-body-sm font-medium text-pb-white mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-4 py-3 bg-pb-gray-800 border rounded-md text-pb-white placeholder-pb-gray-400 focus:outline-none focus:ring-2 focus:ring-pb-accent transition-colors ${
                errors.email ? 'border-red-500' : 'border-pb-gray-700 focus:border-pb-accent'
              }`}
              placeholder="your@email.com"
              disabled={formStatus === 'submitting'}
            />
            {errors.email && (
              <p className="mt-2 text-caption text-red-400">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-body-sm font-medium text-pb-white mb-2">
            Company
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className="w-full px-4 py-3 bg-pb-gray-800 border border-pb-gray-700 rounded-md text-pb-white placeholder-pb-gray-400 focus:outline-none focus:ring-2 focus:ring-pb-accent focus:border-pb-accent transition-colors"
            placeholder="Your company name"
            disabled={formStatus === 'submitting'}
          />
        </div>

        <div>
          <label className="block text-body-sm font-medium text-pb-white mb-2">
            Budget Range
          </label>
          <select
            value={formData.budgetRange}
            onChange={(e) => handleChange('budgetRange', e.target.value)}
            className="w-full px-4 py-3 bg-pb-gray-800 border border-pb-gray-700 rounded-md text-pb-white focus:outline-none focus:ring-2 focus:ring-pb-accent focus:border-pb-accent transition-colors"
            disabled={formStatus === 'submitting'}
          >
            <option value="">Select budget range</option>
            <option value="under-10k">Under $10k</option>
            <option value="10k-25k">$10k - $25k</option>
            <option value="25k-50k">$25k - $50k</option>
            <option value="50k-100k">$50k - $100k</option>
            <option value="100k-plus">$100k+</option>
            <option value="discuss">Let's discuss</option>
          </select>
        </div>

        <div>
          <label className="block text-body-sm font-medium text-pb-white mb-2">
            Project Description *
          </label>
          <textarea
            value={formData.projectDescription}
            onChange={(e) => handleChange('projectDescription', e.target.value)}
            rows={5}
            className={`w-full px-4 py-3 bg-pb-gray-800 border rounded-md text-pb-white placeholder-pb-gray-400 focus:outline-none focus:ring-2 focus:ring-pb-accent transition-colors resize-vertical ${
              errors.projectDescription ? 'border-red-500' : 'border-pb-gray-700 focus:border-pb-accent'
            }`}
            placeholder="Tell us about your project, goals, and what you're looking to build..."
            disabled={formStatus === 'submitting'}
          />
          {errors.projectDescription && (
            <p className="mt-2 text-caption text-red-400">{errors.projectDescription}</p>
          )}
        </div>

        {formStatus === 'error' && (
          <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-500/30 rounded-md">
            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-body-sm text-red-400">
              Something went wrong. Please try again or email us directly.
            </p>
          </div>
        )}

        <div className="text-center">
          <button
            type="submit"
            disabled={formStatus === 'submitting'}
            className="bg-pb-accent text-pb-white px-8 py-4 font-semibold rounded-md hover:bg-pb-accent/90 hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-pb-accent/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 flex items-center gap-3 mx-auto"
          >
            {formStatus === 'submitting' ? (
              <>
                <div className="w-5 h-5 border-2 border-pb-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}