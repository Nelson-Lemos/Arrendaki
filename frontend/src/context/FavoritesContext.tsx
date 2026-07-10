import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

interface FavoritesContextType {
  favorites: Set<number>
  compareIds: number[]
  toggleFav: (id: number) => void
  toggleCompare: (id: number) => void
  clearCompare: () => void
  isFav: (id: number) => boolean
  isCompare: (id: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | null>(null)

function loadSet(key: string): Set<number> {
  try {
    const raw = localStorage.getItem(key)
    return new Set<number>(raw ? JSON.parse(raw) : [])
  } catch { return new Set() }
}

function loadArray(key: string): number[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function FavoritesProvider({ children, showToast }: { children: ReactNode; showToast: (msg: string, type?: 'success' | 'error' | 'warning' | '') => void }) {
  const [favorites, setFavorites] = useState<Set<number>>(() => loadSet('arrendaki_favorites'))
  const [compareIds, setCompareIds] = useState<number[]>(() => loadArray('arrendaki_compare'))

  useEffect(() => { localStorage.setItem('arrendaki_favorites', JSON.stringify([...favorites])) }, [favorites])
  useEffect(() => { localStorage.setItem('arrendaki_compare', JSON.stringify(compareIds)) }, [compareIds])

  const toggleFav = useCallback((id: number) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id); showToast('Removido dos favoritos') }
      else { next.add(id); showToast('Adicionado aos favoritos!') }
      return next
    })
  }, [showToast])

  const toggleCompare = useCallback((id: number) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 4) { showToast('Maximo de 4 imoveis para comparar', 'warning'); return prev }
      showToast('Adicionado para comparar')
      return [...prev, id]
    })
  }, [showToast])

  const clearCompare = useCallback(() => { setCompareIds([]) }, [])

  const isFav = useCallback((id: number) => favorites.has(id), [favorites])
  const isCompare = useCallback((id: number) => compareIds.includes(id), [compareIds])

  return (
    <FavoritesContext.Provider value={{ favorites, compareIds, toggleFav, toggleCompare, clearCompare, isFav, isCompare }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
