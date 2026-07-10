import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import '../styles/pages/home.css'

const categories = [
  { icon: '🏠', label: '1 Quarto', query: '1' },
  { icon: '🏡', label: '2 Quartos', query: '2' },
  { icon: '🏘', label: '3 Quartos', query: '3' },
  { icon: '🏢', label: 'Apartamentos', query: 'apartamento' },
  { icon: '🏚', label: 'Vivendas', query: 'vivenda' },
  { icon: '🏪', label: 'Lojas', query: 'loja' },
  { icon: '🏢', label: 'Escritórios', query: 'escritorio' },
]

const neighborhoods = [
  { name: 'Benfica', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop' },
  { name: 'Talatona', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop' },
  { name: 'Camama', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop' },
  { name: 'Golf 2', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop' },
  { name: 'Kilamba', image: 'https://images.unsplash.com/photo-1600566753086-00f18f6bae4a?w=400&h=300&fit=crop' },
  { name: 'Zango', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&h=300&fit=crop' },
  { name: 'Rocha Pinto', image: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=400&h=300&fit=crop' },
  { name: 'Sapú', image: 'https://images.unsplash.com/photo-1600566752229-250ed62028e4?w=400&h=300&fit=crop' },
  { name: 'Patriota', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=400&h=300&fit=crop' },
  { name: 'Viana', image: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=400&h=300&fit=crop' },
]

const featured = [
  { id: 1, title: 'Apartamento T3 em Talatona', price: '350 000', beds: 3, area: '140m²', neighborhood: 'Talatona', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop' },
  { id: 2, title: 'Vivenda com Piscina no Benfica', price: '650 000', beds: 4, area: '280m²', neighborhood: 'Benfica', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop' },
  { id: 3, title: 'Apartamento T2 no Golf 2', price: '180 000', beds: 2, area: '95m²', neighborhood: 'Golf 2', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop' },
  { id: 4, title: 'Moradia T4 em Camama', price: '280 000', beds: 4, area: '200m²', neighborhood: 'Camama', image: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=600&h=400&fit=crop' },
  { id: 5, title: 'Escritório no Patriota', price: '120 000', beds: 1, area: '60m²', neighborhood: 'Patriota', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&h=400&fit=crop' },
  { id: 6, title: 'Loja Comercial na Viana', price: '200 000', beds: 1, area: '120m²', neighborhood: 'Viana', image: 'https://images.unsplash.com/photo-1600566753086-00f18f6bae4a?w=600&h=400&fit=crop' },
]

const partners = [
  { name: 'Banco Angola', icon: '🏦' },
  { name: 'Mudanças Express', icon: '🚚' },
  { name: 'Móveis Luanda', icon: '🛋' },
  { name: 'Construtora Kianda', icon: '🏗' },
  { name: 'ZAP Fibra', icon: '📡' },
  { name: 'DStv Angola', icon: '📺' },
  { name: 'Seguros AAA', icon: '🛡' },
]

const stagger = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
}

export function Home() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  return (
    <div className="home-page">
      {/* ─── HERO ─────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero-bg" />
        <div className="container">
          <motion.div className="home-hero-content" initial="initial" animate="animate" variants={stagger}>
            <motion.h1 variants={fadeUp} className="home-hero-title">
              Encontre a sua próxima casa<br />
              em <strong>qualquer bairro</strong> de Angola.
            </motion.h1>
            <motion.p variants={fadeUp} className="home-hero-sub">
              Mais de 2 400 imóveis disponíveis em Luanda, Benguela, Huíla e mais.
            </motion.p>
            <motion.div variants={fadeUp} className="home-hero-search">
              <div className="hero-search-row">
                <div className="hero-search-field">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <input type="text" placeholder="Bairro, zona ou município..." />
                </div>
                <select className="hero-search-select">
                  <option value="">Quartos</option>
                  <option value="1">1 Quarto</option>
                  <option value="2">2 Quartos</option>
                  <option value="3">3 Quartos</option>
                  <option value="4">4+ Quartos</option>
                </select>
                <select className="hero-search-select">
                  <option value="">Preço máx.</option>
                  <option value="50000">Até 50 000 Kz</option>
                  <option value="100000">Até 100 000 Kz</option>
                  <option value="200000">Até 200 000 Kz</option>
                  <option value="500000">Até 500 000 Kz</option>
                  <option value="1000000">Até 1 000 000 Kz</option>
                </select>
                <Button variant="accent" size="lg" className="hero-search-btn" onClick={() => navigate('/explorar')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                  </svg>
                  Procurar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORIAS RÁPIDAS ────────────────── */}
      <section className="home-section">
        <div className="container">
          <motion.div
            className="categories-grid"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.label}
                variants={fadeUp}
                className="category-btn"
                onClick={() => navigate(`/explorar?type=${cat.query}`)}
              >
                <span className="category-icon">{cat.icon}</span>
                <span className="category-label">{cat.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── BAIRROS POPULARES ─────────────────── */}
      <section className="home-section home-section-alt">
        <div className="container">
          <motion.div
            className="section-header"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
          >
            <h2>Bairros Populares</h2>
            <p>Descubra imóveis nos bairros mais procurados de Luanda</p>
          </motion.div>
          <motion.div
            className="neighborhoods-grid"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {neighborhoods.map((n) => (
              <motion.div
                key={n.name}
                variants={fadeUp}
                className="neighborhood-card"
                onClick={() => navigate(`/explorar?q=${n.name}`)}
              >
                <div className="neighborhood-img" style={{ backgroundImage: `url(${n.image})` }} />
                <div className="neighborhood-overlay">
                  <span>{n.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── IMÓVEIS EM DESTAQUE ───────────────── */}
      <section className="home-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
          >
            <h2>Imóveis em Destaque</h2>
            <p>As melhores oportunidades selecionadas para si</p>
          </motion.div>
          <motion.div
            className="featured-grid"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {featured.map((p) => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                className="featured-card"
                onClick={() => navigate(`/imovel/${p.id}`)}
              >
                <div className="featured-card-img" style={{ backgroundImage: `url(${p.image})` }}>
                  <Badge variant="accent">Destaque</Badge>
                </div>
                <div className="featured-card-body">
                  <h3>{p.title}</h3>
                  <div className="featured-card-price">{p.price} <small>Kz/mês</small></div>
                  <div className="featured-card-meta">
                    <span>{p.beds} Quartos</span>
                    <span>{p.area}</span>
                    <span>{p.neighborhood}</span>
                  </div>
                  <Button variant="outline" size="sm" block onClick={() => navigate(`/imovel/${p.id}`)}>
                    Ver Detalhes
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── IMÓVEIS RECENTES (CARROSSEL) ──────── */}
      <section className="home-section home-section-alt">
        <div className="container">
          <motion.div
            className="section-header"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
          >
            <h2>Casas Mais Recentes</h2>
            <p>Imóveis acabados de publicar na plataforma</p>
          </motion.div>
          <motion.div
            className="recent-scroll"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            <div className="recent-track">
              {[...featured].reverse().map((p) => (
                <motion.div
                  key={`recent-${p.id}`}
                  variants={fadeUp}
                  className="recent-card"
                  onClick={() => navigate(`/imovel/${p.id}`)}
                >
                  <div className="recent-card-img" style={{ backgroundImage: `url(${p.image})` }} />
                  <div className="recent-card-body">
                    <div className="recent-card-price">{p.price} Kz/mês</div>
                    <div className="recent-card-title">{p.title}</div>
                    <div className="recent-card-location">{p.neighborhood}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PARCEIROS ─────────────────────────── */}
      <section className="home-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
          >
            <h2>Parceiros</h2>
            <p>Serviços de confiança para tornar a sua mudança mais fácil</p>
          </motion.div>
          <motion.div
            className="partners-grid"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {partners.map((p) => (
              <motion.div key={p.name} variants={fadeUp} className="partner-card">
                <span className="partner-icon">{p.icon}</span>
                <span className="partner-name">{p.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA FINAL ─────────────────────────── */}
      <section className="home-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2>Tem um imóvel para arrendar?</h2>
            <p>Publique grátis e encontre o inquilino ideal em minutos.</p>
            <Button variant="accent" size="xl" onClick={() => navigate(isAuthenticated ? '/dashboard' : '/registar?role=owner')}>
              Publicar Imóvel
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────── */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo-mark">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="#2563EB" />
                  <path d="M10 32L24 14L38 32H10Z" fill="#F97316" opacity="0.9" />
                  <rect x="19" y="26" width="10" height="10" rx="3" fill="white" />
                </svg>
                <span className="logo-text">Arrenda<strong>Ki</strong></span>
              </div>
              <p>A plataforma angolana de arrendamento mais confiável do mercado.</p>
            </div>
            <div className="footer-links">
              <h4>Plataforma</h4>
              <a href="/explorar">Explorar</a>
              <a href="/mapa">Mapa</a>
              <a href="/intermediarios">Intermediários</a>
              <a href="/como-funciona">Como Funciona</a>
            </div>
            <div className="footer-links">
              <h4>Para Si</h4>
              <a href="/registar?role=tenant">Procurar Casa</a>
              <a href="/registar?role=owner">Publicar Imóvel</a>
              <a href="/registar?role=broker">Ser Intermediário</a>
              <a href="/favoritos">Favoritos</a>
            </div>
            <div className="footer-links">
              <h4>Contacto</h4>
              <span>geral@arrendaki.co.ao</span>
              <span>+244 900 000 000</span>
              <span>Luanda, Angola</span>
            </div>
          </div>
          <div className="footer-bottom">
            &copy; {new Date().getFullYear()} ArrendaKi. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
