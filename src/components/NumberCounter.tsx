interface NumberCounterProps {
  end: number
  duration?: number
  suffix?: string
}

export function NumberCounter({ end, suffix = '' }: NumberCounterProps) {
  return <span>{end}{suffix}</span>
}