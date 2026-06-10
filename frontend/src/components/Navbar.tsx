import { useAuth } from '../context/AuthContext'

interface NavbarProps {
  activeView: string
  onViewChange: (view: string) => void
  onRegister: () => void
  onDashboard: () => void
  onNotifications: () => void
}

export function Navbar({ activeView, onViewChange, onRegister, onDashboard, onNotifications }: NavbarProps) {
  const { user, isAuthenticated } = useAuth()
  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '--'

  const views = [
    { id: 'browse', label: 'Explorar' },
    { id: 'map', label: 'Mapa' },
    { id: 'brokers', label: 'Intermediários' },
    { id: 'howItWorks', label: 'Como Funciona' },
  ]

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-mark small" onClick={() => onViewChange('browse')}>
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="10" fill="#1a1a2e" />
            <path d="M10 32L24 14L38 32H10Z" fill="#e8c56d" opacity="0.9" />
            <rect x="19" y="26" width="10" height="10" rx="2" fill="#1a1a2e" />
          </svg>
          <span className="logo-text">Arrenda<strong>Ki</strong></span>
        </div>
        <div className="nav-links">
          {views.map(v => (
            <a
              key={v.id}
              href="#"
              className={`nav-link ${activeView === v.id ? 'active' : ''}`}
              onClick={e => { e.preventDefault(); onViewChange(v.id) }}
            >
              {v.label}
            </a>
          ))}
        </div>
      </div>
      <div className="nav-right">
        <button className="btn-notify" onClick={onNotifications}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="notify-dot" />
        </button>
        <div
          className="user-avatar"
          onClick={isAuthenticated ? onDashboard : onRegister}
        >
          <span>{initials}</span>
        </div>
      </div>
    </nav>
  )
}
