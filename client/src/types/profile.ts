// ── Shared types ─────────────────────────────────────────────────────────────

export interface SocialLink {
  platform: string
  url: string
  label: string
}

export interface Achievement {
  icon: string
  title: string
  detail: string
}

export interface EducationEntry {
  level: string
  institution: string
  location: string
  period: string
  score: string
  current: boolean
}

export interface Stat {
  label: string
  value: string
}

export interface Profile {
  name: string
  tagline: string
  bio: string
  longBio: string
  email: string
  phone?: string
  location: string
  university: string
  degree: string
  batch: string
  cgpa?: string
  avatar?: string
  resumeUrl?: string
  socials: SocialLink[]
  specializations: string[]
  achievements: Achievement[]
  education: EducationEntry[]
  stats: Stat[]
}
