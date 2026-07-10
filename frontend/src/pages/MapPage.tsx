import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useProperties } from '../hooks/useProperties'
import { getCoordsForLocation } from '../data/coords'
import L from 'leaflet'
import '../styles/pages/map.css'
import 'leaflet/dist/leaflet.css'

const center: [number, number] = [-8.8383, 13.2344]
const defaultZoom = 12

function markerIcon(active: boolean): L.DivIcon {
  return L.divIcon({
    className: `custom-marker${active ? ' active' : ''}`,
    html: active
      ? `<svg width="40" height="48" viewBox="0 0 40 48" fill="none"><path d="M20 0C8.96 0 0 8.96 0 20c0 15 20 28 20 28s20-13 20-28C40 8.96 31.04 0 20 0z" fill="#F97316"/><circle cx="20" cy="19" r="9" fill="white"/></svg>`
      : `<svg width="32" height="40" viewBox="0 0 32 40" fill="none"><path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 24 16 24s16-12 16-24C32 7.16 24.84 0 16 0z" fill="#2563EB"/><circle cx="16" cy="15" r="7" fill="white"/></svg>`,
    iconSize: active ? [40, 48] : [32, 40],
    iconAnchor: active ? [20, 48] : [16, 40],
    popupAnchor: active ? [0, -50] : [0, -42],
  })
}

function formatKz(val: number): string {
  return val.toLocaleString('pt-AO') + ' Kz'
}

function MapController({ coords, activeId }: { coords: [number, number][], activeId: number | null }) {
  const map = useMap()
  const prev = useRef<number | null>(null)

  useEffect(() => {
    if (coords.length === 0) return
    if (activeId && activeId !== prev.current) {
      const p = coords[activeId]
      if (p) { map.flyTo(p, 15, { duration: 0.6 }); prev.current = activeId; return }
    }
    if (coords.length === 1) {
      map.flyTo(coords[0], 15, { duration: 0.6 })
    } else if (coords.length > 1) {
      const bounds = L.latLngBounds(coords)
      map.flyToBounds(bounds, { padding: [50, 50], duration: 0.6 })
    }
  }, [coords, activeId, map])

  return null
}

export function MapPage() {
  const navigate = useNavigate()
  const { properties } = useProperties()
  const [activeId, setActiveId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000])
  const [typeFilter, setTypeFilter] = useState<string>('')

  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (search && !p.location.toLowerCase().includes(search.toLowerCase()) && !p.municipio?.toLowerCase().includes(search.toLowerCase())) return false
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false
      if (typeFilter && p.type !== typeFilter) return false
      return true
    })
  }, [properties, search, priceRange, typeFilter])

  const propertyCoords = useMemo(() => {
    return filtered.map(p => ({
      ...p,
      coords: getCoordsForLocation(p.location, p.municipio || ''),
    }))
  }, [filtered])

  const allCoords = useMemo(() => propertyCoords.map(p => p.coords), [propertyCoords])

  const handleCardClick = (p: typeof propertyCoords[number]) => {
    setActiveId(p.id)
  }

  const handleCardDoubleClick = (id: number) => {
    navigate(`/imovel/${id}`)
  }

  return (
    <div className="map-page">
      <div className="map-sidebar">
        <div className="map-sidebar-header">
          <h2>Mapa de Imóveis</h2>
          <span className="map-count">{filtered.length} imóveis</span>
        </div>

        <div className="map-filters">
          <input
            type="text"
            className="map-search"
            placeholder="Pesquisar bairro ou município..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="map-filter-row">
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option value="">Todos os tipos</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Casa">Casa</option>
              <option value="Vivenda">Vivenda</option>
              <option value="Quarto">Quarto</option>
            </select>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
              />
              <span>—</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], +e.target.value])}
              />
            </div>
          </div>
        </div>

        <div className="map-list">
          {propertyCoords.length === 0 && (
            <div className="map-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <p>Nenhum imóvel encontrado</p>
              <small>Tenta ajustar os filtros</small>
            </div>
          )}
          {propertyCoords.map(p => (
            <div
              key={p.id}
              className={`map-list-card ${activeId === p.id ? 'active' : ''}`}
              onClick={() => handleCardClick(p)}
              onDoubleClick={() => handleCardDoubleClick(p.id)}
            >
              <div className="mlc-img" style={{
                backgroundImage: p.image_url
                  ? `url(${p.image_url})`
                  : `linear-gradient(135deg, ${p.color}, #00000040)`,
              }} />
              <div className="mlc-body">
                <div className="mlc-title">{p.title}</div>
                <div className="mlc-price">{formatKz(p.price)}/mês</div>
                <div className="mlc-loc">{p.location}</div>
                <div className="mlc-meta">
                  <span>{p.beds} quartos</span>
                  <span>{p.area}m²</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="map-container">
        <MapContainer center={center} zoom={defaultZoom} className="leaflet-map" zoomControl={true}>
          <MapController coords={allCoords} activeId={activeId} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {propertyCoords.length === 0 ? (
            <Marker position={center} icon={markerIcon(false)}>
              <Popup>ArrendaKi — Luanda</Popup>
            </Marker>
          ) : (
            propertyCoords.map(p => (
              <Marker
                key={p.id}
                position={p.coords}
                icon={markerIcon(activeId === p.id)}
              >
                <Popup>
                  <div className="map-popup" onClick={() => navigate(`/imovel/${p.id}`)}>
                    <div className="map-popup-img" style={{
                      backgroundImage: p.image_url
                        ? `url(${p.image_url})`
                        : `linear-gradient(135deg, ${p.color}, #00000040)`,
                    }} />
                    <div className="map-popup-body">
                      <strong>{p.title}</strong>
                      <div className="map-popup-price">{formatKz(p.price)}/mês</div>
                      <div className="map-popup-loc">{p.location}</div>
                      <div className="map-popup-tags">
                        <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>{p.type}</span>
                        <span className="map-popup-tag">{p.beds} qrt</span>
                        <span className="map-popup-tag">{p.area}m²</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))
          )}
        </MapContainer>
      </div>
    </div>
  )
}
