import type { Meta, StoryObj } from '@storybook/react-vite'
import { TestimonialCard } from './TestimonialCard'

const meta: Meta<typeof TestimonialCard> = {
  title: 'Design System/Molecules/TestimonialCard',
  component: TestimonialCard,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0F0F0F' },
        { name: 'light', value: '#FFFFFF' }
      ]
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'featured']
    }
  }
}

export default meta
type Story = StoryObj<typeof TestimonialCard>

export const Default: Story = {
  args: {
    quote: "We were just three founders with a climate-focused idea struggling to turn our vision into reality. Product Box didn't just build our platform – they became our operational backbone.",
    client: "Sarah Chen",
    company: "Carbon Compared",
    role: "Co-founder & CEO"
  }
}

export const Featured: Story = {
  args: {
    quote: "As a startup accelerator, we've worked with dozens of development teams, but Product Box is different. They understand that early-stage companies need more than just code – they need operational excellence.",
    client: "Marcus Rodriguez",
    company: "Vision Pitch",
    role: "Managing Partner",
    variant: "featured"
  }
}

export const Compact: Story = {
  args: {
    quote: "Finding the right technical partner felt impossible until we discovered Product Box. Their ability to understand complex business operations is unmatched.",
    client: "Emma Thompson",
    company: "Digs",
    role: "Operations Director",
    variant: "compact"
  }
}

export const WithoutRole: Story = {
  args: {
    quote: "They've built internal tools for 12 of our portfolio companies, and every single one has seen dramatic improvements in operational efficiency.",
    client: "Alex Kim",
    company: "Tech Ventures"
  }
}