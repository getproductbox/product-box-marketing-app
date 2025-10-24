import { render } from '@testing-library/react'
import { Container } from '../Container'

describe('Container Component', () => {
  describe('Size Variants', () => {
    it('should render with wide size (max-w-6xl)', () => {
      const { container } = render(
        <Container size="wide">
          <p>Wide content</p>
        </Container>
      )
      const containerDiv = container.firstChild as HTMLElement
      expect(containerDiv).toHaveClass('max-w-6xl')
      expect(containerDiv).toHaveClass('mx-auto')
    })

    it('should render with default size (max-w-4xl)', () => {
      const { container } = render(
        <Container size="default">
          <p>Default content</p>
        </Container>
      )
      const containerDiv = container.firstChild as HTMLElement
      expect(containerDiv).toHaveClass('max-w-4xl')
      expect(containerDiv).toHaveClass('mx-auto')
    })

    it('should render with narrow size (max-w-2xl)', () => {
      const { container } = render(
        <Container size="narrow">
          <p>Narrow content</p>
        </Container>
      )
      const containerDiv = container.firstChild as HTMLElement
      expect(containerDiv).toHaveClass('max-w-2xl')
      expect(containerDiv).toHaveClass('mx-auto')
    })

    it('should use default size when size prop is omitted', () => {
      const { container } = render(
        <Container>
          <p>Content without size</p>
        </Container>
      )
      const containerDiv = container.firstChild as HTMLElement
      expect(containerDiv).toHaveClass('max-w-4xl')
    })
  })

  describe('Responsive Padding', () => {
    it('should apply responsive horizontal padding', () => {
      const { container } = render(
        <Container size="wide">
          <p>Content</p>
        </Container>
      )
      const containerDiv = container.firstChild as HTMLElement
      expect(containerDiv).toHaveClass('px-6')
      expect(containerDiv).toHaveClass('lg:px-8')
    })
  })

  describe('Children Rendering', () => {
    it('should render children correctly', () => {
      const { getByText } = render(
        <Container size="wide">
          <h1>Test Heading</h1>
          <p>Test paragraph</p>
        </Container>
      )
      expect(getByText('Test Heading')).toBeInTheDocument()
      expect(getByText('Test paragraph')).toBeInTheDocument()
    })

    it('should render multiple children', () => {
      const { container } = render(
        <Container size="default">
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Container>
      )
      const children = container.firstChild?.childNodes
      expect(children?.length).toBe(3)
    })
  })

  describe('Custom ClassName Support', () => {
    it('should merge custom className with default classes', () => {
      const { container } = render(
        <Container size="wide" className="custom-class bg-red-500">
          <p>Content</p>
        </Container>
      )
      const containerDiv = container.firstChild as HTMLElement
      expect(containerDiv).toHaveClass('max-w-6xl')
      expect(containerDiv).toHaveClass('custom-class')
      expect(containerDiv).toHaveClass('bg-red-500')
    })

    it('should work without custom className', () => {
      const { container } = render(
        <Container size="narrow">
          <p>Content</p>
        </Container>
      )
      const containerDiv = container.firstChild as HTMLElement
      expect(containerDiv).toHaveClass('max-w-2xl')
      expect(containerDiv).toHaveClass('mx-auto')
    })
  })

  describe('HTML Attributes', () => {
    it('should accept and apply id attribute', () => {
      const { container } = render(
        <Container size="wide" id="main-container">
          <p>Content</p>
        </Container>
      )
      const containerDiv = container.firstChild as HTMLElement
      expect(containerDiv).toHaveAttribute('id', 'main-container')
    })

    it('should accept and apply data attributes', () => {
      const { container } = render(
        <Container size="default" data-testid="custom-container">
          <p>Content</p>
        </Container>
      )
      const containerDiv = container.firstChild as HTMLElement
      expect(containerDiv).toHaveAttribute('data-testid', 'custom-container')
    })
  })

  describe('TypeScript Type Safety', () => {
    it('should only accept valid size values', () => {
      // This test validates TypeScript compilation
      // Invalid sizes should cause TypeScript errors at compile time
      const validSizes: Array<'wide' | 'default' | 'narrow'> = [
        'wide',
        'default',
        'narrow',
      ]

      validSizes.forEach((size) => {
        const { container } = render(
          <Container size={size}>
            <p>Content</p>
          </Container>
        )
        expect(container.firstChild).toBeInTheDocument()
      })
    })
  })
})
