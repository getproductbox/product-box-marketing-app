// SEO Head Component - Dynamic Meta Tags and Structured Data
// Phase 5: Analytics, Testing & Launch Optimization
/* eslint-disable @typescript-eslint/no-explicit-any, react-refresh/only-export-components */

import { useEffect } from 'react'
import { SEOOptimizer } from '../utils/performance'

interface SEOHeadProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  twitterImage?: string
  structuredData?: any
  noIndex?: boolean
  keywords?: string[]
}

export function SEOHead({
  title = 'Product Box - Transform Your Operations From Chaos to Competitive Advantage',
  description = 'Scale your business operations efficiently with Product Box. From Vision to Scale to Thrive - we help companies transform operational chaos into competitive advantages.',
  canonical,
  ogImage = '/og-image.jpg',
  twitterImage,
  structuredData,
  noIndex = false,
  keywords = ['operations consulting', 'business scaling', 'operational efficiency', 'growth strategy']
}: SEOHeadProps) {
  
  useEffect(() => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    
    // Default structured data for the organization
    const defaultStructuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
          "name": "Product Box",
          "description": "Operations consulting and business scaling experts",
          "url": baseUrl,
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`,
            "width": 512,
            "height": 512
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-0123",
            "contactType": "business",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://linkedin.com/company/productbox",
            "https://twitter.com/productbox"
          ],
          "founder": {
            "@type": "Person",
            "name": "Product Box Team"
          },
          "foundingDate": "2020",
          "industry": "Business Consulting",
          "services": [
            "Operations Consulting",
            "Business Scaling",
            "Growth Strategy",
            "Operational Efficiency"
          ]
        },
        {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          "url": baseUrl,
          "name": "Product Box",
          "description": description,
          "publisher": {
            "@id": `${baseUrl}/#organization`
          },
          "inLanguage": "en-US",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "WebPage",
          "@id": `${currentUrl}#webpage`,
          "url": currentUrl,
          "name": title,
          "description": description,
          "isPartOf": {
            "@id": `${baseUrl}/#website`
          },
          "about": {
            "@id": `${baseUrl}/#organization`
          },
          "dateModified": new Date().toISOString(),
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": baseUrl
              }
            ]
          }
        },
        {
          "@type": "Service",
          "name": "Operations Consulting",
          "description": "Transform operational chaos into competitive advantage with our three-phase approach: Vision, Scale, and Thrive.",
          "provider": {
            "@id": `${baseUrl}/#organization`
          },
          "serviceType": "Business Consulting",
          "areaServed": "United States",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Operations Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Vision Phase",
                  "description": "Strategic planning and operational assessment"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Scale Phase", 
                  "description": "Implementation and growth optimization"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Thrive Phase",
                  "description": "Sustainable growth and competitive advantage"
                }
              }
            ]
          }
        }
      ]
    }

    // Merge with custom structured data if provided
    const finalStructuredData = structuredData || defaultStructuredData

    // Update all meta tags and structured data
    SEOOptimizer.updatePageMeta({
      title,
      description,
      canonical: canonical || currentUrl,
      ogTitle: title,
      ogDescription: description,
      ogImage: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
      ogUrl: currentUrl,
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: twitterImage || (ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`),
      structuredData: finalStructuredData
    })

    // Update additional meta tags
    updateMetaTags({
      keywords: keywords.join(', '),
      robots: noIndex ? 'noindex, nofollow' : 'index, follow',
      viewport: 'width=device-width, initial-scale=1.0',
      charset: 'UTF-8',
      language: 'en-US',
      author: 'Product Box',
      generator: 'React, Vite, TypeScript'
    })

  }, [title, description, canonical, ogImage, twitterImage, structuredData, noIndex, keywords])

  return null // This component only updates the document head
}

function updateMetaTags(tags: Record<string, string>) {
  if (typeof document === 'undefined') return

  Object.entries(tags).forEach(([name, content]) => {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
    
    if (!meta && name !== 'charset') {
      meta = document.createElement('meta')
      meta.name = name
      document.head.appendChild(meta)
    }
    
    if (name === 'charset') {
      let charset = document.querySelector('meta[charset]') as HTMLMetaElement
      if (!charset) {
        charset = document.createElement('meta')
        charset.setAttribute('charset', content)
        document.head.insertBefore(charset, document.head.firstChild)
      }
    } else {
      meta.content = content
    }
  })
}

// Prebuilt SEO configurations for different pages
export const SEO_CONFIGS = {
  HOME: {
    title: 'Product Box - Transform Operations From Chaos to Competitive Advantage',
    description: 'Scale your business operations efficiently with Product Box. Our Vision-Scale-Thrive approach helps companies transform operational chaos into competitive advantages.',
    keywords: ['operations consulting', 'business scaling', 'operational efficiency', 'growth strategy', 'business transformation']
  },
  
  SERVICES: {
    title: 'Operations Consulting Services - Vision, Scale, Thrive | Product Box',
    description: 'Comprehensive operations consulting services. From strategic vision to scalable implementation to thriving operations - discover our three-phase approach.',
    keywords: ['operations consulting', 'business services', 'scaling solutions', 'operational strategy']
  },
  
  CASE_STUDIES: {
    title: 'Client Success Stories - Operations Transformation Case Studies | Product Box',
    description: 'See how we\'ve helped companies like Digs, Carbon Compared, and Vision Pitch transform their operations and achieve measurable growth.',
    keywords: ['case studies', 'client success', 'operations transformation', 'business results']
  },
  
  CONTACT: {
    title: 'Get Your Operations Assessment - Contact Product Box',
    description: 'Ready to transform your operations? Get your free operational assessment and discover how we can help scale your business efficiently.',
    keywords: ['contact', 'operations assessment', 'business consultation', 'get started']
  }
} as const

// Hook for dynamic SEO updates based on page content
export function useDynamicSEO(
  pageType: keyof typeof SEO_CONFIGS,
  overrides: Partial<SEOHeadProps> = {}
) {
  const config = SEO_CONFIGS[pageType]
  
  return {
    ...config,
    ...overrides
  }
}

// Component for JSON-LD structured data injection
export function StructuredDataScript({ data }: { data: any }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
    
    return () => {
      document.head.removeChild(script)
    }
  }, [data])
  
  return null
}

// FAQ Structured Data Component
export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
  
  return <StructuredDataScript data={faqStructuredData} />
}

// Breadcrumb Structured Data Component
export function BreadcrumbStructuredData({ 
  breadcrumbs 
}: { 
  breadcrumbs: Array<{ name: string; url: string }> 
}) {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": breadcrumb.url
    }))
  }
  
  return <StructuredDataScript data={breadcrumbStructuredData} />
}