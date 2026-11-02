import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react'
import { cn } from '@/utils/cn'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastData {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastProps extends ToastData {
  onClose: (id: string) => void
}

const iconMap = {
  success: <CheckCircle size={18} className="text-emerald-400" />,
  error: <AlertCircle size={18} className="text-red-400" />,
  info: <Info size={18} className="text-blue-400" />,
  warning: <AlertTriangle size={18} className="text-yellow-400" />,
}

const borderMap: Record<ToastType, string> = {
  success: 'border-emerald-500/30',
  error: 'border-red-500/30',
  info: 'border-blue-500/30',
  warning: 'border-yellow-500/30',
}

function Toast({ id, message, type, duration = 4000, onClose }: ToastProps) {
  const close = useCallback(() => onClose(id), [id, onClose])

  useEffect(() => {
    const timer = setTimeout(close, duration)
    return () => clearTimeout(timer)
  }, [close, duration])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ type: 'spring', duration: 0.3 }}
      role="alert"
      aria-live="polite"
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl glass shadow-xl',
        'border min-w-[280px] max-w-sm',
        borderMap[type]
      )}
    >
      <span aria-hidden="true">{iconMap[type]}</span>
      <p className="text-sm flex-1 text-[var(--color-text-primary)]">{message}</p>
      <button
        onClick={close}
        className="p-1 rounded-lg hover:bg-white/8 transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </motion.div>
  )
}

interface ToastContainerProps {
  toasts: ToastData[]
  onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  )
}
