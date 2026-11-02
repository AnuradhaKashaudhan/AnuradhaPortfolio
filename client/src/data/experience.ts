import type { Experience } from '@/types/experience'

export const experiences: Experience[] = [
  {
    id: 'exp-001',
    role: 'Campus CEO Intern',
    company: 'CashKaro',
    companyUrl: 'https://cashkaro.com',
    location: 'Phagwara, Punjab (On-Campus)',
    type: 'internship',
    startDate: 'Apr 2026',
    endDate: null,
    description:
      'Led campus-level growth and brand-building initiatives for CashKaro — India\'s largest cashback and coupon platform — driving measurable impact in user acquisition and engagement.',
    responsibilities: [
      'Designed and executed targeted promotional campaigns across LPU campus, generating 1,000+ app downloads.',
      'Secured 5 strategic campus partnerships with student clubs and academic bodies.',
      'Grew platform\'s active user base by 15% and expanded brand reach by 30% within the campus ecosystem.',
      'Gathered structured feedback from 200+ students to inform product and marketing improvements.',
      'Managed on-ground events and digital outreach simultaneously in an Agile sprint model.',
    ],
    techStack: ['Campaign Management', 'Data Analysis', 'Community Outreach', 'Growth Hacking'],
    logo: '[PLACEHOLDER_CASHKARO_LOGO]',
    highlights: [
      '1,000+ app downloads',
      '5 campus partnerships',
      '15% user growth',
      '30% brand reach increase',
      '200+ student feedbacks collected',
    ],
  },
  {
    id: 'exp-002',
    role: 'Software Developer Intern',
    company: 'BlueStock Fintech',
    companyUrl: 'https://bluestock.in',
    location: 'Remote',
    type: 'internship',
    startDate: 'Apr 2025',
    endDate: 'May 2025',
    description:
      'Contributed to backend engineering for BlueStock\'s fintech platform — designing efficient RESTful APIs and optimizing core database operations within an Agile development team.',
    responsibilities: [
      'Engineered RESTful APIs that reduced average response latency by ~25%.',
      'Optimized complex SQL queries resulting in ~40% faster execution times on production datasets.',
      'Collaborated with cross-functional teams using Git workflows and Agile sprint ceremonies.',
      'Participated in code reviews and contributed to production release cycles.',
    ],
    techStack: ['Python', 'REST APIs', 'SQL', 'PostgreSQL', 'Git', 'Agile', 'Postman'],
    logo: '[PLACEHOLDER_BLUESTOCK_LOGO]',
    highlights: [
      '~25% API latency reduction',
      '~40% SQL query speedup',
      'Production deployment experience',
    ],
  },
]
