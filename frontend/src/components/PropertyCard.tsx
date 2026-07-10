import type { Property } from '../types'

interface PropertyCardProps {
  property: Property
  isFav: boolean
  onToggleFav: (e: React.MouseEvent, id: number) => void
  onClick: (id: number) => void
  index?: number
  isCompare?: boolean
  onToggleCompare?: (id: number) => void
}

function formatKz(val: number): string {
  return val.toLocaleString('pt-AO') + ' Kz'
}

export function PropertyCard({ property: p, isFav, onToggleFav, onClick, index = 0, isCompare, onToggleCompare }: PropertyCardProps) {
  return (
    <div
      className={`property-card ${p.featured ? 'featured' : ''}`}
      style={{ animationDelay: `${index * 0.04}s` }}
      onClick={() => onClick(p.id)}
    >
      <div className="card-img">
        {p.image_url ? (
          <img
            src={p.image_url}
            alt={p.title}
            loading="lazy"
          />
        ) : (
          <div
            className="card-img-bg"
            style={{
              backgroundColor: p.color,
              backgroundImage: `linear-gradient(135deg, ${p.color} 0%, #00000030 100%)`,
            }}
          />
        )}
        <div className="card-badges">
          {p.featured && <span className="badge badge-featured">Destaque</span>}
          {p.is_new && <span className="badge badge-new">Novo</span>}
          {p.has_video && (
            <span className="badge badge-video">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              Vídeo
            </span>
          )}
          {p.mode === 'direct'
            ? <span className="badge badge-direct">Directo</span>
            : <span className="badge badge-brokered">Intermediário</span>}
        </div>
        <button
          className={`card-fav ${isFav ? 'faved' : ''}`}
          onClick={e => onToggleFav(e, p.id)}
          title="Favorito"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isFav ? '#e74c3c' : 'none'} stroke={isFav ? '#e74c3c' : 'currentColor'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        {onToggleCompare && (
          <button
            className={`card-compare ${isCompare ? 'comparing' : ''}`}
            onClick={e => { e.stopPropagation(); onToggleCompare(p.id) }}
            title="Comparar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          </button>
        )}
      </div>
      <div className="card-body">
        <div className="card-location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {p.location}, {p.municipio}
        </div>
        <div className="card-title">{p.title}</div>
        <div className="card-price">
          {formatKz(p.price)} <small>/ mês</small>
          {p.negotiable && <span style={{ fontSize: '0.72rem', color: 'var(--green)', fontWeight: 600 }}> Negociável</span>}
        </div>
        <div className="card-meta">
          {p.beds > 0 && (
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 14h4l2 3h6l2-3h4"/><rect x="2" y="9" width="20" height="5" rx="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
              {p.beds} quarto{p.beds > 1 ? 's' : ''}
            </span>
          )}
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 8h16M4 16h16"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
            {p.baths} casa{p.baths > 1 ? 's' : ''} de banho
          </span>
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            {p.area} m²
          </span>
        </div>
      </div>
    </div>
  )
}

export function PropertyCardList({ property: p, isFav, onToggleFav, onClick, index = 0, isCompare, onToggleCompare }: PropertyCardProps) {
  return (
    <div
      className="property-card-list"
      style={{ animationDelay: `${index * 0.04}s` }}
      onClick={() => onClick(p.id)}
    >
      <div className="pcl-img">
        {p.image_url ? (
          <img src={p.image_url} alt={p.title} loading="lazy" />
        ) : (
          <div className="card-img-bg" style={{ backgroundColor: p.color }} />
        )}
        <div className="card-badges">
          {p.featured && <span className="badge badge-featured">Destaque</span>}
          {p.is_new && <span className="badge badge-new">Novo</span>}
          {p.mode === 'direct'
            ? <span className="badge badge-direct">Directo</span>
            : <span className="badge badge-brokered">Intermediário</span>}
        </div>
      </div>
      <div className="pcl-body">
        <div className="card-location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {p.location}, {p.municipio}
        </div>
        <div className="card-title">{p.title}</div>
        <div className="card-price">
          {formatKz(p.price)} <small>/ mês</small>
          {p.negotiable && <span style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: 600 }}> Negociável</span>}
        </div>
        <div className="card-meta">
          {p.beds > 0 && <span>{p.beds} quarto{p.beds > 1 ? 's' : ''}</span>}
          <span>{p.baths} casa{p.baths > 1 ? 's' : ''} de banho</span>
          <span>{p.area} m²</span>
        </div>
      </div>
      <div className="pcl-fav">
        <button
          className={isFav ? 'faved' : ''}
          onClick={e => onToggleFav(e, p.id)}
          title="Favorito"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isFav ? '#dc2626' : 'none'} stroke={isFav ? '#dc2626' : 'currentColor'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        {onToggleCompare && (
          <button
            className={`card-compare ${isCompare ? 'comparing' : ''}`}
            onClick={e => { e.stopPropagation(); onToggleCompare(p.id) }}
            title="Comparar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          </button>
        )}
      </div>
    </div>
  )
}
