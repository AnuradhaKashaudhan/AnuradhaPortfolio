import type { Profile } from '@/types/profile'

export const profile: Profile = {
  name: 'Anuradha Kashaudhan',
  tagline: 'AI/ML Engineer & Full-Stack Developer',
  bio: 'B.Tech CSE student at Lovely Professional University (2023–2027) passionate about building intelligent systems — from Computer Vision pipelines and LLM-powered apps to production-ready full-stack products.',
  longBio: `I'm Anuradha Kashaudhan, a Computer Science & Engineering student at Lovely Professional University, Phagwara — Batch of 2027, CGPA 8.05.

I specialize in AI/ML, Computer Vision, NLP, and Generative AI — building systems that bridge research and real-world impact. Whether it's training deep learning models, designing REST APIs, or crafting pixel-perfect UIs, I love the full spectrum of software engineering.

I've shipped production projects ranging from AI-powered civic-tech platforms to network vulnerability detection systems. I'm driven by curiosity, clean code, and the conviction that great technology should be accessible to everyone.`,
  email: 'anuradhakasaudhan51@gmail.com',
  phone: '+91-7398131445',
  location: 'Phagwara, Punjab / Gorakhpur, UP',
  university: 'Lovely Professional University',
  degree: 'B.Tech Computer Science & Engineering',
  batch: '2023–2027',
  cgpa: '8.05',
  resumeUrl: '/AnuradhaCVG.pdf',
  socials: [
    {
      platform: 'GitHub',
      url: 'https://github.com/AnuradhaKashaudhan',
      label: 'GitHub Profile',
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/anuradhakashaudhan/',
      label: 'LinkedIn Profile',
    },
    {
      platform: 'Email',
      url: 'mailto:anuradhakasaudhan51@gmail.com',
      label: 'Send an Email',
    },
  ],
  specializations: [
    'Artificial Intelligence & Machine Learning',
    'Computer Vision',
    'Natural Language Processing',
    'Generative AI & LLMs',
    'Full-Stack Web Development',
  ],
  achievements: [
    {
      icon: '🏆',
      title: '1st Runner-Up — Hack & Hunt Hackathon',
      detail: 'May 2024 · University-level competition',
    },
    {
      icon: '⭐',
      title: '4-Star Coding Rating',
      detail: '#130 University-wide ranking',
    },
    {
      icon: '💻',
      title: '300+ DSA Problems Solved',
      detail: 'Across LeetCode, GFG & HackerRank',
    },
  ],
  education: [
    {
      level: 'B.Tech CSE',
      institution: 'Lovely Professional University',
      location: 'Phagwara, Punjab',
      period: '2023 – 2027',
      score: 'CGPA: 8.05',
      current: true,
    },
    {
      level: 'Class XII (PCM)',
      institution: 'B.N. Public School',
      location: 'Gorakhpur, UP',
      period: '2021 – 2023',
      score: '72%',
      current: false,
    },
    {
      level: 'Class X',
      institution: 'U.S. Central Academy',
      location: 'Gorakhpur, UP',
      period: '2020 – 2021',
      score: '86%',
      current: false,
    },
  ],
  stats: [
    { label: 'Projects Built', value: '10+' },
    { label: 'DSA Problems', value: '300+' },
    { label: 'Certificates', value: '15+' },
    { label: 'CGPA', value: '8.05' },
  ],
}
