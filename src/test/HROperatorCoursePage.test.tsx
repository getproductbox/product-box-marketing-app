import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { HROperatorCourse } from '../pages/HROperatorCourse'

// Helper to render component with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('HROperatorCourse Component', () => {
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
      renderWithRouter(<HROperatorCourse />)
    })

    it('should set the page title correctly', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(document.title).toContain('HR Operator')
    })

    it('should render the main heading', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByRole('heading', { name: /the hr operator course/i, level: 1 })).toBeInTheDocument()
    })
  })

  describe('Who it\'s for section', () => {
    it('should render the "Who it\'s for" heading', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByRole('heading', { name: /who it's for/i })).toBeInTheDocument()
    })

    it('should display target audience for HR people', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/hr people who want to streamline processes/i)).toBeInTheDocument()
    })

    it('should display target audience for HR leaders', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/hr leaders who want to scale without hiring/i)).toBeInTheDocument()
    })
  })

  describe('What you\'ll learn section', () => {
    it('should render the "What you\'ll learn" heading', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByRole('heading', { name: /what you'll learn/i })).toBeInTheDocument()
    })

    it('should display agentic work best practices heading', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/agentic work best practices/i)).toBeInTheDocument()
    })

    it('should display mindset items under agentic practices', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/mindset: reviewing/i)).toBeInTheDocument()
      expect(screen.getByText(/mindset: experimenting/i)).toBeInTheDocument()
      expect(screen.getByText(/mindset: the unknown and unblocking yourself/i)).toBeInTheDocument()
    })

    it('should display "starting up an agent" heading', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/starting up an agent/i)).toBeInTheDocument()
    })

    it('should display key agent setup items', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/installing your agent/i)).toBeInTheDocument()
      expect(screen.getByText(/creating safe spaces to work in/i)).toBeInTheDocument()
      expect(screen.getByText(/sharing knowledge with your agent/i)).toBeInTheDocument()
    })

    it('should display "collaborating with your agent" heading', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/collaborating with your agent/i)).toBeInTheDocument()
    })

    it('should display collaboration items', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/switching between planning and building modes/i)).toBeInTheDocument()
      expect(screen.getByText(/setting goals/i)).toBeInTheDocument()
      expect(screen.getByText(/saving your work/i)).toBeInTheDocument()
    })

    it('should display "connecting your agent to your tools" heading', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/connecting your agent to your tools/i)).toBeInTheDocument()
    })

    it('should display tool connection items', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/creating a memory for your agent/i)).toBeInTheDocument()
      expect(screen.getByText(/connecting a tool, such as HiBob or Google Workspace/i)).toBeInTheDocument()
    })

    it('should display "safely running a process" heading', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/safely running a process with your agent/i)).toBeInTheDocument()
    })

    it('should display process running items', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/providing a process to run e\.g\. offboarding/i)).toBeInTheDocument()
      expect(screen.getByText(/when to check-in/i)).toBeInTheDocument()
      expect(screen.getByText(/iterating and sharing/i)).toBeInTheDocument()
    })

    it('should display ready-to-deploy process heading', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/one ready-to-deploy agentic process/i)).toBeInTheDocument()
    })

    it('should display process characteristics', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/customised to your needs/i)).toBeInTheDocument()
      expect(screen.getByText(/connected to your tools/i)).toBeInTheDocument()
      expect(screen.getByText(/shareable to your team/i)).toBeInTheDocument()
    })
  })

  describe('Plus benefits section', () => {
    it('should render the "Plus" heading', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByRole('heading', { name: /plus/i })).toBeInTheDocument()
    })

    it('should display Slack community benefit', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/agentic operator slack community/i)).toBeInTheDocument()
    })

    it('should display certification benefit', () => {
      renderWithRouter(<HROperatorCourse />)
      expect(screen.getByText(/hr agentic operator qualification/i)).toBeInTheDocument()
      expect(screen.getByText(/certified by product box/i)).toBeInTheDocument()
    })
  })

  describe('SEO and metadata', () => {
    it('should have proper SEO head component', () => {
      renderWithRouter(<HROperatorCourse />)
      // Check that meta tags would be set (SEOHead component handles this)
      const metaDescription = document.querySelector('meta[name="description"]')
      expect(metaDescription).toBeTruthy()
    })
  })

  describe('styling and design system', () => {
    it('should use proper typography components', () => {
      renderWithRouter(<HROperatorCourse />)
      const mainHeading = screen.getByRole('heading', { name: /the hr operator course/i, level: 1 })
      expect(mainHeading).toHaveClass('text-display')
    })

    it('should use proper background color', () => {
      const { container } = renderWithRouter(<HROperatorCourse />)
      const mainDiv = container.querySelector('div[class*="bg-pb-"]')
      expect(mainDiv).toBeTruthy()
      expect(mainDiv?.className).toMatch(/bg-pb-/)
    })
  })
})
