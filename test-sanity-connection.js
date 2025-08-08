import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'jsxpecp1',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// Test connection and see what content types exist
async function testConnection() {
  try {
    console.log('🔗 Testing Sanity connection...')
    
    // Get distinct document types
    const typeData = await client.fetch(`array::unique(*[]._type)`)
    console.log('📋 Available document types:', typeData)
    
    // Get sample structure for each type
    console.log('\n🔍 Examining existing content structure:')
    
    for (const type of typeData) {
      const sample = await client.fetch(`*[_type == $type][0]`, { type })
      if (sample) {
        console.log(`\n📄 ${type.toUpperCase()} structure:`)
        console.log('Fields:', Object.keys(sample).filter(k => !k.startsWith('_')))
        if (sample.title) console.log('Title:', sample.title)
        if (sample.name) console.log('Name:', sample.name)
        console.log('Sample data:', JSON.stringify(sample, null, 2).substring(0, 200) + '...')
      }
    }
    
    // Test if new schema content exists
    console.log('\n🔍 Testing for new schema content:')
    
    const heroContent = await client.fetch(`*[_type == "hero"][0]`)
    console.log('Hero content:', heroContent ? 'EXISTS' : 'MISSING')
    
    const serviceContent = await client.fetch(`*[_type == "service"]`)
    console.log('Services content:', serviceContent?.length ? `${serviceContent.length} items` : 'MISSING')
    
    const caseStudyContent = await client.fetch(`*[_type == "caseStudy"]`)
    console.log('Case studies content:', caseStudyContent?.length ? `${caseStudyContent.length} items` : 'MISSING')
    
    // See if we can use portfolio as case studies temporarily
    console.log('\n💡 Portfolio items that could work as case studies:')
    const portfolios = await client.fetch(`*[_type == "portfolio"]{title, description, tags}`)
    portfolios.forEach((item, i) => {
      console.log(`${i + 1}. ${item.title}`)
    })
    
    console.log('✅ Connection successful!')
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
  }
}

testConnection()