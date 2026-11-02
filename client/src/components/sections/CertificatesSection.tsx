import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Award, ArrowDownUp, FileText } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { certificates } from '@/data/certificates'

const categories = ['All', 'Cloud', 'AI/ML', 'Networking', 'Security'] as const
type Category = (typeof categories)[number]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function CertificatesSection() {
  const [category, setCategory] = useState<Category>('All')
  const [newestFirst, setNewestFirst] = useState(true)
  const visibleCertificates = useMemo(() => {
    const filtered = category === 'All' ? certificates : certificates.filter((cert) => cert.category === category)
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return newestFirst ? dateB - dateA : dateA - dateB
    })
  }, [category, newestFirst])

  return (
    <section id="certificates" className="section bg-[var(--color-surface)]/40">
      <div className="container">
        <SectionHeading
          eyebrow="Certificates"
          title="Continuous"
          highlight="Learning"
          description="Verified credentials and certifications from leading platforms and institutions."
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter certificates">
            {categories.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setCategory(filter)}
                aria-pressed={category === filter}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  category === filter
                    ? 'bg-blue-500/20 text-blue-300 border-blue-400/40'
                    : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setNewestFirst((current) => !current)}
            className="flex items-center gap-2 self-start sm:self-auto text-xs text-[var(--color-text-secondary)] hover:text-blue-400 transition-colors"
          >
            <ArrowDownUp size={14} /> {newestFirst ? 'Newest first' : 'Oldest first'}
          </button>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleCertificates.map((cert) => (
            <motion.div key={cert.id} variants={item}>
              <Card glass hover padding="md" className="h-full flex flex-col gap-4">
                {/* Icon + category */}
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/10 border border-white/6">
                    <Award size={22} className="text-blue-400" />
                  </div>
                  <div className="h-28 rounded-xl overflow-hidden bg-white/5 border border-white/6">
                    <img
                      src={cert.imagePath}
                      alt={cert.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-contain rounded-xl"
                    />
                  </div>
                  <Badge variant="violet" size="sm">
                    {cert.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3
                    className="font-semibold text-[var(--color-text-primary)] mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {cert.title}
                  </h3>
                  <p className="text-sm text-blue-400 font-medium">{cert.issuer}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1 font-mono">{cert.date}</p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <Badge key={skill} variant="default" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Credential link */}
                <a
                  href={cert.imagePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-blue-400 transition-colors text-left"
                >
                  <FileText size={12} /> View Certificate
                </a>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View certificate: ${cert.title}`}
                    className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink size={12} />
                    View Credential
                  </a>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
