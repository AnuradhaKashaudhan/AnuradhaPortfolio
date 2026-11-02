import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  MapPin,
  ChevronDown,
  ExternalLink,
  CheckCircle,
  TrendingUp,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { experiences } from '@/data/experience'
import { cn } from '@/utils/cn'

function ExperienceCard({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
  const [expanded, setExpanded] = useState(index === 0) // first card open by default

  const isActive = exp.endDate === null
  const dateRange = exp.endDate
    ? `${exp.startDate} – ${exp.endDate}`
    : `${exp.startDate} – Present`

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative pl-16"
    >
      {/* Dot */}
      <div
        className={cn(
          'absolute left-4 top-5 w-4 h-4 rounded-full border-2 flex items-center justify-center',
          isActive
            ? 'border-blue-500 bg-blue-500/20'
            : 'border-[var(--color-border)] bg-[var(--color-surface)]'
        )}
        aria-hidden="true"
      >
        {isActive && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
      </div>

      {/* Card */}
      <div className="glass rounded-2xl border border-[var(--color-border)] hover:border-blue-500/20 transition-colors overflow-hidden">
        {/* Header – always visible */}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="w-full flex items-start justify-between gap-4 p-6 text-left cursor-pointer"
          aria-expanded={expanded}
          aria-controls={`exp-body-${exp.id}`}
          id={`exp-header-${exp.id}`}
        >
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/25 to-violet-500/25 text-xs font-bold text-blue-300 ring-1 ring-white/10" aria-hidden="true">
                {exp.company.split(/\s+/).map((part) => part[0]).join('').slice(0, 2)}
              </span>
              <h3
                className="font-bold text-base text-[var(--color-text-primary)]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {exp.role}
              </h3>
              {isActive && (
                <Badge variant="blue" size="sm" dot>
                  Current
                </Badge>
              )}
              <Badge
                variant={exp.type === 'internship' ? 'violet' : 'cyan'}
                size="sm"
              >
                {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)]">
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  {exp.company}
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span className="font-semibold text-blue-400">{exp.company}</span>
              )}
              <span className="flex items-center gap-1 text-[var(--color-text-muted)]">
                <MapPin size={12} />
                {exp.location}
              </span>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">{dateRange}</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-[var(--color-text-muted)] shrink-0 mt-1"
            aria-hidden="true"
          >
            <ChevronDown size={18} />
          </motion.div>
        </button>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={`exp-body-${exp.id}`}
              role="region"
              aria-labelledby={`exp-header-${exp.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 flex flex-col gap-5 border-t border-[var(--color-border)]">
                {/* Description */}
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pt-4">
                  {exp.description}
                </p>

                {/* Key highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-widest font-mono mb-3 flex items-center gap-1.5">
                      <TrendingUp size={12} /> Key Metrics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Responsibilities */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-widest font-mono mb-3 flex items-center gap-1.5">
                    <Briefcase size={12} /> Responsibilities
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {exp.responsibilities.map((r) => (
                      <li
                        key={r}
                        className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]"
                      >
                        <CheckCircle
                          size={14}
                          className="text-emerald-400 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-widest font-mono mb-3">
                    Stack &amp; Tools
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.techStack.map((tech) => (
                      <Badge key={tech} variant="default" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" className="section bg-[var(--color-surface)]/40">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've"
          highlight="Made Impact"
          description="Internships and real-world engineering — my professional journey so far."
        />

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-7 top-5 bottom-5 w-px bg-gradient-to-b from-blue-500/60 via-violet-500/40 to-transparent"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-6">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
