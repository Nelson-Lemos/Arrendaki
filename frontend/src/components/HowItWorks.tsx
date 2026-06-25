export function HowItWorks() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', textAlign: 'center', marginBottom: '2.5rem' }}>
        Como funciona o ArrendaKi
      </h2>
      <div className="steps-flow" style={{ display: 'flex', alignItems: 'flex-start', gap: 0, marginBottom: '3rem' }}>
        <div className="step" style={{ flex: 1, textAlign: 'center', padding: '1.5rem 1rem' }}>
          <div className="step-icon" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" style={{ margin: '0 auto' }}>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <h4 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>1. Regista o imóvel</h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Proprietários adicionam fotos, vídeo e detalhes completos. O imóvel fica visível instantaneamente.
          </p>
        </div>
        <div className="step-arrow" style={{ paddingTop: '2.5rem', fontSize: '1.5rem', color: 'var(--border)', flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
        <div className="step" style={{ flex: 1, textAlign: 'center', padding: '1.5rem 1rem' }}>
          <div className="step-icon" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" style={{ margin: '0 auto' }}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <h4 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>2. O cliente explora</h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Filtros avançados, vídeo tour e localização no mapa ajudam a encontrar o imóvel certo.
          </p>
        </div>
        <div className="step-arrow" style={{ paddingTop: '2.5rem', fontSize: '1.5rem', color: 'var(--border)', flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
        <div className="step" style={{ flex: 1, textAlign: 'center', padding: '1.5rem 1rem' }}>
          <div className="step-icon" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" style={{ margin: '0 auto' }}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h4 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>3. Escolhe o modo</h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Contacto directo com o proprietário, ou escolhe um intermediário certificado para gerir tudo.
          </p>
        </div>
        <div className="step-arrow" style={{ paddingTop: '2.5rem', fontSize: '1.5rem', color: 'var(--border)', flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
        <div className="step" style={{ flex: 1, textAlign: 'center', padding: '1.5rem 1rem' }}>
          <div className="step-icon" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" style={{ margin: '0 auto' }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <h4 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>4. Contrato & chaves</h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Contratos digitais, pagamentos seguros e transferência de chaves com registo na plataforma.
          </p>
        </div>
      </div>

      <div className="modes-compare" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div className="mode-card direct" style={{ border: '1.5px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
          <div className="mode-badge" style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, background: 'var(--border-light)', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Sem Intermediário</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Directo</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: '1rem' }}>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              Fala directamente com o proprietário
            </li>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              Sem taxas de intermediação
            </li>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              Mais rápido e flexível
            </li>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Tens de gerir toda a papelada
            </li>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Sem suporte em caso de conflito
            </li>
          </ul>
          <p className="mode-fee" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
            Taxa da plataforma: <strong style={{ color: 'var(--primary)' }}>0 Kz</strong>
          </p>
        </div>
        <div className="mode-card brokered featured" style={{ border: '1.5px solid var(--accent)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', background: 'rgba(201, 160, 60, 0.04)' }}>
          <div className="mode-badge" style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, background: 'var(--accent)', color: 'var(--primary)', marginBottom: '0.75rem' }}>Com Intermediário</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Assistido</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: '1rem' }}>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              Intermediário trata de tudo
            </li>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              Contratos e documentação incluídos
            </li>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              Mediação em caso de conflito
            </li>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              Visitas agendadas e acompanhadas
            </li>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              Verificação do imóvel garantida
            </li>
          </ul>
          <p className="mode-fee" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
            Taxa: <strong style={{ color: 'var(--primary)' }}>5–8%</strong> do valor mensal
          </p>
        </div>
      </div>
    </div>
  )
}
