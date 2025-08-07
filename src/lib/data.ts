import { sanityFetch } from './sanity'
import { 
  HERO_QUERY, 
  SERVICES_QUERY, 
  CASE_STUDIES_QUERY, 
  CONTACT_INFO_QUERY,
  SITE_SETTINGS_QUERY
} from './queries'
import type { Hero, Service, CaseStudy, ContactInfo, SiteSettings } from '../types/sanity'

const FALLBACK_HERO: Hero = {
  _id: 'fallback-hero',
  _type: 'hero',
  title: 'Turn your idea into a product',
  subtitle: 'Welcome to Product Box',
  description: "We're the product development partner that takes you from initial concept to market success. Vision. Scale. Thrive. Three phases, one incredible journey.",
  primaryButtonText: 'Start Your Journey',
  primaryButtonLink: '#contact',
  secondaryButtonText: 'View Our Work',
  secondaryButtonLink: '#case-studies',
  stats: [
    { value: '48hrs', label: 'Response time', _key: '1' },
    { value: '3 phases', label: 'To success', _key: '2' },
    { value: '100+', label: 'Products launched', _key: '3' }
  ]
}

const FALLBACK_SERVICES: Service[] = [
  {
    _id: 'vision',
    _type: 'service',
    title: 'Vision',
    phase: 'Vision',
    icon: 'eye',
    shortDescription: 'Transform your idea into a clear product strategy',
    fullDescription: 'We help you validate your idea, understand your market, and create a comprehensive product strategy that sets you up for success.',
    features: ['Market Research', 'Product Strategy', 'Technical Planning', 'Business Model'],
    order: 1
  },
  {
    _id: 'scale',
    _type: 'service',
    title: 'Scale',
    phase: 'Scale',
    icon: 'trending-up',
    shortDescription: 'Build and launch your product',
    fullDescription: 'Our experienced team develops your product using the latest technologies and best practices to ensure scalability and performance.',
    features: ['Product Development', 'Quality Assurance', 'Launch Strategy', 'Performance Optimization'],
    order: 2
  },
  {
    _id: 'thrive',
    _type: 'service',
    title: 'Thrive',
    phase: 'Thrive',
    icon: 'zap',
    shortDescription: 'Grow and optimize for success',
    fullDescription: 'We help you analyze performance, optimize user experience, and implement growth strategies to scale your product.',
    features: ['Analytics & Insights', 'Growth Strategy', 'Optimization', 'Continuous Improvement'],
    order: 3
  }
]

const FALLBACK_CASE_STUDIES: CaseStudy[] = [
  {
    _id: '1',
    _type: 'caseStudy',
    client: 'TechFlow',
    service: 'Scale',
    tagline: 'AI Analytics Platform',
    description: 'Transformed a complex data visualization concept into a market-leading product that secured $2M in seed funding.',
    image: {
      _type: 'image',
      asset: { _ref: 'fallback-1', _type: 'reference' },
      alt: 'TechFlow AI Analytics Platform'
    },
    metrics: ['8 weeks to market', '+250% user growth', '$2M raised'],
    year: '2024',
    order: 1,
    featured: true
  },
  {
    _id: '2',
    _type: 'caseStudy',
    client: 'GreenCart',
    service: 'Vision',
    tagline: 'Sustainable E-commerce',
    description: 'Created a comprehensive brand identity and digital platform for sustainable shopping that attracted major VC interest.',
    image: {
      _type: 'image',
      asset: { _ref: 'fallback-2', _type: 'reference' },
      alt: 'GreenCart Sustainable E-commerce Platform'
    },
    metrics: ['3 week prototype', '15 VCs interested', '92% user validation'],
    year: '2024',
    order: 2,
    featured: true
  },
  {
    _id: '3',
    _type: 'caseStudy',
    client: 'HealthHub',
    service: 'Thrive',
    tagline: 'Telemedicine Platform',
    description: 'Scaled a healthcare platform from 5K to 50K patients while maintaining 99.9% uptime and reducing operational costs.',
    image: {
      _type: 'image',
      asset: { _ref: 'fallback-3', _type: 'reference' },
      alt: 'HealthHub Telemedicine Platform'
    },
    metrics: ['99.9% uptime', '10x patient growth', '40% cost reduction'],
    year: '2023',
    order: 3,
    featured: true
  }
]

const FALLBACK_CONTACT: ContactInfo = {
  _id: 'fallback-contact',
  _type: 'contactInfo',
  email: 'hello@getproductbox.com',
  socialLinks: [
    { platform: 'twitter', url: 'https://twitter.com/productbox', _key: '1' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/productbox', _key: '2' }
  ]
}

export async function getHeroData(): Promise<Hero> {
  try {
    const data = await sanityFetch<Hero>(HERO_QUERY)
    return data || FALLBACK_HERO
  } catch (error) {
    console.warn('Failed to fetch hero data, using fallback:', error)
    return FALLBACK_HERO
  }
}

export async function getServicesData(): Promise<Service[]> {
  try {
    const data = await sanityFetch<Service[]>(SERVICES_QUERY)
    return data && data.length > 0 ? data : FALLBACK_SERVICES
  } catch (error) {
    console.warn('Failed to fetch services data, using fallback:', error)
    return FALLBACK_SERVICES
  }
}

export async function getCaseStudiesData(): Promise<CaseStudy[]> {
  try {
    const data = await sanityFetch<CaseStudy[]>(CASE_STUDIES_QUERY)
    return data && data.length > 0 ? data : FALLBACK_CASE_STUDIES
  } catch (error) {
    console.warn('Failed to fetch case studies data, using fallback:', error)
    return FALLBACK_CASE_STUDIES
  }
}

export async function getContactData(): Promise<ContactInfo> {
  try {
    const data = await sanityFetch<ContactInfo>(CONTACT_INFO_QUERY)
    return data || FALLBACK_CONTACT
  } catch (error) {
    console.warn('Failed to fetch contact data, using fallback:', error)
    return FALLBACK_CONTACT
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY)
  } catch (error) {
    console.warn('Failed to fetch site settings:', error)
    return null
  }
}