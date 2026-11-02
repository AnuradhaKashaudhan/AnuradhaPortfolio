import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, CheckCircle, Trophy, Code2 } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { profile } from '@/data/profile'

// ── Stats Counter ─────────────────────────────────────────────────────────────
function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-1 text-center"
    >
      <span
        className="text-3xl md:text-4xl font-extrabold gradient-text"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {value}
      </span>
      <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-mono">
        {label}
      </span>
    </motion.div>
  )
}

// ── Education Timeline ─────────────────────────────────────────────────────────
function EducationTimeline() {
  return (
    <div className="relative mt-2">
      <div
        className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/60 via-violet-500/40 to-transparent"
        aria-hidden="true"
      />
      <ol className="flex flex-col gap-5">
        {profile.education.map((edu, i) => (
          <motion.li
            key={edu.institution}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-12"
          >
            <div
              className={`absolute left-2 top-2 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                edu.current
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)]'
              }`}
              aria-hidden="true"
            >
              {edu.current && (
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              )}
            </div>
            <div className="glass rounded-xl p-4 border border-[var(--color-border)] hover:border-blue-500/20 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p
                    className="font-semibold text-sm text-[var(--color-text-primary)]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {edu.level}
                  </p>
                  <p className="text-xs text-blue-400 font-medium">{edu.institution}</p>
                  <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1 mt-0.5">
                    <MapPin size={10} />
                    {edu.location}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-mono text-[var(--color-text-muted)]">{edu.period}</p>
                  <Badge variant={edu.current ? 'blue' : 'default'} size="sm" className="mt-1">
                    {edu.score}
                  </Badge>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

// ── Achievements Strip ─────────────────────────────────────────────────────────
function AchievementStrip() {
  const icons: Record<string, React.ReactNode> = {
    '🏆': <Trophy size={18} className="text-yellow-400" />,
    '⭐': <CheckCircle size={18} className="text-violet-400" />,
    '💻': <Code2 size={18} className="text-blue-400" />,
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
      {profile.achievements.map((ach, i) => (
        <motion.div
          key={ach.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Card glass hover padding="md" className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span aria-hidden="true">{icons[ach.icon] ?? ach.icon}</span>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">Achievement</span>
            </div>
            <p
              className="text-sm font-semibold text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {ach.title}
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">{ach.detail}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

// ── About Section ──────────────────────────────────────────────────────────────
export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="About Me"
          title="Turning Ideas Into"
          highlight="Intelligent Systems"
          description="A bit about who I am, where I come from, and what drives me."
        />

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 glass"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { value: '4', label: 'Featured projects' },
            { value: '300+', label: 'DSA problems' },
            { value: '6', label: 'Certificates' },
            { value: profile.cgpa ?? '—', label: 'CGPA' },
          ].map((stat, i) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
          ))}
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* Bio + education */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-3xl p-6 sm:p-8"
            >
              {profile.longBio.split('\n\n').map((para, i) => (
                <p key={i} className="text-[var(--color-text-secondary)] leading-relaxed">
                  {para.trim()}
                </p>
              ))}
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.specializations.map((spec) => (
                  <Badge key={spec} variant="blue" size="sm">
                    {spec}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <div>
              <h3
                className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest font-mono mb-4"
              >
                Achievements
              </h3>
              <AchievementStrip />
            </div>
          </div>

          {/* Right: info card + education timeline */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Quick info card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card glass padding="lg" className="flex flex-col gap-5">
                <h3
                  className="font-semibold text-[var(--color-text-primary)]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Quick Info
                </h3>
                <dl className="flex flex-col gap-3.5">
                  {[
                    { icon: <GraduationCap size={15} className="text-blue-400" />, label: 'University', value: profile.university },
                    { icon: <Calendar size={15} className="text-violet-400" />, label: 'Batch', value: profile.batch },
                    { icon: <MapPin size={15} className="text-cyan-400" />, label: 'Location', value: profile.location },
                    { icon: <CheckCircle size={15} className="text-emerald-400" />, label: 'CGPA', value: profile.cgpa ?? '—' },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="mt-0.5 p-1.5 rounded-lg bg-white/5">{icon}</div>
                      <div>
                        <dt className="text-xs text-[var(--color-text-muted)] font-mono">{label}</dt>
                        <dd className="text-sm text-[var(--color-text-primary)] font-medium">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                <a
                  href={profile.resumeUrl}
                  download
                  className="mt-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white text-sm font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow"
                  aria-label="Download Anuradha's resume"
                >
                  Download Resume
                </a>
              </Card>
            </motion.div>

            {/* Education timeline */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h3
                className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest font-mono mb-4"
              >
                Education
              </h3>
              <EducationTimeline />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
