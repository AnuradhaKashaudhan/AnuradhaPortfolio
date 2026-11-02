import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface TimelineItem {
  id: string
  title: string
  subtitle: string
  date: string
  description?: string
  tags?: string[]
  icon?: React.ReactNode
  isActive?: boolean
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div
        className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/60 via-violet-500/40 to-transparent"
        aria-hidden="true"
      />

      <ol className="flex flex-col gap-8">
        {items.map((item, i) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-16"
          >
            {/* Dot */}
            <div
              className={cn(
                'absolute left-4 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center',
                item.isActive
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)]'
              )}
              aria-hidden="true"
            >
              {item.isActive && (
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              )}
            </div>

            <div className="glass rounded-xl p-5 border border-[var(--color-border)] hover:border-blue-500/20 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h3
                    className="font-semibold text-[var(--color-text-primary)]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-blue-400">{item.subtitle}</p>
                </div>
                <span className="text-xs font-mono text-[var(--color-text-muted)] shrink-0">
                  {item.date}
                </span>
              </div>
              {item.description && (
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-2">
                  {item.description}
                </p>
              )}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-xs bg-white/5 text-[var(--color-text-secondary)] border border-white/8"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
