import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CaseStudyModal } from '../components/CaseStudyModal'
import type { CaseStudy } from '../types/sanity'

// Mock case study data
const mockCaseStudy: CaseStudy = {
  _id: '1',
  client: 'TechCorp',
  tagline: 'Revolutionizing E-commerce',
  overview: 'A comprehensive e-commerce platform that increased sales by 300%',
  challenge: 'The client needed to modernize their legacy e-commerce system',
  solution: 'We built a modern, scalable platform using React and Node.js',
  results: 'Achieved 300% increase in sales within 6 months',
  metrics: [
    { label: 'Sales Increase', value: '300%' },
    { label: 'Load Time', value: '2.1s' },
    { label: 'User Satisfaction', value: '94%' }
  ],
  technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
  image: {
    _type: 'image',
    asset: { _ref: 'test-ref', _type: 'reference' },
    alt: 'TechCorp dashboard screenshot'
  },
  slug: 'techcorp-ecommerce'
}

const renderModal = (props = {}) => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    caseStudy: mockCaseStudy,
    ...props
  }

  return render(
    <MemoryRouter>
      <CaseStudyModal {...defaultProps} />
    </MemoryRouter>
  )
}

describe('CaseStudyModal', () => {
  it('renders modal when isOpen is true', () => {
    renderModal()
    
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('TechCorp')).toBeInTheDocument()
    expect(screen.getByText('Revolutionizing E-commerce')).toBeInTheDocument()
  })

  it('does not render modal when isOpen is false', () => {
    renderModal({ isOpen: false })
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('displays case study content sections', () => {
    renderModal()
    
    expect(screen.getByText('Challenge')).toBeInTheDocument()
    expect(screen.getByText('Solution')).toBeInTheDocument()
    expect(screen.getByText('Results')).toBeInTheDocument()
    expect(screen.getByText('Technologies')).toBeInTheDocument()
  })

  it('displays metrics correctly', () => {
    renderModal()
    
    expect(screen.getByText('300%')).toBeInTheDocument()
    expect(screen.getByText('Sales Increase')).toBeInTheDocument()
    expect(screen.getByText('2.1s')).toBeInTheDocument()
    expect(screen.getByText('Load Time')).toBeInTheDocument()
  })

  it('displays technologies as badges', () => {
    renderModal()
    
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('MongoDB')).toBeInTheDocument()
    expect(screen.getByText('AWS')).toBeInTheDocument()
  })

  it('closes modal when close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    
    renderModal({ onClose })
    
    const closeButton = screen.getByLabelText(/close/i)
    await user.click(closeButton)
    
    expect(onClose).toHaveBeenCalled()
  })

  it('closes modal when escape key is pressed', () => {
    const onClose = vi.fn()
    
    renderModal({ onClose })
    
    fireEvent.keyDown(document, { key: 'Escape' })
    
    expect(onClose).toHaveBeenCalled()
  })

  it('closes modal when backdrop is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    
    renderModal({ onClose })
    
    const backdrop = screen.getByTestId('modal-backdrop')
    await user.click(backdrop)
    
    expect(onClose).toHaveBeenCalled()
  })

  it('prevents modal content click from closing modal', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    
    renderModal({ onClose })
    
    const modalContent = screen.getByTestId('modal-content')
    await user.click(modalContent)
    
    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders image with correct alt text', () => {
    renderModal()
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'TechCorp dashboard screenshot')
  })

  it('has proper ARIA attributes for accessibility', () => {
    renderModal()
    
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-labelledby')
    expect(dialog).toHaveAttribute('aria-describedby')
  })
})