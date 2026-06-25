import type { Broker } from '../types'

interface BrokersGridProps {
  brokers: Broker[]
  onHire: (broker: Broker) => void
}

export function BrokersGrid({ brokers, onHire }: BrokersGridProps) {
  return (
    <div className="brokers-grid">
      {brokers.map(b => (
        <div key={b.id} className="broker-card">
          <div className="broker-avatar">{b.avatar}</div>
          <div className="broker-name">{b.name}</div>
          <div className="broker-area">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {b.area}
          </div>
          <div className="broker-rating">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#c9a03c" stroke="#c9a03c"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            {b.rating} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({b.reviews} avaliações)</span>
          </div>
          <div className="broker-stats">
            <span><strong>{b.deals}</strong> negócios</span>
            <span><strong>{b.experience}</strong> anos exp.</span>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 10 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            {b.speciality}
          </div>
          {b.certified
            ? <span className="broker-badge">Certificado ArrendaKi</span>
            : <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Em verificação</span>
          }
          <button className="btn-hire" onClick={() => onHire(b)}>Contratar Intermediário</button>
        </div>
      ))}
    </div>
  )
}
