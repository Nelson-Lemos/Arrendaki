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
    { id: 'tenant', name: 'Inquilino', sub: 'Procuro arrendar' },
    { id: 'owner', name: 'Proprietário', sub: 'Tenho imóveis para arrendar' },
    { id: 'company', name: 'Empresa', sub: 'Gestão de imóveis' },
    { id: 'broker', name: 'Intermediário', sub: 'Sou agente imobiliário' },
  ]

  const roleIcons: Record<string, string> = {
    tenant: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
    owner: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    company: 'M3 21h18M3 7v14M21 7v14M6 11h4M10 11V7M14 11h4M6 15h4M14 15h4M6 19h4M14 19h4M3 7l9-4 9 4',
    broker: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  }

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
          <div className="logo-display">
            <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="white" />
              <path d="M10 32L24 14L38 32H10Z" fill="#F97316" opacity="0.9" />
              <rect x="19" y="26" width="10" height="10" rx="3" fill="#2563EB" />
            </svg>
            <span>Arrenda<strong>Ki</strong></span>
          </div>
          <h2>Junta-te <em>a nos</em></h2>
          <p>Cria a tua conta e comeca a explorar as melhores oportunidades de arrendamento em Angola.</p>
          <div className="auth-benefits">
            <div className="auth-benefit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              Milhares de imoveis disponiveis
            </div>
            <div className="auth-benefit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Contacto directo ou com intermediario
            </div>
            <div className="auth-benefit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
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
                  <div className="role-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={roleIcons[r.id]} />
                    </svg>
                  </div>
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
              <input type="password" className="form-control" placeholder="Minimo 6 caracteres" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="btn-submit" type="submit" disabled={loading}>
              {loading ? 'A criar conta...' : 'Criar Conta'}
            </button>
          </form>

          <div className="auth-footer">
            Ja tens conta? <Link to="/login">Entrar</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
