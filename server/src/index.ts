import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
import { existsSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { z } from 'zod'

const envPath = resolve(__dirname, '../.env')
const envConfig = dotenv.config({ path: envPath })
if (envConfig.error) {
  console.warn('Server environment file not found; using process environment variables.')
} else {
  console.info('Loaded server environment from server/.env.')
}

function safeErrorMessage(error: unknown): string {
  let message = error instanceof Error ? error.message : String(error)
  for (const [name, value] of Object.entries(process.env)) {
    if (value && /PASS|KEY|TOKEN|SECRET|SMTP_USER|TO_EMAIL/i.test(name)) {
      message = message.split(value).join('[REDACTED]')
    }
  }
  return message
}

const resendApiKey = process.env.RESEND_API_KEY
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const smtpTransporter = !resendApiKey && smtpUser && smtpPass
  ? nodemailer.createTransport({
      service: process.env.SMTP_SERVICE ?? 'gmail',
      auth: { user: smtpUser, pass: smtpPass },
    })
  : null
if (!process.env.RECAPTCHA_SECRET_KEY) {
  console.warn('reCAPTCHA secret is not configured; server CAPTCHA verification is disabled.')
}

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().max(120).default('Portfolio enquiry'),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(200).optional(),
  recaptchaToken: z.string().optional(),
})

const app = express()
const PORT = Number(process.env.PORT ?? 3001)
const allowedOrigin = (process.env.CLIENT_ORIGIN ?? 'http://localhost:5173').trim().replace(/\/+$/, '')
const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || origin === allowedOrigin) return callback(null, true)
    return callback(new Error('Origin not allowed by CORS'))
  },
  credentials: false,
})

app.set('trust proxy', 1)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      scriptSrc: ["'self'", 'https://www.google.com', 'https://www.gstatic.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      styleSrcAttr: ["'unsafe-inline'"],
      fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
      connectSrc: ["'self'", 'https://www.google.com', 'https://www.gstatic.com'],
      frameSrc: ["'self'", 'https://www.google.com', 'https://recaptcha.google.com'],
    },
  },
}))
app.use(express.json({ limit: '20kb' }))
app.use((req, res, next) => {
  const origin = req.get('origin')
  const requestOrigin = `${req.protocol}://${req.get('host')}`
  if (origin && origin === requestOrigin) return next()
  return corsMiddleware(req, res, next)
})

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many contact requests. Please try again later.' },
})
const chatLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'Too many assistant requests. Please try again later.' } })

const sanitize = (value: string) => value.replace(/[<>]/g, '').trim()

async function verifyRecaptcha(token: string | undefined, remoteIp: string | undefined) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return true
  if (!token) return false
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token, ...(remoteIp ? { remoteip: remoteIp } : {}) }),
  })
  if (!response.ok) return false
  const result = await response.json() as { success?: boolean; score?: number }
  return result.success === true && (result.score === undefined || result.score >= 0.5)
}

type EmailMessage = { to: string; subject: string; text: string; replyTo?: string }

async function sendEmail(message: EmailMessage) {
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    const { replyTo, ...email } = message
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
        ...email,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })
    if (!response.ok) throw new Error(`Resend request failed with status ${response.status}`)
    return
  }

  if (!smtpTransporter || !smtpUser) throw new Error('SMTP_USER and SMTP_PASS are required for Gmail SMTP.')
  await smtpTransporter.sendMail({
    from: `"${process.env.FROM_NAME ?? 'Portfolio contact'}" <${smtpUser}>`,
    ...message,
  })
}

if (process.env.NODE_ENV !== 'test' && !resendApiKey) {
  if (!smtpTransporter) {
    console.error('SMTP unavailable: SMTP_USER or SMTP_PASS is missing.')
  } else {
    void smtpTransporter.verify()
      .then(() => console.info('SMTP ready.'))
      .catch((error: unknown) => console.error(`SMTP verification failed: ${safeErrorMessage(error)}`))
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const assistantContext = `Name: Anuradha Kashaudhan
Role: AI/ML Engineer and Full-Stack Developer; B.Tech CSE student at Lovely Professional University, 2023-2027, CGPA 8.05.
Skills: Artificial Intelligence, Machine Learning, Computer Vision, NLP, Generative AI, React, Python, FastAPI, Node.js, OpenCV, YOLOv8, NetworkX, WebRTC.
Projects: NVIS is an AI-driven network vulnerability system using graph analytics, YOLOv8 and explainable risk scoring. AI Interviewer & ATS is a resume analysis and mock interview platform using NLP, LLMs, WebRTC and feedback scoring. MeriCity is an AI civic issue reporting platform using image, voice, GPS, LLM complaint routing and a resolution dashboard.`

app.post('/api/chat', chatLimiter, async (req, res) => {
  const parsed = z.object({ message: z.string().trim().min(1).max(500) }).safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Please provide a question.' })
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return res.json({ answer: 'The portfolio assistant is offline right now. Please use the Projects, Skills, or Contact sections to learn more.' })

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL ?? 'gemini-2.0-flash'}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: `You are Anuradha's portfolio assistant. Answer only questions about Anuradha's portfolio using this context. If unrelated, politely refuse and suggest portfolio topics. Do not invent facts.\n\n${assistantContext}` }] },
        contents: [{ role: 'user', parts: [{ text: parsed.data.message }] }],
      }),
    })
    if (!response.ok) throw new Error(`Gemini request failed: ${response.status}`)
    const result = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }
    const answer = result.candidates?.[0]?.content?.parts?.[0]?.text
    return res.json({ answer: answer ?? 'I could not find that in the portfolio data.' })
  } catch (error) {
    console.error('Chat assistant failed:', error)
    return res.json({ answer: 'The assistant is temporarily unavailable. Please browse the portfolio sections or send a message directly.' })
  }
})

