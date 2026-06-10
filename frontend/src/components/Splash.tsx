interface SplashProps {
  onEnter: (role: 'tenant' | 'owner' | 'broker') => void
}

export function Splash({ onEnter }: SplashProps) {
  return (
    <div className="splash">
      <div className="splash-bg" />
      <div className="splash-content">
        <div className="logo-mark">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="12" fill="#1a1a2e" />
            <path d="M10 32L24 14L38 32H10Z" fill="#e8c56d" opacity="0.9" />
            <rect x="19" y="26" width="10" height="10" rx="2" fill="#1a1a2e" />
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
          <button className="btn-primary" onClick={() => onEnter('tenant')}>
            <span>Procurar Casa</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button className="btn-outline" onClick={() => onEnter('owner')}>Sou Proprietário</button>
          <button className="btn-ghost" onClick={() => onEnter('broker')}>Sou Intermediário</button>
        </div>
        <div className="stats-row">
          <div className="stat"><strong>2 400+</strong><span>Imóveis listados</span></div>
          <div className="stat"><strong>840</strong><span>Intermediários</span></div>
          <div className="stat"><strong>98%</strong><span>Clientes satisfeitos</span></div>
        </div>
      </div>
      <div className="splash-visual">
        <div className="property-float card1">
          <div className="pf-img" style={{ background: '#c8a97e' }} />
          <div className="pf-info"><strong>Talatona Premium</strong><span>350 000 Kz/mês</span></div>
        </div>
        <div className="property-float card2">
          <div className="pf-img" style={{ background: '#7eb5c8' }} />
          <div className="pf-info"><strong>Miramar T3</strong><span>180 000 Kz/mês</span></div>
        </div>
        <div className="property-float card3">
          <div className="pf-img" style={{ background: '#8dc87e' }} />
          <div className="pf-info"><strong>Alvalade Moderno</strong><span>120 000 Kz/mês</span></div>
        </div>
      </div>
    </div>
  )
}
