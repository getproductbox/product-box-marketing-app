import type { Meta, StoryObj } from '@storybook/react-vite'
import { GeometricPatterns, DecorativeShapes } from './GeometricPatterns'
import type { GeometricPatternsProps } from './GeometricPatterns'
import { Typography } from '../atoms/Typography'
import { Card } from './Card'
import { EnhancedButton } from '../atoms/EnhancedButton'

const meta = {
  title: 'Design System/Molecules/GeometricPatterns',
  component: GeometricPatterns,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Geometric pattern overlays for visual enhancement. Includes various pattern types, colors, and intensities for background decoration.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['grid', 'dots', 'hexagons', 'triangles', 'circles', 'lines'],
      description: 'Pattern type',
    },
    intensity: {
      control: { type: 'select' },
      options: ['low', 'medium', 'high'],
      description: 'Pattern opacity/visibility',
    },
    color: {
      control: { type: 'select' },
      options: ['accent', 'electric', 'white', 'gray'],
      description: 'Pattern color',
    },
    animated: {
      control: { type: 'boolean' },
      description: 'Enable subtle animation',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Pattern scale',
    },
  },
} satisfies Meta<typeof GeometricPatterns>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'dots',
    intensity: 'medium',
    color: 'accent',
    animated: false,
    size: 'md',
  },
  render: (args) => (
    <div className="relative h-96 bg-pb-black">
      <GeometricPatterns {...args} />
      <div className="relative z-10 flex items-center justify-center h-full">
        <Typography variant="h2" color="primary">
          Pattern Overlay Demo
        </Typography>
      </div>
    </div>
  ),
}

export const AllPatterns: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-0 h-screen">
      {['grid', 'dots', 'hexagons', 'triangles', 'circles', 'lines'].map((pattern) => (
        <div key={pattern} className="relative bg-pb-black border border-pb-gray-800">
          <GeometricPatterns 
            variant={pattern as GeometricPatternsProps['variant']} 
            intensity="medium" 
            color="accent" 
          />
          <div className="relative z-10 flex items-center justify-center h-full">
            <Typography variant="h4" color="primary" className="capitalize">
              {pattern}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

export const IntensityComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
      {['low', 'medium', 'high'].map((intensity) => (
        <div key={intensity} className="relative bg-pb-black border border-pb-gray-800">
          <GeometricPatterns 
            variant="dots" 
            intensity={intensity as GeometricPatternsProps['intensity']} 
            color="electric" 
          />
          <div className="relative z-10 flex items-center justify-center h-full">
            <Typography variant="h3" color="primary" className="capitalize">
              {intensity}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

export const ColorVariations: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 h-screen">
      {['accent', 'electric', 'white', 'gray'].map((color) => (
        <div key={color} className="relative bg-pb-black border border-pb-gray-800">
          <GeometricPatterns 
            variant="hexagons" 
            intensity="medium" 
            color={color as GeometricPatternsProps['color']} 
          />
          <div className="relative z-10 flex items-center justify-center h-full">
            <Typography variant="h4" color="primary" className="capitalize">
              {color}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

export const SizeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
      {['sm', 'md', 'lg'].map((size) => (
        <div key={size} className="relative bg-pb-black border border-pb-gray-800">
          <GeometricPatterns 
            variant="grid" 
            intensity="medium" 
            color="accent" 
            size={size as GeometricPatternsProps['size']}
          />
          <div className="relative z-10 flex items-center justify-center h-full">
            <Typography variant="h3" color="primary" className="uppercase">
              {size}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

export const WithContent: Story = {
  render: () => (
    <div className="relative min-h-screen bg-pb-black">
      <GeometricPatterns 
        variant="dots" 
        intensity="low" 
        color="accent" 
        animated
      />
      <div className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <Typography variant="hero" color="primary">
              Transform Your Operations
            </Typography>
            <Typography variant="body-xl" color="secondary" className="max-w-2xl mx-auto">
              Professional software solutions with beautiful geometric patterns as background enhancement
            </Typography>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Vision', 'Mobilise', 'Support'].map((service) => (
              <Card key={service} variant="elevated" className="bg-pb-gray-900/80 backdrop-blur-sm">
                <Typography variant="h4" className="mb-3">{service}</Typography>
                <Typography color="secondary" className="mb-4">
                  Professional service description with geometric patterns in the background
                </Typography>
                <EnhancedButton variant="tertiary" size="sm">
                  Learn More
                </EnhancedButton>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <EnhancedButton variant="primary" size="lg">
              Get Started
            </EnhancedButton>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

export const DecorativeShapesDemo: Story = {
  render: () => (
    <div className="relative h-screen bg-pb-black">
      <GeometricPatterns 
        variant="grid" 
        intensity="low" 
        color="gray" 
      />
      <DecorativeShapes
        shapes={[
          { type: 'circle', size: 50, x: 10, y: 20, color: 'accent', opacity: 0.3, animated: true },
          { type: 'hexagon', size: 30, x: 80, y: 15, color: 'electric', opacity: 0.4, animated: true },
          { type: 'triangle', size: 40, x: 15, y: 70, color: 'accent', opacity: 0.2, animated: true },
          { type: 'square', size: 25, x: 70, y: 60, color: 'white', opacity: 0.3, animated: true },
          { type: 'circle', size: 35, x: 45, y: 25, color: 'electric', opacity: 0.25, animated: true },
          { type: 'hexagon', size: 20, x: 85, y: 75, color: 'accent', opacity: 0.35, animated: true },
        ]}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6">
        <Typography variant="hero" color="primary">
          Decorative Shapes
        </Typography>
        <Typography variant="body-xl" color="secondary" className="max-w-2xl">
          Combining geometric patterns with decorative shapes for rich visual backgrounds
        </Typography>
        <EnhancedButton variant="electric" size="lg">
          Explore More
        </EnhancedButton>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

export const AnimatedPattern: Story = {
  args: {
    variant: 'circles',
    intensity: 'medium',
    color: 'electric',
    animated: true,
    size: 'md',
  },
  render: (args) => (
    <div className="relative h-96 bg-pb-black">
      <GeometricPatterns {...args} />
      <div className="relative z-10 flex items-center justify-center h-full">
        <Typography variant="h2" color="primary">
          Animated Pattern
        </Typography>
      </div>
    </div>
  ),
}

export const LayeredPatterns: Story = {
  render: () => (
    <div className="relative h-screen bg-pb-black">
      <GeometricPatterns 
        variant="grid" 
        intensity="low" 
        color="gray" 
        size="lg"
      />
      <GeometricPatterns 
        variant="dots" 
        intensity="medium" 
        color="accent" 
        size="sm"
        className="opacity-50"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6">
        <Typography variant="display" color="primary">
          Layered Patterns
        </Typography>
        <Typography variant="body-lg" color="secondary" className="max-w-xl">
          Multiple geometric patterns can be layered for complex visual effects
        </Typography>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}