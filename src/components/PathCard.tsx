import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface PathCardProps {
  title: string
  description: string
  linkTo: string
  accentColor: 'accent' | 'electric'
  buttonText?: string
}

export function PathCard({
  title,
  description,
  linkTo,
  accentColor,
  buttonText = 'Learn More',
}: PathCardProps) {
  const colorClasses = {
    accent: {
      border: 'border-pb-accent',
      shadow: 'shadow-pb-accent/20',
      text: 'text-pb-accent',
    },
    electric: {
      border: 'border-pb-electric',
      shadow: 'shadow-pb-electric/20',
      text: 'text-pb-electric',
    },
  }

  const colors = colorClasses[accentColor]

  return (
    <div
      className={`bg-pb-gray-900/50 border-2 border-pb-gray-700 rounded-2xl p-10 hover:${colors.border} hover:shadow-2xl hover:${colors.shadow} transition-all duration-300 group flex flex-col items-center text-center`}
    >
      <h2
        className={`text-h2 font-bold mb-6 text-pb-white group-hover:${colors.text} transition-colors`}
      >
        {title}
      </h2>
      <p className="text-body-lg text-pb-gray-300 mb-8 leading-relaxed flex-grow">
        {description}
      </p>
      <div className="w-fit p-[2px] bg-gradient-to-r from-pb-accent to-pb-electric rounded-lg hover:scale-105 transition-all duration-300">
        <Link
          to={linkTo}
          className="inline-flex items-center gap-2 bg-pb-black text-pb-white px-8 py-4 font-semibold rounded-lg"
        >
          {buttonText}
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}
