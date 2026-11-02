import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowRight, Search, X, Star } from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

import { projects } from '@/data/projects'
import type { ProjectCategory } from '@/types/project'
import { cn } from '@/utils/cn'

const ALL_CATEGORIES: (ProjectCategory | 'All')[] = [
  'All', 'AI/ML', 'Computer Vision', 'NLP', 'Generative AI', 'Full Stack',
]

const CATEGORY_COLORS: Record<string, string> = {
  'AI/ML': 'blue',
  'Computer Vision': 'cyan',
  'NLP': 'violet',
  'Generative AI': 'pink',
  'Full Stack': 'green',
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const isPlaceholder = !project.images?.[0] || project.images[0].startsWith('[PLACEHOLDER')

  return (
    <motion.div variants={cardVariant} layout>
      <Card
        glass
        hover
        className="h-full flex flex-col gap-4 group relative overflow-hidden"
      >
        {/* Featured star */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-10">
            <Star size={14} className="text-yellow-400 fill-yellow-400" aria-label="Featured project" />
          </div>
        )}

        {/* Thumbnail */}
        <Link to={`/projects/${project.slug}`} tabIndex={-1} aria-hidden="true">
          <div className={cn(
            'h-44 rounded-xl overflow-hidden border border-white/6 relative',
            'bg-gradient-to-br from-blue-500/10 to-violet-500/8 flex items-center justify-center',
            'group-hover:border-blue-500/20 transition-colors'
          )}>
            <div className="absolute left-3 right-3 top-3 z-10 flex gap-1.5 opacity-70">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            {isPlaceholder ? (
              <span className="text-5xl opacity-30 select-none">
                {project.categories.includes('Computer Vision') ? '👁️' :
                 project.categories.includes('NLP') ? '🧠' :
                 project.categories.includes('Full Stack') ? '🌐' : '⚙️'}
              </span>
            ) : (
              <img src={project.images![0]} alt={project.title} className="w-full h-full object-cover" />
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-xs font-medium flex items-center gap-1">
                View Case Study <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </Link>

        {/* Category badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.categories.map((cat) => (
            <Badge key={cat} variant={(CATEGORY_COLORS[cat] ?? 'default') as Parameters<typeof Badge>[0]['variant']} size="sm">
              {cat}
            </Badge>
          ))}
          <Badge variant={project.status === 'completed' ? 'green' : 'yellow'} size="sm" dot>
            {project.status === 'in-progress' ? 'In Progress' : 'Completed'}
          </Badge>
        </div>

        {/* Title + description */}
        <div className="flex-1 flex flex-col gap-2">
          <Link to={`/projects/${project.slug}`}>
            <h3
              className="font-bold text-[var(--color-text-primary)] hover:text-blue-400 transition-colors line-clamp-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {project.title}
            </h3>
          </Link>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="default" size="sm">{tech}</Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="default" size="sm">+{project.techStack.length - 4} more</Badge>
          )}
        </div>

        {/* Footer links */}
        <div className="flex items-center justify-between pt-1 border-t border-[var(--color-border)]">
          <Link
            to={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Case Study <ArrowRight size={12} />
          </Link>
          <div className="flex items-center gap-1">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} – ${link.label}`}
                className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-white/5 transition-all"
              >
                {link.icon === 'github' ? <GithubIcon size={15} /> : <ExternalLink size={15} />}
              </a>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let list = projects
    // Featured first
    list = [...list.filter((p) => p.featured), ...list.filter((p) => !p.featured)]
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.categories.includes(activeCategory))
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q)) ||
          p.categories.some((c) => c.toLowerCase().includes(q))
      )
    }
    return list
  }, [activeCategory, search])

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've"
          highlight="Built"
          description="A curated collection spanning AI/ML, Computer Vision, NLP, and full-stack engineering."
        />

        {/* Filter + Search row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
          {/* Category pills */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter projects by category"
          >
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer',
                  activeCategory === cat
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                    : 'text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-blue-500/20 hover:text-[var(--color-text-primary)]'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-shrink-0 w-full sm:w-56">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects…"
              aria-label="Search projects"
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/5 border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-blue-500/40 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-[var(--color-text-muted)] font-mono mb-6">
          Showing {filtered.length} of {projects.length} project{projects.length !== 1 ? 's' : ''}
          {search && ` for "${search}"`}
        </p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center flex flex-col items-center gap-3"
            >
              <span className="text-5xl">🔍</span>
              <p className="text-[var(--color-text-secondary)]">No projects match your search.</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All') }}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`${activeCategory}-${search}`}
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
