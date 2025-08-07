import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

export const sanityFetch = async <T>(query: string, params: Record<string, any> = {}): Promise<T> => {
  try {
    return await client.fetch<T>(query, params)
  } catch (error) {
    console.error('Sanity fetch error:', error)
    throw error
  }
}