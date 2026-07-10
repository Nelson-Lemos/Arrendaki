interface AvatarProps {
  src?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  onClick?: () => void
}

const sizeMap = {
  sm: { size: 28, font: '0.7rem' },
  md: { size: 36, font: '0.85rem' },
  lg: { size: 48, font: '1rem' },
  xl: { size: 64, font: '1.3rem' },
}

export function Avatar({ src, name, size = 'md', className = '', onClick }: AvatarProps) {
  const dims = sizeMap[size]
  const initials = name
    ? name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        className={`avatar-img ${className}`}
        style={{ width: dims.size, height: dims.size, borderRadius: '50%', objectFit: 'cover' }}
        onClick={onClick}
      />
    )
  }

  return (
    <div
      className={`avatar-fallback ${className}`}
      style={{
        width: dims.size,
        height: dims.size,
        borderRadius: '50%',
        background: 'var(--primary)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: dims.font,
        fontWeight: 700,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'var(--transition)',
      }}
      onClick={onClick}
    >
      {initials}
    </div>
  )
}
