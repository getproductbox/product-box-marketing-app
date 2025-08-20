import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Filter, SortAsc } from 'lucide-react'
import { getCaseStudiesData } from '../lib/data'
import { CaseStudies } from '../components/CaseStudies'
import type { CaseStudy } from '../types/sanity'

export function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [filteredStudies, setFilteredStudies] = useState<CaseStudy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'order' | 'year' | 'client'>('order')

  // Set page title
  useEffect(() => {
    document.title = 'Case Studies - Product Box'
    
    return () => {
      document.title = 'Product Box - Fullstack Operations Specialists'
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCaseStudiesData()
        setCaseStudies(data)
        setFilteredStudies(data)
      } catch (error) {
        console.error('Error fetching case studies data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  // Filter and sort case studies
  useEffect(() => {
    const filtered = selectedService === 'All' 
      ? caseStudies 
      : caseStudies.filter(study => study.service === selectedService)

    // Sort studies
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'year':
          return parseInt(b.year) - parseInt(a.year)
        case 'client':
          return a.client.localeCompare(b.client)
        case 'order':
        default:
          return a.order - b.order
      }
    })

    setFilteredStudies(sorted)
  }, [caseStudies, selectedService, sortBy])

  const services = ['All', 'Vision', 'Scale', 'Thrive']

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pb-white">
        <div className="container py-32">
          <div className="text-center">
            <div 
              className="w-8 h-8 border-2 border-pb-accent border-t-transparent rounded-full animate-spin mx-auto"
              role="status"
              aria-label="Loading case studies"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pb-white">
      {/* Breadcrumb Navigation */}
      <nav 
        className="container py-8"
        aria-label="Breadcrumb"
      >
        <div className="flex items-center gap-3 text-pb-gray-600">
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:text-pb-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-pb-black font-medium">Case Studies</span>
        </div>
      </nav>

      {/* Page Header */}
      <div className="container pb-16">
        <div className="text-center mb-16">
          <h1 className="text-display font-black text-pb-black mb-8">
            Our Case Studies
          </h1>
          <p className="text-body-lg text-pb-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our complete portfolio of successful projects. Each case study demonstrates 
            our ability to transform operational challenges into competitive advantages through 
            custom software solutions.
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between mb-8 p-6 bg-pb-gray-50 rounded-lg">
          {/* Service Filter */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-pb-gray-700">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filter by Service:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedService === service
                      ? 'bg-pb-accent text-pb-white shadow-lg shadow-pb-accent/20 scale-105'
                      : 'bg-pb-white text-pb-gray-700 hover:bg-pb-accent/10 hover:text-pb-accent hover:scale-102 hover:shadow-md border border-pb-gray-200'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-pb-gray-700">
              <SortAsc className="w-4 h-4" />
              <span className="font-medium">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'order' | 'year' | 'client')}
              className="px-3 py-2 bg-pb-white border border-pb-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pb-accent/20 focus:border-pb-accent"
            >
              <option value="order">Featured Order</option>
              <option value="year">Year (Newest First)</option>
              <option value="client">Client Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-pb-gray-600">
            Showing {filteredStudies.length} of {caseStudies.length} case studies
            {selectedService !== 'All' && (
              <span className="text-pb-accent font-medium"> for {selectedService}</span>
            )}
          </p>
        </div>
      </div>

      {/* Case Studies Grid */}
      {filteredStudies.length > 0 ? (
        <div className="pb-32">
          <CaseStudies 
            // Pass filtered studies as a custom override
            caseStudiesOverride={filteredStudies}
          />
        </div>
      ) : (
        <div className="container pb-32">
          <div className="text-center py-24">
            <div className="text-6xl mb-8">🔍</div>
            <h3 className="text-h3 font-bold text-pb-black mb-4">
              No case studies found
            </h3>
            <p className="text-body text-pb-gray-600 mb-8">
              No case studies match your current filter criteria. Try adjusting your filters or check back soon for new projects.
            </p>
            <button
              onClick={() => {
                setSelectedService('All')
                setSortBy('order')
              }}
              className="bg-pb-accent text-pb-white px-6 py-3 rounded-md hover:bg-pb-accent/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}