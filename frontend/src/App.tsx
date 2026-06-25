import { lazy, Suspense, useState, useCallback } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { ToastContainer } from './components/Toast'
import { useToast } from './hooks/useToast'
import { BrowseSkeleton, DetailSkeleton } from './components/Skeleton'

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })))
const Browse = lazy(() => import('./pages/Browse').then(m => ({ default: m.Browse })))
const MapPage = lazy(() => import('./pages/MapPage').then(m => ({ default: m.MapPage })))
const BrokersPage = lazy(() => import('./pages/BrokersPage').then(m => ({ default: m.BrokersPage })))
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })))
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import('./pages/RegisterPage').then(m => ({ default: m.RegisterPage })))
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const PropertyDetailPage = lazy(() => import('./pages/PropertyDetailPage').then(m => ({ default: m.PropertyDetailPage })))

function AppRoutes() {
  const { toasts, showToast } = useToast()
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [contactModalType, setContactModalType] = useState<'direct' | 'broker' | 'video' | 'notifications' | 'addProperty' | null>(null)

  const toggleFav = useCallback((e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        showToast('Removido dos favoritos')
      } else {
        next.add(id)
        showToast('Adicionado aos favoritos!')
      }
      return next
    })
  }, [showToast])

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<LayoutWithNav />} />
      </Routes>
      <ToastContainer toasts={toasts} />
    </Suspense>
  )

  function LayoutWithNav() {
    return (
      <>
        <Navbar />
        <Suspense fallback={<BrowseSkeleton />}>
          <Routes>
            <Route path="/explorar" element={
              <Browse
                favorites={favorites}
                onToggleFav={toggleFav}
                contactModalType={contactModalType}
                onContactModalClose={() => setContactModalType(null)}
                onContactSend={() => { setContactModalType(null); showToast('Mensagem enviada!', 'success') }}
                onHireBroker={() => setContactModalType('broker')}
              />
            } />
            <Route path="/mapa" element={<MapPage />} />
            <Route path="/intermediarios" element={<BrokersPage />} />
            <Route path="/como-funciona" element={<HowItWorksPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registar" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/imovel/:id" element={
              <Suspense fallback={<DetailSkeleton />}>
                <PropertyDetailPage />
              </Suspense>
            } />
            <Route path="*" element={<Navigate to="/explorar" replace />} />
          </Routes>
        </Suspense>
        <footer className="app-footer">
          &copy; {new Date().getFullYear()} ArrendaKi — Plataforma Angolana de Arrendamento
        </footer>
      </>
    )
  }
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
