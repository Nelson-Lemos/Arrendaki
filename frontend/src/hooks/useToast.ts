import { useState, useCallback } from 'react'

interface ToastItem {
  id: number
  message: string
  type: 'success' | 'error' | ''
}

let toastId = 0

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((message: string, type: 'success' | 'error' | '' = '') => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3200)
  }, [])

  return { toasts, showToast }
}
