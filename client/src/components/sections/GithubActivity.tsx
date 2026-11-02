import { useEffect, useState } from 'react'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { Card } from '@/components/ui/Card'

interface GithubData { username: string | null; totalStars: number; repositories: Array<{ name: string; url: string; stars: number; language: string | null }>; events: Array<{ type: string; repository?: string; date: string }> }
export function GithubActivity() {
  const [data, setData] = useState<GithubData | null>(null)
  useEffect(() => { fetch('/api/github').then((response) => response.ok ? response.json() as Promise<GithubData> : null).then(setData).catch(() => setData(null)) }, [])
  if (!data?.username) return null
  return <section className="container pb-10" aria-label="GitHub activity"><Card glass padding="md" className="flex flex-col gap-4"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="flex items-center gap-2 font-semibold"><GithubIcon size={18} /> Latest activity</h2><span className="text-xs text-[var(--color-text-muted)]">{data.totalStars} stars across recent repositories</span></div><div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{data.repositories.slice(0, 3).map((repo) => <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white/5 p-3 hover:bg-white/10"><p className="text-sm font-medium">{repo.name}</p><p className="text-xs text-[var(--color-text-muted)] mt-1">★ {repo.stars} · {repo.language ?? 'Various'}</p></a>)}</div></Card></section>
}
