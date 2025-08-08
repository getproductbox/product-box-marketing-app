# Sanity Studio Setup - Phase 2

## Current Status
✅ Sanity connection tested successfully  
✅ Found existing portfolio items: Personal Finance Digest, Carbon Compared, Flight Comp Checker  
✅ Environment variables configured  

## Next Steps: Add Marketing Schemas

You need to add these 5 schema files to your existing Sanity Studio project (`jsxpecp1`):

### 1. Create `schemas/hero.js`
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

### 2. Create `schemas/service.js`
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

### 3. Create `schemas/caseStudy.js`
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

### 4. Create `schemas/contactInfo.js`
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

### 5. Create `schemas/siteSettings.js`
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

### 6. Update `schemas/index.js`
Add these imports and exports to your existing schema index:

```javascript
// Import existing schemas (keep your existing imports)
import portfolio from './portfolio'
import post from './post'
// ... any other existing schemas

// Import new marketing schemas
import hero from './hero'
import service from './service'
import caseStudy from './caseStudy'
import contactInfo from './contactInfo'
import siteSettings from './siteSettings'

export const schemaTypes = [
  // Keep existing schemas
  portfolio,
  post,
  // ... any other existing schemas
  
  // Add new marketing schemas
  hero,
  service,
  caseStudy,
  contactInfo,
  siteSettings
]
```

## After Adding Schemas

1. Run `sanity dev` in your Studio directory
2. Run `sanity deploy` to deploy the schemas
3. The new content types will appear in your Sanity Studio
4. Return here to continue with Phase 3 (content creation)

## Ready for Next Phase?

Once you've added these schemas to your Sanity Studio, we can proceed with Phase 3: automated content creation using the existing portfolio data.