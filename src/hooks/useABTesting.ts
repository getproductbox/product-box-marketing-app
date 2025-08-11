// A/B Testing React Hook
// Phase 5: Analytics, Testing & Launch Optimization
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useCallback } from 'react'
import { abTesting, analytics } from '../utils/analytics'

interface ABTestConfig {
  id: string
  name: string
  description?: string
  variants: readonly ABVariant[]
  targetingRules?: TargetingRule[]
  enabled?: boolean
}

interface ABVariant {
  readonly id: string
  readonly name: string
  readonly weight: number
  component?: React.ComponentType<any>
  props?: Record<string, any>
}

interface TargetingRule {
  type: 'url' | 'referrer' | 'device' | 'custom'
  condition: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'matches'
  value: string
}

interface UseABTestingReturn {
  variant: string | null
  isVariant: (variantId: string) => boolean
  trackConversion: (goalId: string, value?: number) => void
  Component: React.ComponentType<any> | null
  isLoading: boolean
}

export function useABTesting(testConfig: ABTestConfig): UseABTestingReturn {
  const [variant, setVariant] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [component, setComponent] = useState<React.ComponentType<any> | null>(null)

  useEffect(() => {
    if (!testConfig.enabled) {
      setIsLoading(false)
      return
    }

    // Check targeting rules
    if (testConfig.targetingRules && !checkTargetingRules(testConfig.targetingRules)) {
      setIsLoading(false)
      return
    }

    // Define the test in the framework
    abTesting.defineTest({
      id: testConfig.id,
      name: testConfig.name,
      description: testConfig.description,
      variants: testConfig.variants.map(v => ({
        id: v.id,
        name: v.name,
        weight: v.weight
      }))
    })

    // Get the assigned variant
    const assignedVariant = abTesting.getVariant(testConfig.id)
    setVariant(assignedVariant)

    // Find the variant config and set component
    if (assignedVariant) {
      const variantConfig = testConfig.variants.find(v => v.id === assignedVariant)
      if (variantConfig?.component) {
        setComponent(() => variantConfig.component!)
      }
    }

    setIsLoading(false)
  }, [testConfig])

  const isVariant = useCallback((variantId: string): boolean => {
    return variant === variantId
  }, [variant])

  const trackConversion = useCallback((goalId: string, value?: number) => {
    if (!variant) return

    analytics.track('ab_test_conversion', {
      testId: testConfig.id,
      testName: testConfig.name,
      variant,
      goalId,
      value: value || 0,
      timestamp: Date.now()
    })
  }, [variant, testConfig.id, testConfig.name])

  return {
    variant,
    isVariant,
    trackConversion,
    Component: component,
    isLoading
  }
}

function checkTargetingRules(rules: TargetingRule[]): boolean {
  if (typeof window === 'undefined') return true

  return rules.every(rule => {
    let targetValue = ''
    
    switch (rule.type) {
      case 'url':
        targetValue = window.location.href
        break
      case 'referrer':
        targetValue = document.referrer
        break
      case 'device':
        targetValue = navigator.userAgent
        break
      default:
        return true
    }

    switch (rule.condition) {
      case 'contains':
        return targetValue.includes(rule.value)
      case 'equals':
        return targetValue === rule.value
      case 'startsWith':
        return targetValue.startsWith(rule.value)
      case 'endsWith':
        return targetValue.endsWith(rule.value)
      case 'matches':
        return new RegExp(rule.value).test(targetValue)
      default:
        return true
    }
  })
}

// Predefined A/B Tests for Product Box
export const AB_TESTS = {
  HERO_CTA_BUTTON: {
    id: 'hero_cta_button',
    name: 'Hero CTA Button Text',
    description: 'Test different CTA button text on hero section',
    enabled: true,
    variants: [
      { 
        id: 'control', 
        name: 'Get My Operational Assessment', 
        weight: 0.5 
      },
      { 
        id: 'variant_a', 
        name: 'Transform My Operations', 
        weight: 0.25 
      },
      { 
        id: 'variant_b', 
        name: 'Start My Growth Journey', 
        weight: 0.25 
      }
    ]
  },
  
  HERO_HEADLINE: {
    id: 'hero_headline',
    name: 'Hero Headline',
    description: 'Test different hero headlines',
    enabled: true,
    variants: [
      {
        id: 'control',
        name: 'Transform your operations from chaos to competitive advantage',
        weight: 0.5
      },
      {
        id: 'variant_a',
        name: 'Turn operational chaos into your competitive edge',
        weight: 0.25
      },
      {
        id: 'variant_b',
        name: 'Scale without the growing pains',
        weight: 0.25
      }
    ]
  },

  TESTIMONIAL_LAYOUT: {
    id: 'testimonial_layout',
    name: 'Testimonial Section Layout',
    description: 'Test different layouts for testimonials',
    enabled: true,
    variants: [
      {
        id: 'control',
        name: 'Grid Layout',
        weight: 0.5
      },
      {
        id: 'variant_a',
        name: 'Carousel Layout',
        weight: 0.5
      }
    ]
  },

  CONTACT_FORM_STYLE: {
    id: 'contact_form_style',
    name: 'Contact Form Style',
    description: 'Test different contact form presentations',
    enabled: true,
    variants: [
      {
        id: 'control',
        name: 'Standard Form',
        weight: 0.5
      },
      {
        id: 'variant_a',
        name: 'Progressive Form',
        weight: 0.5
      }
    ]
  }
} as const

// Hook for feature flags (simpler version of A/B testing)
export function useFeatureFlag(flagName: string, defaultValue: boolean = false): boolean {
  const [isEnabled, setIsEnabled] = useState(defaultValue)

  useEffect(() => {
    // In a real implementation, this would fetch from a feature flag service
    // For now, use localStorage for development/testing
    const stored = localStorage.getItem(`feature_flag_${flagName}`)
    if (stored !== null) {
      setIsEnabled(JSON.parse(stored))
    }
  }, [flagName])

  return isEnabled
}

// Utility function to enable/disable feature flags (for testing)
export function setFeatureFlag(flagName: string, enabled: boolean): void {
  localStorage.setItem(`feature_flag_${flagName}`, JSON.stringify(enabled))
  
  // Trigger analytics event
  analytics.track('feature_flag_changed', {
    flagName,
    enabled,
    timestamp: Date.now()
  })
}

// Component wrapper for A/B testing
export function ABTestWrapper({ 
  testId, 
  children 
}: { 
  testId: keyof typeof AB_TESTS
  children: (variant: string | null, isLoading: boolean) => React.ReactNode 
}) {
  const { variant, isLoading } = useABTesting(AB_TESTS[testId])
  
  return children(variant, isLoading) as React.ReactElement
}

// Higher-order component for A/B testing
export function withABTest<P extends object>(
  Component: React.ComponentType<P>,
  testConfig: ABTestConfig,
  variantProps: Record<string, Partial<P>> = {}
) {
  return function ABTestComponent(props: P) {
    const { variant, isLoading } = useABTesting(testConfig)
    
    if (isLoading) {
      return null // Or a loading component
    }
    
    if (!variant) {
      return React.createElement(Component, props)
    }
    
    const variantSpecificProps = variantProps[variant] || {}
    
    return React.createElement(Component, { ...props, ...variantSpecificProps })
  }
}