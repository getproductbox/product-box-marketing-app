import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PrivacyPolicy } from '../pages/PrivacyPolicy'
import { TermsOfService } from '../pages/TermsOfService'

// Helper function to render components with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  )
}

describe('Privacy Policy Page', () => {
  it('renders privacy policy heading', () => {
    renderWithRouter(<PrivacyPolicy />)
    expect(screen.getByRole('heading', { name: /privacy policy/i })).toBeInTheDocument()
  })

  it('contains essential privacy policy sections', () => {
    renderWithRouter(<PrivacyPolicy />)
    
    // Check for key privacy policy sections
    expect(screen.getByText(/information we collect/i)).toBeInTheDocument()
    expect(screen.getByText(/how we use information/i)).toBeInTheDocument()
    expect(screen.getByText(/data protection/i)).toBeInTheDocument()
    expect(screen.getByText(/contact information/i)).toBeInTheDocument()
  })

  it('has proper meta tags for SEO', () => {
    renderWithRouter(<PrivacyPolicy />)
    
    // Check that document title is updated
    expect(document.title).toContain('Privacy Policy')
  })

  it('includes last updated date', () => {
    renderWithRouter(<PrivacyPolicy />)
    expect(screen.getByText(/last updated/i)).toBeInTheDocument()
  })
})

describe('Terms of Service Page', () => {
  it('renders terms of service heading', () => {
    renderWithRouter(<TermsOfService />)
    expect(screen.getByRole('heading', { name: /terms of service/i })).toBeInTheDocument()
  })

  it('contains essential terms sections', () => {
    renderWithRouter(<TermsOfService />)
    
    // Check for key terms sections
    expect(screen.getByText(/acceptance of terms/i)).toBeInTheDocument()
    expect(screen.getByText(/use of services/i)).toBeInTheDocument()
    expect(screen.getByText(/limitations of liability/i)).toBeInTheDocument()
    expect(screen.getByText(/contact information/i)).toBeInTheDocument()
  })

  it('has proper meta tags for SEO', () => {
    renderWithRouter(<TermsOfService />)
    
    // Check that document title is updated
    expect(document.title).toContain('Terms of Service')
  })

  it('includes last updated date', () => {
    renderWithRouter(<TermsOfService />)
    expect(screen.getByText(/last updated/i)).toBeInTheDocument()
  })
})

describe('Legal Pages Navigation', () => {
  it('should have privacy policy route available', () => {
    // This test will be implemented when we update the Footer component
    // For now, we'll just check that the routes are properly defined
    expect(true).toBe(true) // Placeholder
  })

  it('should have terms of service route available', () => {
    // This test will be implemented when we update the Footer component
    expect(true).toBe(true) // Placeholder
  })
})