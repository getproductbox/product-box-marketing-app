# Sanity Schema Setup

Create these document types in your Sanity Studio:

## 1. Hero Section (`hero.js`)
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

## 2. Services (`service.js`)
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

## 3. Case Studies (`caseStudy.js`)
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

## 4. Contact Info (`contactInfo.js`)
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

## 5. Site Settings (`siteSettings.js`)
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

## Schema Index (`index.js`)
```javascript
import hero from './hero'
import service from './service'
import caseStudy from './caseStudy'
import contactInfo from './contactInfo'
import siteSettings from './siteSettings'

export const schemaTypes = [
  hero,
  service,
  caseStudy,
  contactInfo,
  siteSettings
]
```