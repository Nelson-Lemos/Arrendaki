import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProperties } from '../hooks/useProperties'
import { ContactModal } from '../components/ContactModal'
import { useState } from 'react'
import '../styles/pages/dashboard.css'

function formatKz(val: number): string {
  return val.toLocaleString('pt-AO') + ' Kz'
}

export function DashboardPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const { properties } = useProperties()
  const [showAddProperty, setShowAddProperty] = useState(false)

  if (!isAuthenticated || !user) {
    navigate('/login')
    return null
  }

  const userProps = properties.slice(0, 3)

  return (
    <div className="dashboard-page">
      <div className="dash-container">
        <div className="dash-header">
          <div>
            <h2>Meu Painel</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Bem-vindo, {user.name}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="add-property-btn" onClick={() => setShowAddProperty(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Adicionar Imóvel
            </button>
            <button
              onClick={logout}
              style={{
                background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                padding: '10px 16px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.85rem',
              }}
            >
              Sair
            </button>
          </div>
        </div>

        <div className="kpi-row">
          <div className="kpi-card">
            <div className="kpi-label">Imóveis Activos</div>
            <div className="kpi-val">3</div>
            <div className="kpi-trend up">+1 este mês</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Visualizações</div>
            <div className="kpi-val">847</div>
            <div className="kpi-trend up">+23% vs mês passado</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Contactos Recebidos</div>
            <div className="kpi-val">34</div>
            <div className="kpi-trend up">+8 esta semana</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Receita Est. Mensal</div>
            <div className="kpi-val">850K</div>
            <div className="kpi-trend" style={{ color: 'var(--text-muted)' }}>Kz · estável</div>
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
            <div key={p.id} className="dash-property-item">
              <div className="dash-property-img">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} loading="lazy" />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${p.color}, #00000030)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                  </div>
                )}
              </div>
              <div className="dash-property-info">
                <div className="dpi-title">{p.title}</div>
                <div className="dpi-location">{p.location} · {p.type}</div>
              </div>
              <div className="dash-property-price">
                <div className="dpp-val">{formatKz(p.price)}/mês</div>
                <span className="dash-property-status">Activo</span>
              </div>
              <button className="dash-edit-btn">Editar</button>
            </div>
          ))}
        </div>
      </div>

      {showAddProperty && (
        <ContactModal
          type="addProperty"
          onClose={() => setShowAddProperty(false)}
          onSend={() => setShowAddProperty(false)}
        />
      )}
    </div>
  )
}
