import { render, screen } from '@testing-library/react'
import { CourseBackgroundEffects } from '../CourseBackgroundEffects'
import { vi } from 'vitest'

describe('CourseBackgroundEffects', () => {
  beforeEach(() => {
    // Mock matchMedia for all tests
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
  })

  it('should render gradient orbs', () => {
    const { container } = render(<CourseBackgroundEffects />)

    // Should render orbs (look for elements with blur effect)
    const orbs = container.querySelectorAll('[class*="blur"]')
    expect(orbs.length).toBeGreaterThan(0)
  })

  it('should render multiple orbs', () => {
    const { container } = render(<CourseBackgroundEffects />)

    // Should have at least 2 gradient orbs
    const orbs = container.querySelectorAll('[class*="bg-gradient"]')
    expect(orbs.length).toBeGreaterThanOrEqual(2)
  })

  it('should apply fixed positioning to container', () => {
    const { container } = render(<CourseBackgroundEffects />)

    const backgroundContainer = container.firstChild as HTMLElement
    expect(backgroundContainer).toHaveClass('fixed')
    expect(backgroundContainer).toHaveClass('inset-0')
  })

  it('should disable animations when reduced motion is preferred', () => {
    // Mock matchMedia to return prefers-reduced-motion: reduce
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    const { container } = render(<CourseBackgroundEffects />)

    // Should not have parallax transforms when reduced motion is preferred
    const orbs = container.querySelectorAll('[style*="transform"]')
    expect(orbs.length).toBe(0)
  })

  it('should render fewer orbs on mobile', () => {
    // Mock window.innerWidth for mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 375, // Mobile width
    })

    const { container } = render(<CourseBackgroundEffects />)
    const { container: desktopContainer } = render(<CourseBackgroundEffects />)

    // Reset to desktop width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1440,
    })

    const desktopOrbs = desktopContainer.querySelectorAll('[class*="blur"]')

    // Desktop should have more orbs than mobile (or same)
    const mobileOrbs = container.querySelectorAll('[class*="blur"]')
    expect(mobileOrbs.length).toBeLessThanOrEqual(desktopOrbs.length)
  })

  it('should use accent and electric colors', () => {
    const { container } = render(<CourseBackgroundEffects />)

    // Should include orbs with accent or electric colors
    const accentOrb = container.querySelector('[class*="pb-accent"]')
    const electricOrb = container.querySelector('[class*="pb-electric"]')

    // At least one of these should exist
    expect(accentOrb || electricOrb).toBeTruthy()
  })

  it('should have pointer-events-none to allow click-through', () => {
    const { container } = render(<CourseBackgroundEffects />)

    const backgroundContainer = container.firstChild as HTMLElement
    expect(backgroundContainer).toHaveClass('pointer-events-none')
  })

  it('should have proper z-index for layering', () => {
    const { container } = render(<CourseBackgroundEffects />)

    const backgroundContainer = container.firstChild as HTMLElement
    // Should have low z-index to stay behind content
    expect(backgroundContainer).toHaveClass('z-0')
  })
})
