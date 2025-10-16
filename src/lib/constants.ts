// Team Members
export const TEAM_MEMBERS = [
  {
    name: 'Matt',
    calendarUrl: 'https://calendar.app.google/KHYMfLZb2LsuJTEi7',
  },
  {
    name: 'Ollie',
    calendarUrl: 'https://calendar.app.google/KHYMfLZb2LsuJTEi7', // TODO: Replace with Ollie's Google Calendar URL when available
  },
] as const

// External URLs (keeping for backwards compatibility during migration)
export const EXTERNAL_URLS = {
  CALENDLY: 'https://calendly.com/productbox',
} as const

// Section IDs for navigation
export const SECTION_IDS = {
  CONTACT: 'contact',
  HERO: 'hero',
} as const

// Common CTA text
export const CTA_TEXT = {
  BOOK_DISCOVERY_CALL: 'Book Discovery Call',
  LEARN_MORE: 'Learn More',
} as const

// Navigation routes
export const ROUTES = {
  HOME: '/',
  AGENT_TRAINING: '/agent-training',
  PRODUCT_STUDIO: '/product-studio',
  CASE_STUDIES: '/case-studies',
  PRIVACY: '/privacy',
  TERMS: '/terms',
} as const

// Navigation items configuration
export const NAV_ITEMS = [
  { label: 'Training', path: ROUTES.AGENT_TRAINING },
  { label: 'Studio', path: ROUTES.PRODUCT_STUDIO },
  { label: 'Case Studies', path: ROUTES.CASE_STUDIES },
] as const
