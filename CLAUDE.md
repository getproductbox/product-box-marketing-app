# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production (TypeScript + Vite)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (always run after changes)

## Architecture Overview

This is a **single-page React marketing website** with **optional Sanity CMS integration** and **graceful fallback to static content**. The architecture prioritizes performance and resilience.

### Data Flow Pattern

The app uses a **CMS-first-with-fallback** pattern:

1. **Primary**: Fetch content from Sanity CMS via `sanityFetch()`
2. **Fallback**: Use comprehensive static data from `src/lib/data.ts` if CMS fails
3. **Graceful Degradation**: All components work without CMS configuration

Key files:
- `src/lib/sanity.ts` - CMS client with configuration validation
- `src/lib/data.ts` - Static fallback data and fetch functions
- `src/lib/queries.ts` - GROQ queries for Sanity
- `src/types/sanity.ts` - TypeScript interfaces for CMS content

### Component Architecture

**Layout Structure**: Single-page app with sections rendered in sequence
```
App.tsx
├── BackgroundGrid + BackgroundEffects (global visual layer)
├── Header (navigation)
└── Main Content (z-index stacked)
    ├── HeroSection
    ├── ServiceCards (3-phase process: Vision/Scale/Thrive)
    ├── CaseStudies (filterable portfolio)
    ├── ContactSection
    ├── Footer
    └── ContactFloat (floating CTA)
```

**Design System**: Custom Tailwind configuration with `pb-` prefixed colors and responsive typography scale (`hero`, `display`, `h1`-`h3`, `body` variants).

### Sanity CMS Integration

**Optional by Design**: The CMS integration is completely optional. The site works fully without Sanity configuration.

**Configuration Check**: `src/lib/sanity.ts` validates `VITE_SANITY_PROJECT_ID` and only creates client if properly configured.

**Content Types**:
- `hero` - Landing page hero section
- `service` - Three-phase services (Vision/Scale/Thrive)
- `caseStudy` - Portfolio projects with metrics
- `contactInfo` - Contact details and social links
- `siteSettings` - SEO and branding

### Contact Form & API

**Serverless Function**: `api/contact.ts` handles form submissions (Vercel-compatible)
- Validates required fields and email format
- Logs submissions with metadata
- Returns success confirmation

**Deployment Flexibility**: 
- Vercel: Uses serverless function automatically
- Netlify: Configured via `netlify.toml`
- Other platforms: Requires custom email API endpoint

## Key Development Patterns

### Environment Variables
```bash
# Optional Sanity CMS
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production

# Contact form (platform-specific)
VITE_RESEND_API_KEY=re_xxxxx  # Client-side
RESEND_API_KEY=re_xxxxx       # Server-side (Vercel)
```

### TypeScript Patterns
- Strict typing with interfaces in `src/types/sanity.ts`
- Proper typing for Sanity queries and responses
- Component prop interfaces inline for small components

### Error Handling
- CMS fetch errors fall back to static data with `console.warn()`
- Contact form provides user-friendly error messages
- Build fails on TypeScript errors or lint violations

### Styling Approach
- Tailwind with custom design system (`pb-` prefix)
- Responsive typography using `clamp()` functions
- Component-scoped styling (no global CSS beyond Tailwind)

## Content Management

When working with content:
1. **Static Content**: Edit fallback data in `src/lib/data.ts`
2. **CMS Content**: Modify via Sanity Studio (if configured)
3. **Schema Changes**: Update both `src/types/sanity.ts` and `src/lib/queries.ts`

The app always prioritizes CMS content when available but falls back gracefully to static content, ensuring the site never breaks due to CMS issues.