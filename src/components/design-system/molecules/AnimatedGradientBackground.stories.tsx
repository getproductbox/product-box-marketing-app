import type { Meta, StoryObj } from '@storybook/react-vite'
import { AnimatedGradientBackground } from './AnimatedGradientBackground'
import { Typography } from '../atoms/Typography'
import { Button } from '../atoms/Button'
import { Card } from './Card'

const meta = {
  title: 'Design System/Molecules/AnimatedGradientBackground',
  component: AnimatedGradientBackground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'An animated gradient background component with interactive mouse tracking and brand-specific color variants. Perfect for hero sections, feature backgrounds, and visual enhancement.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['hero', 'section', 'subtle'],
      description: 'Visual style variant with different color schemes',
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Enable mouse tracking and interactive effects',
    },
    speed: {
      control: { type: 'select' },
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
    intensity: {
      control: { type: 'select' },
      options: ['low', 'medium', 'high'],
      description: 'Visual intensity of the gradient effects',
    },
  },
} satisfies Meta<typeof AnimatedGradientBackground>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'section',
    interactive: true,
    speed: 'normal',
    intensity: 'medium',
    children: (
      <div className="flex items-center justify-center h-96">
        <Typography variant="h2" color="primary" align="center">
          Interactive Animated Background
        </Typography>
      </div>
    ),
  },
}

export const HeroVariant: Story = {
  args: {
    variant: 'hero',
    interactive: true,
    speed: 'normal',
    intensity: 'high',
    children: (
      <div className="flex flex-col items-center justify-center h-screen space-y-6">
        <Typography variant="hero" color="primary" align="center">
          Transform Your Operations
        </Typography>
        <Typography variant="body-xl" color="secondary" align="center" className="max-w-2xl">
          From vision to reality, we build the software that powers your business growth
        </Typography>
        <div className="flex gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="tertiary">Learn More</Button>
        </div>
      </div>
    ),
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const SectionVariant: Story = {
  args: {
    variant: 'section',
    interactive: true,
    speed: 'normal',
    intensity: 'medium',
    children: (
      <div className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Typography variant="display" color="primary">
            Our Services
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Vision', 'Mobilise', 'Support'].map((service) => (
              <Card key={service} variant="elevated" className="bg-pb-gray-900/80 backdrop-blur-sm">
                <Typography variant="h4" className="mb-3">{service}</Typography>
                <Typography color="secondary">
                  Professional service description for {service.toLowerCase()} phase
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const SubtleVariant: Story = {
  args: {
    variant: 'subtle',
    interactive: false,
    speed: 'slow',
    intensity: 'low',
    children: (
      <div className="py-16 px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <Typography variant="h2" color="primary" align="center">
            Subtle Background Effect
          </Typography>
          <Typography color="secondary" align="center">
            Perfect for content sections that need a gentle visual enhancement without overwhelming the content.
          </Typography>
          <Card variant="outlined" className="bg-pb-gray-800/50 backdrop-blur-sm">
            <Typography variant="h4" className="mb-3">Content Card</Typography>
            <Typography color="secondary">
              This card sits on top of the subtle animated background, maintaining excellent readability while adding visual interest.
            </Typography>
          </Card>
        </div>
      </div>
    ),
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const SpeedComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
      <AnimatedGradientBackground variant="section" speed="slow" intensity="medium">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Typography variant="h3" color="primary" className="mb-2">Slow</Typography>
            <Typography color="secondary">8 second animations</Typography>
          </div>
        </div>
      </AnimatedGradientBackground>
      
      <AnimatedGradientBackground variant="section" speed="normal" intensity="medium">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Typography variant="h3" color="primary" className="mb-2">Normal</Typography>
            <Typography color="secondary">5 second animations</Typography>
          </div>
        </div>
      </AnimatedGradientBackground>
      
      <AnimatedGradientBackground variant="section" speed="fast" intensity="medium">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Typography variant="h3" color="primary" className="mb-2">Fast</Typography>
            <Typography color="secondary">3 second animations</Typography>
          </div>
        </div>
      </AnimatedGradientBackground>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

export const IntensityComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
      <AnimatedGradientBackground variant="section" intensity="low" speed="normal">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Typography variant="h3" color="primary" className="mb-2">Low</Typography>
            <Typography color="secondary">30% opacity</Typography>
          </div>
        </div>
      </AnimatedGradientBackground>
      
      <AnimatedGradientBackground variant="section" intensity="medium" speed="normal">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Typography variant="h3" color="primary" className="mb-2">Medium</Typography>
            <Typography color="secondary">60% opacity</Typography>
          </div>
        </div>
      </AnimatedGradientBackground>
      
      <AnimatedGradientBackground variant="section" intensity="high" speed="normal">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Typography variant="h3" color="primary" className="mb-2">High</Typography>
            <Typography color="secondary">80% opacity</Typography>
          </div>
        </div>
      </AnimatedGradientBackground>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

export const NonInteractive: Story = {
  args: {
    variant: 'section',
    interactive: false,
    speed: 'normal',
    intensity: 'medium',
    children: (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Typography variant="h2" color="primary" className="mb-3">
            Non-Interactive Mode
          </Typography>
          <Typography color="secondary">
            Background animations continue without mouse tracking
          </Typography>
        </div>
      </div>
    ),
  },
}

export const WithOverlayContent: Story = {
  args: {
    variant: 'hero',
    interactive: true,
    speed: 'normal',
    intensity: 'medium',
    children: (
      <div className="min-h-screen flex flex-col">
        <nav className="flex justify-between items-center p-6">
          <Typography variant="h4" color="primary">Product Box</Typography>
          <Button variant="tertiary">Contact</Button>
        </nav>
        
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center space-y-6">
            <Typography variant="hero" color="primary">
              Build. Scale. Succeed.
            </Typography>
            <Typography variant="body-xl" color="secondary" className="max-w-2xl mx-auto">
              We turn your operational challenges into competitive advantages through custom software solutions
            </Typography>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg">Start Your Project</Button>
              <Button size="lg" variant="secondary">View Case Studies</Button>
            </div>
          </div>
        </div>
        
        <footer className="p-6 text-center">
          <Typography color="muted" variant="body-sm">
            Trusted by 500+ companies worldwide
          </Typography>
        </footer>
      </div>
    ),
  },
  parameters: {
    layout: 'fullscreen',
  },
}