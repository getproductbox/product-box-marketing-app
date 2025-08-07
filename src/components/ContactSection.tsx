import { ContactForm } from './ContactForm'

export function ContactSection() {
  return (
    <section className="py-20 bg-pb-gray-900 text-pb-white">
      <div className="container mx-auto px-6">
        <ContactForm />
      </div>
    </section>
  )
}