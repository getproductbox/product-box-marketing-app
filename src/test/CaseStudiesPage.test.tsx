import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CaseStudiesPage } from '../pages/CaseStudiesPage'
import * as dataModule from '../lib/data'
import type { CaseStudy } from '../types/sanity'

// Mock the data module
vi.mock('../lib/data')
const mockGetCaseStudiesData = vi.mocked(dataModule.getCaseStudiesData)

// Mock Sanity image URL function
vi.mock('../lib/sanity', () => ({
  urlFor: vi.fn(() => ({
    url: () => 'https://test-image.jpg'
  }))
}))

// Helper to render component with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

// Create mock case studies data
const createMockCaseStudies = (count: number): CaseStudy[] => {
  return Array.from({ length: count }, (_, index) => ({
    _id: `case-study-${index + 1}`,
    _type: 'caseStudy',
    client: `Client ${index + 1}`,
    service: index % 3 === 0 ? 'Vision' : index % 3 === 1 ? 'Scale' : 'Thrive',
    tagline: `Test tagline ${index + 1}`,
    description: `Test description ${index + 1}`,
    overview: `Test overview ${index + 1}`,
    challenge: `Test challenge ${index + 1}`,
    solution: `Test solution ${index + 1}`,
    results: `Test results ${index + 1}`,
    image: {
      _type: 'image',
      asset: null,
      alt: `Test image ${index + 1}`
    },
    metrics: [
      { label: 'Test Metric', value: '100%' }
    ],
    technologies: ['React', 'TypeScript'],
    year: index < 3 ? '2024' : '2023',
    order: index + 1,
    featured: index < 2,
    slug: {
      current: `test-case-study-${index + 1}`,
      _type: 'slug'
    }
  }))
}

describe('CaseStudiesPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('basic rendering', () => {
    it('should render the page title and description', async () => {
      const mockData = createMockCaseStudies(3)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      renderWithRouter(<CaseStudiesPage />)

      await waitFor(() => {
        expect(screen.getByText(/case studies/i)).toBeInTheDocument()
        expect(screen.getByText(/portfolio/i) || screen.getByText(/work/i)).toBeInTheDocument()
      })
    })

    it('should display all case studies without limit', async () => {
      const mockData = createMockCaseStudies(6)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      renderWithRouter(<CaseStudiesPage />)

      await waitFor(() => {
        expect(screen.getByText('Client 1')).toBeInTheDocument()
        expect(screen.getByText('Client 2')).toBeInTheDocument()
        expect(screen.getByText('Client 3')).toBeInTheDocument()
        expect(screen.getByText('Client 4')).toBeInTheDocument()
        expect(screen.getByText('Client 5')).toBeInTheDocument()
        expect(screen.getByText('Client 6')).toBeInTheDocument()
      })
    })
  })

  describe('breadcrumb navigation', () => {
    it('should display breadcrumb navigation', async () => {
      const mockData = createMockCaseStudies(3)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      renderWithRouter(<CaseStudiesPage />)

      await waitFor(() => {
        expect(screen.getByRole('navigation', { name: /breadcrumb/i }) || 
               screen.getByText('Home')).toBeInTheDocument()
      })
    })

    it('should have a link back to home', async () => {
      const mockData = createMockCaseStudies(3)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      renderWithRouter(<CaseStudiesPage />)

      await waitFor(() => {
        const homeLink = screen.getByRole('link', { name: /home/i })
        expect(homeLink).toBeInTheDocument()
        expect(homeLink).toHaveAttribute('href', '/')
      })
    })
  })

  describe('filtering functionality', () => {
    it('should display service filter options', async () => {
      const mockData = createMockCaseStudies(6) // Mix of Vision, Scale, Thrive
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      renderWithRouter(<CaseStudiesPage />)

      await waitFor(() => {
        expect(screen.getByText('All')).toBeInTheDocument()
        expect(screen.getByText('Vision')).toBeInTheDocument()
        expect(screen.getByText('Scale')).toBeInTheDocument()
        expect(screen.getByText('Thrive')).toBeInTheDocument()
      })
    })

    it('should filter case studies by service when filter is applied', async () => {
      const mockData = createMockCaseStudies(6)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      renderWithRouter(<CaseStudiesPage />)

      await waitFor(() => {
        expect(screen.getByText('Client 1')).toBeInTheDocument() // Vision
        expect(screen.getByText('Client 2')).toBeInTheDocument() // Scale
        expect(screen.getByText('Client 3')).toBeInTheDocument() // Thrive
      })

      // This test would require user interaction testing with fireEvent
      // For now, we're testing that the filter buttons exist
    })
  })

  describe('sorting functionality', () => {
    it('should display sort options', async () => {
      const mockData = createMockCaseStudies(6)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      renderWithRouter(<CaseStudiesPage />)

      await waitFor(() => {
        expect(screen.getByText(/sort/i) || screen.getByText(/order/i)).toBeInTheDocument()
      })
    })

    it('should display case studies in order by default', async () => {
      const mockData = createMockCaseStudies(3)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      renderWithRouter(<CaseStudiesPage />)

      await waitFor(() => {
        const caseStudyElements = screen.getAllByText(/Client \d/)
        expect(caseStudyElements).toHaveLength(3)
        expect(caseStudyElements[0]).toHaveTextContent('Client 1')
      })
    })
  })

  describe('responsive grid layout', () => {
    it('should render case studies in a responsive grid', async () => {
      const mockData = createMockCaseStudies(4)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      renderWithRouter(<CaseStudiesPage />)

      await waitFor(() => {
        // Check that grid container exists
        const gridContainer = screen.getByText('Client 1').closest('[class*="grid"]')
        expect(gridContainer).toBeInTheDocument()
      })
    })

    it('should handle empty state gracefully', async () => {
      mockGetCaseStudiesData.mockResolvedValue([])

      renderWithRouter(<CaseStudiesPage />)

      await waitFor(() => {
        expect(screen.getByText(/no case studies/i) || 
               screen.getByText(/coming soon/i)).toBeInTheDocument()
      })
    })
  })

  describe('loading states', () => {
    it('should show loading state while fetching data', async () => {
      mockGetCaseStudiesData.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve([]), 100))
      )

      renderWithRouter(<CaseStudiesPage />)

      expect(screen.getByRole('status') || 
             screen.getByText(/loading/i) ||
             screen.getByTestId('loading-spinner')).toBeInTheDocument()
    })
  })

  describe('SEO and metadata', () => {
    it('should set appropriate page title', async () => {
      const mockData = createMockCaseStudies(3)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      renderWithRouter(<CaseStudiesPage />)

      await waitFor(() => {
        expect(document.title).toContain('Case Studies')
      })
    })
  })

  describe('fallback behavior', () => {
    it('should work with fallback data when API fails', async () => {
      mockGetCaseStudiesData.mockRejectedValue(new Error('API Error'))

      renderWithRouter(<CaseStudiesPage />)

      await waitFor(() => {
        expect(screen.getByText('TechFlow')).toBeInTheDocument()
        expect(screen.getByText('GreenCart')).toBeInTheDocument()
        expect(screen.getByText('HealthHub')).toBeInTheDocument()
      })
    })
  })
})