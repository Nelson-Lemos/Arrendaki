import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Avatar } from './ui/Avatar'
import { Button } from './ui/Button'

export function Navbar() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo-mark small">
          <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="12" fill="#2563EB" />
            <path d="M10 32L24 14L38 32H10Z" fill="#F97316" opacity="0.9" />
            <rect x="19" y="26" width="10" height="10" rx="3" fill="white" />
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
        <Link to="/explorar">
          <Button variant="ghost" size="sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            Pesquisar
          </Button>
        </Link>
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Button variant="ghost" size="sm" onClick={() => navigate('/mensagens')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Mensagens
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </Button>
            <Avatar name={user?.name} size="md" onClick={() => navigate('/perfil')} />
          </div>
        ) : (
          <Link to="/login">
            <Button variant="primary" size="sm">Entrar</Button>
          </Link>
        )}
      </div>
    </nav>
  )
}
