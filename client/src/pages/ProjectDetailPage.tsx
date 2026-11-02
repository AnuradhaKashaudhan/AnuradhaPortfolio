import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Cpu,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  User,
  Calendar,
} from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ImageGallery } from '@/components/ui/Lightbox'
import { getProjectBySlug, getAdjacentProjects } from '@/data/projects'
import { formatDate } from '@/utils/cn'
import type { Project } from '@/types/project'

const CATEGORY_COLORS: Record<string, string> = {
  'AI/ML': 'blue',
  'Computer Vision': 'cyan',
  'NLP': 'violet',
  'Generative AI': 'pink',
  'Full Stack': 'green',
}

// ── Case study section block ───────────────────────────────────────────────────
function CaseBlock({
  icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col gap-4"
    >
      <h2
        className="flex items-center gap-2.5 text-lg font-bold text-[var(--color-text-primary)]"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        <span className="text-blue-400" aria-hidden="true">{icon}</span>
        {title}
      </h2>
      {children}
    </motion.div>
  )
}

// ── Navigation between projects ────────────────────────────────────────────────
function ProjectNav({ prev, next }: { prev: Project | null; next: Project | null }) {
  if (!prev && !next) return null
  return (
    <div className="flex items-center justify-between gap-4 pt-8 border-t border-[var(--color-border)]">
      {prev ? (
        <Link
          to={`/projects/${prev.slug}`}
          className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-blue-400 transition-colors group max-w-[45%]"
        >
          <ArrowLeft size={16} className="shrink-0 group-hover:-translate-x-1 transition-transform" />
          <div>
            <p className="text-xs text-[var(--color-text-muted)] font-mono mb-0.5">Previous</p>
            <p className="font-medium line-clamp-1">{prev.title}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={`/projects/${next.slug}`}
          className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-blue-400 transition-colors group max-w-[45%] text-right ml-auto"
        >
          <div>
            <p className="text-xs text-[var(--color-text-muted)] font-mono mb-0.5">Next</p>
            <p className="font-medium line-clamp-1">{next.title}</p>
          </div>
          <ArrowRight size={16} className="shrink-0 group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const { prev, next } = slug ? getAdjacentProjects(slug) : { prev: null, next: null }
  useEffect(() => {
    if (project) document.title = `${project.title} | Anuradha Kashaudhan`
    return () => { document.title = 'Anuradha Kashaudhan – AI/ML Engineer & Full-Stack Developer' }
  }, [project])

  if (!project) {
    return (
      <>
        <Navbar />
        <main id="main-content" className="min-h-screen flex items-center justify-center pt-24">
          <div className="text-center flex flex-col items-center gap-5">
            <p className="text-6xl">🔍</p>
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Project not found
            </h1>
            <Link to="/#projects">
              <Button variant="outline" leftIcon={<ArrowLeft size={16} />}>
                Back to Projects
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const heroImage = project.images?.[0]
  const isHeroPlaceholder = !heroImage || heroImage.startsWith('[PLACEHOLDER')

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* ── Hero banner ─────────────────────────────────────────────────── */}
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          {/* Background */}
          {isHeroPlaceholder ? (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-violet-500/10 to-cyan-500/10 bg-grid" />
          ) : (
            <img
              src={heroImage}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/50 to-transparent" />

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 container pb-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-wrap gap-2">
                {project.categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant={(CATEGORY_COLORS[cat] ?? 'default') as Parameters<typeof Badge>[0]['variant']}
                  >
                    {cat}
                  </Badge>
                ))}
                <Badge variant={project.status === 'completed' ? 'green' : 'yellow'} dot>
                  {project.status === 'in-progress' ? 'In Progress' : 'Completed'}
                </Badge>
              </div>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        <div className="container py-10">
          {/* Back link */}
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-blue-400 transition-colors mb-10"
          >
            <ArrowLeft size={15} />
            Back to Projects
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* ── Left: case-study content ─────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              {/* Short description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-[var(--color-text-secondary)] leading-relaxed"
              >
                {project.description}
              </motion.p>

              {/* Problem */}
              <CaseBlock icon={<AlertTriangle size={18} />} title="The Problem" delay={0}>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{project.problem}</p>
              </CaseBlock>

              {/* Solution */}
              <CaseBlock icon={<Lightbulb size={18} />} title="The Solution" delay={0.05}>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{project.solution}</p>
              </CaseBlock>

              {/* Architecture */}
              <CaseBlock icon={<Cpu size={18} />} title="Architecture" delay={0.1}>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{project.architecture}</p>
              </CaseBlock>

              {/* Key features */}
              <CaseBlock icon={<CheckCircle size={18} />} title="Key Features" delay={0.15}>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)] p-3 rounded-xl glass border border-[var(--color-border)]"
                    >
                      <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CaseBlock>

              {/* My Role */}
              <CaseBlock icon={<User size={18} />} title="My Role" delay={0.2}>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{project.myRole}</p>
              </CaseBlock>

              {/* Challenges */}
              <CaseBlock icon={<AlertTriangle size={18} />} title="Challenges & Learnings" delay={0.25}>
                <ul className="flex flex-col gap-3">
                  {project.challenges.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span className="text-orange-400 font-bold shrink-0 font-mono">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </CaseBlock>

              {/* Results */}
              <CaseBlock icon={<TrendingUp size={18} />} title="Results & Impact" delay={0.3}>
                <ul className="flex flex-col gap-2.5">
                  {project.results.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span className="text-blue-400 mt-0.5">▸</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </CaseBlock>

              {/* Screenshot gallery */}
              {(project.demoUrl || project.videoUrl) && (
                <CaseBlock icon={<ExternalLink size={18} />} title="Interactive Demo" delay={0.35}>
                  <Card glass padding="none" className="overflow-hidden">
                    {project.videoUrl ? <iframe src={project.videoUrl} title={`${project.title} walkthrough`} className="w-full aspect-video" allowFullScreen /> : null}
                    {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 text-sm text-blue-400 hover:text-blue-300">Open live demo <ExternalLink size={15} /></a>}
                  </Card>
                </CaseBlock>
              )}

              {/* Screenshot gallery */}
              {project.images && project.images.length > 0 && (
                <CaseBlock icon={<Calendar size={18} />} title="Screenshots" delay={0.35}>
                  <ImageGallery images={project.images} />
                </CaseBlock>
              )}
            </div>

            {/* ── Right sidebar ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-5 lg:sticky lg:top-24 self-start">
              {/* Project links */}
              <Card glass padding="md" className="flex flex-col gap-3">
                <h3
                  className="text-sm font-semibold text-[var(--color-text-primary)]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Links
                </h3>
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5"
                  >
                    <Button
                      variant={link.icon === 'github' ? 'outline' : 'gradient'}
                      size="sm"
                      leftIcon={link.icon === 'github' ? <GithubIcon size={14} /> : <ExternalLink size={14} />}
                      className="w-full justify-start"
                    >
                      {link.label}
                    </Button>
                  </a>
                ))}
              </Card>

              {/* Meta */}
              <Card glass padding="md" className="flex flex-col gap-4">
                <h3
                  className="text-sm font-semibold text-[var(--color-text-primary)]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Project Info
                </h3>
                <dl className="flex flex-col gap-3">
                  <div>
                    <dt className="text-xs text-[var(--color-text-muted)] font-mono mb-0.5">Date</dt>
                    <dd className="text-sm text-[var(--color-text-primary)]">{formatDate(project.date)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--color-text-muted)] font-mono mb-0.5">Status</dt>
                    <dd>
                      <Badge variant={project.status === 'completed' ? 'green' : 'yellow'} dot>
                        {project.status === 'in-progress' ? 'In Progress' : 'Completed'}
                      </Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--color-text-muted)] font-mono mb-1">Categories</dt>
                    <dd className="flex flex-wrap gap-1">
                      {project.categories.map((cat) => (
                        <Badge
                          key={cat}
                          variant={(CATEGORY_COLORS[cat] ?? 'default') as Parameters<typeof Badge>[0]['variant']}
                          size="sm"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Card>

              {/* Tech stack */}
              <Card glass padding="md" className="flex flex-col gap-3">
                <h3
                  className="text-sm font-semibold text-[var(--color-text-primary)]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="default" size="sm">{tech}</Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Next/Previous navigation */}
          <div className="mt-12">
            <ProjectNav prev={prev} next={next} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
