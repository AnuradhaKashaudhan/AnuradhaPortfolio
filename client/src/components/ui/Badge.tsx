import { cn } from '@/utils/cn'

type BadgeVariant = 'default' | 'blue' | 'violet' | 'cyan' | 'green' | 'yellow' | 'red' | 'outline'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  className?: string
  dot?: boolean
}

const variantMap: Record<BadgeVariant, string> = {
  default: 'bg-white/8 text-[var(--color-text-secondary)] border-white/8',
  blue: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  violet: 'bg-violet-500/15 text-violet-400 border-violet-500/25',
  cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  yellow: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  red: 'bg-red-500/15 text-red-400 border-red-500/25',
  outline: 'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border)]',
}

const sizeMap = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-3 py-1.5 text-xs',
}

export function Badge({ children, variant = 'default', size = 'md', className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        variantMap[variant],
        sizeMap[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'inline-block w-1.5 h-1.5 rounded-full',
            variant === 'blue' && 'bg-blue-400',
            variant === 'violet' && 'bg-violet-400',
            variant === 'cyan' && 'bg-cyan-400',
            variant === 'green' && 'bg-emerald-400',
            variant === 'default' && 'bg-gray-400'
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
