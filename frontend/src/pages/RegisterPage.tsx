import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/pages/auth.css'

export function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [searchParams] = useSearchParams()
  const preselectedRole = searchParams.get('role') || 'tenant'

  const [selectedRole, setSelectedRole] = useState(preselectedRole)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const roles = [
    { id: 'tenant', icon: '🏠', name: 'Inquilino', sub: 'Procuro arrendar' },
    { id: 'owner', icon: '🔑', name: 'Proprietário', sub: 'Tenho imóveis para arrendar' },
    { id: 'company', icon: '🏢', name: 'Empresa', sub: 'Gestão de imóveis' },
    { id: 'broker', icon: '🤝', name: 'Intermediário', sub: 'Sou agente imobiliário' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Preencha todos os campos obrigatórios.')
      return
    }

    if (password.length < 6) {
      setError('A palavra-passe deve ter pelo menos 6 caracteres.')
      return
    }

    setLoading(true)
    try {
      await register(name, email, password, selectedRole)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.message || 'Erro ao criar conta. Tenta novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-hero">
          <div className="logo-mark" style={{ marginBottom: '2rem' }}>
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="#0f1724" />
              <path d="M10 32L24 14L38 32H10Z" fill="#c9a03c" opacity="0.9" />
              <rect x="19" y="26" width="10" height="10" rx="2" fill="#0f1724" />
            </svg>
            <span className="logo-text" style={{ color: 'white', fontSize: '1.3rem' }}>Arrenda<strong>Ki</strong></span>
          </div>
          <h2>Junta-te <em>a nós</em></h2>
          <p>Cria a tua conta e começa a explorar as melhores oportunidades de arrendamento em Angola.</p>
          <div className="auth-benefits">
            <div className="auth-benefit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a03c" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              Milhares de imóveis disponíveis
            </div>
            <div className="auth-benefit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a03c" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              Contacto directo ou com intermediário
            </div>
            <div className="auth-benefit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a03c" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Seguro e transparente
            </div>
          </div>
        </div>
        <div className="auth-form">
          <h2>Criar Conta</h2>
          <p className="sub">Escolhe o teu perfil e preenche os dados</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="role-select">
              {roles.map(r => (
                <div
                  key={r.id}
                  className={`role-btn ${r.id === selectedRole ? 'selected' : ''}`}
                  onClick={() => setSelectedRole(r.id)}
                >
                  <div className="role-icon">{r.icon}</div>
                  <div className="role-name">{r.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{r.sub}</div>
                </div>
              ))}
            </div>
            <div className="form-group">
              <label>Nome completo *</label>
              <input type="text" className="form-control" placeholder="O teu nome" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" className="form-control" placeholder="email@exemplo.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Telefone</label>
              <input type="tel" className="form-control" placeholder="+244 9XX XXX XXX" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Palavra-passe *</label>
              <input type="password" className="form-control" placeholder="Mínimo 6 caracteres" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="btn-submit" type="submit" disabled={loading}>
              {loading ? 'A criar conta...' : 'Criar Conta'}
            </button>
          </form>

          <div className="auth-footer">
            Já tens conta? <Link to="/login">Entrar</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
