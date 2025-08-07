export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
      <div className="absolute inset-0 bg-gradient-to-br from-pb-gray-100/30 via-transparent to-pb-gray-100/30" />
    </div>
  )
}