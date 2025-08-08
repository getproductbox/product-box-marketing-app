import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'jsxpecp1',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

async function checkSchemas() {
  console.log('🔍 Checking available schemas in Sanity...')
  
  try {
    // Get all document types by looking at existing documents
    const allDocs = await client.fetch('*[defined(_type)]{_type} | order(_type asc)')
    const uniqueTypes = [...new Set(allDocs.map(doc => doc._type))]
    
    console.log(`\n📊 Found ${uniqueTypes.length} document types:`)
    uniqueTypes.forEach(type => {
      console.log(`  - ${type}`)
    })
    
    // Check specifically for marketing schemas
    const marketingTypes = ['hero', 'service', 'caseStudy', 'contactInfo', 'siteSettings']
    const availableMarketing = uniqueTypes.filter(type => marketingTypes.includes(type))
    const missingMarketing = marketingTypes.filter(type => !uniqueTypes.includes(type))
    
    console.log(`\n✅ Marketing schemas available: ${availableMarketing.length}/5`)
    if (availableMarketing.length > 0) {
      availableMarketing.forEach(type => console.log(`  ✅ ${type}`))
    }
    
    if (missingMarketing.length > 0) {
      console.log(`\n❌ Missing marketing schemas: ${missingMarketing.length}/5`)
      missingMarketing.forEach(type => console.log(`  ❌ ${type}`))
      console.log('\nPlease add these schemas to your Sanity Studio and deploy them.')
    } else {
      console.log('\n🎉 All marketing schemas are available!')
      console.log('   Ready to create content with: node create-initial-content.js')
    }
    
  } catch (error) {
    console.error('❌ Error checking schemas:', error.message)
  }
}

checkSchemas()