import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface PathCardProps {
  title: string
  description: string
  linkTo: string
  accentColor: 'accent' | 'electric'
  buttonText?: string
}

/**
 * Color variants for PathCard component.
 * Uses full class strings (not interpolation) due to Tailwind JIT compilation requirements.
 * See: https://tailwindcss.com/docs/content-configuration#class-detection
 */
const COLOR_VARIANTS = {
  accent: {
    border: 'hover:border-pb-accent',
    shadow: 'hover:shadow-pb-accent/20',
    titleHover: 'group-hover:text-pb-accent',
  },
  electric: {
    border: 'hover:border-pb-electric',
    shadow: 'hover:shadow-pb-electric/20',
    titleHover: 'group-hover:text-pb-electric',
  },
} as const

export function PathCard({
  title,
  description,
  linkTo,
  accentColor,
  buttonText = 'Learn More',
}: PathCardProps) {
  const colors = COLOR_VARIANTS[accentColor]

  const cardClasses = `bg-pb-gray-900/50 border-2 border-pb-gray-700 rounded-2xl p-10 ${colors.border} hover:shadow-2xl ${colors.shadow} transition-all duration-300 group flex flex-col items-center text-center`

  const titleClasses = `text-h2 font-bold mb-6 text-pb-white ${colors.titleHover} transition-colors`

  return (
    <div className={cardClasses}>
      <h2 className={titleClasses}>
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
