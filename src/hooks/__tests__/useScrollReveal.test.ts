import { renderHook, waitFor, act } from '@testing-library/react'
import { useScrollReveal } from '../useScrollReveal'
import { vi } from 'vitest'

describe('useScrollReveal', () => {
  let mockIntersectionObserver: ReturnType<typeof vi.fn>
  let observeMock: ReturnType<typeof vi.fn>
  let unobserveMock: ReturnType<typeof vi.fn>
  let disconnectMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    observeMock = vi.fn()
    unobserveMock = vi.fn()
    disconnectMock = vi.fn()

    mockIntersectionObserver = vi.fn().mockImplementation((callback) => ({
      observe: observeMock,
      unobserve: unobserveMock,
      disconnect: disconnectMock,
      root: null,
      rootMargin: '',
      thresholds: [],
      takeRecords: () => [],
    }))

    window.IntersectionObserver = mockIntersectionObserver as any

    // Mock matchMedia for all tests (default: no reduced motion)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should detect when element enters viewport', async () => {
    const mockRef = { current: document.createElement('div') }
    const { result } = renderHook(() => useScrollReveal(mockRef))

    // Initially should not be visible
    expect(result.current.isVisible).toBe(false)

    // Simulate IntersectionObserver callback
    const [callback] = mockIntersectionObserver.mock.calls[0]

    act(() => {
      callback([{ isIntersecting: true, target: mockRef.current }])
    })

    // Should be visible after entering viewport
    await waitFor(() => {
      expect(result.current.isVisible).toBe(true)
    })
  })

  it('should respect reduced motion preference', () => {
    // Mock matchMedia to return prefers-reduced-motion: reduce
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
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

  it('should only trigger once by default', async () => {
    const mockRef = { current: document.createElement('div') }
    const { result } = renderHook(() => useScrollReveal(mockRef))

    const [callback] = mockIntersectionObserver.mock.calls[0]

    // First intersection
    act(() => {
      callback([{ isIntersecting: true, target: mockRef.current }])
    })

    await waitFor(() => {
      expect(result.current.isVisible).toBe(true)
    })

    // Element leaves viewport
    act(() => {
      callback([{ isIntersecting: false, target: mockRef.current }])
    })

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
