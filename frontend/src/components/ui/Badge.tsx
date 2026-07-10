import '../../styles/ui/badge.css'

interface BadgeProps {
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral' | 'white'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  )
}
