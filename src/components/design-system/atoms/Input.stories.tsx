import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'
import { Mail, Search, User, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

const meta = {
  title: 'Design System/Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with support for labels, validation, icons, and different variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled'],
      description: 'Visual style variant',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'search', 'tel', 'url'],
      description: 'Input type',
    },
    isRequired: {
      control: { type: 'boolean' },
      description: 'Shows required asterisk',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the input',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
  parameters: {
    layout: 'padded',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
  parameters: {
    layout: 'padded',
  },
}

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    isRequired: true,
  },
  parameters: {
    layout: 'padded',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
  parameters: {
    layout: 'padded',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters long',
  },
  parameters: {
    layout: 'padded',
  },
}

export const WithLeftIcon: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    leftIcon: <Mail />,
  },
  parameters: {
    layout: 'padded',
  },
}

export const WithRightIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for something...',
    type: 'search',
    rightIcon: <Search />,
  },
  parameters: {
    layout: 'padded',
  },
}

export const FilledVariant: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    variant: 'filled',
    leftIcon: <User />,
  },
  parameters: {
    layout: 'padded',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    value: 'Cannot edit this',
  },
  parameters: {
    layout: 'padded',
  },
}

export const PasswordToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false)
    
    return (
      <Input
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-pb-gray-400 hover:text-pb-white transition-colors"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        }
      />
    )
  },
  parameters: {
    layout: 'padded',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <Input
        label="Default Variant"
        placeholder="Default input"
        variant="default"
      />
      <Input
        label="Filled Variant"
        placeholder="Filled input"
        variant="filled"
      />
      <Input
        label="With Icons"
        placeholder="Email address"
        leftIcon={<Mail />}
        rightIcon={<Search />}
      />
      <Input
        label="Error State"
        placeholder="Invalid input"
        error="This field has an error"
        value="invalid"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}