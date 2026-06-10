import { useState, useCallback } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { useProperties } from './hooks/useProperties'
import { useToast } from './hooks/useToast'
import { Splash } from './components/Splash'
import { Navbar } from './components/Navbar'
import { SearchHero } from './components/SearchHero'
import { PropertyCard } from './components/PropertyCard'
import { PropertyModal } from './components/PropertyModal'
import { ContactModal } from './components/ContactModal'
import { RegisterModal } from './components/RegisterModal'
import { Dashboard } from './components/Dashboard'
import { BrokersGrid } from './components/BrokersGrid'
import { MapView } from './components/MapView'
import { HowItWorks } from './components/HowItWorks'
import { ToastContainer } from './components/Toast'
import type { Property, Broker } from './types'
import './style.css'

function AppContent() {
  const { user, isAuthenticated, setUser } = useAuth()
  const { properties, fetchProperties } = useProperties()
  const { toasts, showToast } = useToast()

  const [showSplash, setShowSplash] = useState(true)
  const [activeView, setActiveView] = useState('browse')
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [contactModalType, setContactModalType] = useState<'direct' | 'broker' | 'video' | 'notifications' | 'addProperty' | null>(null)
  const [showRegister, setShowRegister] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)

  const handleEnter = useCallback((role: 'tenant' | 'owner' | 'broker') => {
    setShowSplash(false)
    if (role === 'tenant') {
      setUser({ id: 0, name: 'Visitante', email: '', role: 'tenant' })
    } else {
      setShowRegister(true)
    }
  }, [setUser])

  const handleFilter = useCallback((filters: Record<string, string>) => {
    const apiFilters: any = {}
    if (filters.q) apiFilters.q = filters.q
    if (filters.type) apiFilters.type = filters.type
    if (filters.mode) apiFilters.mode = filters.mode
    if (filters.quick && filters.quick !== 'all') {
      const quickMap: Record<string, any> = {
        featured: { featured: true },
        video: { hasVideo: true },
        new: { isNew: true },
        negotiable: { negotiable: true },
      }
      Object.assign(apiFilters, quickMap[filters.quick])
    }
    if (filters.price) {
      const [min, max] = filters.price.split('-')
      if (min) apiFilters.priceMin = Number(min)
      if (max && max !== '+') apiFilters.priceMax = Number(max)
    }
    fetchProperties(apiFilters)
  }, [fetchProperties])

  const toggleFav = useCallback((e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        showToast('Removido dos favoritos')
      } else {
        next.add(id)
        showToast('❤️ Adicionado aos favoritos!')
      }
      return next
    })
  }, [showToast])

  const openProperty = useCallback((id: number) => {
    const p = properties.find(x => x.id === id)
    if (p) setSelectedProperty(p)
  }, [properties])

  const contactDirect = useCallback((_id: number) => {
    setSelectedProperty(null)
    setContactModalType('direct')
  }, [])

  const contactBroker = useCallback((_id: number) => {
    setSelectedProperty(null)
    setContactModalType('broker')
  }, [])

  const hireBroker = useCallback((broker: Broker) => {
    setContactModalType('broker')
    showToast(`Pedido enviado a ${broker.name}! Resposta em até 2 horas.`, 'success')
  }, [showToast])

  return (
    <>
      {showSplash ? (
        <Splash onEnter={handleEnter} />
      ) : (
        <div className="app">
          <Navbar
            activeView={activeView}
            onViewChange={setActiveView}
            onRegister={() => setShowRegister(true)}
            onDashboard={() => isAuthenticated ? setShowDashboard(true) : setShowRegister(true)}
            onNotifications={() => setContactModalType('notifications')}
          />

          {activeView === 'browse' && (
            <div className="view active-view">
              <SearchHero onFilter={handleFilter} />
              <div className="browse-layout">
                <aside className="sidebar">
                  <div className="sidebar-section">
                    <h4>Preço máximo</h4>
                    <input type="range" min="50000" max="1000000" step="10000" defaultValue="1000000" style={{ width: '100%' }} />
                    <div className="price-range-display">Até <span>1 000 000</span> Kz</div>
                  </div>
                  <div className="sidebar-section">
                    <h4>Características</h4>
                    <label className="check-item"><input type="checkbox" /> Piscina</label>
                    <label className="check-item"><input type="checkbox" /> Garagem</label>
                    <label className="check-item"><input type="checkbox" /> Condomínio Fechado</label>
                    <label className="check-item"><input type="checkbox" /> Mobilado</label>
                    <label className="check-item"><input type="checkbox" /> Jardim</label>
                  </div>
                </aside>
                <main className="properties-grid">
                  {properties.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--gray-400)' }}>
                      <div style={{ fontSize: '3rem' }}>🔍</div>
                      <p style={{ fontSize: '1rem', marginTop: '0.75rem' }}>Nenhum imóvel encontrado com esses critérios.</p>
                    </div>
                  ) : (
                    properties.map(p => (
                      <PropertyCard
                        key={p.id}
                        property={p}
                        isFav={favorites.has(p.id)}
                        onToggleFav={toggleFav}
                        onClick={openProperty}
                      />
                    ))
                  )}
                </main>
              </div>
            </div>
          )}

          {activeView === 'map' && (
            <div className="view active-view">
              <MapView properties={properties} onPropertyClick={openProperty} />
            </div>
          )}

          {activeView === 'brokers' && (
            <div className="view active-view">
              <BrokersGrid onHire={hireBroker} />
            </div>
          )}

          {activeView === 'howItWorks' && (
            <div className="view active-view">
              <HowItWorks />
            </div>
          )}

          {/* Modals */}
          {selectedProperty && (
            <PropertyModal
              property={selectedProperty}
              onClose={() => setSelectedProperty(null)}
              onContactDirect={contactDirect}
              onContactBroker={contactBroker}
              onVideo={() => { setSelectedProperty(null); setContactModalType('video') }}
            />
          )}

          {contactModalType && (
            <ContactModal
              type={contactModalType}
              onClose={() => setContactModalType(null)}
              onSend={() => { setContactModalType(null); showToast('✅ Mensagem enviada!', 'success') }}
            />
          )}

          {showRegister && (
            <RegisterModal
              onClose={() => setShowRegister(false)}
            />
          )}

          {showDashboard && user && (
            <Dashboard
              user={user}
              properties={properties}
              onClose={() => setShowDashboard(false)}
              onAddProperty={() => { setShowDashboard(false); setContactModalType('addProperty') }}
            />
          )}

          <ToastContainer toasts={toasts} />
        </div>
      )}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
