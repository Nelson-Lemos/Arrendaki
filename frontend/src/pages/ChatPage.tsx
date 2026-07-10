import { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { Avatar } from '../components/ui/Avatar'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import {
  getRooms, getMessages, connectWebSocket,
  setChatToken, type ChatRoom, type ChatMessage,
} from '../services/chat'
import '../styles/pages/chat.css'

function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('pt-AO', { hour: '2-digit', minute: '2-digit' })
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  if (diff < 1) return formatTime(iso)
  if (diff < 7) return d.toLocaleDateString('pt-AO', { weekday: 'short' })
  return d.toLocaleDateString('pt-AO', { day: 'numeric', month: 'short' })
}

export function ChatPage() {
  const { user, isAuthenticated, token } = useAuth()
  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const [activeRoom, setActiveRoom] = useState<number | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [typing, setTyping] = useState<string>('')
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const typingTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (token) {
      setChatToken(token)
      getRooms().then(setRooms).catch(console.error)
    }
  }, [token])

  useEffect(() => {
    if (activeRoom && token) {
      getMessages(activeRoom).then(setMessages).catch(console.error)

      const socket = connectWebSocket(activeRoom, token)
      socket.onopen = () => {}
      socket.onmessage = (e) => {
        const data = JSON.parse(e.data)
        if (data.type === 'message') {
          setMessages(prev => [...prev.filter(m => m.id !== data.id), {
            id: data.id,
            room_id: data.room_id,
            sender_id: data.sender_id,
            sender_name: data.sender_name,
            message: data.message,
            created_at: data.created_at,
          }])
        } else if (data.type === 'typing') {
          setTyping(data.sender_name)
          clearTimeout(typingTimer.current)
          typingTimer.current = setTimeout(() => setTyping(''), 2000)
        }
      }
      setWs(socket)
      return () => { socket.close() }
    }
  }, [activeRoom, token])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const activeRoomData = rooms.find(r => r.id === activeRoom)
  const otherParticipant = activeRoomData?.participants.find(p => p.id !== user?.id)

  const handleSend = useCallback(() => {
    const msg = input.trim()
    if (!msg || !ws) return
    ws.send(JSON.stringify({ type: 'message', message: msg }))
    setInput('')
  }, [input, ws])

  const handleTyping = useCallback(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'typing' }))
    }
  }, [ws])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="chat-page">
        <div className="chat-empty">
          <h3>Inicia sessa para usar o chat</h3>
          <Button variant="primary" onClick={() => window.location.href = '/login'}>Entrar</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-page">
      <div className="chat-inbox">
        <div className="chat-inbox-header">
          <h2>Mensagens</h2>
          <span className="chat-count">{rooms.length}</span>
        </div>
        <div className="chat-room-list">
          {rooms.length === 0 && (
            <div className="chat-empty-rooms">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <p>Nenhuma conversa</p>
              <small>Contacta um proprietario para iniciar</small>
            </div>
          )}
          {rooms.map(room => {
            const other = room.participants.find(p => p.id !== user?.id)
            return (
              <div
                key={room.id}
                className={`chat-room-card ${activeRoom === room.id ? 'active' : ''}`}
                onClick={() => setActiveRoom(room.id)}
              >
                <Avatar name={other?.name || 'Utilizador'} size="md" />
                <div className="chat-room-info">
                  <div className="chat-room-name">{other?.name || 'Utilizador'}</div>
                  <div className="chat-room-preview">{room.last_message || 'Sem mensagens'}</div>
                </div>
                <div className="chat-room-meta">
                  {room.last_message_at && <span className="chat-room-time">{formatDate(room.last_message_at)}</span>}
                  {room.unread > 0 && <Badge variant="accent">{room.unread}</Badge>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="chat-conversation">
        {!activeRoom ? (
          <div className="chat-empty-conversation">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <h3>Seleciona uma conversa</h3>
            <p>Escolhe uma conversa da lista para ver as mensagens.</p>
          </div>
        ) : (
          <>
            <div className="chat-conversation-header">
              <Avatar name={otherParticipant?.name || 'Utilizador'} size="sm" />
              <div>
                <div className="chat-conv-name">{otherParticipant?.name || 'Utilizador'}</div>
                {typing && <div className="chat-typing">{typing} esta a escrever...</div>}
              </div>
            </div>
            <div className="chat-messages">
              {messages.length === 0 && (
                <div className="chat-empty-msg">
                  <p>Sem mensagens ainda. Envia a primeira mensagem!</p>
                </div>
              )}
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`chat-bubble ${m.sender_id === user?.id ? 'sent' : 'received'}`}
                >
                  <div className="chat-bubble-text">{m.message}</div>
                  <div className="chat-bubble-time">{formatTime(m.created_at)}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <div className="chat-input-area">
              <textarea
                className="chat-input"
                placeholder="Escreve uma mensagem..."
                value={input}
                onChange={e => { setInput(e.target.value); handleTyping() }}
                onKeyDown={handleKeyDown}
                rows={2}
              />
              <button className="chat-send-btn" onClick={handleSend} disabled={!input.trim()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
