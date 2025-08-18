export const HERO_QUERY = `*[_type == "hero"][0] {
  _id,
  title,
  subtitle,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  stats[] {
    value,
    label,
    _key
  }
}`

export const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  phase,
  icon,
  shortDescription,
  fullDescription,
  features,
  order
}`

export const CASE_STUDIES_QUERY = `*[_type == "caseStudy"] | order(order asc) {
  _id,
  client,
  service,
  tagline,
  description,
  overview,
  challenge,
  solution,
  results,
  image {
    asset-> {
      _id,
      url
    },
    alt,
    hotspot,
    crop
  },
  metrics[] {
    label,
    value,
    _key
  },
  technologies,
  year,
  order,
  featured,
  slug
}`

export const CONTACT_INFO_QUERY = `*[_type == "contactInfo"][0] {
  _id,
  email,
  phone,
  address,
  socialLinks[] {
    platform,
    url,
    _key
  }
}`

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  _id,
  siteName,
  siteDescription,
  siteUrl,
  logo {
    asset-> {
      _id,
      url
    },
    alt
  },
  favicon {
    asset-> {
      _id,
      url
    },
    alt
  },
  seoTitle,
  seoDescription,
  seoImage {
    asset-> {
      _id,
      url
    },
    alt
  }
}`

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc) {
  _id,
  quote,
  client,
  company,
  role,
  variant,
  order,
  featured
}`