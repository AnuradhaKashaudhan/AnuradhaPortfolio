import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { skillGroups } from '@/data/skills'
import type { SkillLevel, SkillCategory } from '@/types/skill'
import { cn } from '@/utils/cn'

const levelConfig: Record<SkillLevel, { label: string; barColor: string; pct: number }> = {
  beginner:     { label: 'Beginner',     barColor: 'from-yellow-500 to-yellow-400', pct: 25 },
  intermediate: { label: 'Intermediate', barColor: 'from-blue-500 to-cyan-400',    pct: 55 },
  advanced:     { label: 'Advanced',     barColor: 'from-violet-500 to-blue-400',  pct: 80 },
  expert:       { label: 'Expert',       barColor: 'from-blue-500 to-violet-600',  pct: 100 },
}

const categoryEmoji: Record<SkillCategory | string, string> = {
  'Languages': '{ }',
  'AI/ML & Deep Learning': '🧠',
  'Generative AI & Agentic AI': '✨',
  'Computer Vision': '👁️',
  'Backend & Frameworks': '⚙️',
  'Frontend': '🎨',
  'MLOps & Cloud': '☁️',
  'CS Fundamentals': '📐',
  // aliases for SkillCategory type
  'AI/ML Frameworks': '🧠',
  'Backend': '⚙️',
  'Databases': '🗄️',
  'DevOps & Tools': '🔧',
  'Cloud': '☁️',
}

interface SkillBarProps {
  name: string
  level: SkillLevel
  delay: number
}

function SkillBar({ name, level, delay }: SkillBarProps) {
  const cfg = levelConfig[level]
  return (
    <li>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-[var(--color-text-primary)]">{name}</span>
        <span className="text-[0.65rem] text-[var(--color-text-muted)] font-mono">{cfg.label}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden" role="progressbar" aria-valuenow={cfg.pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${name}: ${cfg.label}`}>
        <motion.div
          className={cn('h-full rounded-full bg-gradient-to-r', cfg.barColor)}
          initial={{ width: 0 }}
          whileInView={{ width: `${cfg.pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay, ease: 'easeOut' }}
        />
      </div>
    </li>
  )
}

const ALL_CATEGORIES = ['All', ...skillGroups.map((g) => g.category)] as const

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<string>('All')

  const displayedGroups = useMemo(
    () => activeTab === 'All' ? skillGroups : skillGroups.filter((g) => g.category === activeTab),
    [activeTab]
  )

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="My Technical"
          highlight="Toolkit"
          description="Technologies, frameworks, and tools I work with to build intelligent, full-stack systems."
        />

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10" role="tablist" aria-label="Skill categories">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeTab === cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer',
                activeTab === cat
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                  : 'text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-blue-500/20 hover:text-[var(--color-text-primary)]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayedGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: gi * 0.07 }}
            >
              <Card glass padding="lg" className="h-full" as="article">
                {/* Card header */}
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[var(--color-border)]">
                  <span className="text-xl" aria-hidden="true">
                    {categoryEmoji[group.category] ?? '🔧'}
                  </span>
                  <h3
                    className="font-semibold text-sm text-[var(--color-text-primary)]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {group.category}
                  </h3>
                </div>

                <ul className="flex flex-col gap-4" role="list">
                  {group.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={0.1 + si * 0.05}
                    />
                  ))}
                </ul>

                {/* Tag cloud for context */}
                <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[var(--color-border)]">
                  {group.skills.map((skill) => (
                    <Badge key={skill.name} variant="default" size="sm">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-5 mt-10"
          role="legend"
          aria-label="Proficiency level legend"
        >
          {(Object.entries(levelConfig) as [SkillLevel, typeof levelConfig[SkillLevel]][]).map(([level, cfg]) => (
            <div key={level} className="flex items-center gap-2">
              <div className={cn('w-8 h-1.5 rounded-full bg-gradient-to-r', cfg.barColor)} aria-hidden="true" />
              <span className="text-xs text-[var(--color-text-muted)] font-mono">{cfg.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
