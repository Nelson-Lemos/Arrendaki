import type { Property } from '../types'

interface PropertyModalProps {
  property: Property
  onClose: () => void
  onContactDirect: (id: number) => void
  onContactBroker: (id: number) => void
  onVideo: () => void
}

function formatKz(val: number): string {
  return val.toLocaleString('pt-AO') + ' Kz'
}

export function PropertyModal({ property: p, onClose, onContactDirect, onContactBroker, onVideo }: PropertyModalProps) {
  const amenityList: [string, string][] = [
    ['piscina', '🏊 Piscina'], ['garagem', '🚗 Garagem'], ['condominio', '🔒 Condomínio Fechado'],
    ['mobilado', '🛋 Mobilado'], ['jardim', '🌿 Jardim'], ['ar_cond', '❄️ Ar Condicionado'],
    ['gerador', '⚡ Gerador'], ['cisterna', '💧 Cisterna'],
  ]

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-panel">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="detail-gallery">
          <div
            className="detail-gallery-bg"
            id="detailGallery"
            style={{
              backgroundColor: p.color,
              backgroundImage: `linear-gradient(135deg,${p.color} 0%,#00000040 100%)`,
            }}
          >
            <div style={{
              width: '100%', height: '100%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', opacity: 0.12, fontSize: '8rem'
            }}>
              🏠
            </div>
          </div>
          {p.has_video && (
            <button className="detail-video-btn" onClick={onVideo} title="Ver vídeo">▶</button>
          )}
          <div className="gallery-nav">
            {(p.images || []).map((_img, i) => (
              <div key={i} className={`gn-dot ${i === 0 ? 'active' : ''}`} />
            ))}
          </div>
        </div>
        <div className="detail-body">
          <div className="detail-top">
            <div>
              <div className="detail-title">{p.title}</div>
              <div style={{ color: 'var(--gray-400)', fontSize: '0.88rem', marginTop: 4 }}>
                📍 {p.location}, {p.municipio}
              </div>
            </div>
            <div className="detail-price">
              <div className="detail-price-val">{formatKz(p.price)}</div>
              <div className="detail-price-period">
                por mês{p.negotiable && <span style={{ color: 'var(--green)' }}> · Negociável</span>}
              </div>
            </div>
          </div>

          <div className="detail-tags">
            <span className="detail-tag">🏷 {p.type}</span>
            {p.beds > 0 && <span className="detail-tag">🛏 {p.beds} quartos</span>}
            <span className="detail-tag">🚿 {p.baths} casas de banho</span>
            <span className="detail-tag">📐 {p.area} m²</span>
            {p.featured && <span className="detail-tag" style={{ background: '#fffdf4', borderColor: 'var(--gold)', color: 'var(--navy)' }}>⭐ Destaque</span>}
            {p.is_new && <span className="detail-tag" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>🆕 Novo</span>}
          </div>

          <div className="detail-info-grid">
            <div className="info-item"><div className="info-val">{p.beds || '—'}</div><div className="info-label">Quartos</div></div>
            <div className="info-item"><div className="info-val">{p.baths}</div><div className="info-label">Casas de banho</div></div>
            <div className="info-item"><div className="info-val">{p.area}</div><div className="info-label">Área (m²)</div></div>
            <div className="info-item"><div className="info-val">{Math.round(p.price / p.area).toLocaleString()}</div><div className="info-label">Kz/m²</div></div>
          </div>

          <div className="detail-section">
            <h4>Descrição</h4>
            <p>{p.desc}</p>
          </div>

          <div className="detail-section">
            <h4>Comodidades</h4>
            <div className="detail-amenities">
              {amenityList.map(([key, label]) => (
                <span key={key} className={`amenity ${(p.amenities as any)?.[key] ? 'yes' : 'no'}`}>
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="detail-actions">
            <button className="btn-contact-direct" onClick={() => onContactDirect(p.id)}>
              📞 Contactar Proprietário
            </button>
            <button className="btn-contact-broker" onClick={() => onContactBroker(p.id)}>
              🤝 Contratar Intermediário
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
