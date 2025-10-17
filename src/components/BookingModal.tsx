import { useEffect } from 'react'
import { X, ArrowUpRight } from 'lucide-react'

interface TeamMember {
  name: string
  calendarUrl: string
  photoPath?: string
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  teamMembers: readonly TeamMember[]
}

export function BookingModal({ isOpen, onClose, teamMembers }: BookingModalProps) {
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

  if (!isOpen) {
    return null
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-pb-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-pb-gray-800 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-pb-gray-900 border-b border-pb-gray-800 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-h3 font-black text-pb-white">Book a Discovery Call</h2>
            <p className="text-body text-pb-gray-400 mt-1">Choose a time with Matt or Ollie</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-pb-gray-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-pb-gray-400" />
          </button>
        </div>

        {/* Team Members */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-pb-gray-800/50 border-2 border-pb-gray-700 rounded-xl p-6 hover:border-pb-electric hover:shadow-2xl hover:shadow-pb-electric/20 transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* Avatar with photo */}
                <div className="w-48 h-48 rounded-full overflow-hidden mb-4 ring-2 ring-pb-gray-700">
                  {member.photoPath ? (
                    <img
                      src={member.photoPath}
                      alt={`${member.name} headshot`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pb-accent to-pb-electric flex items-center justify-center">
                      <span className="text-3xl font-black text-pb-black">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="text-h4 font-bold text-pb-white mb-4">{member.name}</h3>

                <a
                  href={member.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-pb-electric text-pb-black px-6 py-3 font-semibold rounded-lg hover:bg-pb-electric/90 transition-all duration-300 w-full"
                >
                  Book with {member.name}
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
