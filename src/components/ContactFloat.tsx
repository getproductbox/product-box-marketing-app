import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { cn } from '../lib/utils'

export function ContactFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const apiUrl = import.meta.env.PROD 
        ? '/api/send-email' 
        : 'http://localhost:3000/api/send-email'
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      // Success - reset form and close
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      })
      setIsOpen(false)
      
      // Show success message (you could use a toast library here)
      alert('Thank you! We\'ll be in touch within 24 hours.')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Sorry, there was an error sending your message. Please try again or email us directly at hello@getproductbox.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className={cn(
              "fixed bottom-6 right-6 z-40",
              "w-16 h-16 bg-pb-accent text-white rounded-full",
              "shadow-2xl hover:shadow-3xl transition-shadow",
              "flex items-center justify-center"
            )}
          >
            <MessageCircle className="w-7 h-7" />
            
            {/* Pulse Effect */}
            <span className="absolute inset-0 rounded-full bg-pb-accent animate-ping opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Form Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className={cn(
                "fixed right-0 top-0 h-full z-50",
                "w-full sm:w-[480px] bg-white shadow-2xl",
                "overflow-y-auto"
              )}
            >
              <div className="p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-pb-black">
                      Let's Build Something Amazing
                    </h3>
                    <p className="text-pb-gray-600 mt-1">
                      Tell us about your project and we'll be in touch within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-pb-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-pb-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border border-pb-gray-200",
                          "focus:border-pb-black focus:outline-none focus:ring-2 focus:ring-pb-black/20",
                          "transition-all duration-200"
                        )}
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-pb-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border border-pb-gray-200",
                          "focus:border-pb-black focus:outline-none focus:ring-2 focus:ring-pb-black/20",
                          "transition-all duration-200"
                        )}
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-pb-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border border-pb-gray-200",
                        "focus:border-pb-black focus:outline-none focus:ring-2 focus:ring-pb-black/20",
                        "transition-all duration-200"
                      )}
                      placeholder="Acme Inc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-pb-gray-700 mb-2">
                      Service Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border border-pb-gray-200",
                        "focus:border-pb-black focus:outline-none focus:ring-2 focus:ring-pb-black/20",
                        "transition-all duration-200",
                        "appearance-none bg-white"
                      )}
                    >
                      <option value="">Select a service</option>
                      <option value="vision">Vision - Design & Prototype</option>
                      <option value="scale">Scale - Build & Launch</option>
                      <option value="thrive">Thrive - Maintain & Grow</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-pb-gray-700 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border border-pb-gray-200",
                        "focus:border-pb-black focus:outline-none focus:ring-2 focus:ring-pb-black/20",
                        "transition-all duration-200 resize-none"
                      )}
                      placeholder="Tell us about your project, timeline, and budget..."
                    />
                  </div>

                  {/* Quick Response Time Badge */}
                  <div className="p-4 bg-pb-electric/10 rounded-lg border border-pb-electric/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pb-electric rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-pb-gray-700">
                        Average response time: 2 hours
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full py-4 bg-pb-accent text-white rounded-lg font-semibold",
                      "hover:bg-pb-accent/90 transition-all duration-300",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "flex items-center justify-center gap-2"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}