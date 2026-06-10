import type { Property, Broker, PropertyFilters, User } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

class ApiService {
  private token: string | null = null

  setToken(token: string | null) {
    this.token = token
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    }
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }
    const res = await fetch(`${API_URL}${path}`, { ...options, headers })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Erro de rede' }))
      throw new Error(err.detail || `HTTP ${res.status}`)
    }
    return res.json()
  }

  // Auth
  async register(data: { name: string; email: string; password: string; role?: string; phone?: string }) {
    return this.request<{ access_token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async login(data: { email: string; password: string }) {
    return this.request<{ access_token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Properties
  async getProperties(filters?: PropertyFilters) {
    const params = new URLSearchParams()
    if (filters?.q) params.set('q', filters.q)
    if (filters?.type) params.set('type', filters.type)
    if (filters?.mode) params.set('mode', filters.mode)
    if (filters?.priceMin !== undefined) params.set('price_min', String(filters.priceMin))
    if (filters?.priceMax !== undefined) params.set('price_max', String(filters.priceMax))
    if (filters?.municipio) params.set('municipio', filters.municipio)
    if (filters?.featured !== undefined) params.set('featured', String(filters.featured))
    if (filters?.hasVideo !== undefined) params.set('has_video', String(filters.hasVideo))
    if (filters?.isNew !== undefined) params.set('is_new', String(filters.isNew))
    if (filters?.negotiable !== undefined) params.set('negotiable', String(filters.negotiable))
    const qs = params.toString()
    return this.request<Property[]>(`/properties${qs ? `?${qs}` : ''}`)
  }

  async getProperty(id: number) {
    return this.request<Property>(`/properties/${id}`)
  }

  // Brokers
  async getBrokers() {
    return this.request<Broker[]>('/brokers')
  }

  async getBroker(id: number) {
    return this.request<Broker>(`/brokers/${id}`)
  }
}

export const api = new ApiService()
