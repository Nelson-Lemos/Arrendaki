import type { Property } from '../types'

interface DashboardProps {
  user: { name: string }
  properties: Property[]
  onClose: () => void
  onAddProperty: () => void
}

function formatKz(val: number): string {
  return val.toLocaleString('pt-AO') + ' Kz'
}

export function Dashboard({ user, properties, onClose, onAddProperty }: DashboardProps) {
  const userProps = properties.slice(0, 3)

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-panel modal-dashboard">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="dashboard">
          <div className="dash-header">
            <h2>Meu Painel — {user?.name || 'Utilizador'}</h2>
            <button className="add-property-btn" onClick={onAddProperty}>+ Adicionar Imóvel</button>
          </div>
          <div className="kpi-row">
            <div className="kpi-card">
              <div className="kpi-label">Imóveis Activos</div>
              <div className="kpi-val">3</div>
              <div className="kpi-trend up">↑ +1 este mês</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Visualizações</div>
              <div className="kpi-val">847</div>
              <div className="kpi-trend up">↑ +23% vs mês passado</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Contactos Recebidos</div>
              <div className="kpi-val">34</div>
              <div className="kpi-trend up">↑ +8 esta semana</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Receita Est. Mensal</div>
              <div className="kpi-val">850K</div>
              <div className="kpi-trend">Kz · estável</div>
            </div>
          </div>
          <div className="dash-tabs">
            <button className="dash-tab active">Meus Imóveis</button>
            <button className="dash-tab">Contactos</button>
            <button className="dash-tab">Contratos</button>
            <button className="dash-tab">Pagamentos</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {userProps.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, border: '1px solid var(--gray-100)', borderRadius: 'var(--radius-md)', padding: '12px 16px', background: 'var(--white)' }}>
                <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-sm)', backgroundColor: p.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🏠</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{p.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>📍 {p.location} · {p.type}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{formatKz(p.price)}/mês</div>
                  <div style={{ fontSize: '0.78rem', marginTop: 2 }}><span style={{ background: 'var(--green-light)', color: 'var(--green)', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>Activo</span></div>
                </div>
                <button style={{ background: 'none', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', padding: '6px 12px', cursor: 'pointer', fontSize: '0.82rem', color: 'var(--gray-600)' }}>Editar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
