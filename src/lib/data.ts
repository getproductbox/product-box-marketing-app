import { sanityFetch } from './sanity'
import { 
  HERO_QUERY, 
  SERVICES_QUERY, 
  CASE_STUDIES_QUERY, 
  CONTACT_INFO_QUERY,
  SITE_SETTINGS_QUERY,
  TESTIMONIALS_QUERY
} from './queries'
import type { Hero, Service, CaseStudy, ContactInfo, SiteSettings, Testimonial } from '../types/sanity'

const FALLBACK_HERO: Hero = {
  _id: 'fallback-hero',
  _type: 'hero',
  title: 'Transform your operations from chaos to competitive advantage',
  subtitle: 'Fullstack Operations Specialists',
  description: "Stop losing hours to manual processes and operational bottlenecks. We build custom internal software that automates your workflows, scales with your growth, and turns operational efficiency into your secret weapon. From Vision to Support – we're your growth partner, not just your development team.",
  primaryButtonText: 'Scale My Operations',
  primaryButtonLink: '#contact',
  secondaryButtonText: 'See Success Stories',
  secondaryButtonLink: '#testimonials',
  stats: [
    { value: '40+ hrs', label: 'Weekly time savings per client', _key: '1' },
    { value: '500+', label: 'Companies transformed', _key: '2' },
    { value: '98%', label: 'Client satisfaction rate', _key: '3' }
  ]
}

const FALLBACK_SERVICES: Service[] = [
  {
    _id: 'discovery',
    _type: 'service',
    title: 'Discovery & Strategy',
    icon: 'eye',
    shortDescription: 'Uncover hidden operational bottlenecks and design your growth blueprint',
    fullDescription: 'Before building anything, we dive deep into your operations to identify where you\'re bleeding time and money. Our comprehensive audit reveals inefficiencies you didn\'t know existed, while our strategic blueprint shows exactly how custom software will unlock your next level of growth.',
    features: ['Operations Deep-Dive Audit', 'Bottleneck Identification & Analysis', 'Growth-Ready Architecture Design', 'ROI Projection & Timeline'],
    order: 1
  },
  {
    _id: 'development',
    _type: 'service',
    title: 'Development & Deployment',
    icon: 'trending-up',
    shortDescription: 'Build and deploy custom software that immediately transforms operations',
    fullDescription: 'This is where the magic happens. Our experienced team transforms your strategy into powerful, custom-built software that integrates seamlessly with your existing tools. Watch manual processes disappear and efficiency soar as we deploy solutions designed specifically for your business.',
    features: ['Rapid Custom Development', 'Seamless System Integration', 'Automated Workflow Implementation', 'Real-Time Performance Tracking'],
    order: 2
  },
  {
    _id: 'optimization',
    _type: 'service',
    title: 'Optimization & Growth',
    icon: 'zap',
    shortDescription: 'Continuous optimization ensures your operations stay ahead of growth',
    fullDescription: 'Your business evolves, and so should your systems. Our proactive optimization approach means you\'re never left behind. We monitor performance, predict scaling needs, and continuously enhance your software to maintain that competitive edge as you grow.',
    features: ['24/7 System Monitoring', 'Proactive Performance Optimization', 'Feature Evolution & Enhancement', 'Strategic Growth Planning'],
    order: 3
  }
]

