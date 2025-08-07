import { MessageCircle } from 'lucide-react'

export function ContactFloat() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button className="bg-pb-accent text-pb-white p-4 rounded-full shadow-lg hover:bg-pb-accent/90 hover:scale-110 transition-all duration-300 group">
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-pb-black text-pb-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Let's chat!
        </span>
      </button>
    </div>
  )
}