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
    service: 'Vision',
    tagline: 'From Manual Reporting Hell to $2M Funding Success',
    description: 'TechFlow was drowning in manual data processing. Their operations team spent 40+ hours weekly creating reports instead of driving growth. We built their custom analytics platform that automated everything – freeing up their team to focus on strategy. The real-time insights we delivered were so compelling, they secured $2M in seed funding using our platform\'s data.',
    overview: 'A comprehensive analytics platform that transformed manual reporting processes into automated insights, enabling a successful $2M funding round.',
    challenge: 'TechFlow\'s operations team was spending over 40 hours per week manually processing data and creating reports. This manual approach was not only time-consuming but also prone to errors, preventing the team from focusing on strategic growth initiatives. The lack of real-time insights was hindering their ability to make data-driven decisions and communicate value to potential investors.',
    solution: 'We developed a custom analytics platform that completely automated their data processing workflows. The solution integrated with their existing tools, automatically collected and processed data from multiple sources, and generated real-time dashboards and reports. We implemented intelligent alerts and predictive analytics to help them stay ahead of trends.',
    results: 'The transformation was immediate and dramatic. The operations team was freed up to focus on strategic initiatives, the automated system provided real-time insights that were previously impossible to obtain, and the compelling data visualizations became a key asset in their successful $2M funding pitch.',
    image: {
      _type: 'image',
      asset: null,
      alt: 'TechFlow AI Analytics Platform'
    },
    metrics: [
      { label: 'Hours Saved Weekly', value: '40+' },
      { label: 'Deployment Time', value: '6 weeks' },
      { label: 'Funding Secured', value: '$2M' }
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'D3.js', 'AWS Lambda', 'Docker'],
    year: '2024',
    order: 1,
    featured: true,
    slug: {
      current: 'techflow-analytics',
      _type: 'slug'
    }
  },
  {
    _id: '2',
    _type: 'caseStudy',
    client: 'GreenCart',
    service: 'Scale',
    tagline: 'Strategic Blueprint Attracts 15 VCs in 90 Days',
    description: 'GreenCart had big sustainability goals but chaotic operations holding them back. Our comprehensive discovery uncovered hidden inefficiencies and designed a growth-ready architecture that impressed investors. The strategic operational blueprint we created became their competitive advantage, attracting 15 VCs and positioning them as the clear market leader.',
    overview: 'A comprehensive operational transformation that turned chaotic processes into a strategic competitive advantage, attracting significant investor interest.',
    challenge: 'GreenCart had ambitious sustainability goals and a compelling business model, but their operations were fragmented and inefficient. Manual processes were creating bottlenecks, inventory management was chaotic, and their systems couldn\'t scale with their growth ambitions. These operational challenges were preventing them from reaching their potential and communicating their value to investors.',
    solution: 'We conducted a comprehensive operational audit and designed a complete growth-ready architecture. This included streamlining their supply chain management, implementing automated inventory tracking, creating integrated customer service workflows, and building predictive analytics for demand forecasting. The solution was designed to scale seamlessly with their growth.',
    results: 'The operational transformation positioned GreenCart as a clear market leader in sustainable e-commerce. The efficiency gains were so significant that they attracted 15 VCs within 90 days. The strategic blueprint we created became a core part of their investor pitch, demonstrating their operational excellence and scalability.',
    image: {
      _type: 'image',
      asset: null,
      alt: 'GreenCart Sustainable E-commerce Platform'
    },
    metrics: [
      { label: 'Order Fulfillment Speed', value: '3x faster' },
      { label: 'VC Interest', value: '15 VCs' },
      { label: 'Transformation Time', value: '90 days' }
    ],
    technologies: ['Next.js', 'MongoDB', 'Redis', 'Stripe', 'Shopify API', 'Google Cloud'],
    year: '2024',
    order: 2,
    featured: true,
    slug: {
      current: 'greencart-transformation',
      _type: 'slug'
    }
  },
  {
    _id: '3',
    _type: 'caseStudy',
    client: 'HealthHub',
    service: 'Thrive',
    tagline: '10x Patient Growth Without Operational Chaos',
    description: 'Scaling from 5K to 50K patients should have broken HealthHub\'s operations. Instead, our proactive optimization kept them ahead of growth. We continuously optimized their systems, predicted scaling needs, and enhanced capabilities before bottlenecks appeared. Result: seamless 10x growth with 40% cost reduction.',
    overview: 'A proactive optimization strategy that enabled seamless 10x patient growth while reducing operational costs by 40%.',
    challenge: 'HealthHub was experiencing rapid growth, scaling from 5,000 to 50,000 patients, but their existing systems weren\'t designed for this volume. Traditional scaling approaches would have resulted in operational chaos, increased costs, and degraded patient experience. They needed a solution that could handle exponential growth while maintaining quality care delivery.',
    solution: 'We implemented a comprehensive proactive optimization strategy that included automated patient onboarding, intelligent appointment scheduling, predictive capacity planning, and automated billing reconciliation. The system was designed to automatically scale resources based on demand and continuously optimize performance without manual intervention.',
    results: 'HealthHub achieved seamless 10x patient growth without any operational disruption. The proactive optimization reduced operational costs by 40% while maintaining 99.9% system uptime. Patient satisfaction scores actually improved during the growth period, and the system continues to scale automatically as they add more patients.',
    image: {
      _type: 'image',
      asset: null,
      alt: 'HealthHub Telemedicine Platform'
    },
    metrics: [
      { label: 'Patient Volume Growth', value: '10x' },
      { label: 'Cost Reduction', value: '40%' },
      { label: 'System Uptime', value: '99.9%' }
    ],
    technologies: ['Vue.js', 'Python', 'Django', 'Celery', 'PostgreSQL', 'Docker', 'Kubernetes'],
    year: '2023',
    order: 3,
    featured: true,
    slug: {
      current: 'healthhub-scaling',
      _type: 'slug'
    }
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