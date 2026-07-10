import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useProperties } from '../hooks/useProperties'
import { useFavorites } from '../context/FavoritesContext'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { setChatToken, createRoom } from '../services/chat'
import type { Property } from '../types'
import 'leaflet/dist/leaflet.css'
import '../styles/pages/property-detail.css'

function formatKz(val: number): string {
  return val.toLocaleString('pt-AO') + ' Kz'
}

const amenitiesList = [
  { key: 'piscina', label: 'Piscina' },
  { key: 'garagem', label: 'Garagem' },
  { key: 'condominio', label: 'Condomínio' },
  { key: 'mobilado', label: 'Mobilado' },
  { key: 'jardim', label: 'Jardim' },
  { key: 'ar_cond', label: 'Ar Condicionado' },
  { key: 'gerador', label: 'Gerador' },
  { key: 'cisterna', label: 'Cisterna' },
  { key: 'internet', label: 'Internet' },
  { key: 'quintal', label: 'Quintal' },
]

export function PropertyDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { properties } = useProperties()
  const { isFav, toggleFav } = useFavorites()
  const { isAuthenticated, token } = useAuth()
  const [property, setProperty] = useState<Property | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [showPhone, setShowPhone] = useState(false)

  const handleChat = useCallback(async () => {
    if (!isAuthenticated) { navigate('/login'); return }
    if (!property?.owner_id) return
    if (token) setChatToken(token)
    try {
      const room = await createRoom(property.owner_id, property.id)
      navigate(`/mensagens?room=${room.id}`)
    } catch (err) {
      console.error(err)
    }
  }, [isAuthenticated, property, token, navigate])

  useEffect(() => {
    if (id && properties.length > 0) {
      const p = properties.find(x => x.id === Number(id))
      setProperty(p || null)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [id, properties])

  const allImages = useCallback(() => {
    if (!property) return []
    const images = [property.image_url, ...(property.images || [])].filter(Boolean)
    return images.length > 0 ? images : []
  }, [property])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  if (!property) {
    return (
      <div className="detail-not-found">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <h3>Imóvel não encontrado</h3>
        <Button variant="outline" onClick={() => navigate('/explorar')}>Voltar para explorar</Button>
      </div>
    )
  }

  const p = property
  const images = allImages()
  const am = (p.amenities || {}) as unknown as Record<string, boolean | undefined>

  // Simulated coordinates for Leaflet (based on bairro)
  const coords: [number, number] = p.location.includes('Talatona') ? [-8.9167, 13.1833]
    : p.location.includes('Benfica') ? [-8.8833, 13.1667]
    : p.location.includes('Kilamba') ? [-8.9500, 13.2000]
    : p.location.includes('Viana') ? [-8.9000, 13.3667]
    : [-8.8383, 13.2344] // Luanda center default

  return (
    <motion.div
      className="property-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* ─── BACK BUTTON ──────────────────────── */}
      <div className="detail-top-bar">
        <button className="detail-back" onClick={() => navigate(-1)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
      </div>

      {/* ─── GALLERY ──────────────────────────── */}
      <section className="detail-gallery-section">
        <div className="detail-gallery-main" onClick={() => openLightbox(0)}>
          <img
            src={images[0] || '/placeholder.svg'}
            alt={p.title}
            className="detail-gallery-img"
          />
          {p.has_video && (
            <button className="detail-video-btn" title="Ver vídeo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            </button>
          )}
          <div className="detail-gallery-count">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
            </svg>
            {images.length} fotos
          </div>
        </div>
        {images.length > 1 && (
          <div className="detail-gallery-thumbs">
            {images.slice(1, 5).map((img, i) => (
              <div key={i} className="detail-thumb" onClick={() => openLightbox(i + 1)}>
                <img src={img} alt={`${p.title} ${i + 2}`} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ─── MAIN CONTENT LAYOUT ──────────────── */}
      <div className="detail-layout">
        <div className="detail-main">

          {/* Header */}
          <div className="detail-header">
            <div>
              <h1 className="detail-title">{p.title}</h1>
              <div className="detail-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {p.location}, {p.municipio}
              </div>
            </div>
            <div className="detail-price-box">
              <div className="detail-price">{formatKz(p.price)}</div>
              <div className="detail-price-period">/mês {p.negotiable && <span className="detail-negotiable">Negociável</span>}</div>
            </div>
          </div>

          {/* Tags */}
          <div className="detail-tags">
            <Badge variant="neutral">{p.type}</Badge>
            {p.beds > 0 && <Badge variant="neutral">{p.beds} Quartos</Badge>}
            <Badge variant="neutral">{p.baths} WC</Badge>
            <Badge variant="neutral">{p.area} m²</Badge>
            {p.featured && <Badge variant="accent">Destaque</Badge>}
            {p.is_new && <Badge variant="success">Novo</Badge>}
            {p.mode === 'direct' ? <Badge variant="primary">Directo</Badge> : <Badge variant="warning">Com Intermediário</Badge>}
          </div>

          {/* Info Grid */}
          <div className="detail-info-grid">
            <div className="detail-info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                <path d="M3 14h4l2 3h6l2-3h4" /><rect x="2" y="9" width="20" height="5" rx="2" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" />
              </svg>
              <div className="detail-info-val">{p.beds || '—'}</div>
              <div className="detail-info-label">Quartos</div>
            </div>
            <div className="detail-info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                <path d="M4 8h16M4 16h16" /><rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
              <div className="detail-info-val">{p.baths}</div>
              <div className="detail-info-label">WC</div>
            </div>
            <div className="detail-info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              <div className="detail-info-val">{p.area}</div>
              <div className="detail-info-label">Área (m²)</div>
            </div>
            <div className="detail-info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
              <div className="detail-info-val">{p.area > 0 ? Math.round(p.price / p.area).toLocaleString() : '—'}</div>
              <div className="detail-info-label">Kz/m²</div>
            </div>
          </div>

          {/* Description */}
          <section className="detail-section">
            <h3>Descrição</h3>
            <p>{p.desc}</p>
          </section>

          {/* Amenities */}
          <section className="detail-section">
            <h3>Comodidades e Serviços</h3>
            <div className="detail-amenities-grid">
              {amenitiesList.map(a => (
                <div key={a.key} className={`detail-amenity ${am[a.key] ? 'yes' : 'no'}`}>
                  <span className="detail-amenity-icon">
                    {am[a.key] ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                  </span>
                  {a.label}
                </div>
              ))}
            </div>
          </section>

          {/* Map */}
          <section className="detail-section">
            <h3>Localização</h3>
            <div className="detail-map">
              <MapContainer center={coords} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={coords}>
                  <Popup>
                    {p.title}<br />
                    {formatKz(p.price)}/mês
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </section>
        </div>

        {/* ─── SIDEBAR ─────────────────────────── */}
        <aside className="detail-sidebar">
          <div className="detail-sidebar-sticky">
            {/* Price Card */}
            <div className="detail-sidebar-card">
              <div className="sidebar-price">{formatKz(p.price)}</div>
              <div className="sidebar-price-period">por mês</div>
              {p.negotiable && <Badge variant="success">Preço Negociável</Badge>}

              <div className="sidebar-actions">
                <Button variant="accent" size="lg" block>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Contactar Proprietário
                </Button>
                <a
                  href={`https://wa.me/244900000000?text=Olá! Tenho interesse no imóvel: ${p.title} (${formatKz(p.price)})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="success" size="lg" block>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </Button>
                </a>
                <Button variant="outline" size="lg" block onClick={() => setShowPhone(!showPhone)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {showPhone ? '+244 900 000 000' : 'Ligar'}
                </Button>
              </div>

              <div className="sidebar-divider" />

              <div className="sidebar-fav-share">
                <button className={`sidebar-fav-btn ${isFav(p.id) ? 'faved' : ''}`} onClick={() => toggleFav(p.id)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={isFav(p.id) ? '#dc2626' : 'none'} stroke={isFav(p.id) ? '#dc2626' : 'currentColor'} strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {isFav(p.id) ? 'Favoritado' : 'Favoritar'}
                </button>
                <button className="sidebar-share-btn" onClick={() => { navigator.share?.({ title: p.title, url: window.location.href }) }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  Partilhar
                </button>
              </div>
            </div>

            {/* Owner Card */}
            <div className="detail-sidebar-card">
              <div className="sidebar-owner">
                <Avatar name="Proprietário" size="lg" />
                <div>
                  <div className="sidebar-owner-name">Proprietário</div>
                  <div className="sidebar-owner-meta">
                    <Badge variant="success">Verificado</Badge>
                    <span className="sidebar-owner-time">Na plataforma há 6 meses</span>
                  </div>
                </div>
              </div>
              <div className="sidebar-divider" />
              <Button variant="ghost" size="sm" block onClick={handleChat}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Enviar Mensagem
              </Button>
            </div>

            {/* Report */}
            <button className="sidebar-report">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Denunciar este anúncio
            </button>
          </div>
        </aside>
      </div>

      {/* ─── RELATED PROPERTIES ────────────────── */}
      <section className="detail-related">
        <div className="detail-related-inner">
          <h3>Imóveis Relacionados</h3>
          <div className="related-scroll">
            <div className="related-track">
              {properties
                .filter(x => x.id !== p.id && (x.type === p.type || x.municipio === p.municipio))
                .slice(0, 6)
                .map(rel => (
                  <div key={rel.id} className="related-card" onClick={() => navigate(`/imovel/${rel.id}`)}>
                    <div className="related-card-img" style={{ backgroundImage: `url(${rel.image_url})` }} />
                    <div className="related-card-body">
                      <div className="related-card-price">{formatKz(rel.price)}</div>
                      <div className="related-card-title">{rel.title}</div>
                      <div className="related-card-location">{rel.location}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── LIGHTBOX ──────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <button
              className="lightbox-nav lightbox-prev"
              onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + images.length) % images.length) }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <motion.img
              key={lightboxIndex}
              src={images[lightboxIndex]}
              alt={`${p.title} ${lightboxIndex + 1}`}
              className="lightbox-img"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            />
            <button
              className="lightbox-nav lightbox-next"
              onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % images.length) }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <div className="lightbox-counter">{lightboxIndex + 1} / {images.length}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
