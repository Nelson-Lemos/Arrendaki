import '../../styles/ui/card.css'

interface CardProps {
  children: React.ReactNode
  className?: string
  elevated?: boolean
  clickable?: boolean
  onClick?: (e: React.MouseEvent) => void
  as?: 'div' | 'article' | 'section'
}

export function Card({
  children,
  className = '',
  elevated = false,
  clickable = false,
  onClick,
  as: Tag = 'div',
}: CardProps) {
  const classes = [
    'card',
    elevated ? 'card-elevated' : '',
    clickable ? 'card-clickable' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <Tag className={classes} onClick={onClick} role={clickable ? 'button' : undefined} tabIndex={clickable ? 0 : undefined}>
      {children}
    </Tag>
  )
}

export function CardImage({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) {
  return <img src={src} alt={alt} className={`card-image ${className}`} loading="lazy" />
}

export function CardBody({ children, compact = false, className = '' }: { children: React.ReactNode; compact?: boolean; className?: string }) {
  return <div className={`card-body${compact ? '-compact' : ''} ${className}`}>{children}</div>
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`card-footer ${className}`}>{children}</div>
}
