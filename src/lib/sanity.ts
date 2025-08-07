import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // Enable CDN for faster reads in production
})

// Query helpers
export const queries = {
  caseStudies: `*[_type == "caseStudy"] | order(order asc) {
    _id,
    client,
    slug,
    service,
    tagline,
    description,
    "image": image.asset->url,
    metrics,
    outcome,
    order
  }`,
  
  services: `*[_type == "service"] | order(order asc) {
    _id,
    id,
    title,
    tagline,
    outcome,
    deliverables,
    timeline,
    price,
    order
  }`,
  
  testimonials: `*[_type == "testimonial"] {
    _id,
    quote,
    author,
    role,
    company,
    "image": image.asset->url,
    "relatedCaseStudy": relatedCaseStudy->client
  }`,
  
  companyLogos: `*[_type == "companyLogo"] | order(order asc) {
    _id,
    name,
    "logo": logo.asset->url,
    url,
    order
  }`,
  
  siteSettings: `*[_type == "siteSettings"][0] {
    _id,
    heroTitle,
    heroSubtitle,
    contactEmail,
    socialLinks
  }`
}