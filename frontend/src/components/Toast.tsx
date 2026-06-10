interface ToastContainerProps {
  toasts: Array<{ id: number; message: string; type: string }>
}

export function ToastContainer({ toasts }: ToastContainerProps) {
  if (!toasts.length) return null
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  )
}
