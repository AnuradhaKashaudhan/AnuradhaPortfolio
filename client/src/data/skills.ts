import type { SkillGroup } from '@/types/skill'

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', level: 'expert', category: 'Languages' },
      { name: 'JavaScript', level: 'advanced', category: 'Languages' },
      { name: 'TypeScript', level: 'advanced', category: 'Languages' },
      { name: 'C++', level: 'intermediate', category: 'Languages' },
      { name: 'SQL', level: 'advanced', category: 'Languages' },
    ],
  },
  {
    category: 'AI/ML & Deep Learning',
    skills: [
      { name: 'PyTorch', level: 'advanced', category: 'AI/ML Frameworks' },
      { name: 'TensorFlow / Keras', level: 'intermediate', category: 'AI/ML Frameworks' },
      { name: 'scikit-learn', level: 'advanced', category: 'AI/ML Frameworks' },
      { name: 'HuggingFace Transformers', level: 'advanced', category: 'AI/ML Frameworks' },
      { name: 'XGBoost / LightGBM', level: 'intermediate', category: 'AI/ML Frameworks' },
      { name: 'NumPy / Pandas', level: 'expert', category: 'AI/ML Frameworks' },
    ],
  },
  {
    category: 'Generative AI & Agentic AI',
    skills: [
      { name: 'LangChain', level: 'advanced', category: 'AI/ML Frameworks' },
      { name: 'LangGraph', level: 'intermediate', category: 'AI/ML Frameworks' },
      { name: 'RAG Pipelines', level: 'advanced', category: 'AI/ML Frameworks' },
      { name: 'LoRA / PEFT Fine-tuning', level: 'intermediate', category: 'AI/ML Frameworks' },
      { name: 'OpenAI / Gemini APIs', level: 'advanced', category: 'AI/ML Frameworks' },
      { name: 'MCP (Model Context Protocol)', level: 'beginner', category: 'AI/ML Frameworks' },
    ],
  },
  {
    category: 'Computer Vision',
    skills: [
      { name: 'OpenCV', level: 'advanced', category: 'Computer Vision' },
      { name: 'YOLOv8 / Ultralytics', level: 'advanced', category: 'Computer Vision' },
      { name: 'MediaPipe', level: 'intermediate', category: 'Computer Vision' },
      { name: 'Pillow / Albumentations', level: 'intermediate', category: 'Computer Vision' },
    ],
  },
  {
    category: 'Backend & Frameworks',
    skills: [
      { name: 'FastAPI', level: 'advanced', category: 'Backend' },
      { name: 'Node.js + Express', level: 'advanced', category: 'Backend' },
      { name: 'REST APIs', level: 'expert', category: 'Backend' },
      { name: 'MongoDB', level: 'intermediate', category: 'Databases' },
      { name: 'PostgreSQL', level: 'intermediate', category: 'Databases' },
      { name: 'WebRTC', level: 'intermediate', category: 'Backend' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React 18', level: 'advanced', category: 'Frontend' },
      { name: 'Vite + TypeScript', level: 'advanced', category: 'Frontend' },
      { name: 'Tailwind CSS', level: 'advanced', category: 'Frontend' },
      { name: 'Framer Motion', level: 'intermediate', category: 'Frontend' },
      { name: 'Streamlit', level: 'advanced', category: 'Frontend' },
    ],
  },
  {
    category: 'MLOps & Cloud',
    skills: [
      { name: 'Docker', level: 'intermediate', category: 'DevOps & Tools' },
      { name: 'Git & GitHub', level: 'advanced', category: 'DevOps & Tools' },
      { name: 'Hugging Face Hub', level: 'intermediate', category: 'DevOps & Tools' },
      { name: 'Google Cloud / AWS (basics)', level: 'beginner', category: 'Cloud' },
    ],
  },
  {
    category: 'CS Fundamentals',
    skills: [
      { name: 'Data Structures & Algorithms', level: 'advanced', category: 'Languages' },
      { name: 'System Design (basics)', level: 'intermediate', category: 'Languages' },
      { name: 'OOP & Design Patterns', level: 'advanced', category: 'Languages' },
      { name: 'Linux CLI', level: 'intermediate', category: 'DevOps & Tools' },
    ],
  },
]
