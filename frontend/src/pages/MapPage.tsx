import { useNavigate } from 'react-router-dom'
import { useProperties } from '../hooks/useProperties'
import '../styles/pages/map.css'

export function MapPage() {
  const navigate = useNavigate()
  const { properties } = useProperties()

  return (
    <div className="map-page">
      <div className="map-container">
        <div className="map-placeholder">
          <div className="map-overlay-text">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto' }}>
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
              <line x1="8" y1="2" x2="8" y2="18"/>
              <line x1="16" y1="6" x2="16" y2="22"/>
            </svg>
            <p>Mapa Interactivo</p>
            <small>Em breve — visualiza imóveis directamente no mapa</small>
          </div>
          <div className="map-pins">
            {properties.slice(0, 6).map((p, i) => (
              <div
                key={p.id}
                className="map-pin"
                style={{
                  top: `${20 + (i * 12) % 70}%`,
                  left: `${15 + (i * 17) % 70}%`,
                }}
                onClick={() => navigate(`/imovel/${p.id}`)}
              >
                {p.price.toLocaleString()} Kz
              </div>
            ))}
          </div>
        </div>
        <div className="map-list">
          <div className="map-list-title">Imóveis próximos</div>
          {properties.slice(0, 6).map(p => (
            <div key={p.id} className="map-list-card" onClick={() => navigate(`/imovel/${p.id}`)}>
              <div className="mlc-img" style={{
                backgroundImage: p.image_url
                  ? `url(${p.image_url})`
                  : `linear-gradient(135deg, ${p.color}, #00000040)`,
              }} />
              <div className="mlc-body">
                <div className="mlc-title">{p.title}</div>
                <div className="mlc-price">{formatKz(p.price)}/mês</div>
                <div className="mlc-loc">{p.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function formatKz(val: number): string {
  return val.toLocaleString('pt-AO') + ' Kz'
}
