import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mail, Sparkles, Terminal } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { profile } from '@/data/profile'
import { useTypingEffect } from '@/hooks/useTypingEffect'
import { ResumeMenu } from '@/components/ui/ResumeMenu'

const TYPING_PHRASES = ['AI/ML Engineer', 'Computer Vision Developer', 'NLP Enthusiast', 'Generative AI Builder', 'Full-Stack Developer']
const stack = ['Python', 'PyTorch', 'React', 'FastAPI', 'YOLOv8', 'TypeScript', 'OpenCV']
const photoBadges = [
  { label: 'Python', className: '-left-5 top-[18%]', delay: 0 },
  { label: 'PyTorch', className: '-right-4 top-[34%]', delay: 0.4 },
  { label: 'React', className: '-left-6 top-[60%]', delay: 0.8 },
  { label: 'FastAPI', className: '-right-3 top-[76%]', delay: 1.2 },
]

export function HeroSection() {
  const typedText = useTypingEffect(TYPING_PHRASES)
  const prefersReducedMotion = useReducedMotion()
  const [photoFallback, setPhotoFallback] = useState(0)
  const [firstName, ...lastNameParts] = profile.name.trim().split(/\s+/)
  const lastName = lastNameParts.join(' ')
  const initials = profile.name.trim().split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="relative overflow-x-clip bg-grid bg-noise pt-28 sm:pt-36">
      <div className="hero-aurora absolute -left-40 top-20 h-[32rem] w-[32rem] rounded-full bg-blue-500/15 blur-[120px]" aria-hidden="true" />
      <div className="hero-aurora absolute -right-40 top-40 h-[28rem] w-[28rem] rounded-full bg-violet-500/15 blur-[120px]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 md:pb-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative order-1 mx-auto w-full max-w-[420px] py-5 lg:order-2">
            <div className="pointer-events-none absolute inset-10 rounded-full bg-gradient-to-br from-blue-500/35 via-violet-500/30 to-cyan-400/25 blur-3xl" aria-hidden="true" />
            <motion.div
              className="relative mx-auto w-[200px] md:w-[320px]"
              animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
              transition={prefersReducedMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-blue-400 via-violet-500 to-blue-600 p-[2px] shadow-[0_0_48px_rgba(99,102,241,0.28)]">
                <div className="h-full w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-blue-600 to-violet-700">
                  {photoFallback < 2 ? (
                    <img
                      src={photoFallback === 0 ? '/profile.webp' : '/profile.jpg'}
                      alt="Anuradha Kashaudhan"
                      width={640}
                      height={800}
                      loading="eager"
                      fetchPriority="high"
                      className="h-full w-full object-cover object-top"
                      onError={() => setPhotoFallback((attempt) => attempt + 1)}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700 text-6xl font-bold tracking-tight text-white" role="img" aria-label={`${profile.name} initials`}>
                      {initials}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {photoBadges.map((badge) => (
              <motion.span
                key={badge.label}
                className={`absolute ${badge.className} rounded-xl border border-white/15 bg-slate-950/90 px-3 py-2 font-mono text-xs font-medium text-white shadow-lg shadow-black/20 backdrop-blur-md`}
                animate={prefersReducedMotion ? undefined : { y: [0, -5, 0], x: [0, 2, 0] }}
                transition={prefersReducedMotion ? undefined : { duration: 4, delay: badge.delay, repeat: Infinity, ease: 'easeInOut' }}
              >
                {badge.label}
              </motion.span>
            ))}

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass hero-code-card absolute -bottom-2 left-0 hidden w-[260px] rounded-2xl p-4 md:block lg:-left-10"
            >
              <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-red-400/80" /><span className="h-2 w-2 rounded-full bg-yellow-400/80" /><span className="h-2 w-2 rounded-full bg-emerald-400/80" /></div>
                <span className="font-mono text-[10px] text-slate-400">anuradha.py</span>
              </div>
              <pre className="overflow-hidden font-mono text-[10px] leading-5 text-slate-200"><code><span className="text-violet-300">class</span> <span className="text-cyan-300">Builder</span>:{'\n'}  focus = <span className="text-emerald-300">"real-world impact"</span>{'\n'}  tools = [<span className="text-amber-300">"ML"</span>, <span className="text-amber-300">"vision"</span>, <span className="text-amber-300">"NLP"</span>]</code></pre>
            </motion.div>
          </div>

          <div className="order-2 flex min-w-0 flex-col items-start gap-6 lg:order-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="mb-2 font-mono text-sm text-[var(--color-text-secondary)]">Hi, I&apos;m</p>
              <h1 className="text-4xl font-bold leading-[0.98] tracking-[-0.06em] md:text-6xl" style={{ fontFamily: 'var(--font-heading)' }}>
                <span className="gradient-text hero-name-gradient">{firstName}</span>{lastName && <> {lastName}</>}
              </h1>
              <h2 className="mt-6 max-w-2xl text-3xl font-bold leading-tight tracking-[-0.045em] text-[var(--color-text-primary)] md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                Building useful intelligence.
              </h2>
            </motion.div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-text-secondary)]">AI / ML · Full-Stack · Builder</p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex min-h-7 items-center gap-2 text-base text-[var(--color-text-secondary)] sm:text-lg">
                <Terminal size={18} className="hero-typing-accent shrink-0 text-blue-400" />
                <span className="font-mono">{typedText}<span className="hero-typing-accent ml-1 animate-pulse text-blue-400">|</span></span>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
              <Badge variant="blue" size="md" dot className="hero-open-badge"><Sparkles size={12} /> Open to internships &amp; collaborations</Badge>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-xl text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
              {profile.bio}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-wrap gap-3">
              <Button variant="gradient" size="lg" onClick={() => scrollTo('projects')} rightIcon={<ArrowRight size={16} />}>View projects</Button>
              <ResumeMenu size="lg" />
              <Button variant="ghost" size="lg" leftIcon={<Mail size={16} />} onClick={() => scrollTo('contact')}>Let&apos;s talk</Button>
            </motion.div>
            <div className="flex items-center gap-2 pt-1">
              {profile.socials.map((social) => (
                <a key={social.platform} href={social.url} target={social.platform === 'Email' ? undefined : '_blank'} rel="noopener noreferrer" aria-label={social.label} className="rounded-xl border border-[var(--color-border)] p-3 text-[var(--color-text-muted)] transition hover:border-blue-400/40 hover:bg-blue-400/10 hover:text-blue-300">
                  {social.platform === 'GitHub' ? <GithubIcon size={18} /> : social.platform === 'LinkedIn' ? <LinkedinIcon size={18} /> : <Mail size={18} />}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 overflow-hidden border-y border-[var(--color-border)] py-4">
          <div className="flex min-w-max animate-[marquee_24s_linear_infinite] gap-10 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
            {[...stack, ...stack].map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-blue-400" />{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}
