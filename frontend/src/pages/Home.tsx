import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/pages/home.css'

export function Home() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const handleEnter = (role: 'tenant' | 'owner' | 'broker') => {
    if (role === 'tenant') {
      setUser({ id: 0, name: 'Visitante', email: '', role: 'tenant' })
      navigate('/explorar')
    } else if (role === 'owner') {
      navigate('/registar?role=owner')
    } else {
      navigate('/registar?role=broker')
    }
  }

  return (
    <div className="splash">
      <div className="splash-bg" />
      <div className="splash-content">
        <div className="logo-mark">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="12" fill="#0f1724" />
            <path d="M10 32L24 14L38 32H10Z" fill="#c9a03c" opacity="0.9" />
            <rect x="19" y="26" width="10" height="10" rx="2" fill="#0f1724" />
          </svg>
          <span className="logo-text">Arrenda<strong>Ki</strong></span>
        </div>
        <h1 className="splash-title">
          Encontra o teu lar <br /><em>sem complicações.</em>
        </h1>
        <p className="splash-sub">
          A plataforma angolana de arrendamento com ou sem intermediário. Transparente, segura e moderna.
        </p>
        <div className="splash-actions">
          <button className="btn-primary" onClick={() => handleEnter('tenant')}>
            <span>Procurar Casa</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button className="btn-outline" onClick={() => navigate('/login')}>Entrar</button>
          <button className="btn-ghost" onClick={() => navigate('/registar')}>Criar Conta</button>
        </div>
        <div className="stats-row">
          <div className="stat"><strong>2 400+</strong><span>Imóveis listados</span></div>
          <div className="stat"><strong>840</strong><span>Intermediários</span></div>
          <div className="stat"><strong>98%</strong><span>Clientes satisfeitos</span></div>
        </div>
      </div>
      <div className="splash-visual">
        <div className="property-float card1">
          <div className="pf-img" style={{ background: 'linear-gradient(135deg, #c9a03c, #8b6f4e)' }} />
          <div className="pf-info"><strong>Talatona Premium</strong><span>350 000 Kz/mês</span></div>
        </div>
        <div className="property-float card2">
          <div className="pf-img" style={{ background: 'linear-gradient(135deg, #1e293b, #0f1724)' }} />
          <div className="pf-info"><strong>Miramar T3</strong><span>180 000 Kz/mês</span></div>
        </div>
        <div className="property-float card3">
          <div className="pf-img" style={{ background: 'linear-gradient(135deg, #8b6f4e, #c9a03c)' }} />
          <div className="pf-info"><strong>Alvalade Moderno</strong><span>120 000 Kz/mês</span></div>
        </div>
      </div>
    </div>
  )
}
