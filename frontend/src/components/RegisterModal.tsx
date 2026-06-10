import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

interface RegisterModalProps {
  preselect?: string
  onClose: () => void
}

export function RegisterModal({ preselect, onClose }: RegisterModalProps) {
  const { register } = useAuth()
  const [selectedRole, setSelectedRole] = useState(preselect || 'tenant')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const roles = [
    { id: 'tenant', icon: '🏠', name: 'Inquilino', sub: 'Procuro arrendar' },
    { id: 'owner', icon: '🔑', name: 'Proprietário', sub: 'Tenho imóveis para arrendar' },
    { id: 'company', icon: '🏢', name: 'Empresa', sub: 'Gestão de imóveis' },
    { id: 'broker', icon: '🤝', name: 'Intermediário', sub: 'Sou agente imobiliário' },
  ]

  const handleRegister = async () => {
    try {
      await register(name || 'Utilizador', email || `${Date.now()}@email.com`, password || '12345678', selectedRole)
      onClose()
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-panel modal-sm">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="register-form">
          <h2>Cria a tua conta</h2>
          <p className="sub">Escolhe o teu perfil para personalizar a experiência</p>
          <div className="role-select">
            {roles.map(r => (
              <div
                key={r.id}
                className={`role-btn ${r.id === selectedRole ? 'selected' : ''}`}
                onClick={() => setSelectedRole(r.id)}
              >
                <div className="role-icon">{r.icon}</div>
                <div className="role-name">{r.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 2 }}>{r.sub}</div>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label>Nome completo</label>
            <input type="text" className="form-control" placeholder="O teu nome" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="email@exemplo.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Telefone</label>
            <input type="tel" className="form-control" placeholder="+244 9XX XXX XXX" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Palavra-passe</label>
            <input type="password" className="form-control" placeholder="Mínimo 8 caracteres" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="btn-submit" onClick={handleRegister}>🚀 Criar Conta</button>
          <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--gray-400)', marginTop: '0.75rem' }}>
            Já tens conta? <a href="#" onClick={e => { e.preventDefault(); alert('Login em desenvolvimento') }}>Entrar</a>
          </p>
        </div>
      </div>
    </div>
  )
}
