import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Navbar() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '--'

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo-mark small">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="10" fill="#0f1724" />
            <path d="M10 32L24 14L38 32H10Z" fill="#c9a03c" opacity="0.9" />
            <rect x="19" y="26" width="10" height="10" rx="2" fill="#0f1724" />
          </svg>
          <span className="logo-text">Arrenda<strong>Ki</strong></span>
        </Link>
        <div className="nav-links">
          <NavLink to="/explorar" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Explorar
          </NavLink>
          <NavLink to="/mapa" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Mapa
          </NavLink>
          <NavLink to="/intermediarios" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Intermediários
          </NavLink>
          <NavLink to="/como-funciona" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Como Funciona
          </NavLink>
        </div>
      </div>
      <div className="nav-right">
        <Link to="/explorar" className="btn-search" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          Pesquisar
        </Link>
        {isAuthenticated ? (
          <div className="user-avatar" onClick={() => navigate('/dashboard')} title="Painel">
            <span>{initials}</span>
          </div>
        ) : (
          <Link to="/login" className="btn-outline" style={{ color: 'var(--primary)', borderColor: 'var(--border)', fontSize: '0.85rem', padding: '8px 16px' }}>
            Entrar
          </Link>
        )}
      </div>
    </nav>
  )
}
