import { useState, useEffect } from 'react'
import { api } from '../services/api'
import { BrokersGrid } from '../components/BrokersGrid'
import { ContactModal } from '../components/ContactModal'
import { ToastContainer } from '../components/Toast'
import { useToast } from '../hooks/useToast'
import type { Broker } from '../types'

export function BrokersPage() {
  const { toasts, showToast } = useToast()
  const [brokers, setBrokers] = useState<Broker[]>([])
  const [contactBroker, setContactBroker] = useState<Broker | null>(null)

  useEffect(() => {
    api.getBrokers().then(setBrokers).catch(() => {})
  }, [])

  const hireBroker = (broker: Broker) => {
    setContactBroker(broker)
    showToast(`Pedido enviado a ${broker.name}! Resposta em até 2 horas.`, 'success')
  }

  return (
    <div>
      <div className="brokers-header">
        <h2>Intermediários</h2>
        <p>Profissionais certificados para te ajudar a encontrar o imóvel ideal ou vender o teu mais rápido.</p>
      </div>
      <BrokersGrid brokers={brokers} onHire={hireBroker} />
      {contactBroker && (
        <ContactModal
          type="broker"
          onClose={() => setContactBroker(null)}
          onSend={() => { setContactBroker(null); showToast('Mensagem enviada!', 'success') }}
        />
      )}
      <ToastContainer toasts={toasts} />
    </div>
  )
}
