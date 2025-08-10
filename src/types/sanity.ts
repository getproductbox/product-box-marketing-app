export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface Hero {
  _id: string
  _type: 'hero'
  title: string
  subtitle: string
  description: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  stats: Array<{
    value: string
    label: string
    _key: string
  }>
}

export interface Service {
  _id: string
  _type: 'service'
  title: string
  phase: 'Vision' | 'Mobilise' | 'Support'
  icon: string
  shortDescription: string
  fullDescription: string
  features: string[]
  order: number
}

export interface CaseStudy {
  _id: string
  _type: 'caseStudy'
  client: string
  service: 'Vision' | 'Mobilise' | 'Support'
  tagline: string
  description: string
  image: SanityImage
  metrics: string[]
  year: string
  order: number
  featured: boolean
}

export interface ContactInfo {
  _id: string
  _type: 'contactInfo'
  email: string
  phone?: string
  address?: string
  socialLinks: Array<{
    platform: string
    url: string
    _key: string
  }>
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  siteName: string
  siteDescription: string
  siteUrl: string
  logo: SanityImage
  favicon: SanityImage
  seoTitle: string
  seoDescription: string
  seoImage: SanityImage
}