const FALLBACK_CASE_STUDIES: CaseStudy[] = [
  {
    _id: '1',
    _type: 'caseStudy',
    client: 'TechFlow',
    tagline: 'From Manual Reporting Hell to $2M Funding Success',
    description: 'TechFlow was drowning in manual data processing. Their operations team spent 40+ hours weekly creating reports instead of driving growth. We built their custom analytics platform that automated everything – freeing up their team to focus on strategy. The real-time insights we delivered were so compelling, they secured $2M in seed funding using our platform\'s data.',
    image: {
      _type: 'image',
      asset: { _ref: 'fallback-1', _type: 'reference' },
      alt: 'TechFlow AI Analytics Platform'
    },
    metrics: ['40+ hours saved weekly', '6 weeks to deployment', '$2M funding secured'],
    year: '2024',
    order: 1,
    featured: true
  },
  {
    _id: '2',
    _type: 'caseStudy',
    client: 'GreenCart',
    tagline: 'Strategic Blueprint Attracts 15 VCs in 90 Days',
    description: 'GreenCart had big sustainability goals but chaotic operations holding them back. Our comprehensive discovery uncovered hidden inefficiencies and designed a growth-ready architecture that impressed investors. The strategic operational blueprint we created became their competitive advantage, attracting 15 VCs and positioning them as the clear market leader.',
    image: {
      _type: 'image',
      asset: { _ref: 'fallback-2', _type: 'reference' },
      alt: 'GreenCart Sustainable E-commerce Platform'
    },
    metrics: ['3x faster order fulfillment', '15 VCs engaged', '90-day transformation'],
    year: '2024',
    order: 2,
    featured: true
  },
  {
    _id: '3',
    _type: 'caseStudy',
    client: 'HealthHub',
    tagline: '10x Patient Growth Without Operational Chaos',
    description: 'Scaling from 5K to 50K patients should have broken HealthHub\'s operations. Instead, our proactive optimization kept them ahead of growth. We continuously optimized their systems, predicted scaling needs, and enhanced capabilities before bottlenecks appeared. Result: seamless 10x growth with 40% cost reduction.',
    image: {
      _type: 'image',
      asset: { _ref: 'fallback-3', _type: 'reference' },
      alt: 'HealthHub Telemedicine Platform'
    },
    metrics: ['10x patient volume handled', '40% operational cost reduction', '99.9% system uptime'],
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

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    _id: '1',
    _type: 'testimonial',
    quote: "We were just three founders with a climate-focused idea struggling to turn our vision into reality. Product Box didn't just build our platform – they became our operational backbone. They mapped our entire business architecture, built our SaaS platform that now serves 500+ companies, and continue to keep us scaling smoothly. Without them, we'd still be stuck in spreadsheets instead of revolutionizing how businesses measure their carbon footprint.",
    client: "Sarah Chen",
    company: "Carbon Compared",
    role: "Co-founder & CEO",
    variant: "featured",
    order: 1,
    featured: true
  },
  {
    _id: '2',
    _type: 'testimonial',
    quote: "As a startup accelerator, we've worked with dozens of development teams, but Product Box is different. They understand that early-stage companies need more than just code – they need operational excellence. Their comprehensive approach perfectly mirrors how we help startups scale. They've built internal tools for 12 of our portfolio companies, and every single one has seen dramatic improvements in operational efficiency. They're not just developers; they're growth partners.",
    client: "Marcus Rodriguez",
    company: "Vision Pitch",
    role: "Managing Partner",
    variant: "featured",
    order: 2,
    featured: true
  },
  {
    _id: '3',
    _type: 'testimonial',
    quote: "Finding the right technical partner felt impossible until we discovered Product Box. Their ability to understand complex business operations and translate them into elegant software solutions is unmatched. They built our entire workflow management system in 6 weeks, complete with automated processes that saved us 40+ hours per week. What really impressed us was their ongoing optimization – they've continued enhancing our systems as we've grown from 5 to 50 employees, always staying ahead of our needs.",
    client: "Emma Thompson",
    company: "Digs",
    role: "Operations Director",
    variant: "featured",
    order: 3,
    featured: true
  }
]

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

export async function getTestimonialsData(): Promise<Testimonial[]> {
  try {
    const data = await sanityFetch<Testimonial[]>(TESTIMONIALS_QUERY)
    return data && data.length > 0 ? data : FALLBACK_TESTIMONIALS
  } catch (error) {
    console.warn('Failed to fetch testimonials data, using fallback:', error)
    return FALLBACK_TESTIMONIALS
  }
}