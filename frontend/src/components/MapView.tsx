import type { Property } from '../types'

interface MapViewProps {
  properties: Property[]
  onPropertyClick: (id: number) => void
}

function formatKz(val: number, short = false): string {
  if (short) {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M Kz'
    if (val >= 1000) return Math.round(val / 1000) + 'K Kz'
  }
  return val.toLocaleString('pt-AO') + ' Kz'
}

export function MapView({ properties, onPropertyClick }: MapViewProps) {
  return (
    <div className="map-container">
      <div className="map-placeholder">
        <div className="map-pins">
          {properties.map(p => (
            <div
              key={p.id}
              className="map-pin"
              style={{ left: `${p.id * 8 + 20}%`, top: `${(p.id * 5 + 30) % 80}%` }}
              onClick={() => onPropertyClick(p.id)}
            >
              {formatKz(p.price, true)}
            </div>
          ))}
        </div>
        <div className="map-overlay-text">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          <p>Mapa interactivo de Luanda</p>
          <small>Clica num ponto para ver o imóvel</small>
        </div>
      </div>
      <div className="map-list">
        <div className="map-list-title">{properties.length} imóveis na área</div>
        {properties.map(p => (
          <div key={p.id} className="map-list-card" onClick={() => onPropertyClick(p.id)}>
            <div className="mlc-img" style={{ backgroundColor: p.color }} />
            <div className="mlc-body">
              <div className="mlc-title">{p.title}</div>
              <div className="mlc-price">{formatKz(p.price)}/mês</div>
              <div className="mlc-loc">📍 {p.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
