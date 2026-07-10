import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProperties } from '../hooks/useProperties'
import { useFavorites } from '../context/FavoritesContext'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import '../styles/pages/compare.css'

function formatKz(val: number): string {
  return val.toLocaleString('pt-AO') + ' Kz'
}

export function ComparePage() {
  const navigate = useNavigate()
  const { properties } = useProperties()
  const { compareIds, toggleCompare, clearCompare } = useFavorites()

  const compare = useMemo(
    () => properties.filter(p => compareIds.includes(p.id)),
    [properties, compareIds]
  )

  return (
    <div className="compare-page">
      <div className="compare-header">
        <div>
          <h1>Comparar imoveis</h1>
          <p className="compare-sub">
            {compare.length === 0
              ? 'Seleciona imoveis para comparar'
              : `A comparar ${compare.length} de 4 imoveis`}
          </p>
        </div>
        <div className="compare-header-actions">
          {compare.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearCompare}>
              Limpar todos
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => navigate('/explorar')}>
            Adicionar mais
          </Button>
        </div>
      </div>

      {compare.length === 0 ? (
        <div className="compare-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
          <h3>Nenhum imovel para comparar</h3>
          <p>Adiciona imoveis ao comparador clicando no icone de grafico nos cards.</p>
          <Button variant="primary" onClick={() => navigate('/explorar')}>Explorar Imoveis</Button>
        </div>
      ) : (
        <div className="compare-table-wrapper">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="compare-label-col">Caracteristica</th>
                {compare.map(p => (
                  <th key={p.id} className="compare-property-col">
                    <div className="compare-card-header">
                      <div className="compare-card-img" style={{
                        backgroundImage: p.image_url
                          ? `url(${p.image_url})`
                          : `linear-gradient(135deg, ${p.color}, #00000040)`,
                      }} />
                      <div className="compare-card-info">
                        <strong>{p.title}</strong>
                        <div className="compare-card-price">{formatKz(p.price)}/mes</div>
                        <div className="compare-card-loc">{p.location}</div>
                      </div>
                      <button className="compare-remove" onClick={() => toggleCompare(p.id)} title="Remover">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="compare-label">Preco</td>
                {compare.map(p => (
                  <td key={p.id} className="compare-value price">{formatKz(p.price)} <small>/mes</small></td>
                ))}
              </tr>
              <tr>
                <td className="compare-label">Tipo</td>
                {compare.map(p => (
                  <td key={p.id} className="compare-value"><Badge variant="neutral">{p.type}</Badge></td>
                ))}
              </tr>
              <tr>
                <td className="compare-label">Quartos</td>
                {compare.map(p => (
                  <td key={p.id} className="compare-value">{p.beds > 0 ? `${p.beds} quarto${p.beds > 1 ? 's' : ''}` : '-'}</td>
                ))}
              </tr>
              <tr>
                <td className="compare-label">Casas de banho</td>
                {compare.map(p => (
                  <td key={p.id} className="compare-value">{p.baths > 0 ? `${p.baths} casa${p.baths > 1 ? 's' : ''} de banho` : '-'}</td>
                ))}
              </tr>
              <tr>
                <td className="compare-label">Area</td>
                {compare.map(p => (
                  <td key={p.id} className="compare-value">{p.area} m2</td>
                ))}
              </tr>
              <tr>
                <td className="compare-label">Localizacao</td>
                {compare.map(p => (
                  <td key={p.id} className="compare-value">{p.location}, {p.municipio}</td>
                ))}
              </tr>
              <tr>
                <td className="compare-label">Modo</td>
                {compare.map(p => (
                  <td key={p.id} className="compare-value">
                    <Badge variant={p.mode === 'direct' ? 'primary' : 'warning'}>
                      {p.mode === 'direct' ? 'Directo' : 'Com Intermediario'}
                    </Badge>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="compare-label">Negociavel</td>
                {compare.map(p => (
                  <td key={p.id} className="compare-value">{p.negotiable ? 'Sim' : 'Nao'}</td>
                ))}
              </tr>
              <tr>
                <td className="compare-label">Piscina</td>
                {compare.map(p => <td key={p.id} className="compare-value">{p.amenities.piscina ? 'Sim' : 'Nao'}</td>)}
              </tr>
              <tr>
                <td className="compare-label">Garagem</td>
                {compare.map(p => <td key={p.id} className="compare-value">{p.amenities.garagem ? 'Sim' : 'Nao'}</td>)}
              </tr>
              <tr>
                <td className="compare-label">Condominio</td>
                {compare.map(p => <td key={p.id} className="compare-value">{p.amenities.condominio ? 'Sim' : 'Nao'}</td>)}
              </tr>
              <tr>
                <td className="compare-label">Mobilado</td>
                {compare.map(p => <td key={p.id} className="compare-value">{p.amenities.mobilado ? 'Sim' : 'Nao'}</td>)}
              </tr>
              <tr>
                <td className="compare-label">Jardim</td>
                {compare.map(p => <td key={p.id} className="compare-value">{p.amenities.jardim ? 'Sim' : 'Nao'}</td>)}
              </tr>
              <tr>
                <td className="compare-label">Ar Condicionado</td>
                {compare.map(p => <td key={p.id} className="compare-value">{p.amenities.ar_cond ? 'Sim' : 'Nao'}</td>)}
              </tr>
              <tr>
                <td className="compare-label">Gerador</td>
                {compare.map(p => <td key={p.id} className="compare-value">{p.amenities.gerador ? 'Sim' : 'Nao'}</td>)}
              </tr>
              <tr>
                <td className="compare-label">Cisterna</td>
                {compare.map(p => <td key={p.id} className="compare-value">{p.amenities.cisterna ? 'Sim' : 'Nao'}</td>)}
              </tr>
              <tr>
                <td className="compare-label">Internet</td>
                {compare.map(p => {
                  const a = p.amenities as unknown as Record<string, boolean>
                  return <td key={p.id} className="compare-value">{'internet' in a ? (a.internet ? 'Sim' : 'Nao') : '-'}</td>
                })}
              </tr>
              <tr>
                <td className="compare-label">Quintal</td>
                {compare.map(p => {
                  const a = p.amenities as unknown as Record<string, boolean>
                  return <td key={p.id} className="compare-value">{'quintal' in a ? (a.quintal ? 'Sim' : 'Nao') : '-'}</td>
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
