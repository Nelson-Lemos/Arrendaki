import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProperties } from '../hooks/useProperties'
import { useFavorites } from '../context/FavoritesContext'
import { PropertyCard } from '../components/PropertyCard'
import { Button } from '../components/ui/Button'
import '../styles/pages/favorites.css'

export function FavoritesPage() {
  const navigate = useNavigate()
  const { properties } = useProperties()
  const { favorites, toggleFav, compareIds, toggleCompare } = useFavorites()

  const favProperties = useMemo(
    () => properties.filter(p => favorites.has(p.id)),
    [properties, favorites]
  )

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <div>
          <h1>Os meus favoritos</h1>
          <p className="favorites-sub">
            {favProperties.length} {favProperties.length === 1 ? 'imovel guardado' : 'imoveis guardados'}
          </p>
        </div>
        <div className="favorites-actions">
          {compareIds.length > 0 && (
            <Button variant="accent" size="sm" onClick={() => navigate('/comparar')}>
              Comparar ({compareIds.length})
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => navigate('/explorar')}>
            Explorar imoveis
          </Button>
        </div>
      </div>

      {favProperties.length === 0 ? (
        <div className="favorites-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <h3>Nenhum favorito ainda</h3>
          <p>Explora imoveis e clica no coracao para guardar os teus preferidos.</p>
          <Button variant="primary" onClick={() => navigate('/explorar')}>Explorar Imoveis</Button>
        </div>
      ) : (
        <div className="favorites-grid">
          {favProperties.map((p, i) => (
            <PropertyCard
              key={p.id}
              property={p}
              isFav={true}
              onToggleFav={(e) => { e.stopPropagation(); toggleFav(p.id) }}
              onClick={(id) => navigate(`/imovel/${id}`)}
              isCompare={compareIds.includes(p.id)}
              onToggleCompare={toggleCompare}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  )
}
