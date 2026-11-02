import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Download, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ToastContainer, type ToastData } from '@/components/ui/Toast'
import { profile } from '@/data/profile'
import { apiUrl } from '@/lib/api'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80, 'Name is too long.'),
  email: z.string().trim().email('Please enter a valid email address.').max(254),
  subject: z.string().trim().max(120, 'Subject is too long.'),
  message: z.string().trim().min(10, 'Please enter at least 10 characters.').max(2000, 'Message is too long.'),
  website: z.string().max(0).optional(),
  recaptchaToken: z.string().optional(),
})
type ContactForm = z.infer<typeof contactSchema>

const inputClass = 'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-blue-500/50 transition-colors'

export function ContactSection() {
  const [toasts, setToasts] = useState<ToastData[]>([])
  const [copied, setCopied] = useState(false)
  const addToast = (type: ToastData['type'], message: string) => {
    setToasts((current) => [...current, { id: crypto.randomUUID(), type, message }])
  }
  const removeToast = (id: string) => setToasts((current) => current.filter((toast) => toast.id !== id))
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '', website: '' },
  })
  const messageLength = watch('message', '').length
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined

  useEffect(() => {
    if (!recaptchaSiteKey || document.querySelector('script[data-recaptcha]')) return
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(recaptchaSiteKey)}`
    script.async = true
    script.dataset.recaptcha = 'true'
    document.head.appendChild(script)
  }, [recaptchaSiteKey])

  const onSubmit = async (values: ContactForm) => {
    try {
      const recaptchaToken = recaptchaSiteKey && window.grecaptcha
        ? await new Promise<string>((resolve) => window.grecaptcha?.ready(() => {
            void window.grecaptcha?.execute(recaptchaSiteKey, { action: 'contact' }).then(resolve)
          }))
        : undefined
      const response = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, recaptchaToken }),
      })
      const result = await response.json().catch(() => ({})) as { message?: string; error?: string }
      if (!response.ok) throw new Error(result.error ?? 'Unable to send your message.')
      reset()
      addToast('success', result.message ?? 'Message sent successfully.')
    } catch (error) {
      addToast('error', error instanceof Error ? error.message : 'Unable to send your message.')
    }
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    addToast('success', 'Email copied to clipboard.')
    window.setTimeout(() => setCopied(false), 2000)
  }

  const errorFor = (field: keyof ContactForm) => errors[field]?.message

  return (
    <section id="contact" className="section bg-[var(--color-surface)]/40">
      <div className="container">
        <SectionHeading eyebrow="Contact" title="Let's Build Something" highlight="Together" description="Have a project idea, internship offer, or just want to talk tech? My inbox is always open." />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card glass padding="lg" className="flex flex-col gap-6 h-full">
              <div>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Get In Touch</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">I'm currently open to internship opportunities, research collaborations, and interesting side projects. Response time: within 24 hours.</p>
              </div>
              <dl className="flex flex-col gap-4">
                <div className="flex items-center gap-3"><Mail size={18} className="text-cyan-400" /><div><dt className="text-xs text-[var(--color-text-muted)]">Email</dt><dd className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">{profile.email}<button type="button" onClick={copyEmail} aria-label="Copy email"><Copy size={13} /></button>{copied && <span className="text-xs text-emerald-400">Copied</span>}</dd></div></div>
                {profile.phone && <div className="flex items-center gap-3"><Phone size={18} className="text-emerald-400" /><div><dt className="text-xs text-[var(--color-text-muted)]">Phone</dt><dd className="text-sm text-[var(--color-text-secondary)]">{profile.phone}</dd></div></div>}
                <div className="flex items-center gap-3"><MapPin size={18} className="text-violet-400" /><div><dt className="text-xs text-[var(--color-text-muted)]">Location</dt><dd className="text-sm text-[var(--color-text-secondary)]">{profile.location}</dd></div></div>
              </dl>
              <div className="flex flex-col gap-3">
                {profile.socials.filter((social) => social.platform !== 'Email').map((social) => (
                  <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-blue-400">
                    {social.platform === 'GitHub' ? <GithubIcon size={16} /> : <LinkedinIcon size={16} />} {social.platform}
                  </a>
                ))}
              </div>
              {profile.resumeUrl && !profile.resumeUrl.startsWith('[') && <a href={profile.resumeUrl} download><Button variant="outline" size="sm" leftIcon={<Download size={14} />}>Download Resume</Button></a>}
            </Card>
          </motion.div>
          <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card glass padding="lg">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate aria-label="Contact form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Name" id="contact-name" error={errorFor('name')}><input id="contact-name" {...register('name')} placeholder="Your name" className={inputClass} /></Field>
                  <Field label="Email" id="contact-email" error={errorFor('email')}><input id="contact-email" type="email" {...register('email')} placeholder="you@example.com" className={inputClass} /></Field>
                </div>
                <Field label="Subject" id="contact-subject" error={errorFor('subject')}><input id="contact-subject" {...register('subject')} placeholder="What's this about?" className={inputClass} /></Field>
                <Field label="Message" id="contact-message" error={errorFor('message')}><textarea id="contact-message" rows={5} {...register('message')} placeholder="Tell me about your project, idea, or opportunity..." className={`${inputClass} resize-none`} /><span className="text-xs text-[var(--color-text-muted)] text-right">{messageLength}/2000</span></Field>
                <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register('website')} />
                <Button type="submit" variant="gradient" size="lg" isLoading={isSubmitting} rightIcon={<Send size={15} />} className="self-end">{isSubmitting ? 'Sending...' : 'Send Message'}</Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </section>
  )
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5"><label htmlFor={id} className="text-sm text-[var(--color-text-secondary)]">{label} {label !== 'Subject' && <span aria-hidden className="text-red-400">*</span>}</label>{children}{error && <p className="text-xs text-red-400" role="alert">{error}</p>}</div>
}
