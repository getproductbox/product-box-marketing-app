import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ProductBuilderCourse } from '../pages/ProductBuilderCourse'

// Helper to render component with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('ProductBuilderCourse Component', () => {
  let originalTitle: string

  beforeEach(() => {
    // Store original document title
    originalTitle = document.title
  })

  afterEach(() => {
    // Restore original document title
    document.title = originalTitle
  })

  describe('basic rendering', () => {
    it('should render without crashing', () => {
      renderWithRouter(<ProductBuilderCourse />)
    })

    it('should set the page title correctly', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(document.title).toContain('Product Builder')
    })

    it('should render the main heading', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByRole('heading', { name: /become a product builder/i, level: 1 })).toBeInTheDocument()
    })
  })

  describe('Who it\'s for section', () => {
    it('should render the "Who it\'s for" heading', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByRole('heading', { name: /who it's for/i })).toBeInTheDocument()
    })

    it('should display target audience for non-technical PMs', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/non-technical pms who want to release low-risk changes without engineering/i)).toBeInTheDocument()
    })

    it('should display target audience for non-technical Founders', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/non-technical founders.*who want to build 0.*1 without hiring engineers/i)).toBeInTheDocument()
    })
  })

  describe('What you\'ll learn section', () => {
    it('should render the "What you\'ll learn" heading', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByRole('heading', { name: /what you'll learn/i })).toBeInTheDocument()
    })

    it('should display agentic work best practices heading', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/agentic work best practices & mindset/i)).toBeInTheDocument()
    })

    it('should display mindset items under agentic practices', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/^reviewing$/i)).toBeInTheDocument()
      expect(screen.getByText(/^experimenting$/i)).toBeInTheDocument()
      expect(screen.getByText(/the unknown and unblocking yourself/i)).toBeInTheDocument()
      expect(screen.getByText(/waves of disruption/i)).toBeInTheDocument()
    })

    it('should display "starting up an agent" heading', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/starting up an agent/i)).toBeInTheDocument()
    })

    it('should display key agent setup items', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/installing your agent/i)).toBeInTheDocument()
      expect(screen.getByText(/creating safe spaces to work in/i)).toBeInTheDocument()
      expect(screen.getByText(/sharing knowledge with your agent/i)).toBeInTheDocument()
    })

    it('should display "collaborating with your agent" heading', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/collaborating with your agent/i)).toBeInTheDocument()
    })

    it('should display collaboration items', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/switching between planning & building modes/i)).toBeInTheDocument()
      expect(screen.getByText(/setting goals/i)).toBeInTheDocument()
      expect(screen.getByText(/saving your work/i)).toBeInTheDocument()
    })

    it('should display "connecting tools to your agent" heading', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/connecting tools to your agent/i)).toBeInTheDocument()
    })

    it('should display tool connection items', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/creating a memory for your agent/i)).toBeInTheDocument()
      expect(screen.getByText(/connecting specific tools, such as github or linear/i)).toBeInTheDocument()
    })

    it('should display "designing and testing new code" heading', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/designing and testing new code/i)).toBeInTheDocument()
    })

    it('should display code design and testing items', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/setting context/i)).toBeInTheDocument()
      expect(screen.getByText(/code creation workflow/i)).toBeInTheDocument()
      expect(screen.getByText(/testing your changes locally/i)).toBeInTheDocument()
    })

    it('should display "committing, reviewing and deploying" heading', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/committing, reviewing and deploying new code/i)).toBeInTheDocument()
    })

    it('should display commit and deploy items', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/working in branches/i)).toBeInTheDocument()
      expect(screen.getByText(/creating, testing & reviewing prs/i)).toBeInTheDocument()
      expect(screen.getByText(/deploying & hosting your code/i)).toBeInTheDocument()
      expect(screen.getByText(/connecting your domain/i)).toBeInTheDocument()
    })

    it('should display "one new software project" heading', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/one new software project/i)).toBeInTheDocument()
    })

    it('should display project characteristics', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/'co-authored' by you, in english/i)).toBeInTheDocument()
      expect(screen.getByText(/synced to github/i)).toBeInTheDocument()
      expect(screen.getByText(/deployed on vercel/i)).toBeInTheDocument()
    })
  })

  describe('Plus benefits section', () => {
    it('should render the "Plus" heading', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByRole('heading', { name: /plus/i })).toBeInTheDocument()
    })

    it('should display Slack community benefit', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/agentic operator slack community/i)).toBeInTheDocument()
    })

    it('should display PM qualification benefit', () => {
      renderWithRouter(<ProductBuilderCourse />)
      expect(screen.getByText(/pm agentic operator qualification/i)).toBeInTheDocument()
      expect(screen.getByText(/certified by product box/i)).toBeInTheDocument()
    })
  })

  describe('SEO and metadata', () => {
    it('should have proper SEO head component', () => {
      renderWithRouter(<ProductBuilderCourse />)
      // Check that meta tags would be set (SEOHead component handles this)
      const metaDescription = document.querySelector('meta[name="description"]')
      expect(metaDescription).toBeTruthy()
    })
  })

  describe('styling and design system', () => {
    it('should use proper typography components', () => {
      renderWithRouter(<ProductBuilderCourse />)
      const mainHeading = screen.getByRole('heading', { name: /become a product builder/i, level: 1 })
      expect(mainHeading).toHaveClass('text-display')
    })

    it('should use proper background color', () => {
      const { container } = renderWithRouter(<ProductBuilderCourse />)
      const mainDiv = container.querySelector('div[class*="bg-pb-"]')
      expect(mainDiv).toBeTruthy()
      expect(mainDiv?.className).toMatch(/bg-pb-/)
    })
  })
})
