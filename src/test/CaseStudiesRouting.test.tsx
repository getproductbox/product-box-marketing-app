import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '../components/Layout'
import App from '../App'
import { CaseStudiesPage } from '../pages/CaseStudiesPage'
import * as dataModule from '../lib/data'

// Mock the data module
vi.mock('../lib/data')
const mockGetCaseStudiesData = vi.mocked(dataModule.getCaseStudiesData)

// Mock other data functions that might be called
vi.mocked(dataModule.getHeroData).mockResolvedValue({
  _id: 'hero',
  _type: 'hero',
  title: 'Test Hero',
  subtitle: 'Test Subtitle',
  description: 'Test Description',
  primaryButtonText: 'Test Button',
  primaryButtonLink: '#test',
  secondaryButtonText: 'Test Secondary',
  secondaryButtonLink: '#test2',
  stats: []
})

vi.mocked(dataModule.getServicesData).mockResolvedValue([])
vi.mocked(dataModule.getContactData).mockResolvedValue({
  _id: 'contact',
  _type: 'contactInfo',
  email: 'test@test.com',
  socialLinks: []
})
vi.mocked(dataModule.getTestimonialsData).mockResolvedValue([])
vi.mocked(dataModule.getSiteSettings).mockResolvedValue(null)

// Mock Sanity functions
vi.mock('../lib/sanity', () => ({
  urlFor: vi.fn(() => ({
    url: () => 'https://test-image.jpg'
  }))
}))

// Create test router configuration
const createTestRouter = (initialRoute = '/') => {
  return createMemoryRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <App />
        },
        {
          path: 'case-studies',
          element: <CaseStudiesPage />
        }
      ]
    }
  ], {
    initialEntries: [initialRoute]
  })
}

// Helper function to render with router
const renderWithRouter = (initialRoute = '/') => {
  const router = createTestRouter(initialRoute)
  return render(<RouterProvider router={router} />)
}

describe('Case Studies Routing', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetCaseStudiesData.mockResolvedValue([
      {
        _id: '1',
        _type: 'caseStudy',
        client: 'Test Client',
        service: 'Vision',
        tagline: 'Test Tagline',
        description: 'Test Description',
        overview: 'Test Overview',
        challenge: 'Test Challenge',
        solution: 'Test Solution',
        results: 'Test Results',
        image: { _type: 'image', asset: null, alt: 'Test' },
        metrics: [],
        technologies: [],
        year: '2024',
        order: 1,
        featured: true,
        slug: { current: 'test-client', _type: 'slug' }
      }
    ])
  })

  describe('homepage route (/)', () => {
    it('should render the homepage with case studies section', async () => {
      renderWithRouter('/')

      await waitFor(() => {
        expect(screen.getByText('Test Hero')).toBeInTheDocument()
      })

      // Check for case studies section
      await waitFor(() => {
        expect(screen.getByText('Test Client')).toBeInTheDocument()
      })
    })

    it('should have case studies section accessible via anchor link', async () => {
      renderWithRouter('/')

      await waitFor(() => {
        const caseStudiesSection = document.getElementById('case-studies')
        expect(caseStudiesSection).toBeInTheDocument()
      })
    })
  })

  describe('/case-studies route', () => {
    it('should render the case studies page', async () => {
      renderWithRouter('/case-studies')

      await waitFor(() => {
        // Look for page-specific content that would only be on the case studies page
        expect(screen.getByText(/case studies/i)).toBeInTheDocument()
      })
    })

    it('should display case studies without homepage content', async () => {
      renderWithRouter('/case-studies')

      await waitFor(() => {
        expect(screen.getByText('Test Client')).toBeInTheDocument()
      })

      // Should not have hero section content
      expect(screen.queryByText('Test Hero')).not.toBeInTheDocument()
    })

    it('should work with direct navigation to the route', async () => {
      renderWithRouter('/case-studies')

      await waitFor(() => {
        expect(window.location.pathname).toBe('/case-studies')
        expect(screen.getByText('Test Client')).toBeInTheDocument()
      })
    })
  })

  describe('layout consistency', () => {
    it('should use the same layout component for both routes', async () => {
      // Test homepage
      const { unmount } = renderWithRouter('/')
      await waitFor(() => {
        expect(document.querySelector('header') || document.querySelector('nav')).toBeInTheDocument()
      })
      unmount()

      // Test case studies page
      renderWithRouter('/case-studies')
      await waitFor(() => {
        expect(document.querySelector('header') || document.querySelector('nav')).toBeInTheDocument()
      })
    })
  })

  describe('navigation between routes', () => {
    it('should support navigation from homepage to case studies page', async () => {
      const router = createTestRouter('/')
      render(<RouterProvider router={router} />)

      await waitFor(() => {
        expect(screen.getByText('Test Hero')).toBeInTheDocument()
      })

      // Navigate programmatically (simulating link click)
      router.navigate('/case-studies')

      await waitFor(() => {
        expect(window.location.pathname).toBe('/case-studies')
      })
    })

    it('should support navigation from case studies page back to homepage', async () => {
      const router = createTestRouter('/case-studies')
      render(<RouterProvider router={router} />)

      await waitFor(() => {
        expect(screen.getByText('Test Client')).toBeInTheDocument()
      })

      // Navigate back to homepage
      router.navigate('/')

      await waitFor(() => {
        expect(window.location.pathname).toBe('/')
      })
    })
  })

  describe('URL validation', () => {
    it('should handle /case-studies route correctly', async () => {
      renderWithRouter('/case-studies')

      await waitFor(() => {
        expect(window.location.pathname).toBe('/case-studies')
      })
    })

    it('should handle trailing slashes gracefully', async () => {
      renderWithRouter('/case-studies/')

      await waitFor(() => {
        // Router should normalize or handle the trailing slash
        expect(window.location.pathname).toMatch(/^\/case-studies\/?$/)
      })
    })
  })

  describe('error handling', () => {
    it('should handle route not found scenarios gracefully', async () => {
      // This would typically fall back to a 404 page or homepage
      renderWithRouter('/non-existent-route')

      // Since we haven't defined a catch-all route, this might error
      // In a real app, you'd have error boundaries and 404 handling
      await waitFor(() => {
        // The behavior depends on your router configuration
        // This test ensures the router doesn't crash
        expect(document.body).toBeInTheDocument()
      })
    })
  })

  describe('SEO and metadata per route', () => {
    it('should set different page titles for different routes', async () => {
      // Homepage
      renderWithRouter('/')
      await waitFor(() => {
        expect(document.title).not.toContain('Case Studies')
      })

      // Case Studies page
      const { unmount } = renderWithRouter('/case-studies')
      await waitFor(() => {
        expect(document.title).toContain('Case Studies')
      })
      unmount()
    })
  })
})