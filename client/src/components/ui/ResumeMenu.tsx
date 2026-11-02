import { Download, FileText, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

const RESUME_OPTIONS = [
  {
    label: 'General resume',
    description: 'AnuradhaCVG',
    href: '/resume/general',
  },
  {
    label: 'Specialized resume',
    description: 'AnuradhaCVS',
    href: '/resume/specialized',
  },
] as const

interface ResumeMenuProps {
  size?: 'md' | 'lg'
}

export function ResumeMenu({ size = 'lg' }: ResumeMenuProps) {
  return (
    <div className="group relative">
      <Button
        variant="outline"
        size={size}
        leftIcon={<Download size={16} />}
        rightIcon={<ChevronDown size={14} className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />}
        aria-haspopup="menu"
        aria-label="Choose a resume to view"
      >
        View resume
      </Button>

      <div
        role="menu"
        aria-label="Resume options"
        className="invisible absolute left-0 top-full z-30 w-64 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        <div className="glass rounded-2xl p-2 shadow-2xl shadow-black/30">
          <p className="px-3 pb-2 pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            Choose a version
          </p>
          {RESUME_OPTIONS.map((option) => (
            <Link
              key={option.href}
              to={option.href}
              role="menuitem"
              className="flex items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
            >
              <FileText size={17} className="mt-0.5 shrink-0 text-blue-400" />
              <span>
                <span className="block text-sm font-medium text-[var(--color-text-primary)]">{option.label}</span>
                <span className="mt-0.5 block font-mono text-[11px] text-[var(--color-text-muted)]">{option.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
