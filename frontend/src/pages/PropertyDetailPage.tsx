import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProperties } from '../hooks/useProperties'
import { ContactModal } from '../components/ContactModal'
import { useToast } from '../hooks/useToast'
import type { Property } from '../types'
import '../styles/pages/property-detail.css'

function formatKz(val: number): string {
  return val.toLocaleString('pt-AO') + ' Kz'
}

export function PropertyDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { properties } = useProperties()
  const { toasts, showToast } = useToast()
  const [property, setProperty] = useState<Property | null>(null)
  const [contactType, setContactType] = useState<string | null>(null)

  useEffect(() => {
    if (id && properties.length > 0) {
      const p = properties.find(x => x.id === Number(id))
      setProperty(p || null)
    }
  }, [id, properties])

  if (!property) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--text-muted)' }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p style={{ marginTop: '1rem' }}>Imóvel não encontrado</p>
        <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/explorar')}>
          Voltar para explorar
        </button>
      </div>
    )
  }

  const p = property

  const amenityList: [string, string][] = [
    ['piscina', 'Piscina', 'pool'], ['garagem', 'Garagem', 'car'],
    ['condominio', 'Condomínio Fechado', 'shield'],
    ['mobilado', 'Mobilado', 'sofa'],
    ['jardim', 'Jardim', 'tree'],
    ['ar_cond', 'Ar Condicionado', 'wind'],
    ['gerador', 'Gerador', 'zap'],
    ['cisterna', 'Cisterna', 'droplet'],
  ]

  const renderAmenityIcon = (icon: string) => {
    const icons: Record<string, JSX.Element> = {
      pool: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="10" x2="16" y2="10"/></svg>,
      car: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 14h4l2 3h6l2-3h4"/><rect x="2" y="9" width="20" height="5" rx="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>,
      shield: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      sofa: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 14h16v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5z"/><path d="M2 9h4v5H2zM18 9h4v5h-4z"/><path d="M6 9V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4"/></svg>,
      tree: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22v-8m0 0l-4-4m4 4l4-4m-4 4V2"/></svg>,
      wind: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>,
      zap: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
      droplet: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
    }
    return icons[icon] || null
  }

  return (
    <div className="property-detail-page">
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '1rem 2rem 0' }}>
        <button className="detail-back" onClick={() => navigate(-1)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
      </div>

      <div className="detail-gallery">
        <div
          className="detail-gallery-bg"
          style={{
            backgroundImage: p.image_url
              ? `url(${p.image_url})`
              : `linear-gradient(135deg, ${p.color} 0%, #00000040 100%)`,
          }}
        />
        {p.has_video && (
          <button className="detail-video-btn" onClick={() => setContactType('video')} title="Ver vídeo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          </button>
        )}
        <div className="gallery-nav">
          {[1].map((_img, i) => (
            <button key={i} className={`gn-dot ${i === 0 ? 'active' : ''}`} />
          ))}
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-top">
          <div>
            <div className="detail-title">{p.title}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {p.location}, {p.municipio}
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
          <span className="detail-tag">{p.type}</span>
          {p.beds > 0 && <span className="detail-tag">{p.beds} quartos</span>}
          <span className="detail-tag">{p.baths} casas de banho</span>
          <span className="detail-tag">{p.area} m²</span>
          {p.featured && <span className="detail-tag" style={{ background: 'rgba(201, 160, 60, 0.1)', borderColor: 'var(--accent)', color: 'var(--primary)' }}>Destaque</span>}
          {p.is_new && <span className="detail-tag" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>Novo</span>}
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
            {amenityList.map(([key, label, icon]) => (
              <span key={key} className={`amenity ${(p.amenities as any)?.[key] ? 'yes' : 'no'}`}>
                {(p.amenities as any)?.[key] ? renderAmenityIcon(icon) : null}
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="detail-actions">
          <button className="btn-contact-direct" onClick={() => setContactType('direct')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Contactar Proprietário
          </button>
          <button className="btn-contact-broker" onClick={() => setContactType('broker')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Contratar Intermediário
          </button>
        </div>
      </div>

      {contactType && (
        <ContactModal
          type={contactType as any}
          onClose={() => setContactType(null)}
          onSend={() => { setContactType(null); showToast('Mensagem enviada!', 'success') }}
        />
      )}

      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map(t => (
            <div key={t.id} className={`toast ${t.type || ''}`}>{t.message}</div>
          ))}
        </div>
      )}
    </div>
  )
}
