import type { Meta, StoryObj } from '@storybook/react-vite'
import { InteractiveServiceCard } from './InteractiveServiceCard'

const meta: Meta<typeof InteractiveServiceCard> = {
  title: 'Design System/Organisms/InteractiveServiceCard',
  component: InteractiveServiceCard,
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
    icon: {
      control: { type: 'select' },
      options: ['eye', 'trending-up', 'zap']
    },
    index: {
      control: { type: 'select' },
      options: [0, 1, 2]
    }
  }
}

export default meta
type Story = StoryObj<typeof InteractiveServiceCard>

export const Vision: Story = {
  args: {
    title: 'Vision',
    phase: 'Vision',
    description: 'Uncover hidden operational bottlenecks and design your growth blueprint',
    features: [
      'Operations Deep-Dive Audit',
      'Bottleneck Identification & Analysis', 
      'Growth-Ready Architecture Design',
      'ROI Projection & Timeline'
    ],
    icon: 'eye',
    index: 0
  }
}

export const Mobilise: Story = {
  args: {
    title: 'Mobilise',
    phase: 'Mobilise',
    description: 'Build and deploy custom software that immediately transforms operations',
    features: [
      'Rapid Custom Development',
      'Seamless System Integration',
      'Automated Workflow Implementation', 
      'Real-Time Performance Tracking'
    ],
    icon: 'trending-up',
    index: 1
  }
}

export const Support: Story = {
  args: {
    title: 'Support',
    phase: 'Support', 
    description: 'Continuous optimization ensures your operations stay ahead of growth',
    features: [
      '24/7 System Monitoring',
      'Proactive Performance Optimization',
      'Feature Evolution & Enhancement',
      'Strategic Growth Planning'
    ],
    icon: 'zap',
    index: 2
  }
}

export const AllCards: Story = {
  render: () => (
    <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
      <InteractiveServiceCard
        title="Vision"
        phase="Vision"
        description="Uncover hidden operational bottlenecks and design your growth blueprint"
        features={[
          'Operations Deep-Dive Audit',
          'Bottleneck Identification & Analysis',
          'Growth-Ready Architecture Design',
          'ROI Projection & Timeline'
        ]}
        icon="eye"
        index={0}
      />
      <InteractiveServiceCard
        title="Mobilise"
        phase="Mobilise"
        description="Build and deploy custom software that immediately transforms operations"
        features={[
          'Rapid Custom Development',
          'Seamless System Integration',
          'Automated Workflow Implementation',
          'Real-Time Performance Tracking'
        ]}
        icon="trending-up"
        index={1}
      />
      <InteractiveServiceCard
        title="Support"
        phase="Support"
        description="Continuous optimization ensures your operations stay ahead of growth"
        features={[
          '24/7 System Monitoring',
          'Proactive Performance Optimization',
          'Feature Evolution & Enhancement',
          'Strategic Growth Planning'
        ]}
        icon="zap"
        index={2}
      />
    </div>
  )
}