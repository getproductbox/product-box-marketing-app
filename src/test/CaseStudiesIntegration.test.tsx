import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CaseStudies } from '../components/CaseStudies'

// Mock the data module to provide controlled test data
vi.mock('../lib/data', () => ({
  getCaseStudiesData: vi.fn().mockResolvedValue([
    {
      _id: '1',
      client: 'TechFlow',
      tagline: 'From Manual Reporting Hell to $2M Funding Success',
      description: 'TechFlow was drowning in manual data processing...',
      overview: 'A comprehensive analytics platform that transformed manual reporting processes...',
      challenge: 'TechFlow operations team was spending over 40 hours per week...',
      solution: 'We developed a custom analytics platform that completely automated...',
      results: 'The transformation was immediate and dramatic...',
      image: {
        _type: 'image',
        asset: { _ref: 'fallback-1', _type: 'reference' },
        alt: 'TechFlow AI Analytics Platform'
      },
      metrics: [
        { label: 'Hours Saved Weekly', value: '40+' },
        { label: 'Deployment Time', value: '6 weeks' },
        { label: 'Funding Secured', value: '$2M' }
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      year: '2024',
      order: 1,
      featured: true,
      slug: 'techflow-analytics'
    }
  ])
}))

// Mock Sanity urlFor function
vi.mock('../lib/sanity', () => ({
  urlFor: vi.fn().mockReturnValue({
    url: () => 'https://test-image-url.jpg'
  })
}))

const renderCaseStudies = () => {
  return render(
    <MemoryRouter>
      <CaseStudies />
    </MemoryRouter>
  )
}

describe('CaseStudies Integration', () => {
  it('displays case study metrics as bullet points', async () => {
    renderCaseStudies()
    
    // Wait for data to load
    await screen.findByText('TechFlow')
    
    // Check that metrics are displayed with proper format
    expect(screen.getByText('Hours Saved Weekly: 40+')).toBeInTheDocument()
    expect(screen.getByText('Deployment Time: 6 weeks')).toBeInTheDocument()
    expect(screen.getByText('Funding Secured: $2M')).toBeInTheDocument()
  })

  it('opens modal when case study is clicked', async () => {
    const user = userEvent.setup()
    renderCaseStudies()
    
    // Wait for data to load
    const caseStudyCard = await screen.findByText('TechFlow')
    
    // Click on the case study
    await user.click(caseStudyCard.closest('div')!)
    
    // Check that modal opens with detailed content
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('From Manual Reporting Hell to $2M Funding Success')).toBeInTheDocument()
  })

  it('displays detailed content in modal', async () => {
    const user = userEvent.setup()
    renderCaseStudies()
    
    // Wait for data to load and click case study
    const caseStudyCard = await screen.findByText('TechFlow')
    await user.click(caseStudyCard.closest('div')!)
    
    // Check detailed modal content sections
    expect(screen.getByText('Challenge')).toBeInTheDocument()
    expect(screen.getByText('Solution')).toBeInTheDocument()
    expect(screen.getByText('Results')).toBeInTheDocument()
    expect(screen.getByText('Technologies')).toBeInTheDocument()
    
    // Check that detailed content is displayed
    expect(screen.getByText(/TechFlow operations team was spending/)).toBeInTheDocument()
    expect(screen.getByText(/We developed a custom analytics platform/)).toBeInTheDocument()
    expect(screen.getByText(/The transformation was immediate/)).toBeInTheDocument()
  })

  it('displays technologies as badges in modal', async () => {
    const user = userEvent.setup()
    renderCaseStudies()
    
    // Wait for data to load and click case study
    const caseStudyCard = await screen.findByText('TechFlow')
    await user.click(caseStudyCard.closest('div')!)
    
    // Check technology badges
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
  })
})