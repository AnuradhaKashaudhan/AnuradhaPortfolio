import { useEffect, useState } from 'react'
import { Download, ArrowLeft, ExternalLink } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'

const RESUMES = {
  general: {
    title: 'General resume',
    fileName: 'AnuradhaCVG',
    url: '/AnuradhaCVG.pdf',
  },
  specialized: {
    title: 'Specialized resume',
    fileName: 'AnuradhaCVS',
    url: '/AnuradhaCVS.pdf',
  },
} as const

export default function ResumePage() {
  const { type } = useParams<{ type: string }>()
  const resume = type === 'specialized' ? RESUMES.specialized : RESUMES.general
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    let active = true

    fetch(resume.url, { method: 'HEAD' })
      .then((response) => {
        const contentType = response.headers.get('content-type') ?? ''
        if (active) setIsAvailable(response.ok && contentType.includes('application/pdf'))
      })
      .catch(() => {
        if (active) setIsAvailable(false)
      })

    return () => {
      active = false
    }
  }, [resume.url])

  return (
    <>
      <Navbar />
      <main id="main-content" className="container min-h-screen py-28">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">
            <ArrowLeft size={15} /> Back to portfolio
          </Link>
          <div className="flex flex-wrap gap-3">
            <a href={resume.url} target="_blank" rel="noopener noreferrer" aria-disabled={isAvailable !== true} className={isAvailable !== true ? 'pointer-events-none opacity-50' : undefined}>
              <Button variant="outline" leftIcon={<ExternalLink size={15} />}>Open PDF</Button>
            </a>
            <a href={resume.url} download={resume.fileName + '.pdf'} aria-disabled={isAvailable !== true} className={isAvailable !== true ? 'pointer-events-none opacity-50' : undefined}>
              <Button variant="gradient" leftIcon={<Download size={15} />}>Download resume</Button>
            </a>
          </div>
        </div>

        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-blue-400">Resume / {resume.fileName}</p>
        <h1 className="mb-6 text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{resume.title}</h1>
        {isAvailable === true ? (
          <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-2xl shadow-black/20">
            <iframe
              src={resume.url}
              title={`${resume.title} - Anuradha Kashaudhan`}
              className="h-[75vh] min-h-[30rem] w-full"
            />
          </div>
        ) : (
          <div className="glass flex min-h-[30rem] flex-col items-center justify-center rounded-2xl px-6 py-16 text-center">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-blue-400">PDF not uploaded yet</p>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">{resume.fileName}.pdf</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-[var(--color-text-secondary)]">
              Add <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">{resume.fileName}.pdf</code> to <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">client/public</code> to enable this resume viewer.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
