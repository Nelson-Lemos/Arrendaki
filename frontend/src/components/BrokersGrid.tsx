import { useState, useEffect } from 'react'
import type { Broker } from '../types'

interface BrokersGridProps {
  onHire: (broker: Broker) => void
}

export function BrokersGrid({ onHire }: BrokersGridProps) {
  const [brokers, setBrokers] = useState<Broker[]>([])

  useEffect(() => {
    fetch('http://localhost:8000/brokers')
      .then(res => res.json())
      .then(setBrokers)
      .catch(() => {})
  }, [])

  return (
    <>
      <div className="brokers-header">
        <h2>Intermediários Certificados</h2>
        <p>Profissionais verificados pela plataforma. Negoceiam em seu nome, tratam da papelada e acompanham todo o processo.</p>
      </div>
      <div className="brokers-grid">
        {brokers.map(b => (
          <div key={b.id} className="broker-card">
            <div className="broker-avatar">{b.avatar}</div>
            <div className="broker-name">{b.name}</div>
            <div className="broker-area">📍 {b.area}</div>
            <div className="broker-rating">
              {'⭐'.repeat(Math.round(b.rating))} {b.rating} <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>({b.reviews} avaliações)</span>
            </div>
            <div className="broker-stats">
              <span><strong>{b.deals}</strong> negócios</span>
              <span><strong>{b.experience}</strong> anos exp.</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--gray-600)', marginBottom: 10 }}>🎯 {b.speciality}</div>
            {b.certified
              ? <span className="broker-badge">✓ Certificado ArrendaKi</span>
              : <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Em verificação</span>
            }
            <button className="btn-hire" onClick={() => onHire(b)}>Contratar Intermediário</button>
          </div>
        ))}
      </div>
    </>
  )
}
