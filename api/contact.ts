import type { VercelRequest, VercelResponse } from '@vercel/node'

interface ContactFormData {
  name: string
  email: string
  company: string
  projectDescription: string
  budgetRange: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, company, projectDescription, budgetRange }: ContactFormData = req.body

    if (!name || !email || !projectDescription) {
      return res.status(400).json({ error: 'Name, email, and project description are required' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    console.log('Contact form submission:', {
      name,
      email,
      company,
      projectDescription,
      budgetRange,
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'],
      ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress
    })

    return res.status(200).json({ 
      success: true, 
      message: 'Your message has been received. We\'ll get back to you within 48 hours!' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}