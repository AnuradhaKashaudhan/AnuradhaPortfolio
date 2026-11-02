import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  glass?: boolean
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'none'
  onClick?: () => void
  as?: 'div' | 'article' | 'section'
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({
  children,
  className,
  glass = false,
  hover = false,
  padding = 'md',
  onClick,
  as: Tag = 'div',
}: CardProps) {
  const baseClass = cn(
    'rounded-2xl border transition-all duration-300',
    glass
      ? 'glass'
      : 'bg-[var(--color-surface)] border-[var(--color-border)]',
    hover && 'hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5',
    onClick && 'cursor-pointer',
    paddingMap[padding],
    className
  )

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={baseClass}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <Tag className={baseClass} onClick={onClick}>
      {children}
    </Tag>
  )
}
