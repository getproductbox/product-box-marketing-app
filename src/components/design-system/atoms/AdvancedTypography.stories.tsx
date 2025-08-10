import type { Meta, StoryObj } from '@storybook/react-vite'
import { AdvancedTypography, TextBlock, QuoteBlock, StatBlock } from './AdvancedTypography'
import { EnhancedButton } from './EnhancedButton'
import { AnimatedGradientBackground } from '../molecules/AnimatedGradientBackground'
import { GeometricPatterns } from '../molecules/GeometricPatterns'

const meta = {
  title: 'Design System/Atoms/AdvancedTypography',
  component: AdvancedTypography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Advanced typography components with sophisticated hierarchy, visual styling, and specialized layouts for enhanced content presentation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['hero-xl', 'hero-gradient', 'section-title', 'featured-text', 'eyebrow', 'quote', 'stat', 'caption-detailed'],
      description: 'Typography variant with specialized styling',
    },
    gradient: {
      control: { type: 'boolean' },
      description: 'Apply gradient coloring',
    },
    animate: {
      control: { type: 'boolean' },
      description: 'Enable entrance animation',
    },
    maxWidth: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Maximum width constraint',
    },
    spacing: {
      control: { type: 'select' },
      options: ['tight', 'normal', 'relaxed', 'loose'],
      description: 'Line height spacing',
    },
    as: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'blockquote'],
      description: 'HTML element to render',
    },
  },
} satisfies Meta<typeof AdvancedTypography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'section-title',
    children: 'Advanced Typography',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-12 bg-pb-black p-8 rounded-lg">
      <AdvancedTypography variant="hero-xl" as="h1">
        Hero XL Text
      </AdvancedTypography>
      
      <AdvancedTypography variant="hero-gradient" as="h1">
        Hero Gradient Text
      </AdvancedTypography>
      
      <AdvancedTypography variant="section-title" as="h2">
        Section Title
      </AdvancedTypography>
      
      <AdvancedTypography variant="featured-text" as="p">
        This is featured text that stands out with enhanced styling and visual hierarchy.
      </AdvancedTypography>
      
      <AdvancedTypography variant="eyebrow" as="span">
        Eyebrow Text
      </AdvancedTypography>
      
      <AdvancedTypography variant="quote" as="blockquote">
        This is a beautifully styled quote with custom quotation marks and elegant typography.
      </AdvancedTypography>
      
      <AdvancedTypography variant="stat" as="div">
        500+
      </AdvancedTypography>
      
      <AdvancedTypography variant="caption-detailed" as="p">
        This is detailed caption text with enhanced styling and proper spacing for additional context and information.
      </AdvancedTypography>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
}

export const WithHighlighting: Story = {
  render: () => (
    <div className="space-y-8 bg-pb-black p-8 rounded-lg max-w-4xl">
      <AdvancedTypography 
        variant="hero-gradient" 
        highlight={['Transform', 'Operations']}
        as="h1"
      >
        Transform Your Operations with Product Box
      </AdvancedTypography>
      
      <AdvancedTypography 
        variant="featured-text" 
        highlight={['vision', 'reality']}
        as="p"
      >
        From vision to reality, we build the software that powers your business growth and operational excellence.
      </AdvancedTypography>
      
      <style>{`
        .highlight-0 {
          background: linear-gradient(135deg, #FF6B35, #FF8A65);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
        }
        .highlight-1 {
          background: linear-gradient(135deg, #00D9FF, #26C6DA);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
        }
      `}</style>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
}

export const TextBlockComponent: Story = {
  render: () => (
    <div className="space-y-12 max-w-4xl">
      <TextBlock
        eyebrow="Our Services"
        title="Three-Phase Approach"
        subtitle="Vision. Mobilise. Support."
        body="We transform your operational challenges into competitive advantages through our proven three-phase methodology."
        cta={<EnhancedButton variant="primary">Learn More</EnhancedButton>}
        alignment="center"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <TextBlock
          eyebrow="Phase 1"
          title="Vision"
          body="Strategic planning and technical architecture to align your technology with business objectives."
          spacing="tight"
        />
        
        <TextBlock
          eyebrow="Phase 2"
          title="Mobilise"
          body="Rapid development and deployment using proven methodologies and cutting-edge technologies."
          spacing="tight"
        />
        
        <TextBlock
          eyebrow="Phase 3"
          title="Support"
          body="Ongoing optimization and scaling to ensure your systems grow with your business."
          spacing="tight"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
    },
  },
}

