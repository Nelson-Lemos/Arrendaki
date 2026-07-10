import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProperties } from '../hooks/useProperties'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import '../styles/pages/profile.css'

const roleLabels: Record<string, string> = {
  tenant: 'Inquilino',
  owner: 'Proprietario',
  broker: 'Intermediario',
  company: 'Empresa',
}

export function ProfilePage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const { properties } = useProperties()
  const [tab, setTab] = useState<'properties' | 'favorites' | 'settings'>('properties')

  if (!isAuthenticated || !user) {
    navigate('/login')
    return null
  }

  const myProperties = properties.filter(p => p.owner_id === user.id)
  const savedSearches: string[] = []

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-cover" />
        <div className="profile-info">
          <Avatar name={user.name} size="xl" />
          <div className="profile-meta">
            <h1>{user.name}</h1>
            <div className="profile-badges">
              <Badge variant="primary">{roleLabels[user.role] || user.role}</Badge>
              {user.email && <Badge variant="neutral">{user.email}</Badge>}
            </div>
          </div>
          <div className="profile-actions">
            <Button variant="outline" size="sm" onClick={() => navigate('/explorar')}>
              Explorar imoveis
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/') }}>
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <span className="stat-value">{myProperties.length}</span>
          <span className="stat-label">Imoveis</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{savedSearches.length}</span>
          <span className="stat-label">Pesquisas guardadas</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{new Date(user.created_at || '').getFullYear() || 2026}</span>
          <span className="stat-label">Membro desde</span>
        </div>
      </div>

      <div className="profile-tabs">
        <button className={`tab ${tab === 'properties' ? 'active' : ''}`} onClick={() => setTab('properties')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          Meus Imoveis
        </button>
        <button className={`tab ${tab === 'favorites' ? 'active' : ''}`} onClick={() => setTab('favorites')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          Favoritos
        </button>
        <button className={`tab ${tab === 'settings' ? 'active' : ''}`} onClick={() => setTab('settings')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Definicoes
        </button>
      </div>

      <div className="profile-content">
        {tab === 'properties' && (
          <>
            {myProperties.length === 0 ? (
              <div className="profile-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
                <h3>Nenhum imovel anunciado</h3>
                <p>Comeca por publicar o teu primeiro imovel.</p>
                <Button variant="primary">Publicar Imovel</Button>
              </div>
            ) : (
              <div className="profile-grid">
                {myProperties.map(p => (
                  <Link key={p.id} to={`/imovel/${p.id}`} className="profile-property-card">
                    <div className="ppc-img" style={{
                      backgroundImage: p.image_url
                        ? `url(${p.image_url})`
                        : `linear-gradient(135deg, ${p.color}, #00000040)`,
                    }}>
                      {p.featured && <Badge variant="accent">Destaque</Badge>}
                    </div>
                    <div className="ppc-body">
                      <h4>{p.title}</h4>
                      <div className="ppc-price">{p.price.toLocaleString('pt-AO')} Kz/mes</div>
                      <div className="ppc-meta">
                        <span>{p.beds} qrt</span>
                        <span>{p.baths} WC</span>
                        <span>{p.area}m2</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'favorites' && (
          <div className="profile-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <h3>Sem favoritos ainda</h3>
            <p>Explora imoveis e adiciona aos favoritos para os encontrar rapidamente.</p>
            <Button variant="primary" onClick={() => navigate('/explorar')}>Explorar Imoveis</Button>
          </div>
        )}

        {tab === 'settings' && (
          <div className="profile-settings">
            <div className="settings-section">
              <h3>Informacao pessoal</h3>
              <div className="form-group">
                <label>Nome</label>
                <input type="text" className="form-control" defaultValue={user.name} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" defaultValue={user.email} />
              </div>
              <div className="form-group">
                <label>Telemovel</label>
                <input type="tel" className="form-control" placeholder="+244 XXX XXX XXX" />
              </div>
              <Button variant="primary" size="sm">Guardar alteracoes</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
