import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/pages/auth.css'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Preencha todos os campos.')
      return
    }

    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.message || 'Email ou palavra-passe inválidos.')
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
          <h2>Bem-vindo <em>de volta</em></h2>
          <p>Entra na tua conta para gerir imóveis, favoritos e contactos num só lugar.</p>
          <div className="auth-benefits">
            <div className="auth-benefit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a03c" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Gerir os teus imóveis
            </div>
            <div className="auth-benefit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a03c" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              Guardar favoritos
            </div>
            <div className="auth-benefit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a03c" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Contactar proprietários
            </div>
          </div>
        </div>
        <div className="auth-form">
          <h2>Entrar</h2>
          <p className="sub">Acede à tua conta ArrendaKi</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="teu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Palavra-passe</label>
              <input
                type="password"
                className="form-control"
                placeholder="A tua palavra-passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button className="btn-submit" type="submit" disabled={loading}>
              {loading ? 'A entrar...' : 'Entrar'}
            </button>
          </form>

          <div className="auth-footer">
            Ainda não tens conta? <Link to="/registar">Criar conta</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
