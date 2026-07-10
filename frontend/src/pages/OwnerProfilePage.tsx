import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProperties } from '../hooks/useProperties'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import '../styles/pages/profile.css'

export function OwnerProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { properties } = useProperties()

  const ownerProperties = properties.filter(p => String(p.owner_id) === id)
  const first = ownerProperties[0]
  const ownerName = first ? `Proprietario #${id}` : 'Proprietario nao encontrado'
  const ownerSince = first?.created_at || new Date().toISOString()

  if (ownerProperties.length === 0) {
    return (
      <div className="profile-page">
        <div className="profile-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
          </svg>
          <h3>Proprietario nao encontrado</h3>
          <p>Este utilizador nao possui imoveis listados ou nao existe.</p>
          <Button variant="primary" onClick={() => navigate('/explorar')}>Explorar Imoveis</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-cover" />
        <div className="profile-info">
          <Avatar name={ownerName} size="xl" />
          <div className="profile-meta">
            <h1>{ownerName}</h1>
            <div className="profile-badges">
              <Badge variant="primary">Proprietario</Badge>
              <Badge variant="neutral">{ownerProperties.length} imoveis</Badge>
            </div>
          </div>
          <div className="profile-actions">
            <Button variant="primary" size="sm">Contactar</Button>
          </div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <span className="stat-value">{ownerProperties.length}</span>
          <span className="stat-label">Imoveis</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{new Date(ownerSince).getFullYear()}</span>
          <span className="stat-label">Membro desde</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{Math.min(...ownerProperties.map(p => p.price)).toLocaleString('pt-AO')} Kz</span>
          <span className="stat-label">Preco minimo</span>
        </div>
      </div>

      <h2 className="profile-section-title">Imoveis deste proprietario</h2>

      <div className="profile-grid">
        {ownerProperties.map(p => (
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
    </div>
  )
}
