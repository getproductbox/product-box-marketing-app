import type { Meta, StoryObj } from '@storybook/react-vite'
import { EnhancedButton } from './EnhancedButton'
import { ArrowRight, Download, Heart, Star, Zap, Sparkles } from 'lucide-react'

const meta = {
  title: 'Design System/Atoms/EnhancedButton',
  component: EnhancedButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An enhanced button component with micro-interactions, ripple effects, glow effects, and smooth animations. Built for the Product Box brand with modern visual feedback.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger', 'electric'],
      description: 'Button style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Button size',
    },
    glowEffect: {
      control: { type: 'boolean' },
      description: 'Enable glow effect on hover',
    },
    rippleEffect: {
      control: { type: 'boolean' },
      description: 'Enable ripple effect on click',
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the button',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Make button full width',
    },
  },
} satisfies Meta<typeof EnhancedButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Enhanced Button',
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    rightIcon: <ArrowRight className="w-4 h-4" />,
  },
}

export const Electric: Story = {
  args: {
    variant: 'electric',
    children: 'Electric Button',
    leftIcon: <Zap className="w-4 h-4" />,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <EnhancedButton variant="primary">
        Primary
      </EnhancedButton>
      <EnhancedButton variant="secondary">
        Secondary
      </EnhancedButton>
      <EnhancedButton variant="tertiary">
        Tertiary
      </EnhancedButton>
      <EnhancedButton variant="ghost">
        Ghost
      </EnhancedButton>
      <EnhancedButton variant="danger">
        Danger
      </EnhancedButton>
      <EnhancedButton variant="electric">
        Electric
      </EnhancedButton>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <EnhancedButton size="sm">Small</EnhancedButton>
      <EnhancedButton size="md">Medium</EnhancedButton>
      <EnhancedButton size="lg">Large</EnhancedButton>
      <EnhancedButton size="xl">Extra Large</EnhancedButton>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <EnhancedButton leftIcon={<Download className="w-4 h-4" />}>
          Download
        </EnhancedButton>
        <EnhancedButton rightIcon={<ArrowRight className="w-4 h-4" />}>
          Continue
        </EnhancedButton>
        <EnhancedButton 
          leftIcon={<Star className="w-4 h-4" />}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Get Started
        </EnhancedButton>
      </div>
      
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <EnhancedButton variant="electric" leftIcon={<Sparkles className="w-4 h-4" />}>
          Premium
        </EnhancedButton>
        <EnhancedButton variant="tertiary" rightIcon={<Heart className="w-4 h-4" />}>
          Favorite
        </EnhancedButton>
        <EnhancedButton variant="ghost" leftIcon={<Zap className="w-4 h-4" />}>
          Quick Action
        </EnhancedButton>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <EnhancedButton isLoading>
        Loading...
      </EnhancedButton>
      <EnhancedButton variant="secondary" isLoading>
        Processing
      </EnhancedButton>
      <EnhancedButton variant="electric" isLoading size="lg">
        Saving Changes
      </EnhancedButton>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <EnhancedButton disabled>
        Disabled Primary
      </EnhancedButton>
      <EnhancedButton variant="secondary" disabled>
        Disabled Secondary
      </EnhancedButton>
      <EnhancedButton variant="electric" disabled>
        Disabled Electric
      </EnhancedButton>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
    rightIcon: <ArrowRight className="w-4 h-4" />,
  },
  parameters: {
    layout: 'padded',
  },
}

export const InteractiveDemo: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Interactive Effects Demo</h3>
        <p className="text-pb-gray-400">Click buttons to see ripple effects, hover for glow effects</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">With All Effects</h4>
          <div className="space-y-3">
            <EnhancedButton 
              variant="primary" 
              fullWidth 
              glowEffect 
              rippleEffect
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Primary with Effects
            </EnhancedButton>
            <EnhancedButton 
              variant="electric" 
              fullWidth 
              glowEffect 
              rippleEffect
              rightIcon={<Zap className="w-4 h-4" />}
            >
              Electric with Effects
            </EnhancedButton>
            <EnhancedButton 
              variant="tertiary" 
              fullWidth 
              glowEffect 
              rippleEffect
            >
              Tertiary with Effects
            </EnhancedButton>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Minimal Effects</h4>
          <div className="space-y-3">
            <EnhancedButton 
              variant="primary" 
              fullWidth 
              glowEffect={false}
              rippleEffect={false}
            >
              No Effects
            </EnhancedButton>
            <EnhancedButton 
              variant="secondary" 
              fullWidth 
              glowEffect 
              rippleEffect={false}
            >
              Glow Only
            </EnhancedButton>
            <EnhancedButton 
              variant="ghost" 
              fullWidth 
              glowEffect={false}
              rippleEffect
            >
              Ripple Only
            </EnhancedButton>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
}

export const CTAShowcase: Story = {
  render: () => (
    <div className="space-y-12 p-8 max-w-2xl mx-auto text-center">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">Ready to Transform Your Business?</h2>
        <p className="text-pb-gray-300 text-lg">
          Join 500+ companies that trust Product Box to build their operational excellence
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <EnhancedButton 
          variant="primary" 
          size="lg"
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          Start Your Project
        </EnhancedButton>
        <EnhancedButton 
          variant="tertiary" 
          size="lg"
        >
          View Case Studies
        </EnhancedButton>
      </div>
      
      <div className="pt-8">
        <EnhancedButton 
          variant="electric" 
          size="xl"
          leftIcon={<Zap className="w-6 h-6" />}
          className="px-12"
        >
          Get Free Consultation
        </EnhancedButton>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
}