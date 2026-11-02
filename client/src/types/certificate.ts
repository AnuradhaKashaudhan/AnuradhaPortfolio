// ── Certificate types ─────────────────────────────────────────────────────────

export interface Certificate {
  id: string
  title: string
  issuer: string
  issuerLogo?: string
  date: string // e.g. "March 2024"
  credentialId?: string
  credentialUrl?: string
  imagePath: string
  imageAlt: string
  skills: string[]
  category: 'AI/ML' | 'Cloud' | 'Networking' | 'Security'
}
