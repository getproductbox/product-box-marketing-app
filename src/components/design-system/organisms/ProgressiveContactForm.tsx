import React, { useState } from 'react'
import { Check, ChevronLeft, ChevronRight, Send } from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  challenges: string
  budget: string
  timeline: string
}

interface ProgressiveContactFormProps {
  onSubmit?: (data: FormData) => void
  className?: string
}

export const ProgressiveContactForm: React.FC<ProgressiveContactFormProps> = ({
  onSubmit,
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    challenges: '',
    budget: '',
    timeline: ''
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const steps = [
    {
      title: 'Basic Info',
      fields: ['name', 'email', 'company']
    },
    {
      title: 'Your Challenge', 
      fields: ['challenges']
    },
    {
      title: 'Project Details',
      fields: ['budget', 'timeline']
    }
  ]

  const validateField = (field: keyof FormData, value: string): string | null => {
    switch (field) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : null
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? 'Please enter a valid email' : null
      }
      case 'challenges':
        return value.trim().length < 20 ? 'Please describe your challenges in more detail' : null
      default:
        return null
    }
  }

  const validateStep = (stepIndex: number): boolean => {
    const stepFields = steps[stepIndex].fields
    const newErrors: Partial<FormData> = {}
    let hasErrors = false

    stepFields.forEach(field => {
      const error = validateField(field as keyof FormData, formData[field as keyof FormData])
      if (error) {
        newErrors[field as keyof FormData] = error
        hasErrors = true
      }
    })

    setErrors(prev => ({ ...prev, ...newErrors }))
    return !hasErrors
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      setIsSubmitted(true)
      onSubmit?.(formData)
    }
  }

  if (isSubmitted) {
    return (
      <div className={`max-w-md mx-auto p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-pb-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-pb-white" />
        </div>
        <h3 className="text-h3 font-bold text-pb-white mb-2">Thank You!</h3>
        <p className="text-pb-gray-300 mb-4">
          We'll analyze your operational challenges and get back to you within 24 hours with a customized solution.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false)
            setCurrentStep(0)
            setFormData({
              name: '',
              email: '',
              company: '',
              challenges: '',
              budget: '',
              timeline: ''
            })
          }}
          className="text-pb-accent hover:text-pb-electric transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index <= currentStep ? 'text-pb-accent' : 'text-pb-gray-500'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-pb-accent border-pb-accent text-pb-white'
                    : index === currentStep
                    ? 'border-pb-accent text-pb-accent'
                    : 'border-pb-gray-600 text-pb-gray-500'
                }`}
              >
                {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span className="ml-2 text-sm font-medium">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-pb-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-pb-accent to-pb-electric h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-pb-gray-900/50 rounded-lg p-6 border border-pb-gray-800">
        <div className="space-y-4">
          {/* Step 0: Basic Info */}
          {currentStep === 0 && (
            <>
              <div>
                <label className="block text-sm font-medium text-pb-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 bg-pb-gray-800 border rounded-md text-pb-white placeholder-pb-gray-400 focus:outline-none focus:ring-2 focus:ring-pb-accent transition-all ${
                    errors.name ? 'border-red-500' : 'border-pb-gray-700'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-pb-white mb-2">
                  Business Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 bg-pb-gray-800 border rounded-md text-pb-white placeholder-pb-gray-400 focus:outline-none focus:ring-2 focus:ring-pb-accent transition-all ${
                    errors.email ? 'border-red-500' : 'border-pb-gray-700'
                  }`}
                  placeholder="you@company.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-pb-white mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-4 py-3 bg-pb-gray-800 border border-pb-gray-700 rounded-md text-pb-white placeholder-pb-gray-400 focus:outline-none focus:ring-2 focus:ring-pb-accent transition-all"
                  placeholder="Your company name"
                />
              </div>
            </>
          )}

          {/* Step 1: Challenge */}
          {currentStep === 1 && (
            <div>
              <label className="block text-sm font-medium text-pb-white mb-2">
                What operational challenges are costing you time? *
              </label>
              <textarea
                value={formData.challenges}
                onChange={(e) => handleInputChange('challenges', e.target.value)}
                rows={5}
                className={`w-full px-4 py-3 bg-pb-gray-800 border rounded-md text-pb-white placeholder-pb-gray-400 focus:outline-none focus:ring-2 focus:ring-pb-accent transition-all resize-none ${
                  errors.challenges ? 'border-red-500' : 'border-pb-gray-700'
                }`}
                placeholder="Describe your biggest operational pain points - manual reporting, chaotic workflows, integration headaches, scaling bottlenecks..."
              />
              {errors.challenges && <p className="text-red-400 text-sm mt-1">{errors.challenges}</p>}
            </div>
          )}

          {/* Step 2: Project Details */}
          {currentStep === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-pb-white mb-2">
                  Budget Range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-4 py-3 bg-pb-gray-800 border border-pb-gray-700 rounded-md text-pb-white focus:outline-none focus:ring-2 focus:ring-pb-accent transition-all"
                >
                  <option value="">Select budget range</option>
                  <option value="under-25k">Under $25k</option>
                  <option value="25k-50k">$25k - $50k</option>
                  <option value="50k-100k">$50k - $100k</option>
                  <option value="100k-plus">$100k+</option>
                  <option value="discuss">Let's discuss</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-pb-white mb-2">
                  Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className="w-full px-4 py-3 bg-pb-gray-800 border border-pb-gray-700 rounded-md text-pb-white focus:outline-none focus:ring-2 focus:ring-pb-accent transition-all"
                >
                  <option value="">Select timeline</option>
                  <option value="urgent">ASAP (2-4 weeks)</option>
                  <option value="soon">Soon (1-2 months)</option>
                  <option value="planning">Planning (3+ months)</option>
                  <option value="exploring">Just exploring</option>
                </select>
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
              currentStep === 0
                ? 'text-pb-gray-500 cursor-not-allowed'
                : 'text-pb-white hover:bg-pb-gray-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-pb-accent hover:bg-pb-electric text-pb-white rounded-md transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pb-accent to-pb-electric hover:from-pb-electric hover:to-pb-accent text-pb-white rounded-md transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Get My Assessment</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}