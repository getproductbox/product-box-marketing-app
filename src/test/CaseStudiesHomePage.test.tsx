import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { CaseStudies } from '../components/CaseStudies'
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

// Create mock case studies data (more than 3 to test limiting)
const createMockCaseStudies = (count: number): CaseStudy[] => {
  return Array.from({ length: count }, (_, index) => ({
    _id: `case-study-${index + 1}`,
    _type: 'caseStudy',
    client: `Client ${index + 1}`,
    service: 'Vision' as const,
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
    year: '2024',
    order: index + 1,
    featured: true,
    slug: {
      current: `test-case-study-${index + 1}`,
      _type: 'slug'
    }
  }))
}

describe('CaseStudies Component - Homepage Behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('when limit prop is provided', () => {
    it('should display only the specified number of case studies', async () => {
      const mockData = createMockCaseStudies(5)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      render(<CaseStudies limit={3} />)

      await waitFor(() => {
        expect(screen.getByText('Client 1')).toBeInTheDocument()
        expect(screen.getByText('Client 2')).toBeInTheDocument()
        expect(screen.getByText('Client 3')).toBeInTheDocument()
      })

      // Should not display the 4th and 5th case studies
      expect(screen.queryByText('Client 4')).not.toBeInTheDocument()
      expect(screen.queryByText('Client 5')).not.toBeInTheDocument()
    })

    it('should show "View All Case Studies" button when more studies exist than limit', async () => {
      const mockData = createMockCaseStudies(5)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      render(<CaseStudies limit={3} />)

      await waitFor(() => {
        expect(screen.getByText('View All Case Studies')).toBeInTheDocument()
      })
    })

    it('should not show "View All Case Studies" button when studies count equals limit', async () => {
      const mockData = createMockCaseStudies(3)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      render(<CaseStudies limit={3} />)

      await waitFor(() => {
        expect(screen.getByText('Client 1')).toBeInTheDocument()
      })

      expect(screen.queryByText('View All Case Studies')).not.toBeInTheDocument()
    })

    it('should not show "View All Case Studies" button when studies count is less than limit', async () => {
      const mockData = createMockCaseStudies(2)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      render(<CaseStudies limit={3} />)

      await waitFor(() => {
        expect(screen.getByText('Client 1')).toBeInTheDocument()
      })

      expect(screen.queryByText('View All Case Studies')).not.toBeInTheDocument()
    })
  })

  describe('when no limit prop is provided', () => {
    it('should display all case studies', async () => {
      const mockData = createMockCaseStudies(5)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      render(<CaseStudies />)

      await waitFor(() => {
        expect(screen.getByText('Client 1')).toBeInTheDocument()
        expect(screen.getByText('Client 2')).toBeInTheDocument()
        expect(screen.getByText('Client 3')).toBeInTheDocument()
        expect(screen.getByText('Client 4')).toBeInTheDocument()
        expect(screen.getByText('Client 5')).toBeInTheDocument()
      })
    })

    it('should not show "View All Case Studies" button when no limit is set', async () => {
      const mockData = createMockCaseStudies(5)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      render(<CaseStudies />)

      await waitFor(() => {
        expect(screen.getByText('Client 1')).toBeInTheDocument()
      })

      expect(screen.queryByText('View All Case Studies')).not.toBeInTheDocument()
    })
  })

  describe('fallback behavior', () => {
    it('should work with fallback data when limited to 3', async () => {
      // Simulate API failure to trigger fallback data
      mockGetCaseStudiesData.mockRejectedValue(new Error('API Error'))

      render(<CaseStudies limit={3} />)

      // Fallback data has 3 case studies by default
      await waitFor(() => {
        expect(screen.getByText('TechFlow')).toBeInTheDocument()
        expect(screen.getByText('GreenCart')).toBeInTheDocument()
        expect(screen.getByText('HealthHub')).toBeInTheDocument()
      })

      // Should not show "View All" button since fallback has exactly 3
      expect(screen.queryByText('View All Case Studies')).not.toBeInTheDocument()
    })
  })

  describe('responsive behavior', () => {
    it('should maintain responsive grid layout with limited case studies', async () => {
      const mockData = createMockCaseStudies(3)
      mockGetCaseStudiesData.mockResolvedValue(mockData)

      render(<CaseStudies limit={3} />)

      await waitFor(() => {
        const caseStudySection = screen.getByRole('region', { name: /case studies/i }) || 
                               screen.getByText('Client 1').closest('section')
        expect(caseStudySection).toBeInTheDocument()
      })

      // Check that the grid container exists
      const gridContainer = screen.getByText('Client 1').closest('.space-y-24')
      expect(gridContainer).toBeInTheDocument()
    })
  })
})