let githubCache: { expires: number; data: unknown } | null = null
app.get('/api/github', async (_req, res) => {
  if (githubCache && githubCache.expires > Date.now()) return res.json(githubCache.data)
  const username = process.env.GITHUB_USERNAME
  if (!username) return res.json({ username: null, repositories: [], events: [], totalStars: 0 })
  try {
    const headers = { Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) }
    const [reposResponse, eventsResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`, { headers }),
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=8`, { headers }),
    ])
    if (!reposResponse.ok || !eventsResponse.ok) throw new Error('GitHub API request failed')
    const repos = await reposResponse.json() as Array<{ name: string; html_url: string; stargazers_count: number; language: string | null; description: string | null }>
    const events = await eventsResponse.json() as Array<{ type: string; repo?: { name: string }; created_at: string }>
    const data = { username, repositories: repos.map(({ name, html_url, stargazers_count, language, description }) => ({ name, url: html_url, stars: stargazers_count, language, description })), events: events.map(({ type, repo, created_at }) => ({ type, repository: repo?.name, date: created_at })), totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) }
    githubCache = { expires: Date.now() + 60 * 60 * 1000, data }
    return res.json(data)
  } catch (error) {
    console.error('GitHub integration failed:', error)
    return res.status(502).json({ error: 'GitHub activity is temporarily unavailable.' })
  }
})

app.post('/api/contact', contactLimiter, async (req, res) => {
  const parsed = contactSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Please check the form fields and try again.' })
  if (parsed.data.website) return res.status(400).json({ error: 'Unable to process this request.' })

  try {
    if (!(await verifyRecaptcha(parsed.data.recaptchaToken, req.ip))) {
      return res.status(400).json({ error: 'CAPTCHA verification failed.' })
    }

    const toEmail = process.env.TO_EMAIL
    if (!toEmail || (!resendApiKey && !smtpTransporter)) {
      console.error('Contact email configuration is incomplete.')
      return res.status(503).json({ error: 'Contact service is temporarily unavailable.' })
    }

    const contact = {
      name: sanitize(parsed.data.name),
      email: sanitize(parsed.data.email),
      subject: sanitize(parsed.data.subject),
      message: sanitize(parsed.data.message),
    }
    await sendEmail({
      to: toEmail,
      replyTo: contact.email,
      subject: `Portfolio: ${contact.subject}`,
      text: `Name: ${contact.name}\nEmail: ${contact.email}\n\n${contact.message}`,
    })
    try {
      await sendEmail({
        to: contact.email,
        subject: 'Thanks for reaching out',
        text: `Hi ${contact.name},\n\nThanks for your message. I have received it and will reply soon.\n\nBest,\n${process.env.FROM_NAME ?? 'Anuradha'}`,
      })
    } catch (error) {
      console.error(`Contact auto-reply failed: ${safeErrorMessage(error)}`)
    }
    return res.json({ success: true, message: 'Message sent successfully.' })
  } catch (error) {
    console.error(`Contact email failed: ${safeErrorMessage(error)}`)
    return res.status(500).json({ error: 'Unable to send your message right now.' })
  }
})

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'API route not found.' })
})

const clientDistPath = resolve(__dirname, '../../client/dist')
const indexHtmlPath = resolve(clientDistPath, 'index.html')
const hasClientBuild = existsSync(indexHtmlPath)

console.info(`Serving client from ${clientDistPath}, index.html exists: ${hasClientBuild}`)

if (hasClientBuild) {
  app.use(express.static(clientDistPath, {
    maxAge: '1y',
    index: false,
    setHeaders: (res, filePath) => {
      if (basename(filePath) === 'index.html') {
        res.setHeader('Cache-Control', 'no-cache')
      } else if (/-[A-Za-z0-9_-]{8,}\.[^.]+$/.test(basename(filePath))) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      }
    },
  }))

  app.get(/^\/(?!api\/).*/, (_req, res, next) => {
    return res.sendFile(indexHtmlPath, {
      cacheControl: false,
      headers: { 'Cache-Control': 'no-cache' },
    }, (error) => {
      if (error) next(error)
    })
  })
} else {
  console.warn(`Client build not found at ${indexHtmlPath}; frontend routes will not be served.`)
}

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.warn(`Portfolio server running at http://localhost:${PORT}`))
}

export default app
