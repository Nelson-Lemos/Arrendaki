import { useState, useRef, useEffect, useCallback } from 'react'
import { searchBairros, type Bairro } from '../data/bairros'

interface SearchHeroProps {
  onFilter: (filters: Record<string, string>) => void
}

const quickFilters = [
  { key: 'all', label: 'Todos' },
  { key: 'featured', label: 'Destaque' },
  { key: 'video', label: 'Com Vídeo' },
  { key: 'new', label: 'Recente' },
  { key: 'negotiable', label: 'Negociável' },
]

export function SearchHero({ onFilter }: SearchHeroProps) {
  const [searchText, setSearchText] = useState('')
  const [suggestions, setSuggestions] = useState<Bairro[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')
  const [filterMode, setFilterMode] = useState('')
  const [activeQuick, setActiveQuick] = useState('all')
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchText.length >= 2) {
      const results = searchBairros(searchText)
      setSuggestions(results)
      setShowSuggestions(results.length > 0)
      setSelectedIndex(-1)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchText])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectSuggestion = useCallback((bairro: Bairro) => {
    setSearchText(bairro.nome)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') handleFilter()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0) {
        selectSuggestion(suggestions[selectedIndex])
      } else {
        handleFilter()
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }, [showSuggestions, suggestions, selectedIndex])

  const handleFilter = () => {
    onFilter({ q: searchText, type: filterType, price: filterPrice, mode: filterMode, quick: activeQuick })
  }

  return (
    <div className="hero-search">
      <h2>Encontra o imóvel ideal em Angola</h2>
      <div className="search-bar">
        <div className="search-field" style={{ position: 'relative' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Bairro, zona, município ou referência..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true) }}
          />
          {showSuggestions && (
            <div className="autocomplete-dropdown" ref={suggestionsRef}>
              {suggestions.map((b, i) => (
                <div
                  key={`${b.nome}-${b.municipio}`}
                  className={`autocomplete-item ${i === selectedIndex ? 'selected' : ''}`}
                  onClick={() => selectSuggestion(b)}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  <div className="autocomplete-item-name">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {b.nome}
                  </div>
                  <span className="autocomplete-item-type">
                    {b.municipio} · {b.tipo === 'bairro' ? 'Bairro' : b.tipo === 'zona' ? 'Referência' : 'Município'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="">Todos os tipos</option>
          <option value="T1">T1</option>
          <option value="T2">T2</option>
          <option value="T3">T3</option>
          <option value="T4+">T4+</option>
          <option value="Villa">Villa</option>
          <option value="Escritório">Escritório</option>
        </select>
        <select value={filterPrice} onChange={e => setFilterPrice(e.target.value)}>
          <option value="">Qualquer preço</option>
          <option value="0-100000">Até 100 000 Kz</option>
          <option value="100000-200000">100 000 – 200 000 Kz</option>
          <option value="200000-400000">200 000 – 400 000 Kz</option>
          <option value="400000+">Acima de 400 000 Kz</option>
        </select>
        <select value={filterMode} onChange={e => setFilterMode(e.target.value)}>
          <option value="">Com/sem intermediário</option>
          <option value="direct">Directo</option>
          <option value="brokered">Com intermediário</option>
        </select>
        <button className="btn-search" onClick={handleFilter}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          Pesquisar
        </button>
      </div>
      <div className="quick-filters">
        {quickFilters.map(qf => (
          <button
            key={qf.key}
            className={`qf ${activeQuick === qf.key ? 'active' : ''}`}
            onClick={() => { setActiveQuick(qf.key); onFilter({ q: searchText, type: filterType, price: filterPrice, mode: filterMode, quick: qf.key }) }}
          >
            {qf.label}
          </button>
        ))}
      </div>
    </div>
  )
}
