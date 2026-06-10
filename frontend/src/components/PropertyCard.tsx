import type { Property } from '../types'

interface PropertyCardProps {
  property: Property
  isFav: boolean
  onToggleFav: (e: React.MouseEvent, id: number) => void
  onClick: (id: number) => void
}

function formatKz(val: number): string {
  return val.toLocaleString('pt-AO') + ' Kz'
}

export function PropertyCard({ property: p, isFav, onToggleFav, onClick }: PropertyCardProps) {
  return (
    <div
      className={`property-card ${p.featured ? 'featured' : ''}`}
      onClick={() => onClick(p.id)}
    >
      <div className="card-img">
        <div
          className="card-img-bg"
          style={{
            backgroundColor: p.color,
            backgroundImage: `linear-gradient(135deg, ${p.color} 0%, #00000030 100%)`,
          }}
        >
          <div style={{
            width: '100%', height: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', opacity: 0.15, fontSize: '5rem'
          }}>
            🏠
          </div>
        </div>
        <div className="card-badges">
          {p.featured && <span className="badge badge-featured">⭐ Destaque</span>}
          {p.is_new && <span className="badge badge-new">Novo</span>}
          {p.has_video && <span className="badge badge-video">▶ Vídeo</span>}
          {p.mode === 'direct'
            ? <span className="badge badge-direct">Directo</span>
            : <span className="badge badge-brokered">Intermediário</span>}
        </div>
        <button
          className={`card-fav ${isFav ? 'faved' : ''}`}
          onClick={e => onToggleFav(e, p.id)}
          title="Favorito"
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="card-body">
        <div className="card-location">📍 {p.location}, {p.municipio}</div>
        <div className="card-title">{p.title}</div>
        <div className="card-price">
          {formatKz(p.price)} <small>/ mês</small>
          {p.negotiable && <span style={{ fontSize: '0.72rem', color: 'var(--green)', fontWeight: 600 }}> Negociável</span>}
        </div>
        <div className="card-meta">
          {p.beds > 0 && <span>🛏 {p.beds} quarto{p.beds > 1 ? 's' : ''}</span>}
          <span>🚿 {p.baths} casa{p.baths > 1 ? 's' : ''} de banho</span>
          <span>📐 {p.area} m²</span>
        </div>
      </div>
    </div>
  )
}
