import { render, screen, fireEvent } from '@testing-library/react'
import { ScrollProgressIndicator } from '../ScrollProgressIndicator'
import { vi } from 'vitest'

describe('ScrollProgressIndicator', () => {
  const mockSections = [
    { id: 'hero', label: 'Intro' },
    { id: 'who', label: 'Who' },
    { id: 'use-cases', label: 'Cases' },
    { id: 'learning', label: 'Learn' },
    { id: 'plus', label: 'Plus' },
  ]

  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn()

    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      top: 100,
      bottom: 200,
      left: 0,
      right: 0,
      width: 100,
      height: 100,
      x: 0,
      y: 100,
      toJSON: () => {},
    }))

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    })
  })

  it('should render progress dots for each section', () => {
    render(<ScrollProgressIndicator sections={mockSections} />)

    // Should have a dot for each section
    const dots = screen.getAllByRole('button')
    expect(dots).toHaveLength(mockSections.length)
  })

  it('should highlight the first section as active by default', () => {
    const { container } = render(<ScrollProgressIndicator sections={mockSections} />)

    // First dot's inner div should have active styling
    const firstButton = container.querySelector('button')
    const firstDot = firstButton?.querySelector('div')

    // Active dot should have bg-pb-accent or similar active class
    expect(firstDot?.className).toMatch(/bg-pb-accent|bg-pb-electric/)
  })

  it('should navigate to section on click', () => {
    // Mock getElementById to return a mock element
    const mockElement = document.createElement('div')
    mockElement.id = 'who'
    document.body.appendChild(mockElement)

    render(<ScrollProgressIndicator sections={mockSections} />)

    const dots = screen.getAllByRole('button')
    fireEvent.click(dots[1]) // Click second dot (who section)

    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })

    document.body.removeChild(mockElement)
  })

  it('should apply sticky positioning', () => {
    const { container } = render(<ScrollProgressIndicator sections={mockSections} />)

    const indicator = container.firstChild as HTMLElement
    expect(indicator).toHaveClass('fixed')
  })

  it('should be positioned on the right side on desktop', () => {
    const { container } = render(<ScrollProgressIndicator sections={mockSections} />)

    const indicator = container.firstChild as HTMLElement
    // Should have right positioning
    expect(indicator.className).toMatch(/right/)
  })

  it('should display on desktop but hide on mobile', () => {
    const { container } = render(<ScrollProgressIndicator sections={mockSections} />)

    const indicator = container.firstChild as HTMLElement
    // Should have responsive classes like hidden md:flex
    expect(indicator.className).toMatch(/hidden|md:/)
  })

  it('should display section labels on hover or as tooltips', () => {
    render(<ScrollProgressIndicator sections={mockSections} />)

    // Check if labels are present (might be hidden but in DOM)
    mockSections.forEach((section) => {
      const label = screen.getByText(section.label)
      expect(label).toBeInTheDocument()
    })
  })

  it('should have accessible labels for screen readers', () => {
    render(<ScrollProgressIndicator sections={mockSections} />)

    const dots = screen.getAllByRole('button')
    dots.forEach((dot, index) => {
      // Each button should have aria-label or similar
      expect(dot).toHaveAttribute('aria-label')
      expect(dot.getAttribute('aria-label')).toContain(mockSections[index].label)
    })
  })
})