export const QuoteBlockComponent: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <QuoteBlock
        quote="We were just three founders with a climate-focused idea struggling to turn our vision into reality. Product Box didn't just build our platform – they became our operational backbone."
        author="Sarah Mitchell"
        role="CEO & Co-founder"
        company="Carbon Compared"
        size="lg"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuoteBlock
          quote="Their three-phase approach perfectly mirrors how we help startups scale. They're not just developers; they're growth partners."
          author="James Rodriguez"
          role="Managing Partner"
          company="Vision Pitch"
          size="md"
        />
        
        <QuoteBlock
          quote="They built our entire workflow management system in 6 weeks, complete with automated processes that saved us 40+ hours per week."
          author="Alex Chen"
          role="Operations Director"
          company="Digs"
          size="md"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
    },
  },
}

export const StatBlockComponent: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
      <StatBlock
        value="500+"
        label="Companies"
        description="Trust Product Box"
        trend="up"
        trendValue="+12% this month"
      />
      
      <StatBlock
        value="40hrs"
        label="Time Saved"
        description="Per week average"
        trend="up"
        trendValue="+25% efficiency"
      />
      
      <StatBlock
        value="6 weeks"
        label="Average Build"
        description="From concept to launch"
        trend="neutral"
        trendValue="Industry leading"
      />
      
      <StatBlock
        value="99.9%"
        label="Uptime"
        description="System reliability"
        trend="up"
        trendValue="SLA guaranteed"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
    },
  },
}

export const HeroSection: Story = {
  render: () => (
    <div className="relative min-h-screen">
      <AnimatedGradientBackground variant="hero" intensity="medium">
        <GeometricPatterns variant="dots" intensity="low" color="white" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
          <AdvancedTypography 
            variant="eyebrow" 
            as="span"
            animate
            className="mb-6"
          >
            Product Box Solutions
          </AdvancedTypography>
          
          <AdvancedTypography 
            variant="hero-xl" 
            as="h1"
            animate
            maxWidth="2xl"
            className="mb-8"
          >
            Build. Scale. Succeed.
          </AdvancedTypography>
          
          <AdvancedTypography 
            variant="featured-text" 
            as="p"
            animate
            maxWidth="xl"
            className="mb-12"
          >
            Transform your operational challenges into competitive advantages through custom software solutions
          </AdvancedTypography>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <EnhancedButton variant="electric" size="lg">
              Start Your Project
            </EnhancedButton>
            <EnhancedButton variant="tertiary" size="lg">
              View Case Studies
            </EnhancedButton>
          </div>
        </div>
      </AnimatedGradientBackground>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

export const ContentSection: Story = {
  render: () => (
    <div className="relative py-24 px-6">
      <GeometricPatterns variant="hexagons" intensity="low" color="accent" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <AdvancedTypography variant="eyebrow" as="span" className="mb-4 block">
            Client Success Stories
          </AdvancedTypography>
          
          <AdvancedTypography variant="section-title" as="h2" className="mb-6">
            Trusted by Industry Leaders
          </AdvancedTypography>
          
          <AdvancedTypography variant="featured-text" as="p" maxWidth="2xl" className="mx-auto">
            See how we've helped companies transform their operations and achieve remarkable growth
          </AdvancedTypography>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <QuoteBlock
            quote="Finding the right technical partner felt impossible until we discovered Product Box. Their ability to understand complex business operations and translate them into elegant software solutions is unmatched."
            author="Maria Gonzalez"
            role="CTO"
            company="Digs"
            size="lg"
          />
          
          <div className="grid grid-cols-2 gap-6">
            <StatBlock
              value="12"
              label="Portfolio Companies"
              description="Built by Product Box"
            />
            
            <StatBlock
              value="40+"
              label="Hours Saved"
              description="Per week average"
            />
            
            <StatBlock
              value="500+"
              label="Companies"
              description="Now using our solutions"
            />
            
            <StatBlock
              value="6 weeks"
              label="Average Build"
              description="From start to finish"
            />
          </div>
        </div>
        
        <TextBlock
          eyebrow="Ready to Transform?"
          title="Let's Build Something Amazing Together"
          subtitle="From vision to reality, we're your operational excellence partner"
          cta={
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton variant="primary" size="lg">
                Get Free Consultation
              </EnhancedButton>
              <EnhancedButton variant="tertiary" size="lg">
                View Our Process
              </EnhancedButton>
            </div>
          }
          alignment="center"
          spacing="relaxed"
        />
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