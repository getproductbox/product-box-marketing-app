import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const client = createClient({
  projectId: 'jsxpecp1',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN
})

// Validate token
if (!process.env.SANITY_AUTH_TOKEN) {
  console.error('❌ SANITY_AUTH_TOKEN not found in environment variables')
  console.error('   Please add SANITY_AUTH_TOKEN=your_token_here to your .env file')
  console.error('   Get your token from: https://sanity.io/manage')
  process.exit(1)
}

async function createInitialContent() {
  console.log('🚀 Creating initial marketing content...')

  try {
    // 1. Create Hero Section
    console.log('📝 Creating hero section...')
    const hero = await client.create({
      _type: 'hero',
      title: 'Turn your idea into a product',
      subtitle: 'Welcome to Product Box',
      description: "We're the product development partner that takes you from initial concept to market success. Vision. Scale. Thrive. Three phases, one incredible journey.",
      primaryButtonText: 'Start Your Journey',
      primaryButtonLink: '#contact',
      secondaryButtonText: 'View Our Work',
      secondaryButtonLink: '#case-studies',
      stats: [
        { value: '48hrs', label: 'Response time' },
        { value: '3 phases', label: 'To success' },
        { value: '100+', label: 'Products launched' }
      ]
    })
    console.log('✅ Hero created:', hero._id)

    // 2. Create Services
    console.log('📝 Creating services...')
    const services = [
      {
        _type: 'service',
        title: 'Vision',
        phase: 'Vision',
        icon: 'eye',
        shortDescription: 'Transform your idea into a clear product strategy',
        fullDescription: 'We help you validate your idea, understand your market, and create a comprehensive product strategy that sets you up for success.',
        features: ['Market Research', 'Product Strategy', 'Technical Planning', 'Business Model'],
        order: 1
      },
      {
        _type: 'service',
        title: 'Scale',
        phase: 'Scale',
        icon: 'trending-up',
        shortDescription: 'Build and launch your product',
        fullDescription: 'Our experienced team develops your product using the latest technologies and best practices to ensure scalability and performance.',
        features: ['Product Development', 'Quality Assurance', 'Launch Strategy', 'Performance Optimization'],
        order: 2
      },
      {
        _type: 'service',
        title: 'Thrive',
        phase: 'Thrive',
        icon: 'zap',
        shortDescription: 'Grow and optimize for success',
        fullDescription: 'We help you analyze performance, optimize user experience, and implement growth strategies to scale your product.',
        features: ['Analytics & Insights', 'Growth Strategy', 'Optimization', 'Continuous Improvement'],
        order: 3
      }
    ]

    for (const service of services) {
      const created = await client.create(service)
      console.log(`✅ Service created: ${service.title} (${created._id})`)
    }

    // 3. Get existing portfolio items and convert some to case studies
    console.log('📝 Converting portfolio items to case studies...')
    const portfolios = await client.fetch(`*[_type == "portfolio"]{_id, title, description, image, tags}`)
    
    // Convert first 3 portfolio items to case studies
    const caseStudyMappings = [
      { phase: 'Vision', metrics: ['3 week prototype', '15 VCs interested', '92% user validation'] },
      { phase: 'Scale', metrics: ['8 weeks to market', '+250% user growth', '$2M raised'] },
      { phase: 'Thrive', metrics: ['99.9% uptime', '10x growth', '40% cost reduction'] }
    ]

    const selectedPortfolios = portfolios.slice(0, 3)
    
    for (let i = 0; i < selectedPortfolios.length; i++) {
      const portfolio = selectedPortfolios[i]
      const mapping = caseStudyMappings[i]
      
      const caseStudy = await client.create({
        _type: 'caseStudy',
        client: portfolio.title,
        service: mapping.phase,
        tagline: portfolio.title,
        description: portfolio.description || `Successful ${mapping.phase.toLowerCase()} project delivering exceptional results.`,
        image: portfolio.image,
        metrics: mapping.metrics,
        year: '2024',
        order: i + 1,
        featured: true
      })
      
      console.log(`✅ Case study created: ${portfolio.title} → ${mapping.phase} (${caseStudy._id})`)
    }

    // 4. Create Contact Info
    console.log('📝 Creating contact info...')
    const contactInfo = await client.create({
      _type: 'contactInfo',
      email: 'hello@getproductbox.com',
      socialLinks: [
        { platform: 'twitter', url: 'https://twitter.com/productbox' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/productbox' }
      ]
    })
    console.log('✅ Contact info created:', contactInfo._id)

    // 5. Create Site Settings
    console.log('📝 Creating site settings...')
    const siteSettings = await client.create({
      _type: 'siteSettings',
      siteName: 'Product Box',
      siteDescription: "We're the product development partner that takes you from initial concept to market success.",
      siteUrl: 'https://getproductbox.com',
      seoTitle: 'Product Box - Turn Your Idea Into a Product',
      seoDescription: "We're the product development partner that takes you from initial concept to market success. Vision. Scale. Thrive. Three phases, one incredible journey."
    })
    console.log('✅ Site settings created:', siteSettings._id)

    console.log('🎉 Initial content creation complete!')
    console.log('🌐 Your marketing app should now display live CMS content')

  } catch (error) {
    console.error('❌ Error creating content:', error)
  }
}

// Only run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createInitialContent()
}

export { createInitialContent }