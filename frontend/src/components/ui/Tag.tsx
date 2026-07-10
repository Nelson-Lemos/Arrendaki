interface TagProps {
  children: React.ReactNode
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral'
  onClick?: () => void
  className?: string
  active?: boolean
}

const variantStyles = {
  primary: { bg: 'var(--primary-light)', color: 'var(--primary)' },
  accent: { bg: 'var(--accent-light)', color: 'var(--accent)' },
  success: { bg: 'var(--success-light)', color: 'var(--success)' },
  warning: { bg: 'var(--warning-light)', color: '#92400E' },
  error: { bg: 'var(--error-light)', color: 'var(--error)' },
  neutral: { bg: 'var(--bg-warm)', color: 'var(--text-secondary)' },
}

export function Tag({ children, variant = 'neutral', onClick, className = '', active = false }: TagProps) {
  const v = variantStyles[variant]

  return (
    <button
      className={`tag ${active ? 'tag-active' : ''} ${className}`}
      onClick={onClick}
      style={{
        background: active ? v.color : v.bg,
        color: active ? '#fff' : v.color,
        border: 'none',
        borderRadius: '999px',
        padding: '6px 16px',
        fontSize: '0.8125rem',
        fontWeight: 500,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'var(--transition)',
        whiteSpace: 'nowrap',
      }}
      type="button"
    >
      {children}
    </button>
  )
}
