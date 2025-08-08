import { ContactForm } from './ContactForm'
import { useState, useEffect } from 'react'
import { getContactData } from '../lib/data'
import type { ContactInfo } from '../types/sanity'

export function ContactSection() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContactData()
        setContactInfo(data)
      } catch (error) {
        console.error('Error fetching contact data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20 bg-pb-gray-900 text-pb-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-pb-accent border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 bg-pb-gray-900 text-pb-white">
      <div className="container mx-auto px-6">
        <ContactForm contactInfo={contactInfo} />
      </div>
    </section>
  )
}