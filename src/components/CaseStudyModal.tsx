import { useEffect } from 'react'
import { X } from 'lucide-react'
import { urlFor } from '../lib/sanity'
import type { CaseStudy } from '../types/sanity'

interface CaseStudyModalProps {
  isOpen: boolean
  onClose: () => void
  caseStudy: CaseStudy | null
}

export function CaseStudyModal({ isOpen, onClose, caseStudy }: CaseStudyModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !caseStudy) {
    return null
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const imageUrl = caseStudy.image && caseStudy.image.asset
    ? (urlFor(caseStudy.image)?.url() || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&q=80')
    : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&q=80'

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
      data-testid="modal-backdrop"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div 
        className="relative w-full max-w-6xl max-h-[90vh] bg-pb-gray-900 rounded-lg border border-pb-gray-800 overflow-hidden"
        data-testid="modal-content"
        onClick={handleContentClick}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-pb-black/50 hover:bg-pb-black/70 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-pb-white" />
        </button>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Hero Section */}
          <div className="relative aspect-[21/9] overflow-hidden">
            <img
              src={imageUrl}
              alt={caseStudy.image?.alt || `${caseStudy.client} ${caseStudy.tagline} case study`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pb-black via-pb-black/80 to-pb-black/20" />
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <h1 id="modal-title" className="text-h1 font-black text-pb-white mb-4">
                {caseStudy.client}
              </h1>
              <p className="text-h3 font-bold text-pb-accent mb-6">
                {caseStudy.tagline}
              </p>
              <p id="modal-description" className="text-body-lg text-pb-gray-300 max-w-3xl">
                {caseStudy.overview}
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-8 lg:p-12 space-y-16">
            {/* Metrics */}
            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <section className="border-l-4 border-pb-accent pl-8 bg-pb-gray-800/30 rounded-r-lg py-6">
                <h3 className="text-body-lg font-bold text-pb-accent mb-6 uppercase tracking-wide">Key Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {caseStudy.metrics.map((metric, index) => (
                    <div key={index} className="text-center p-4 bg-pb-gray-900/50 rounded-lg border border-pb-gray-700/50">
                      <div className="text-h3 font-black text-pb-accent mb-2 leading-tight">
                        {metric.value}
                      </div>
                      <div className="text-body-sm font-medium text-pb-gray-300 leading-snug">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Challenge */}
              {caseStudy.challenge && (
                <section className="bg-gradient-to-br from-pb-gray-800/40 to-pb-gray-900/40 p-8 rounded-lg border border-pb-gray-700/50">
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <h2 className="text-h3 font-black text-pb-white">The Challenge</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-body text-pb-gray-300 leading-relaxed">
                      {caseStudy.challenge}
                    </p>
                  </div>
                </section>
              )}

              {/* Solution */}
              {caseStudy.solution && (
                <section className="bg-gradient-to-br from-pb-accent/10 to-pb-accent/5 p-8 rounded-lg border border-pb-accent/20">
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 bg-pb-accent rounded-full mr-3"></div>
                    <h2 className="text-h3 font-black text-pb-white">Our Solution</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-body text-pb-gray-300 leading-relaxed">
                      {caseStudy.solution}
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* Results */}
            {caseStudy.results && (
              <section className="bg-gradient-to-r from-green-500/10 to-pb-accent/10 p-8 rounded-lg border border-green-500/20">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <h2 className="text-h2 font-black text-pb-white">Impact & Results</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-body-lg text-pb-gray-200 leading-relaxed font-medium">
                    {caseStudy.results}
                  </p>
                </div>
              </section>
            )}

            {/* Technologies */}
            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
              <section>
                <h3 className="text-body-lg font-bold text-pb-gray-400 mb-4 uppercase tracking-wide">Tech Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {caseStudy.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-5 py-3 bg-pb-gray-800 border border-pb-gray-600 hover:border-pb-accent/50 rounded-lg text-body-sm text-pb-white font-medium transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}