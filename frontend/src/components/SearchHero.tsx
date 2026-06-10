import { useState } from 'react'

interface SearchHeroProps {
  onFilter: (filters: Record<string, string>) => void
}

export function SearchHero({ onFilter }: SearchHeroProps) {
  const [searchText, setSearchText] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')
  const [filterMode, setFilterMode] = useState('')
  const [activeQuick, setActiveQuick] = useState('all')

  const handleFilter = () => {
    onFilter({ q: searchText, type: filterType, price: filterPrice, mode: filterMode, quick: activeQuick })
  }

  const quickFilters = [
    { key: 'all', label: 'Todos' },
    { key: 'featured', label: '⭐ Destaque' },
    { key: 'video', label: '🎬 Com Vídeo' },
    { key: 'new', label: '🆕 Novo' },
    { key: 'negotiable', label: '💬 Preço Negociável' },
  ]

  return (
    <div className="hero-search">
      <h2>Encontra o imóvel ideal em Angola</h2>
      <div className="search-bar">
        <div className="search-field">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Bairro, rua ou município..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleFilter()}
          />
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
          <option value="direct">Direto (sem intermediário)</option>
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
            onClick={() => { setActiveQuick(qf.key); onFilter({ ...{ q: searchText, type: filterType, price: filterPrice, mode: filterMode }, quick: qf.key }) }}
          >
            {qf.label}
          </button>
        ))}
      </div>
    </div>
  )
}
