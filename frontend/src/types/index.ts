export interface Amenities {
  piscina: boolean
  garagem: boolean
  condominio: boolean
  mobilado: boolean
  jardim: boolean
  ar_cond: boolean
  gerador: boolean
  cisterna: boolean
}

export interface Property {
  id: number
  title: string
  location: string
  municipio: string
  type: string
  beds: number
  baths: number
  area: number
  price: number
  mode: 'direct' | 'brokered'
  featured: boolean
  is_new: boolean
  has_video: boolean
  negotiable: boolean
  desc: string
  amenities: Amenities
  color: string
  images: string[]
  owner_id?: number
  created_at?: string
}

export interface Broker {
  id: number
  name: string
  area: string
  rating: number
  reviews: number
  deals: number
  experience: number
  avatar: string
  certified: boolean
  speciality: string
  user_id?: number
}

export interface User {
  id: number
  name: string
  email: string
  phone?: string
  role: 'tenant' | 'owner' | 'broker' | 'company'
  created_at?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export interface PropertyFilters {
  q?: string
  type?: string
  mode?: string
  priceMin?: number
  priceMax?: number
  municipio?: string
  featured?: boolean
  hasVideo?: boolean
  isNew?: boolean
  negotiable?: boolean
}
