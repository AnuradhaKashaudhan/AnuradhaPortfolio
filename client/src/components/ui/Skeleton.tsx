import { cn } from '@/utils/cn'

interface SkeletonProps {
  className?: string
  variant?: 'line' | 'circle' | 'block'
  lines?: number
}

export function Skeleton({ className, variant = 'block', lines = 1 }: SkeletonProps) {
  const baseClass =
    'animate-pulse bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface-elevated)] to-[var(--color-surface)] bg-[length:400%_100%]'

  if (variant === 'circle') {
    return <div className={cn(baseClass, 'rounded-full', className)} aria-hidden="true" />
  }

  if (variant === 'line') {
    return (
      <div className="flex flex-col gap-2" aria-hidden="true">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseClass, 'h-4 rounded-md', i === lines - 1 && 'w-3/4', className)}
          />
        ))}
      </div>
    )
  }

  return <div className={cn(baseClass, 'rounded-xl', className)} aria-hidden="true" />
}

/** Card-shaped skeleton placeholder */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-[var(--color-border)] p-6', className)} aria-hidden="true">
      <Skeleton variant="block" className="h-40 mb-4" />
      <Skeleton variant="line" lines={3} />
    </div>
  )
}
