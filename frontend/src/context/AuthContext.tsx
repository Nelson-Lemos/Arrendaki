import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User } from '../types'
import { api } from '../services/api'

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role?: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('arrendaki_token'))

  useEffect(() => {
    if (token) {
      api.setToken(token)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({
          id: payload.sub,
          email: payload.email,
          name: payload.name || 'Utilizador',
          role: payload.role || 'tenant',
        })
      } catch {
        localStorage.removeItem('arrendaki_token')
        setToken(null)
      }
    }
  }, [token])

  const login = async (email: string, password: string) => {
    const res = await api.login({ email, password })
    localStorage.setItem('arrendaki_token', res.access_token)
    api.setToken(res.access_token)
    setToken(res.access_token)
    setUser(res.user)
  }

  const register = async (name: string, email: string, password: string, role = 'tenant') => {
    const res = await api.register({ name, email, password, role })
    localStorage.setItem('arrendaki_token', res.access_token)
    api.setToken(res.access_token)
    setToken(res.access_token)
    setUser(res.user)
  }

  const logout = () => {
    localStorage.removeItem('arrendaki_token')
    api.setToken(null)
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
