export function HowItWorks() {
  return (
    <div className="how-container">
      <h2>Como funciona o ArrendaKi</h2>
      <div className="steps-flow">
        <div className="step">
          <div className="step-icon">🏠</div>
          <h4>1. Regista o imóvel</h4>
          <p>Proprietários adicionam fotos, vídeo e detalhes completos. O imóvel fica visível instantaneamente.</p>
        </div>
        <div className="step-arrow">→</div>
        <div className="step">
          <div className="step-icon">🔍</div>
          <h4>2. O cliente explora</h4>
          <p>Filtros avançados, vídeo tour e localização no mapa ajudam a encontrar o imóvel certo.</p>
        </div>
        <div className="step-arrow">→</div>
        <div className="step">
          <div className="step-icon">🤝</div>
          <h4>3. Escolhe o modo</h4>
          <p>Contacto directo com o proprietário, ou escolhe um intermediário certificado para gerir tudo.</p>
        </div>
        <div className="step-arrow">→</div>
        <div className="step">
          <div className="step-icon">📄</div>
          <h4>4. Contrato & chaves</h4>
          <p>Contratos digitais, pagamentos seguros e transferência de chaves com registo na plataforma.</p>
        </div>
      </div>

      <div className="modes-compare">
        <div className="mode-card direct">
          <div className="mode-badge">Sem Intermediário</div>
          <h3>Directo</h3>
          <ul>
            <li>✓ Fala directamente com o proprietário</li>
            <li>✓ Sem taxas de intermediação</li>
            <li>✓ Mais rápido e flexível</li>
            <li>✗ Tens de gerir toda a papelada</li>
            <li>✗ Sem suporte em caso de conflito</li>
          </ul>
          <p className="mode-fee">Taxa da plataforma: <strong>0 Kz</strong></p>
        </div>
        <div className="mode-card brokered featured">
          <div className="mode-badge">Com Intermediário</div>
          <h3>Assistido</h3>
          <ul>
            <li>✓ Intermediário trata de tudo</li>
            <li>✓ Contratos e documentação incluídos</li>
            <li>✓ Mediação em caso de conflito</li>
            <li>✓ Visitas agendadas e acompanhadas</li>
            <li>✓ Verificação do imóvel garantida</li>
          </ul>
          <p className="mode-fee">Taxa: <strong>5–8%</strong> do valor mensal</p>
        </div>
      </div>
    </div>
  )
}
