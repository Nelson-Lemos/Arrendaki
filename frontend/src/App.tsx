import { lazy, Suspense, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { Navbar } from './components/Navbar'
import { ToastContainer } from './components/Toast'
import { ChatBot } from './components/ChatBot'
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
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })))
const OwnerProfilePage = lazy(() => import('./pages/OwnerProfilePage').then(m => ({ default: m.OwnerProfilePage })))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage').then(m => ({ default: m.FavoritesPage })))
const ComparePage = lazy(() => import('./pages/ComparePage').then(m => ({ default: m.ComparePage })))
const ChatPage = lazy(() => import('./pages/ChatPage').then(m => ({ default: m.ChatPage })))

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const } },
}

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

function AppRoutes() {
  const location = useLocation()
  const { toasts, showToast } = useToast()
  const [contactModalType, setContactModalType] = useState<'direct' | 'broker' | 'video' | 'notifications' | 'addProperty' | null>(null)

  return (
    <FavoritesProvider showToast={showToast}>
      <Suspense fallback={null}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/*" element={<LayoutWithNav />} />
          </Routes>
        </AnimatePresence>
        <ToastContainer toasts={toasts} />
      </Suspense>
    </FavoritesProvider>
  )

  function LayoutWithNav() {
    return (
      <>
        <Navbar />
        <Suspense fallback={<BrowseSkeleton />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/explorar" element={
                <AnimatedPage>
                  <Browse
                    contactModalType={contactModalType}
                    onContactModalClose={() => setContactModalType(null)}
                    onContactSend={() => { setContactModalType(null); showToast('Mensagem enviada!', 'success') }}
                    onHireBroker={() => setContactModalType('broker')}
                  />
                </AnimatedPage>
              } />
              <Route path="/mapa" element={<AnimatedPage><MapPage /></AnimatedPage>} />
              <Route path="/intermediarios" element={<AnimatedPage><BrokersPage /></AnimatedPage>} />
              <Route path="/como-funciona" element={<AnimatedPage><HowItWorksPage /></AnimatedPage>} />
              <Route path="/login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
              <Route path="/registar" element={<AnimatedPage><RegisterPage /></AnimatedPage>} />
              <Route path="/dashboard" element={<AnimatedPage><DashboardPage /></AnimatedPage>} />
              <Route path="/perfil" element={<AnimatedPage><ProfilePage /></AnimatedPage>} />
              <Route path="/proprietario/:id" element={<AnimatedPage><OwnerProfilePage /></AnimatedPage>} />
              <Route path="/favoritos" element={<AnimatedPage><FavoritesPage /></AnimatedPage>} />
              <Route path="/comparar" element={<AnimatedPage><ComparePage /></AnimatedPage>} />
              <Route path="/mensagens" element={<AnimatedPage><ChatPage /></AnimatedPage>} />
              <Route path="/imovel/:id" element={
                <Suspense fallback={<DetailSkeleton />}>
                  <AnimatedPage><PropertyDetailPage /></AnimatedPage>
                </Suspense>
              } />
              <Route path="*" element={<Navigate to="/explorar" replace />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
        <ChatBot />
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
