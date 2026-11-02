import { Mail, Code2, Heart, ArrowUp } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { profile } from '@/data/profile'

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  GitHub: <GithubIcon size={18} />,
  LinkedIn: <LinkedinIcon size={18} />,
  Email: <Mail size={18} />,
}

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)]"
      role="contentinfo"
    >
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Code2 size={16} className="text-white" />
              </div>
              <span
                className="font-bold text-sm tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Anuradha<span className="gradient-text">.</span>
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-xs">
              {profile.bio.slice(0, 100)}…
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-sm font-semibold text-[var(--color-text-primary)] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {NAV_LINKS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-blue-400 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3
              className="text-sm font-semibold text-[var(--color-text-primary)] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              {profile.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)] hover:text-blue-400 transition-colors group"
                >
                  <span className="text-[var(--color-text-muted)] group-hover:text-blue-400 transition-colors">
                    {SOCIAL_ICONS[social.platform] ?? <Mail size={18} />}
                  </span>
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5">
            Built with <Heart size={12} className="text-pink-500 fill-pink-500" aria-hidden="true" /> by{' '}
            <span className="text-[var(--color-text-secondary)]">{profile.name}</span>
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-[var(--color-text-muted)]">© {year} All rights reserved.</p>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-1 rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-text-secondary)] transition hover:border-blue-400/40 hover:text-blue-300" aria-label="Back to top">
              Back to top <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
