
const services = [
  {
    id: 'vision',
    title: 'Vision',
    deliverables: [
      'Market research & validation',
      'Interactive prototypes',
      'Pitch deck preparation'
    ],
    timeline: '1 week',
    price: '£1k',
    description: 'Transform your concept into a compelling, validated product vision that attracts investors and excites users.'
  },
  {
    id: 'scale', 
    title: 'Scale',
    deliverables: [
      'MVP development',
      'Quality assurance',
      'Launch preparation'
    ],
    timeline: '6+ weeks',
    price: '£10k+',
    description: 'Go from prototype to production-ready product with a scalable foundation built for growth.'
  }
]

export function ServiceCardsTest() {
  console.log('ServiceCardsTest rendering...')
  
  return (
    <section id="services-test" className="py-32 bg-red-500 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">TEST SERVICE CARDS</h2>
        <div className="space-y-16">
          {services.map((service, index) => (
            <div key={service.id} className="bg-white/10 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">0{index + 1} - {service.title}</h3>
              <p className="text-lg mb-4">{service.description}</p>
              <div className="text-sm">
                <div>Timeline: {service.timeline}</div>
                <div>Price: {service.price}</div>
              </div>
              <ul className="mt-4 space-y-2">
                {service.deliverables.map((item, i) => (
                  <li key={i} className="text-sm">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}