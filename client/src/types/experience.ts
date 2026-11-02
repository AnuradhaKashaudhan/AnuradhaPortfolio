// ── Experience types ──────────────────────────────────────────────────────────

export type ExperienceType = 'internship' | 'job' | 'research' | 'freelance' | 'volunteer'

export interface Experience {
  id: string
  role: string
  company: string
  companyUrl?: string
  location: string
  type: ExperienceType
  startDate: string
  endDate: string | null
  description: string
  responsibilities: string[]
  techStack: string[]
  logo?: string
  highlights?: string[]
}
