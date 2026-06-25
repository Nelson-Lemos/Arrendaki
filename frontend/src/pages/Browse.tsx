import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProperties } from '../hooks/useProperties'
import { useToast } from '../hooks/useToast'
import { SearchHero } from '../components/SearchHero'
import { PropertyCard } from '../components/PropertyCard'
import { ToastContainer } from '../components/Toast'
import { ContactModal } from '../components/ContactModal'
import type { Broker } from '../types'
import '../styles/pages/browse.css'

interface BrowseProps {
  favorites: Set<number>
  onToggleFav: (e: React.MouseEvent, id: number) => void
  contactModalType: 'direct' | 'broker' | 'video' | 'notifications' | 'addProperty' | null
  onContactModalClose: () => void
  onContactSend: () => void
  onHireBroker: (broker: Broker) => void
}

export function Browse({ favorites, onToggleFav, contactModalType, onContactModalClose, onContactSend }: BrowseProps) {
  const navigate = useNavigate()
  const { properties, fetchProperties } = useProperties()
  const { toasts } = useToast()

  const handleFilter = useCallback((filters: Record<string, string>) => {
    const apiFilters: any = {}
    if (filters.q) apiFilters.q = filters.q
    if (filters.type) apiFilters.type = filters.type
    if (filters.mode) apiFilters.mode = filters.mode
    if (filters.quick && filters.quick !== 'all') {
      const quickMap: Record<string, any> = {
        featured: { featured: true },
        video: { hasVideo: true },
        new: { isNew: true },
        negotiable: { negotiable: true },
      }
      Object.assign(apiFilters, quickMap[filters.quick])
    }
    if (filters.price) {
      const [min, max] = filters.price.split('-')
      if (min) apiFilters.priceMin = Number(min)
      if (max && max !== '+') apiFilters.priceMax = Number(max)
    }
    fetchProperties(apiFilters)
  }, [fetchProperties])

  const openProperty = useCallback((id: number) => {
    navigate(`/imovel/${id}`)
  }, [navigate])

  return (
    <div className="browse-page">
      <SearchHero onFilter={handleFilter} />
      <div className="browse-layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h4>Preço máximo</h4>
            <input type="range" min="50000" max="1000000" step="10000" defaultValue="1000000" style={{ width: '100%' }} />
            <div className="price-range-display">Até <span>1 000 000</span> Kz</div>
          </div>
          <div className="sidebar-section">
            <h4>Características</h4>
            <label className="check-item"><input type="checkbox" /> Piscina</label>
            <label className="check-item"><input type="checkbox" /> Garagem</label>
            <label className="check-item"><input type="checkbox" /> Condomínio Fechado</label>
            <label className="check-item"><input type="checkbox" /> Mobilado</label>
            <label className="check-item"><input type="checkbox" /> Jardim</label>
          </div>
        </aside>
        <main className="properties-grid">
          {properties.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto' }}>
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <p style={{ fontSize: '1rem', marginTop: '0.75rem' }}>Nenhum imóvel encontrado com esses critérios.</p>
            </div>
          ) : (
            properties.map(p => (
              <PropertyCard
                key={p.id}
                property={p}
                isFav={favorites.has(p.id)}
                onToggleFav={onToggleFav}
                onClick={openProperty}
              />
            ))
          )}
        </main>
      </div>

      {contactModalType && (
        <ContactModal
          type={contactModalType}
          onClose={onContactModalClose}
          onSend={onContactSend}
        />
      )}

      <ToastContainer toasts={toasts} />
    </div>
  )
}