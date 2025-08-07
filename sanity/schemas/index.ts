export const schemaTypes = [
  {
    name: 'caseStudy',
    title: 'Case Study',
    type: 'document',
    fields: [
      {
        name: 'client',
        title: 'Client Name',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'client',
          maxLength: 96
        },
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'service',
        title: 'Service Type',
        type: 'string',
        options: {
          list: [
            { title: 'Vision', value: 'vision' },
            { title: 'Scale', value: 'scale' },
            { title: 'Thrive', value: 'thrive' }
          ]
        },
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'tagline',
        title: 'Tagline',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'description',
        title: 'Short Description',
        type: 'text',
        validation: (Rule: any) => Rule.required().max(200)
      },
      {
        name: 'image',
        title: 'Featured Image',
        type: 'image',
        options: {
          hotspot: true
        },
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'metrics',
        title: 'Key Metrics',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'label',
                title: 'Label',
                type: 'string'
              },
              {
                name: 'value',
                title: 'Value',
                type: 'string'
              }
            ]
          }
        ],
        validation: (Rule: any) => Rule.required().min(1).max(3)
      },
      {
        name: 'outcome',
        title: 'Key Outcome',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'fullCaseStudy',
        title: 'Full Case Study Content',
        type: 'array',
        of: [
          { type: 'block' },
          {
            type: 'image',
            options: {
              hotspot: true
            }
          }
        ]
      },
      {
        name: 'order',
        title: 'Display Order',
        type: 'number',
        validation: (Rule: any) => Rule.required()
      }
    ]
  },
  {
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
      {
        name: 'id',
        title: 'Service ID',
        type: 'string',
        options: {
          list: [
            { title: 'Vision', value: 'vision' },
            { title: 'Scale', value: 'scale' },
            { title: 'Thrive', value: 'thrive' }
          ]
        },
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'tagline',
        title: 'Tagline',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'outcome',
        title: 'Primary Outcome',
        type: 'text',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'deliverables',
        title: 'Deliverables',
        type: 'array',
        of: [{ type: 'string' }],
        validation: (Rule: any) => Rule.required().min(3)
      },
      {
        name: 'timeline',
        title: 'Timeline',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'price',
        title: 'Starting Price',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'detailedDescription',
        title: 'Detailed Description',
        type: 'array',
        of: [{ type: 'block' }]
      },
      {
        name: 'order',
        title: 'Display Order',
        type: 'number',
        validation: (Rule: any) => Rule.required()
      }
    ]
  },
  {
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
      {
        name: 'quote',
        title: 'Quote',
        type: 'text',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'author',
        title: 'Author Name',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'role',
        title: 'Author Role',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'company',
        title: 'Company',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'image',
        title: 'Author Photo',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'relatedCaseStudy',
        title: 'Related Case Study',
        type: 'reference',
        to: [{ type: 'caseStudy' }]
      }
    ]
  },
  {
    name: 'companyLogo',
    title: 'Company Logo',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Company Name',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'logo',
        title: 'Logo',
        type: 'image',
        options: {
          hotspot: true
        },
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'url',
        title: 'Company URL',
        type: 'url'
      },
      {
        name: 'order',
        title: 'Display Order',
        type: 'number',
        validation: (Rule: any) => Rule.required()
      }
    ]
  },
  {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
      {
        name: 'heroTitle',
        title: 'Hero Title',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'heroSubtitle',
        title: 'Hero Subtitle',
        type: 'text',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'contactEmail',
        title: 'Contact Email',
        type: 'email',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'socialLinks',
        title: 'Social Links',
        type: 'object',
        fields: [
          {
            name: 'linkedin',
            title: 'LinkedIn',
            type: 'url'
          },
          {
            name: 'twitter',
            title: 'Twitter',
            type: 'url'
          },
          {
            name: 'github',
            title: 'GitHub',
            type: 'url'
          }
        ]
      }
    ]
  }
]