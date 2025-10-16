import React, { useEffect, useState } from 'react'

export interface PageLoaderProps {
  onComplete?: () => void
  duration?: number
  className?: string
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  onComplete,
  className = ''
}) => {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15 + 5 // Random increment between 5-20
        const newProgress = Math.min(prev + increment, 100)
        
        if (newProgress >= 100) {
          setIsComplete(true)
          setTimeout(() => onComplete?.(), 500)
          clearInterval(interval)
        }
        
        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`
      fixed inset-0 z-50 flex items-center justify-center
      bg-gradient-to-br from-pb-black via-pb-gray-950 to-pb-black
      transition-all duration-500
      ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      ${className}
    `}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pb-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pb-electric/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-pb-white mb-2">
            Product<span className="bg-gradient-to-r from-pb-accent to-pb-electric bg-clip-text text-transparent">Box</span>
          </h1>
          <p className="text-pb-gray-400 text-lg">Implementing Agents</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="flex justify-between text-sm text-pb-gray-400 mb-2">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full bg-pb-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pb-accent to-pb-electric rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading States */}
        <div className="mt-8 h-6">
          {progress < 30 && (
            <p className="text-pb-gray-400 animate-fade-in">Initializing systems...</p>
          )}
          {progress >= 30 && progress < 60 && (
            <p className="text-pb-gray-400 animate-fade-in">Loading components...</p>
          )}
          {progress >= 60 && progress < 90 && (
            <p className="text-pb-gray-400 animate-fade-in">Preparing experience...</p>
          )}
          {progress >= 90 && (
            <p className="text-pb-accent animate-fade-in font-medium">Almost ready!</p>
          )}
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-1 mt-6">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2 h-2 bg-pb-accent rounded-full animate-bounce"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}