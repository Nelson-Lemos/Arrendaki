interface ContactModalProps {
  type: 'direct' | 'broker' | 'video' | 'notifications' | 'addProperty'
  propertyTitle?: string
  propertyPrice?: string
  onClose: () => void
  onSend: () => void
}

export function ContactModal({ type, propertyTitle, propertyPrice, onClose, onSend }: ContactModalProps) {
  const notifications = [
    { icon: '🏠', msg: 'Novo imóvel em Talatona que pode interessar-lhe', time: 'Há 5 min' },
    { icon: '💬', msg: 'O intermediário Ana Santos respondeu ao seu pedido', time: 'Há 2 horas' },
    { icon: '⭐', msg: 'O imóvel "Penthouse Kinaxixi" foi colocado em destaque', time: 'Hoje' },
    { icon: '📉', msg: 'Redução de preço: T3 em Miramar agora a 250 000 Kz', time: 'Ontem' },
  ]

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-panel modal-sm">
        <button className="modal-close" onClick={onClose}>✕</button>

        {type === 'direct' && (
          <div className="contact-form">
            <h3>Contactar Proprietário</h3>
            {propertyTitle && <p>{propertyTitle}{propertyPrice ? ` · ${propertyPrice}` : ''}</p>}
            <div className="form-group">
              <label>O seu nome</label>
              <input type="text" className="form-control" placeholder="Nome completo" />
            </div>
            <div className="form-group">
              <label>Telefone / WhatsApp</label>
              <input type="tel" className="form-control" placeholder="+244 9XX XXX XXX" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="email@exemplo.com" />
            </div>
            <div className="form-group">
              <label>Mensagem</label>
              <textarea className="form-control" placeholder="Olá, tenho interesse neste imóvel. Podemos agendar uma visita?" />
            </div>
            <button className="btn-submit" onClick={onSend}>📩 Enviar Mensagem</button>
          </div>
        )}

        {type === 'broker' && (
          <div className="contact-form">
            <h3>Contratar Intermediário</h3>
            <div className="form-group">
              <label>Imóvel de interesse (opcional)</label>
              <select className="form-control">
                <option value="">Seleccionar imóvel...</option>
              </select>
            </div>
            <div className="form-group">
              <label>O que precisas?</label>
              <select className="form-control">
                <option>Encontrar casa para arrendar</option>
                <option>Arrendar imóvel que tenho</option>
                <option>Negociação de contrato</option>
                <option>Visita acompanhada</option>
                <option>Verificação de documentos</option>
              </select>
            </div>
            <div className="form-group">
              <label>Mensagem</label>
              <textarea className="form-control" placeholder="Descreve o que precisas de ajuda..." />
            </div>
            <button className="btn-submit" onClick={onSend}>🤝 Enviar Pedido</button>
          </div>
        )}

        {type === 'video' && (
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
              Vídeo: {propertyTitle}
            </h3>
            <div className="video-player">
              <div className="play-icon">▶</div>
              <p style={{ fontSize: '0.88rem', opacity: 0.6 }}>Tour virtual em 360°</p>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: '0.75rem', textAlign: 'center' }}>
              Vídeo demonstrativo — integração com YouTube/Vimeo disponível
            </p>
          </div>
        )}

        {type === 'notifications' && (
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Notificações</h3>
            {notifications.map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
                <div style={{ fontSize: '1.3rem' }}>{n.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.88rem' }}>{n.msg}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--gray-400)', marginTop: 2 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
