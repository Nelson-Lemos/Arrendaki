import React from 'react'

interface ContactModalProps {
  type: 'direct' | 'broker' | 'video' | 'notifications' | 'addProperty'
  propertyTitle?: string
  propertyPrice?: string
  onClose: () => void
  onSend: () => void
}

export function ContactModal({ type, propertyTitle, propertyPrice, onClose, onSend }: ContactModalProps) {
  const notifications = [
    { icon: 'home', msg: 'Novo imóvel em Talatona que pode interessar-lhe', time: 'Há 5 min' },
    { icon: 'message', msg: 'O intermediário Ana Santos respondeu ao seu pedido', time: 'Há 2 horas' },
    { icon: 'star', msg: 'O imóvel "Penthouse Kinaxixi" foi colocado em destaque', time: 'Hoje' },
    { icon: 'trending', msg: 'Redução de preço: T3 em Miramar agora a 250 000 Kz', time: 'Ontem' },
  ]

  const notifIcons: Record<string, React.ReactElement> = {
    home: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    message: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    star: <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    trending: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  }

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-panel modal-sm">
        <button className="modal-close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

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
            <button className="btn-submit" onClick={onSend}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline' }}><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              Enviar Mensagem
            </button>
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
            <button className="btn-submit" onClick={onSend}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline' }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Enviar Pedido
            </button>
          </div>
        )}

        {type === 'video' && (
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
              Vídeo: {propertyTitle}
            </h3>
            <div className="video-player">
              <div className="play-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </div>
              <p style={{ fontSize: '0.88rem', opacity: 0.6 }}>Tour virtual em 360°</p>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem', textAlign: 'center' }}>
              Vídeo demonstrativo — integração com YouTube/Vimeo disponível
            </p>
          </div>
        )}

        {type === 'notifications' && (
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Notificações</h3>
            {notifications.map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ flexShrink: 0 }}>{notifIcons[n.icon]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.88rem' }}>{n.msg}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 2 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {type === 'addProperty' && (
          <div className="contact-form">
            <h3>Adicionar Imóvel</h3>
            <p>Preenche os dados do teu imóvel para publicar na plataforma.</p>
            <div className="form-group">
              <label>Título</label>
              <input type="text" className="form-control" placeholder="Ex: T3 no Miramar" />
            </div>
            <div className="form-group">
              <label>Localização</label>
              <input type="text" className="form-control" placeholder="Bairro, Município" />
            </div>
            <div className="form-group">
              <label>Valor (Kz/mês)</label>
              <input type="number" className="form-control" placeholder="150000" />
            </div>
            <div className="form-group">
              <label>Descrição</label>
              <textarea className="form-control" placeholder="Descreve o imóvel..." />
            </div>
            <button className="btn-submit" onClick={onSend}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline' }}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Publicar Imóvel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}