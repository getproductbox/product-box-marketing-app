import { renderHook } from '@testing-library/react'
import { useScrollReveal } from '../useScrollReveal'

describe('useScrollReveal', () => {
  let mockIntersectionObserver: jest.Mock
  let observeMock: jest.Mock
  let unobserveMock: jest.Mock
  let disconnectMock: jest.Mock

  beforeEach(() => {
    observeMock = jest.fn()
    unobserveMock = jest.fn()
    disconnectMock = jest.fn()

    mockIntersectionObserver = jest.fn().mockImplementation((callback) => ({
      observe: observeMock,
      unobserve: unobserveMock,
      disconnect: disconnectMock,
      root: null,
      rootMargin: '',
      thresholds: [],
      takeRecords: () => [],
    }))

    window.IntersectionObserver = mockIntersectionObserver as any
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should detect when element enters viewport', () => {
    const mockRef = { current: document.createElement('div') }
    const { result } = renderHook(() => useScrollReveal(mockRef))

    // Initially should not be visible
    expect(result.current.isVisible).toBe(false)

    // Simulate IntersectionObserver callback
    const [callback] = mockIntersectionObserver.mock.calls[0]
    callback([{ isIntersecting: true, target: mockRef.current }])

    // Should be visible after entering viewport
    expect(result.current.isVisible).toBe(true)
  })

  it('should respect reduced motion preference', () => {
    // Mock matchMedia to return prefers-reduced-motion: reduce
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    const mockRef = { current: document.createElement('div') }
    const { result } = renderHook(() => useScrollReveal(mockRef))

    // With reduced motion, should be immediately visible
    expect(result.current.isVisible).toBe(true)
  })

  it('should cleanup observer on unmount', () => {
    const mockRef = { current: document.createElement('div') }
    const { unmount } = renderHook(() => useScrollReveal(mockRef))

    expect(observeMock).toHaveBeenCalledWith(mockRef.current)

    unmount()

    expect(disconnectMock).toHaveBeenCalled()
  })

  it('should accept custom threshold configuration', () => {
    const mockRef = { current: document.createElement('div') }
    const customThreshold = 0.5

    renderHook(() => useScrollReveal(mockRef, { threshold: customThreshold }))

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ threshold: customThreshold })
    )
  })

  it('should only trigger once by default', () => {
    const mockRef = { current: document.createElement('div') }
    const { result } = renderHook(() => useScrollReveal(mockRef))

    const [callback] = mockIntersectionObserver.mock.calls[0]

    // First intersection
    callback([{ isIntersecting: true, target: mockRef.current }])
    expect(result.current.isVisible).toBe(true)

    // Element leaves viewport
    callback([{ isIntersecting: false, target: mockRef.current }])

    // Should still be visible (triggerOnce = true by default)
    expect(result.current.isVisible).toBe(true)
  })

  it('should handle null ref gracefully', () => {
    const mockRef = { current: null }
    const { result } = renderHook(() => useScrollReveal(mockRef))

    expect(result.current.isVisible).toBe(false)
    expect(observeMock).not.toHaveBeenCalled()
  })
})
