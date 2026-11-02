import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  highlight?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn('flex flex-col gap-3 mb-12', alignClass, className)}
    >
      {eyebrow && (
        <span className="text-xs font-semibold tracking-widest uppercase text-blue-400 font-mono">
          {eyebrow}
        </span>
      )}
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {highlight ? (
          <>
            {title}{' '}
            <span className="gradient-text">{highlight}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="max-w-2xl text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}
