import { useCallback, useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useProperties } from '../hooks/useProperties'
import { useFavorites } from '../context/FavoritesContext'
import { SearchHero } from '../components/SearchHero'
import { PropertyCard, PropertyCardList } from '../components/PropertyCard'
import { ContactModal } from '../components/ContactModal'
import { Button } from '../components/ui/Button'
import { Tag } from '../components/ui/Tag'
import type { Broker } from '../types'
import '../styles/pages/browse.css'

interface BrowseProps {
  contactModalType: 'direct' | 'broker' | 'video' | 'notifications' | 'addProperty' | null
  onContactModalClose: () => void
  onContactSend: () => void
  onHireBroker: (broker: Broker) => void
}

type ViewMode = 'grid' | 'list'
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc' | 'newest'

const ITEMS_PER_PAGE = 12

const amenityKeys = [
  { key: 'piscina', label: 'Piscina' },
  { key: 'garagem', label: 'Garagem' },
  { key: 'condominio', label: 'Condomínio' },
  { key: 'mobilado', label: 'Mobilado' },
  { key: 'jardim', label: 'Jardim' },
  { key: 'ar_cond', label: 'Ar Condicionado' },
  { key: 'gerador', label: 'Gerador' },
  { key: 'cisterna', label: 'Cisterna' },
] as const

export function Browse({ contactModalType, onContactModalClose, onContactSend }: BrowseProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { properties, fetchProperties, loading } = useProperties()
  const { isFav, toggleFav, isCompare, toggleCompare } = useFavorites()
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [page, setPage] = useState(1)
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set())
  const [priceRange, setPriceRange] = useState(1000000)

  // Read initial query from URL
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')

  const handleFilter = useCallback((filters: Record<string, string>) => {
    const apiFilters: any = {}
    if (filters.q) { apiFilters.q = filters.q; setSearchQuery(filters.q) }
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
    if (priceRange < 1000000) apiFilters.priceMax = priceRange
    fetchProperties(apiFilters)
    setPage(1)
  }, [fetchProperties, priceRange])

  const toggleAmenity = useCallback((key: string) => {
    setSelectedAmenities(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const openProperty = useCallback((id: number) => {
    navigate(`/imovel/${id}`)
  }, [navigate])

  const sortedProperties = useMemo(() => {
    const list = [...properties]
    switch (sortBy) {
      case 'price-asc': return list.sort((a, b) => a.price - b.price)
      case 'price-desc': return list.sort((a, b) => b.price - a.price)
      case 'area-asc': return list.sort((a, b) => a.area - b.area)
      case 'area-desc': return list.sort((a, b) => b.area - a.area)
      case 'newest': return list.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))
      default: return list
    }
  }, [properties, sortBy])

  // Filter by amenities client-side
  const amenityFiltered = useMemo(() => {
    if (selectedAmenities.size === 0) return sortedProperties
    return sortedProperties.filter(p => {
      const am = (p.amenities || {}) as unknown as Record<string, boolean | undefined>
      return Array.from(selectedAmenities).every(key => am[key] === true)
    })
  }, [sortedProperties, selectedAmenities])

  const paginated = amenityFiltered.slice(0, page * ITEMS_PER_PAGE)

  return (
    <div className="browse-page">
      <SearchHero onFilter={handleFilter} />
      <div className="browse-layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h4>Preço máximo</h4>
            <input
              type="range"
              min="50000"
              max="1000000"
              step="10000"
              value={priceRange}
              onChange={e => setPriceRange(Number(e.target.value))}
            />
            <div className="price-range-display">
              Até <span>{priceRange.toLocaleString('pt-AO')}</span> Kz
              {priceRange < 1000000 && (
                <button className="price-apply" onClick={() => handleFilter({ q: searchQuery })}>Aplicar</button>
              )}
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Comodidades</h4>
            <div className="checkbox-list">
              {amenityKeys.map(a => (
                <label key={a.key} className="check-item">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.has(a.key)}
                    onChange={() => toggleAmenity(a.key)}
                  />
                  {a.label}
                </label>
              ))}
            </div>
          </div>

          {selectedAmenities.size > 0 && (
            <div className="sidebar-section">
              <Button variant="ghost" size="sm" onClick={() => setSelectedAmenities(new Set())}>
                Limpar filtros
              </Button>
            </div>
          )}
        </aside>

        <main className="browse-main">
          {/* Toolbar */}
          <div className="browse-toolbar">
            <div className="browse-toolbar-left">
              <span className="browse-count">
                {amenityFiltered.length} imóvel{amenityFiltered.length !== 1 ? 'eis' : ''} encontrado{amenityFiltered.length !== 1 ? 's' : ''}
              </span>
              {searchQuery && (
                <Tag variant="primary" onClick={() => { setSearchQuery(''); handleFilter({ q: '' }) }}>
                  {searchQuery} ✕
                </Tag>
              )}
            </div>
            <div className="browse-toolbar-right">
              <select
                className="browse-sort"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
              >
                <option value="default">Ordenar por</option>
                <option value="price-asc">Preço: menor → maior</option>
                <option value="price-desc">Preço: maior → menor</option>
                <option value="area-asc">Área: menor → maior</option>
                <option value="area-desc">Área: maior → menor</option>
                <option value="newest">Mais recentes</option>
              </select>
              <div className="view-toggle">
                <button
                  className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Vista grelha"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button
                  className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="Vista lista"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Properties */}
          {paginated.length === 0 && !loading ? (
            <div className="browse-empty">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <h3>Nenhum imóvel encontrado</h3>
              <p>Tente ajustar os filtros ou pesquisar por outro termo.</p>
              <Button variant="outline" onClick={() => { setSelectedAmenities(new Set()); setPriceRange(1000000); fetchProperties({}) }}>
                Limpar todos os filtros
              </Button>
            </div>
          ) : (
            <div className={`properties-grid ${viewMode === 'list' ? 'properties-list' : ''}`}>
              {paginated.map((p, i) => (
                viewMode === 'list' ? (
                  <PropertyCardList
                    key={p.id}
                    property={p}
                    isFav={isFav(p.id)}
                    onToggleFav={(e) => { e.stopPropagation(); toggleFav(p.id) }}
                    onClick={openProperty}
                    isCompare={isCompare(p.id)}
                    onToggleCompare={toggleCompare}
                    index={i}
                  />
                ) : (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    isFav={isFav(p.id)}
                    onToggleFav={(e) => { e.stopPropagation(); toggleFav(p.id) }}
                    onClick={openProperty}
                    isCompare={isCompare(p.id)}
                    onToggleCompare={toggleCompare}
                    index={i}
                  />
                )
              ))}
            </div>
          )}

          {/* Pagination */}
          {paginated.length < amenityFiltered.length && (
            <div className="browse-pagination">
              <Button variant="outline" onClick={() => setPage(p => p + 1)}>
                Carregar mais imóveis
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Button>
              <span className="browse-pagination-info">
                {paginated.length} de {amenityFiltered.length} imóveis
              </span>
            </div>
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

    </div>
  )
}
