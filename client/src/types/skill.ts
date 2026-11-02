// ── Skill types ───────────────────────────────────────────────────────────────

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export interface Skill {
  name: string
  icon?: string
  level: SkillLevel
  category: SkillCategory
}

export type SkillCategory =
  | 'Languages'
  | 'AI/ML Frameworks'
  | 'Computer Vision'
  | 'NLP'
  | 'Frontend'
  | 'Backend'
  | 'Databases'
  | 'DevOps & Tools'
  | 'Cloud'

export interface SkillGroup {
  category: string  // Allow custom display names
  skills: Skill[]
}
