# Sanity Studio Setup Guide

## Overview
Your existing Sanity project (jsxpecp1) is connected and working. The project currently has portfolio and post content types. We need to add the new marketing schemas and create initial content.

## Current Status
- ✅ Project connected (jsxpecp1)
- ✅ Dataset: production
- ✅ Existing content: 6 portfolio items, blog posts
- ❌ New schemas need to be added to Studio
- ❌ Initial marketing content needs to be created

## Step 1: Add New Schemas to Sanity Studio

Navigate to your Sanity Studio project directory and add these schema files:

### File: `schemas/hero.js`
```javascript
export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Main Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'primaryButtonLink',
      title: 'Primary Button Link',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string'
    },
    {
      name: 'secondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'string'
    },
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'value',
            title: 'Value',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: Rule => Rule.required()
          }
        ]
      }]
    }
  ]
}
```

### File: `schemas/service.js`
```javascript
export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'phase',
      title: 'Phase',
      type: 'string',
      options: {
        list: [
          { title: 'Vision', value: 'Vision' },
          { title: 'Scale', value: 'Scale' },
          { title: 'Thrive', value: 'Thrive' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g., "eye", "trending-up", "zap")'
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
}
```

### File: `schemas/caseStudy.js`
```javascript
export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'client',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'service',
      title: 'Service Phase',
      type: 'string',
      options: {
        list: [
          { title: 'Vision', value: 'Vision' },
          { title: 'Scale', value: 'Scale' },
          { title: 'Thrive', value: 'Thrive' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tagline',
      title: 'Project Tagline',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(2).max(5)
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
}
```

### File: `schemas/contactInfo.js`
```javascript
export default {
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text'
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: {
              list: [
                { title: 'Twitter', value: 'twitter' },
                { title: 'LinkedIn', value: 'linkedin' },
                { title: 'Facebook', value: 'facebook' },
                { title: 'Instagram', value: 'instagram' }
              ]
            }
          },
          {
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: Rule => Rule.required()
          }
        ]
      }]
    }
  ]
}
```

### File: `schemas/siteSettings.js`
```javascript
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      validation: Rule => Rule.required()
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image'
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string'
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text'
    },
    {
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}
```

## Step 2: Update Schema Index

Update your `schemas/index.js` file to include the new schemas:

```javascript
// Import existing schemas
import portfolio from './portfolio'
import post from './post'

// Import new marketing schemas
import hero from './hero'
import service from './service'
import caseStudy from './caseStudy'
import contactInfo from './contactInfo'
import siteSettings from './siteSettings'

export const schemaTypes = [
  // Existing schemas
  portfolio,
  post,
  
  // New marketing schemas
  hero,
  service,
  caseStudy,
  contactInfo,
  siteSettings
]
```

## Step 3: Deploy Schemas to Studio

1. Run `npm run dev` or `sanity dev` in your Studio directory
2. Deploy the schemas: `sanity deploy`
3. The new content types will appear in your Studio

## Step 4: Create Initial Content

### Hero Section
Create one hero document with:
- Title: "Turn your idea into a product"
- Subtitle: "Welcome to Product Box"
- Description: "We're the product development partner that takes you from initial concept to market success. Vision. Scale. Thrive. Three phases, one incredible journey."
- Primary Button: "Start Your Journey" → "#contact"
- Secondary Button: "View Our Work" → "#case-studies"
- Stats:
  - "48hrs" / "Response time"
  - "3 phases" / "To success"
  - "100+" / "Products launched"

### Services
Create 3 service documents:

1. **Vision** (order: 1)
   - Icon: "eye"
   - Short: "Transform your idea into a clear product strategy"
   - Full: "We help you validate your idea, understand your market, and create a comprehensive product strategy that sets you up for success."
   - Features: Market Research, Product Strategy, Technical Planning, Business Model

2. **Scale** (order: 2)
   - Icon: "trending-up"
   - Short: "Build and launch your product"
   - Full: "Our experienced team develops your product using the latest technologies and best practices to ensure scalability and performance."
   - Features: Product Development, Quality Assurance, Launch Strategy, Performance Optimization

3. **Thrive** (order: 3)
   - Icon: "zap"
   - Short: "Grow and optimize for success"
   - Full: "We help you analyze performance, optimize user experience, and implement growth strategies to scale your product."
   - Features: Analytics & Insights, Growth Strategy, Optimization, Continuous Improvement

### Case Studies
Convert your existing portfolio items to case studies by creating new case study documents. I recommend:

1. **Personal Finance Digest Automation** → Vision case study
2. **Carbon Compared** → Scale case study  
3. **PackChat** → Thrive case study

### Contact Info
Create one contact info document:
- Email: hello@getproductbox.com
- Social links as needed

### Site Settings
Create one site settings document with your site metadata.

## Step 5: Test the Integration

After creating the content, the marketing app will automatically start using the live Sanity data instead of fallback data. You should see the CMS-managed content appear on the site immediately.

## Migration Strategy
The beauty of this approach is that your existing portfolio and post content remains untouched, while the new marketing content is layered on top. The site will gracefully fall back to static data if any CMS content is missing.