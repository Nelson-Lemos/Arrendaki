const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

let token: string | null = null

export function setChatToken(t: string | null) {
  token = t
}

async function authFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Erro de rede' }))
    throw new Error(err.detail || `HTTP ${res.status}`)
  }
  return res.json()
}

export interface ChatParticipant {
  id: number
  name: string
}

export interface ChatRoom {
  id: number
  property_id: number | null
  participants: ChatParticipant[]
  last_message: string | null
  last_message_at: string | null
  unread: number
  created_at: string
}

export interface ChatMessage {
  id: number
  room_id: number
  sender_id: number
  sender_name: string
  message: string
  created_at: string
}

export async function getRooms(): Promise<ChatRoom[]> {
  return authFetch<ChatRoom[]>('/chat/rooms')
}

export async function createRoom(participantId: number, propertyId?: number): Promise<ChatRoom> {
  return authFetch<ChatRoom>('/chat/rooms', {
    method: 'POST',
    body: JSON.stringify({ participant_id: participantId, property_id: propertyId }),
  })
}

export async function getMessages(roomId: number): Promise<ChatMessage[]> {
  return authFetch<ChatMessage[]>(`/chat/rooms/${roomId}/messages`)
}

export function connectWebSocket(roomId: number, t: string): WebSocket {
  const wsUrl = API_URL.replace(/^http/, 'ws')
  const ws = new WebSocket(`${wsUrl}/chat/ws/${roomId}?token=${t}`)
  return ws
}
