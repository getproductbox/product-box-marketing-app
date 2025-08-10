import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'
import { Button } from '../atoms/Button'
import { Typography } from '../atoms/Typography'
import { Star, Heart, Share2 } from 'lucide-react'

const meta = {
  title: 'Design System/Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component that can be used to display content with optional headers, footers, and various styling options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined', 'filled'],
      description: 'Visual style variant',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Inner padding size',
    },
    borderRadius: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Border radius size',
    },
    hover: {
      control: { type: 'boolean' },
      description: 'Enable hover effects',
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Make card interactive (clickable)',
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div>
        <Typography variant="h3" className="mb-4">Card Title</Typography>
        <Typography color="secondary">
          This is a basic card with default styling. It contains some text content to demonstrate the layout.
        </Typography>
      </div>
    ),
  },
}

export const WithHeader: Story = {
  args: {
    header: <Typography variant="h4">Card Header</Typography>,
    children: (
      <Typography color="secondary">
        This card has a header section separated by a border. The header can contain any content.
      </Typography>
    ),
  },
}

export const WithFooter: Story = {
  args: {
    children: (
      <Typography color="secondary">
        This card has a footer section that can contain actions or additional information.
      </Typography>
    ),
    footer: (
      <div className="flex gap-2">
        <Button size="sm">Action</Button>
        <Button size="sm" variant="tertiary">Cancel</Button>
      </div>
    ),
  },
}

export const WithHeaderAndFooter: Story = {
  args: {
    header: (
      <div className="flex items-center justify-between">
        <Typography variant="h4">Product Card</Typography>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-4 h-4 fill-pb-accent text-pb-accent" />
          ))}
        </div>
      </div>
    ),
    children: (
      <div className="space-y-4">
        <Typography color="secondary">
          A comprehensive product with amazing features that will revolutionize your workflow.
        </Typography>
        <div className="flex items-center gap-4">
          <Typography variant="h4" color="accent">$99.99</Typography>
          <Typography variant="body-sm" color="muted" className="line-through">$149.99</Typography>
        </div>
      </div>
    ),
    footer: (
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button leftIcon={<Heart />} variant="ghost" size="sm">Like</Button>
          <Button leftIcon={<Share2 />} variant="ghost" size="sm">Share</Button>
        </div>
        <Button>Add to Cart</Button>
      </div>
    ),
  },
}

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <Card variant="default">
        <Typography variant="h4" className="mb-2">Default</Typography>
        <Typography color="secondary">Semi-transparent with border</Typography>
      </Card>
      
      <Card variant="elevated">
        <Typography variant="h4" className="mb-2">Elevated</Typography>
        <Typography color="secondary">Enhanced with shadow</Typography>
      </Card>
      
      <Card variant="outlined">
        <Typography variant="h4" className="mb-2">Outlined</Typography>
        <Typography color="secondary">Transparent with prominent border</Typography>
      </Card>
      
      <Card variant="filled">
        <Typography variant="h4" className="mb-2">Filled</Typography>
        <Typography color="secondary">Solid background</Typography>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Card padding="sm">
        <Typography variant="h5" className="mb-2">Small Padding</Typography>
        <Typography color="secondary" variant="body-sm">Compact card with minimal spacing</Typography>
      </Card>
      
      <Card padding="md">
        <Typography variant="h4" className="mb-3">Medium Padding</Typography>
        <Typography color="secondary">Standard card with balanced spacing</Typography>
      </Card>
      
      <Card padding="lg">
        <Typography variant="h3" className="mb-4">Large Padding</Typography>
        <Typography color="secondary">Spacious card with generous padding</Typography>
      </Card>
      
      <Card padding="xl">
        <Typography variant="h2" className="mb-6">Extra Large Padding</Typography>
        <Typography color="secondary">Very spacious card for hero sections</Typography>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const BorderRadius: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
      <Card borderRadius="sm">
        <Typography variant="h6" className="mb-1">Small Radius</Typography>
        <Typography color="secondary" variant="body-sm">Subtle rounding</Typography>
      </Card>
      
      <Card borderRadius="md">
        <Typography variant="h6" className="mb-1">Medium Radius</Typography>
        <Typography color="secondary" variant="body-sm">Balanced rounding</Typography>
      </Card>
      
      <Card borderRadius="lg">
        <Typography variant="h6" className="mb-1">Large Radius</Typography>
        <Typography color="secondary" variant="body-sm">Prominent rounding</Typography>
      </Card>
      
      <Card borderRadius="xl">
        <Typography variant="h6" className="mb-1">Extra Large</Typography>
        <Typography color="secondary" variant="body-sm">Very rounded</Typography>
      </Card>
      
      <Card borderRadius="2xl">
        <Typography variant="h6" className="mb-1">2X Large</Typography>
        <Typography color="secondary" variant="body-sm">Maximum rounding</Typography>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const Interactive: Story = {
  args: {
    interactive: true,
    hover: true,
    children: (
      <div className="text-center">
        <Typography variant="h4" className="mb-2">Interactive Card</Typography>
        <Typography color="secondary">
          Click me! This card responds to user interactions with hover effects and focus states.
        </Typography>
      </div>
    ),
  },
}

export const HoverEffect: Story = {
  args: {
    hover: true,
    children: (
      <div className="text-center">
        <Typography variant="h4" className="mb-2">Hover Me</Typography>
        <Typography color="secondary">
          This card has hover effects without being interactive.
        </Typography>
      </div>
    ),
  },
}

export const NoPadding: Story = {
  render: () => (
    <Card 
      padding="none"
      header={
        <Typography variant="h4">Header with Custom Padding</Typography>
      }
      footer={
        <Button fullWidth>Footer Action</Button>
      }
    >
      <div className="h-32 bg-gradient-to-r from-pb-accent to-pb-electric rounded-lg flex items-center justify-center">
        <Typography variant="h5" color="primary">Custom Content Area</Typography>
      </div>
    </Card>
  ),
  parameters: {
    layout: 'centered',
  },
}