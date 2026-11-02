import { useEffect, useMemo, useState } from 'react'
import { Command, Terminal } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { Modal } from './Modal'

export function CommandPalette() {
  const { toggle, isDark } = useTheme()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [terminal, setTerminal] = useState(false)
  const actions = useMemo(() => [
    { label: 'Go to Projects', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Go to Certificates', action: () => document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Go to Contact', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: isDark ? 'Switch to light theme' : 'Switch to dark theme', action: toggle },
    { label: 'Copy email', action: () => void navigator.clipboard.writeText(profile.email) },
    { label: 'Open resume', action: () => { window.location.href = '/resume' } },
    ...projects.map((project) => ({ label: `Open project: ${project.title}`, action: () => { window.location.href = `/projects/${project.slug}` } })),
  ], [isDark, toggle])
  const filtered = actions.filter((action) => action.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setOpen(true) }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full glass px-3 py-2 text-xs text-[var(--color-text-secondary)] shadow-lg" aria-label="Open command palette">
        <Command size={14} /> <span className="hidden sm:inline">Command palette</span><kbd className="hidden sm:inline">⌘K</kbd>
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Command palette" size="md">
        <div className="flex flex-col gap-3">
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search actions or projects..." className="w-full rounded-xl bg-white/5 border border-[var(--color-border)] px-4 py-3 text-sm focus:outline-none focus:border-blue-400" />
          <div className="max-h-72 overflow-y-auto flex flex-col gap-1">
            {filtered.map((action) => <button key={action.label} type="button" onClick={() => { action.action(); setOpen(false) }} className="text-left rounded-lg px-3 py-2.5 text-sm hover:bg-white/10">{action.label}</button>)}
            <button type="button" onClick={() => setTerminal((value) => !value)} className="flex items-center gap-2 text-left rounded-lg px-3 py-2.5 text-sm hover:bg-white/10"><Terminal size={14} /> About me terminal mode</button>
          </div>
          {terminal && <pre className="rounded-xl bg-black/50 p-4 text-xs text-emerald-300 whitespace-pre-wrap">$ whoami{'\n'}{profile.name} — {profile.tagline}{'\n'}$ focus{'\n'}{profile.specializations.join(', ')}</pre>}
        </div>
      </Modal>
    </>
  )
}
