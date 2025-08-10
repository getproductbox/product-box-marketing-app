import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography, Heading, Text, Label, Caption } from './Typography'

const meta = {
  title: 'Design System/Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive typography system with semantic variants, colors, and styling options. Includes convenience components for common use cases.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['hero', 'display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body-xl', 'body-lg', 'body', 'body-sm', 'body-xs', 'caption', 'label'],
      description: 'Typography variant',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'muted', 'accent', 'electric', 'success', 'warning', 'error'],
      description: 'Text color',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      description: 'Font weight',
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is the default typography',
  },
}

export const AllHeadings: Story = {
  render: () => (
    <div className="space-y-6 text-center">
      <Typography variant="hero">Hero Text</Typography>
      <Typography variant="display">Display Text</Typography>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const AllBodyText: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Typography variant="body-xl">
        Body XL - This is extra large body text for important content that needs more visual weight.
      </Typography>
      <Typography variant="body-lg">
        Body Large - This is large body text for content that should stand out but isn't a heading.
      </Typography>
      <Typography variant="body">
        Body - This is the default body text size for regular content. It provides good readability and is suitable for most text content on the website.
      </Typography>
      <Typography variant="body-sm">
        Body Small - This is small body text for secondary information or content that needs less visual prominence.
      </Typography>
      <Typography variant="body-xs">
        Body XS - This is extra small body text for fine print, captions, or minimal supporting text.
      </Typography>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const Colors: Story = {
  render: () => (
    <div className="space-y-3">
      <Typography color="primary">Primary color text (white)</Typography>
      <Typography color="secondary">Secondary color text (light gray)</Typography>
      <Typography color="muted">Muted color text (medium gray)</Typography>
      <Typography color="accent">Accent color text (orange)</Typography>
      <Typography color="electric">Electric color text (cyan)</Typography>
      <Typography color="success">Success color text (green)</Typography>
      <Typography color="warning">Warning color text (yellow)</Typography>
      <Typography color="error">Error color text (red)</Typography>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const Weights: Story = {
  render: () => (
    <div className="space-y-3">
      <Typography weight="normal">Normal weight text</Typography>
      <Typography weight="medium">Medium weight text</Typography>
      <Typography weight="semibold">Semibold weight text</Typography>
      <Typography weight="bold">Bold weight text</Typography>
      <Typography weight="extrabold">Extra bold weight text</Typography>
      <Typography weight="black">Black weight text</Typography>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const Alignments: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-2xl">
      <Typography align="left">Left aligned text - This text is aligned to the left side of its container.</Typography>
      <Typography align="center">Center aligned text - This text is centered within its container.</Typography>
      <Typography align="right">Right aligned text - This text is aligned to the right side of its container.</Typography>
      <Typography align="justify">Justified text - This text is justified, which means it stretches across the full width of its container with even spacing between words.</Typography>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const Modifiers: Story = {
  render: () => (
    <div className="space-y-3">
      <Typography>Regular text</Typography>
      <Typography italic>Italic text</Typography>
      <Typography underline>Underlined text</Typography>
      <Typography italic underline>Italic and underlined text</Typography>
      <div className="w-48">
        <Typography truncate>This is a very long text that will be truncated with an ellipsis</Typography>
      </div>
      <Typography noWrap>This text will not wrap to the next line no matter how long it gets</Typography>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const ConvenienceComponents: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <Heading level={1}>Heading Component Level 1</Heading>
        <Heading level={2}>Heading Component Level 2</Heading>
        <Heading level={3}>Heading Component Level 3</Heading>
      </div>
      
      <div className="space-y-3">
        <Text size="xl">Text Component Extra Large</Text>
        <Text size="lg">Text Component Large</Text>
        <Text size="base">Text Component Base</Text>
        <Text size="sm">Text Component Small</Text>
        <Text size="xs">Text Component Extra Small</Text>
      </div>
      
      <div className="space-y-2">
        <Label>Label Component</Label>
        <Caption>Caption Component</Caption>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const CustomElements: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography as="span" variant="h2" color="accent">
        H2 styling as a span element
      </Typography>
      <Typography as="div" variant="body" color="secondary">
        Body text as a div element
      </Typography>
      <Typography as="blockquote" variant="body-lg" italic color="muted">
        "This is a blockquote with custom styling"
      </Typography>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}