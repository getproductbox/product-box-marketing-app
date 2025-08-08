import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImage } from '../types/sanity'

// Only create client if we have a valid project ID
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const hasValidConfig = projectId && projectId !== 'YOUR_PROJECT_ID' && /^[a-z0-9-]+$/.test(projectId)

export const client = hasValidConfig ? createClient({
  projectId: projectId,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_AUTH_TOKEN,
}) : null

const builder = client ? imageUrlBuilder(client) : null

export const urlFor = (source: SanityImage) => builder ? builder.image(source) : null

export const sanityFetch = async <T>(query: string, params: Record<string, string | number | boolean> = {}): Promise<T> => {
  if (!client || !hasValidConfig) {
    throw new Error('Sanity client not configured - falling back to static data')
  }
  
  try {
    return await client.fetch<T>(query, params)
  } catch (error) {
    console.error('Sanity fetch error:', error)
    throw error
  }
}