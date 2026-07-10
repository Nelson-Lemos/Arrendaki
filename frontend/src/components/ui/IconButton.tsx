interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  label: string
  children: React.ReactNode
}

const sizeMap = {
  sm: { size: 32, icon: '1rem' },
  md: { size: 40, icon: '1.2rem' },
  lg: { size: 48, icon: '1.4rem' },
}

const variantStyles = {
  primary: { bg: 'var(--primary)', color: '#fff', hover: 'var(--primary-hover)' },
  accent: { bg: 'var(--accent)', color: '#fff', hover: 'var(--accent-hover)' },
  outline: { bg: 'transparent', color: 'var(--text-secondary)', hover: 'var(--surface-hover)', border: '1.5px solid var(--border)' },
  ghost: { bg: 'transparent', color: 'var(--text-secondary)', hover: 'var(--surface-hover)' },
}

export function IconButton({
  variant = 'ghost',
  size = 'md',
  label,
  children,
  className = '',
  style,
  ...props
}: IconButtonProps) {
  const dims = sizeMap[size]
  const v = variantStyles[variant]

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`icon-btn ${className}`}
      style={{
        width: dims.size,
        height: dims.size,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: v.bg,
        color: v.color,
        border: 'border' in v ? (v as any).border : 'none',
        cursor: 'pointer',
        fontSize: dims.icon,
        transition: 'var(--transition)',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = v.hover }}
      onMouseLeave={(e) => { e.currentTarget.style.background = v.bg }}
      {...props}
    >
      {children}
    </button>
  )
}
