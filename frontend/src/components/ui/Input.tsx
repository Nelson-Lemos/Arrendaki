import { useState } from 'react'
import '../../styles/ui/input.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: React.ReactNode
  error?: string
  help?: string
  large?: boolean
}

export function Input({
  label,
  icon,
  error,
  help,
  large = false,
  className = '',
  id,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false)
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`

  const wrapperClasses = [
    'input-group',
    large ? 'input-lg' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={wrapperClasses}>
      {label && <label className="input-label" htmlFor={inputId}>{label}</label>}
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          id={inputId}
          className={`input-field ${error ? 'error' : ''} ${focused ? 'focused' : ''}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </div>
      {error && <span className="input-error">{error}</span>}
      {help && !error && <span className="input-help">{help}</span>}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className = '', id, ...props }: TextareaProps) {
  const inputId = id || `textarea-${Math.random().toString(36).slice(2, 9)}`

  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label" htmlFor={inputId}>{label}</label>}
      <textarea id={inputId} className={`input-field ${error ? 'error' : ''}`} {...props} />
      {error && <span className="input-error">{error}</span>}
    </div>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

export function Select({ label, error, className = '', id, children, ...props }: SelectProps) {
  const inputId = id || `select-${Math.random().toString(36).slice(2, 9)}`

  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label" htmlFor={inputId}>{label}</label>}
      <select id={inputId} className={`input-field ${error ? 'error' : ''}`} {...props}>
        {children}
      </select>
      {error && <span className="input-error">{error}</span>}
    </div>
  )
}
