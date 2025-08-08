import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'jsxpecp1',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

async function createContentPlan() {
  console.log('📋 Creating Sanity content plan using existing portfolio data...')
  
  try {
    // Get existing portfolio items
    const portfolios = await client.fetch(`*[_type == "portfolio"]{
      _id, title, description, image, tags
    }`)
    
    console.log(`\n📊 Found ${portfolios.length} portfolio items for case study conversion:`)
    
    // Plan case study mappings
    const caseStudyMappings = [
      { 
        phase: 'Vision', 
        metrics: ['3 week prototype', '15 VCs interested', '92% user validation'],
        color: 'pb-electric',
        description: 'Rapid validation and strategic planning phase'
      },
      { 
        phase: 'Scale', 
        metrics: ['8 weeks to market', '+250% user growth', '$2M raised'],
        color: 'pb-accent',
        description: 'Full development and launch phase'
      },
      { 
        phase: 'Thrive', 
        metrics: ['99.9% uptime', '10x growth', '40% cost reduction'],
        color: 'pb-gray-300',
        description: 'Optimization and growth phase'
      }
    ]
    
    // Create content plan
    const contentPlan = {
      hero: {
        _type: 'hero',
        title: 'Turn your idea into a product',
        subtitle: 'Welcome to Product Box',
        description: "We're the product development partner that takes you from initial concept to market success. Vision. Scale. Thrive. Three phases, one incredible journey.",
        primaryButtonText: 'Start Your Journey',
        primaryButtonLink: '#contact',
        secondaryButtonText: 'View Our Work',
        secondaryButtonLink: '#case-studies',
        stats: [
          { value: '48hrs', label: 'Response time', _key: '1' },
          { value: '3 phases', label: 'To success', _key: '2' },
          { value: '100+', label: 'Products launched', _key: '3' }
        ]
      },
      
      services: [
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
      ],
      
      caseStudies: portfolios.slice(0, 3).map((portfolio, index) => {
        const mapping = caseStudyMappings[index]
        return {
          _type: 'caseStudy',
          client: portfolio.title,
          service: mapping.phase,
          tagline: portfolio.title,
          description: portfolio.description || `Successful ${mapping.phase.toLowerCase()} project delivering exceptional results.`,
          image: portfolio.image,
          metrics: mapping.metrics,
          year: '2024',
          order: index + 1,
          featured: true
        }
      }),
      
      contactInfo: {
        _type: 'contactInfo',
        email: 'hello@getproductbox.com',
        socialLinks: [
          { platform: 'twitter', url: 'https://twitter.com/productbox', _key: '1' },
          { platform: 'linkedin', url: 'https://linkedin.com/company/productbox', _key: '2' }
        ]
      },
      
      siteSettings: {
        _type: 'siteSettings',
        siteName: 'Product Box',
        siteDescription: "We're the product development partner that takes you from initial concept to market success.",
        siteUrl: 'https://getproductbox.com',
        seoTitle: 'Product Box - Turn Your Idea Into a Product',
        seoDescription: "We're the product development partner that takes you from initial concept to market success. Vision. Scale. Thrive. Three phases, one incredible journey."
      }
    }
    
    console.log('\n📝 Content Plan Created:')
    console.log('✅ 1 Hero section')
    console.log('✅ 3 Services (Vision/Scale/Thrive)')
    console.log(`✅ ${contentPlan.caseStudies.length} Case studies from portfolio:`)
    
    contentPlan.caseStudies.forEach((cs, i) => {
      const mapping = caseStudyMappings[i]
      console.log(`   ${i+1}. ${cs.client} → ${cs.service} phase`)
      console.log(`      Metrics: ${mapping.metrics.join(', ')}`)
    })
    
    console.log('✅ 1 Contact info')
    console.log('✅ 1 Site settings')
    
    // Save plan to file for reference
    const fs = await import('fs')
    await fs.promises.writeFile(
      'sanity-content-plan.json', 
      JSON.stringify(contentPlan, null, 2)
    )
    console.log('\n💾 Content plan saved to: sanity-content-plan.json')
    
    console.log('\n🚀 Next Steps:')
    console.log('1. Deploy schemas to Sanity Studio (sanity-studio-setup.md)')
    console.log('2. Get auth token and add to .env (setup-auth-token.md)')
    console.log('3. Run: node create-initial-content.js')
    console.log('   OR use the Sanity MCP server for content creation')
    
    return contentPlan
    
  } catch (error) {
    console.error('❌ Error creating content plan:', error)
  }
}

createContentPlan()