// ── Project types ─────────────────────────────────────────────────────────────

export type ProjectCategory =
  | 'AI/ML'
  | 'Computer Vision'
  | 'NLP'
  | 'Generative AI'
  | 'Full Stack'
  | 'Other'

export interface ProjectLink {
  label: string
  url: string
  icon?: string
}

export interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  problem: string
  solution: string
  architecture: string
  features: string[]
  myRole: string
  challenges: string[]
  results: string[]
  thumbnail?: string
  images?: string[]
  techStack: string[]
  categories: ProjectCategory[]
  links: ProjectLink[]
  featured: boolean
  status: 'completed' | 'in-progress' | 'archived'
  date: string
  highlights?: string[]
  demoUrl?: string
  videoUrl?: string
}
