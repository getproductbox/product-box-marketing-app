import { render, screen } from '@testing-library/react'
import { ProductBuilderCourse } from '../pages/ProductBuilderCourse'
import { vi } from 'vitest'

describe('ProductBuilderCourse Page', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    const mockIntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      root: null,
      rootMargin: '',
      thresholds: [],
      takeRecords: () => [],
    }))
    window.IntersectionObserver = mockIntersectionObserver as any

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    // Mock scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    })

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn()
  })

  describe('Hero Section', () => {
    it('should render hero section with gradient background', () => {
      render(<ProductBuilderCourse />)
      const hero = screen.getByRole('heading', { name: /become a product builder/i })
      expect(hero).toBeInTheDocument()
    })

    it('should render intro text', () => {
      render(<ProductBuilderCourse />)
      const introText = screen.getByText(/stop waiting for engineers/i)
      expect(introText).toBeInTheDocument()
    })

    it('should render CTA button in floating position', () => {
      render(<ProductBuilderCourse />)
      const ctaButtons = screen.getAllByRole('button', { name: /book discovery call/i })
      const floatingButton = ctaButtons.find(btn => btn.classList.contains('fixed'))
      expect(floatingButton).toBeInTheDocument()
      expect(floatingButton).toHaveClass('fixed')
    })
  })

  describe('Who it\'s for Section', () => {
    it('should render who section heading', () => {
      render(<ProductBuilderCourse />)
      const heading = screen.getByRole('heading', { name: /who it's for/i })
      expect(heading).toBeInTheDocument()
    })

    it('should render audience cards', () => {
      render(<ProductBuilderCourse />)
      const pmText = screen.getByText(/PMs \/ Designers/i)
      expect(pmText).toBeInTheDocument()
      const descText = screen.getByText(/who want to release low-risk changes/i)
      expect(descText).toBeInTheDocument()
    })
  })

  describe('Use Cases Section', () => {
    it('should render use cases heading', () => {
      render(<ProductBuilderCourse />)
      const heading = screen.getByRole('heading', { name: /real-world use cases/i })
      expect(heading).toBeInTheDocument()
    })

    it('should render use case cards', () => {
      render(<ProductBuilderCourse />)
      const quickFixes = screen.getByText(/ship quick fixes 10x faster/i)
      expect(quickFixes).toBeInTheDocument()
    })
  })

  describe('What you\'ll learn Section', () => {
    it('should render learning section heading', () => {
      render(<ProductBuilderCourse />)
      const heading = screen.getByRole('heading', { name: /what you'll learn/i })
      expect(heading).toBeInTheDocument()
    })

    it('should render learning modules', () => {
      render(<ProductBuilderCourse />)
      const fundamentals = screen.getByRole('heading', { name: /agentic work fundamentals/i })
      expect(fundamentals).toBeInTheDocument()
    })
  })

  describe('Plus Section', () => {
    it('should render plus section', () => {
      render(<ProductBuilderCourse />)
      const heading = screen.getByRole('heading', { name: /^Plus$/i })
      expect(heading).toBeInTheDocument()
    })
  })

  describe('SEO', () => {
    it('should have correct page title', () => {
      render(<ProductBuilderCourse />)
      expect(document.title).toBe('The Product Builder Course - Product Box')
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<ProductBuilderCourse />)
      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toBeInTheDocument()
    })

    it('should have accessible button labels', () => {
      render(<ProductBuilderCourse />)
      const buttons = screen.getAllByRole('button', { name: /book discovery call/i })
      buttons.forEach(btn => {
        expect(btn).toHaveAccessibleName()
      })
    })
  })

  describe('Floating CTA', () => {
    it('should render floating book discovery call button', () => {
      render(<ProductBuilderCourse />)
      const buttons = screen.getAllByRole('button', { name: /book discovery call/i })
      expect(buttons.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Background Effects', () => {
    it('should render background effects component', () => {
      const { container } = render(<ProductBuilderCourse />)
      const bg = container.querySelector('[class*="fixed"][class*="inset"]')
      expect(bg).toBeTruthy()
    })
  })

  describe('Progress Indicator', () => {
    it('should render progress indicator', () => {
      const { container } = render(<ProductBuilderCourse />)
      const indicator = container.querySelector('[class*="fixed"][class*="right"]')
      expect(indicator).toBeTruthy()
    })
  })
})
