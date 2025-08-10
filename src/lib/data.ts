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
  title: 'Build custom internal operations software that scales your business',
  subtitle: 'Fullstack Operations Specialists',
  description: "We're the fullstack software partner that builds custom internal operations software with agent workflows to streamline your business processes. Vision. Mobilise. Support. Three offerings that transform how you operate.",
  primaryButtonText: 'Optimize Operations',
  primaryButtonLink: '#contact',
  secondaryButtonText: 'View Our Work',
  secondaryButtonLink: '#case-studies',
  stats: [
    { value: '2-4wks', label: 'Implementation time', _key: '1' },
    { value: '3 offerings', label: 'To operational excellence', _key: '2' },
    { value: '50+', label: 'Internal systems built', _key: '3' }
  ]
}

const FALLBACK_SERVICES: Service[] = [
  {
    _id: 'vision',
    _type: 'service',
    title: 'Vision',
    phase: 'Vision',
    icon: 'eye',
    shortDescription: 'Strategic planning and architecture for operational software excellence',
    fullDescription: 'We audit your current operations, analyze workflow inefficiencies, and design comprehensive software architecture with agent workflows that will transform how your business operates.',
    features: ['Operational Audit', 'Workflow Analysis', 'Agent Strategy Design', 'Technology Architecture'],
    order: 1
  },
  {
    _id: 'mobilise',
    _type: 'service',
    title: 'Mobilise',
    phase: 'Mobilise',
    icon: 'trending-up',
    shortDescription: 'Custom development and implementation of internal operations software',
    fullDescription: 'Our fullstack team builds purpose-built internal software with agent workflows, integrating seamlessly with your existing systems to automate processes and scale operations.',
    features: ['Custom Software Development', 'Agent Workflow Implementation', 'System Integration', 'Process Automation'],
    order: 2
  },
  {
    _id: 'support',
    _type: 'service',
    title: 'Support',
    phase: 'Support',
    icon: 'zap',
    shortDescription: 'Ongoing optimization and scaling of your operational software',
    fullDescription: 'We continuously monitor, optimize, and enhance your internal systems, refining agent workflows and scaling your operational capabilities as your business grows.',
    features: ['Performance Monitoring', 'Agent Workflow Optimization', 'Feature Enhancement', 'Operational Scaling'],
    order: 3
  }
]

const FALLBACK_CASE_STUDIES: CaseStudy[] = [
  {
    _id: '1',
    _type: 'caseStudy',
    client: 'TechFlow',
    service: 'Mobilise',
    tagline: 'AI Analytics Platform',
    description: 'Built a comprehensive internal analytics platform with automated data processing workflows that streamlined their operations team\'s daily reporting processes, reducing manual work by 80% and enabling real-time business insights that secured $2M in seed funding.',
    image: {
      _type: 'image',
      asset: { _ref: 'fallback-1', _type: 'reference' },
      alt: 'TechFlow AI Analytics Platform'
    },
    metrics: ['80% less manual work', '8 weeks implementation', '$2M funding secured'],
    year: '2024',
    order: 1,
    featured: true
  },
  {
    _id: '2',
    _type: 'caseStudy',
    client: 'GreenCart',
    service: 'Vision',
    tagline: 'Sustainable E-commerce Operations',
    description: 'Designed a comprehensive operational software architecture and automation strategy for their sustainable e-commerce platform, mapping critical business processes and creating agent workflows that improved order fulfillment efficiency and attracted major VC interest.',
    image: {
      _type: 'image',
      asset: { _ref: 'fallback-2', _type: 'reference' },
      alt: 'GreenCart Sustainable E-commerce Platform'
    },
    metrics: ['3x faster fulfillment', '15 VCs interested', '60% process automation'],
    year: '2024',
    order: 2,
    featured: true
  },
  {
    _id: '3',
    _type: 'caseStudy',
    client: 'HealthHub',
    service: 'Support',
    tagline: 'Telemedicine Operations',
    description: 'Continuously optimized and scaled their internal patient management systems, implementing advanced monitoring and agent-driven workflows that enabled growth from 5K to 50K patients while maintaining operational excellence and reducing costs by 40%.',
    image: {
      _type: 'image',
      asset: { _ref: 'fallback-3', _type: 'reference' },
      alt: 'HealthHub Telemedicine Platform'
    },
    metrics: ['99.9% system uptime', '10x operational scale', '40% cost reduction'],
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