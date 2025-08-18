# Updated Sanity Schema for Case Studies

The existing Case Study schema needs to be updated to support the new modal functionality and metrics structure.

## Updated Case Study Schema (`caseStudy.js`)

Replace the existing `caseStudy.js` schema with this updated version:

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
      validation: Rule => Rule.required(),
      description: 'Short, compelling tagline (e.g., "From Manual Reporting Hell to $2M Funding Success")'
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'text',
      validation: Rule => Rule.required(),
      description: 'Brief description shown on the main case studies page'
    },
    {
      name: 'overview',
      title: 'Project Overview',
      type: 'text',
      validation: Rule => Rule.required(),
      description: 'Detailed overview shown in the modal header'
    },
    {
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      validation: Rule => Rule.required(),
      description: 'What problem did the client face?'
    },
    {
      name: 'solution',
      title: 'Our Solution',
      type: 'text',
      validation: Rule => Rule.required(),
      description: 'How did we solve the problem?'
    },
    {
      name: 'results',
      title: 'The Results',
      type: 'text',
      validation: Rule => Rule.required(),
      description: 'What were the outcomes and impact?'
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
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      of: [{
        type: 'object',
        name: 'metric',
        title: 'Metric',
        fields: [
          {
            name: 'label',
            title: 'Metric Label',
            type: 'string',
            validation: Rule => Rule.required(),
            description: 'e.g., "Hours Saved Weekly", "Deployment Time"'
          },
          {
            name: 'value',
            title: 'Metric Value',
            type: 'string',
            validation: Rule => Rule.required(),
            description: 'e.g., "40+", "6 weeks", "$2M"'
          }
        ],
        preview: {
          select: {
            title: 'label',
            subtitle: 'value'
          }
        }
      }],
      validation: Rule => Rule.required().min(2).max(5)
    },
    {
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Technologies, frameworks, and tools used in this project'
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
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'client',
        maxLength: 96
      },
      validation: Rule => Rule.required(),
      description: 'Used for URLs and linking'
    }
  ],
  preview: {
    select: {
      title: 'client',
      subtitle: 'tagline',
      media: 'image'
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Year (Newest First)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }]
    }
  ]
}
```

## What Changed?

### 1. **Fixed Metrics Structure** ✅
- **Old**: `metrics: array of strings`
- **New**: `metrics: array of objects with {label, value}` 
- This matches our current GROQ query: `metrics[] { label, value, _key }`

### 2. **Added Modal Content Fields** ✅
- `overview` - Detailed overview for modal header
- `challenge` - What problem the client faced  
- `solution` - How we solved it
- `results` - Outcomes and impact

### 3. **Added Technical Details** ✅
- `technologies` - Array of tech stack items
- `slug` - For URL generation and linking

### 4. **Improved UX** ✅
- Better field descriptions to guide content editors
- Preview configuration for better Studio experience
- Additional ordering options

## Migration Steps

1. **Update your Sanity Studio schema file** with the new `caseStudy.js`
2. **Deploy the schema**: `sanity schema deploy`
3. **Update existing case studies** in Sanity Studio to add the new required fields
4. **Test the queries** to ensure all fields are being fetched correctly

## Example Case Study Data Structure

When creating case studies in Sanity Studio, they should follow this structure:

```json
{
  "client": "TechFlow",
  "service": "Scale", 
  "tagline": "From Manual Reporting Hell to $2M Funding Success",
  "description": "Brief description for main page...",
  "overview": "A comprehensive analytics platform that transformed manual reporting...",
  "challenge": "TechFlow's operations team was spending over 40 hours per week...",
  "solution": "We developed a custom analytics platform that completely automated...",
  "results": "The transformation was immediate and dramatic. The operations team...",
  "metrics": [
    {"label": "Hours Saved Weekly", "value": "40+"},
    {"label": "Deployment Time", "value": "6 weeks"},
    {"label": "Funding Secured", "value": "$2M"}
  ],
  "technologies": ["React", "Node.js", "PostgreSQL", "D3.js", "AWS Lambda", "Docker"],
  "year": "2024",
  "order": 1,
  "featured": true,
  "slug": {"current": "techflow-analytics"}
}
```

This updated schema will fully support both the main case studies page with bullet-point metrics AND the detailed modal with comprehensive project information.