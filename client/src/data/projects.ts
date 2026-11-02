import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'proj-001',
    slug: 'nvis',
    title: 'Network Vulnerability Intercept System (NVIS)',
    shortDescription:
      'AI-driven network topology analyser that detects vulnerabilities, scores risk with explainable AI, and generates PDF threat reports.',
    description:
      'NVIS is an intelligent security platform that ingests network topology data, constructs graph representations, and applies AI-powered vulnerability detection. It surfaces risk through centrality-based analytics, interactive heatmaps, and a real-time telemetry dashboard — all backed by explainable scoring so security teams know exactly why a node is flagged.',
    problem:
      'Traditional vulnerability scanners surface raw CVE lists without context. Security analysts waste hours correlating findings across sprawling network topologies, unable to prioritise what matters most.',
    solution:
      'NVIS models the network as a directed graph, computes centrality and betweenness metrics to identify critical nodes, and layers YOLOv8-powered visual inspection on top. An XAI module explains each risk score in plain language, while an export pipeline produces executive-ready PDF reports.',
    architecture:
      'React frontend communicates with a FastAPI backend. NetworkX builds the topology graph in real time; OpenCV and YOLOv8 process device screenshots for visual anomaly detection. Recharts powers the telemetry dashboard; a PDF renderer generates exportable reports.',
    features: [
      'Interactive network topology graph with centrality-based risk overlay',
      'YOLOv8 visual anomaly detection on device screenshots',
      'Explainable AI risk scoring with plain-language justifications',
      'Real-time telemetry dashboard with Recharts',
      'Vulnerability heatmaps and severity colour coding',
      'One-click PDF executive report generation',
    ],
    techStack: ['React', 'FastAPI', 'Python', 'YOLOv8', 'OpenCV', 'NetworkX', 'NumPy', 'Recharts', 'Tailwind CSS'],
    categories: ['AI/ML', 'Computer Vision', 'Full Stack'],
    links: [
      { label: 'GitHub', url: '[PLACEHOLDER_NVIS_GITHUB]', icon: 'github' },
      { label: 'Live Demo', url: '[PLACEHOLDER_NVIS_DEMO]', icon: 'external-link' },
    ],
    featured: true,
    status: 'completed',
    date: '2026-05-01',
    myRole:
      'End-to-end — designed the graph analytics pipeline, integrated YOLOv8 for visual inspection, built the React dashboard, and implemented the PDF report generator.',
    challenges: [
      'Rendering large topology graphs without freezing the browser required virtual rendering and progressive loading.',
      'Making AI risk scores interpretable demanded a custom XAI wrapper that maps model outputs to human-readable severity narratives.',
    ],
    results: [
      'Demonstrated end-to-end detection from topology ingestion to PDF report in under 10 seconds.',
      'Visual anomaly module achieves high-confidence classification on synthetic device datasets.',
    ],
    images: [
      '[PLACEHOLDER_NVIS_SS1]',
      '[PLACEHOLDER_NVIS_SS2]',
      '[PLACEHOLDER_NVIS_SS3]',
      '[PLACEHOLDER_NVIS_SS4]',
    ],
  },
  {
    id: 'proj-002',
    slug: 'ai-interviewer-ats',
    title: 'AI Interviewer & ATS Optimisation Platform',
    shortDescription:
      'Full-stack platform that parses resumes, scores ATS compatibility, runs personalised mock interviews with speech + camera, and delivers AI feedback.',
    description:
      'A comprehensive career-prep tool that combines intelligent resume analysis with an AI-driven mock interview engine. Candidates upload their resume, receive an instant ATS score and keyword gap analysis, then enter a live interview session where an LLM asks role-specific questions while the platform captures speech, analyses delivery, and coaches confidence, communication, and technical depth.',
    problem:
      'Job seekers struggle to understand why their resumes are rejected by Applicant Tracking Systems and have no structured way to practise interviews with actionable feedback.',
    solution:
      'The platform parses resumes with NLP, benchmarks them against job descriptions using TF-IDF and semantic similarity, and generates an ATS improvement roadmap. The interview module streams LLM-generated questions, records audio/video via WebRTC, transcribes speech, and evaluates responses on three axes: communication, confidence, and technical depth.',
    architecture:
      'React frontend with WebRTC for camera/mic access. FastAPI backend orchestrates NLP pipelines, LLM API calls, and scoring logic. OpenCV processes video frames for engagement cues; speech-to-text transcription feeds the response evaluator.',
    features: [
      'Resume upload and structured NLP parsing',
      'ATS score with keyword gap analysis and optimisation suggestions',
      'Role-specific mock interview question generation via LLM APIs',
      'Live camera + microphone integration (WebRTC)',
      'Speech transcription and delivery analysis',
      'AI feedback report: communication, confidence, technical depth',
      'Session history and progress tracking dashboard',
    ],
    techStack: ['React', 'FastAPI', 'Python', 'OpenCV', 'NLP', 'LLM APIs', 'WebRTC', 'spaCy', 'Tailwind CSS'],
    categories: ['AI/ML', 'NLP', 'Full Stack'],
    links: [
      { label: 'GitHub', url: '[PLACEHOLDER_ATIS_GITHUB]', icon: 'github' },
      { label: 'Live Demo', url: '[PLACEHOLDER_ATIS_DEMO]', icon: 'external-link' },
    ],
    featured: true,
    status: 'in-progress',
    date: '2026-03-01',
    myRole:
      'Full-stack lead — architected the ATS scoring engine, built the WebRTC interview session, integrated LLM APIs, and designed the feedback report pipeline.',
    challenges: [
      'Synchronising audio transcription latency with real-time interview flow required careful buffering and UI state management.',
      'Calibrating ATS scoring to reflect real recruiter behaviour needed iterative testing against public job boards.',
    ],
    results: [
      'Beta users report significantly higher ATS pass-through rates after applying the keyword recommendations.',
      'Interview simulation module under active development with multi-role support.',
    ],
    images: [
      '[PLACEHOLDER_ATIS_SS1]',
      '[PLACEHOLDER_ATIS_SS2]',
      '[PLACEHOLDER_ATIS_SS3]',
    ],
  },
  {
    id: 'proj-003',
    slug: 'mericity',
    title: 'MeriCity — AI Civic Issue Reporting Platform',
    shortDescription:
      'Mobile-first civic-tech app that lets citizens report urban issues via image, voice, and GPS, with LLM-based complaint routing and a live resolution dashboard.',
    description:
      'MeriCity reimagines how citizens interact with local government. Users report potholes, broken streetlights, or garbage dumping by snapping a photo, speaking a voice note, or dropping a pin. An LLM pipeline classifies the complaint, assigns it to the correct municipal department, and tracks resolution progress on a Google Maps dashboard visible to both citizens and administrators.',
    problem:
      'Civic complaint channels in India are fragmented, opaque, and slow. Citizens have no visibility into whether their complaints are received, assigned, or resolved.',
    solution:
      'MeriCity provides a unified multi-modal reporting interface (image + voice + GPS). An OpenAI-powered classification engine categorises complaints and routes them to the right department automatically. A real-time Google Maps visualisation shows issue clusters, statuses, and resolution timelines — bringing accountability and transparency to civic governance.',
    architecture:
      'React frontend with Google Maps JS SDK. Node.js + Express REST API. MongoDB Atlas for complaint storage and status tracking. OpenAI API for complaint classification and department routing. Media uploads via cloud storage.',
    features: [
      'Multi-modal issue reporting: image capture, voice note, and GPS pinning',
      'LLM-based complaint classification and automated department routing',
      'Google Maps visualisation of reported issues with cluster heat mapping',
      'Citizen dashboard: submission history and real-time resolution status',
      'Admin dashboard: incoming queue, assignment workflow, status updates',
      'Push notifications for complaint status changes',
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Google Maps API', 'OpenAI API', 'Tailwind CSS', 'REST APIs'],
    categories: ['Full Stack', 'AI/ML', 'NLP'],
    links: [
      { label: 'GitHub', url: '[PLACEHOLDER_MERICITY_GITHUB]', icon: 'github' },
      { label: 'Live Demo', url: '[PLACEHOLDER_MERICITY_DEMO]', icon: 'external-link' },
    ],
    featured: true,
    status: 'completed',
    date: '2025-12-01',
    myRole:
      'Full-stack developer — built the React UI, Node/Express backend, MongoDB data model, Google Maps integration, and the OpenAI-powered routing pipeline.',
    challenges: [
      'Designing an LLM prompt robust enough to handle vague, vernacular, and multilingual complaint text required extensive iteration.',
      'Implementing real-time map updates without polling overhead led to a WebSocket-based status broadcast system.',
    ],
    results: [
      'Successfully demonstrated live issue tracking from citizen submission to department resolution.',
      'Google Maps clustering reduced information overload for admin users managing high-volume urban areas.',
    ],
    images: [
      '[PLACEHOLDER_MERICITY_SS1]',
      '[PLACEHOLDER_MERICITY_SS2]',
      '[PLACEHOLDER_MERICITY_SS3]',
      '[PLACEHOLDER_MERICITY_SS4]',
    ],
  },
  {
    id: 'proj-004',
    slug: 'noisy-text-normalizer',
    title: 'Noisy Text Normalizer',
    shortDescription:
      'Hybrid BERT + morphological model that corrects social-media slang, typos, and informal text into standard English — with a live Streamlit dashboard.',
    description:
      'Social-media text is rife with abbreviations, phonetic spellings, hashtags, and creative misspellings that break downstream NLP pipelines. This project combines fine-tuned BERT contextual embeddings with classical morphological analysis and edit-distance matching to normalise noisy text while preserving semantic intent.',
    problem:
      'Standard NLP models trained on clean corpora fail on social-media text. Abbreviations like "gr8", "u", "omg", or slang like "gonna" silently degrade tasks like sentiment analysis, machine translation, and search.',
    solution:
      'A three-stage hybrid pipeline: (1) token classification to detect noisy tokens using fine-tuned BERT; (2) candidate generation via morphological analysis and edit-distance matching; (3) context-aware selection using BERT masked-language-model scores. An interactive Streamlit dashboard lets users test normalisation in real time.',
    architecture:
      'Python backend with HuggingFace Transformers for BERT fine-tuning. NLTK and custom morphological rules for candidate generation. Edit-distance (Levenshtein) for fuzzy matching. Streamlit for the demo interface.',
    features: [
      'Fine-tuned BERT token classifier for noisy token detection',
      'Morphological analysis for root-form candidate generation',
      'Levenshtein edit-distance for typo and phonetic variant matching',
      'Context-aware candidate selection via BERT MLM scoring',
      'Interactive Streamlit dashboard for live text normalisation',
      'Batch processing support for large datasets',
    ],
    techStack: ['Python', 'HuggingFace Transformers', 'BERT', 'NLTK', 'Streamlit', 'scikit-learn', 'NumPy'],
    categories: ['NLP', 'AI/ML'],
    links: [
      { label: 'GitHub', url: '[PLACEHOLDER_NTN_GITHUB]', icon: 'github' },
    ],
    featured: false,
    status: 'completed',
    date: '2025-11-01',
    myRole:
      'Solo researcher and developer — designed the hybrid pipeline, fine-tuned BERT, built the morphological analyser, and shipped the Streamlit dashboard.',
    challenges: [
      'Balancing normalisation aggressiveness — over-correction strips meaningful informal register (e.g., brand names written in lowercase).',
      'Building a sufficiently diverse training corpus of noisy social-media text required creative data augmentation strategies.',
    ],
    results: [
      'Achieves meaningful normalisation accuracy on held-out social-media benchmark datasets.',
      'Hybrid approach outperforms pure dictionary-lookup and pure model-based baselines on ambiguous tokens.',
    ],
    images: [
      '[PLACEHOLDER_NTN_SS1]',
      '[PLACEHOLDER_NTN_SS2]',
    ],
  },
  {
    id: 'proj-005',
    slug: 'emotion-shop-sync',
    title: 'Emotion Detection',
    shortDescription:
      'Emotion-aware shopping app that detects facial emotion to personalise the shopping experience, with authentication and Supabase-backed face data storage.',
    description:
      'Emotion Detection is a web app that detects a user’s emotion from their face and uses it to personalise the shopping experience. It includes authentication, with login and face data stored in Supabase.',
    problem:
      'Shopping experiences can feel generic when they do not respond to a user’s current emotional context.',
    solution:
      'The app combines facial emotion detection with a personalised shopping experience, alongside authentication and Supabase-backed data storage.',
    architecture:
      'React, TypeScript, and Vite power the frontend, with Tailwind CSS and shadcn/ui for the interface. Supabase supports authentication and face data storage, while face and emotion detection informs the shopping experience.',
    features: [
      'Facial emotion detection',
      'Emotion-aware shopping personalisation',
      'User authentication',
      'Supabase-backed face data storage',
    ],
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Supabase', 'Face/Emotion Detection'],
    categories: ['AI/ML', 'Computer Vision', 'Full Stack'],
    links: [
      { label: 'GitHub', url: 'https://github.com/AnuradhaKashaudhan/emotion-shop-sync', icon: 'github' },
    ],
    featured: false,
    status: 'in-progress',
    date: '2026-10-27',
    myRole: 'Full-stack developer — building the emotion-aware shopping experience and Supabase-backed authentication.',
    challenges: [
      'Connecting facial emotion detection to a useful and responsive shopping experience.',
      'Handling authentication and face data storage through Supabase.',
    ],
    results: [
      'An emotion-aware shopping flow with authentication and Supabase-backed face data storage.',
    ],
  },
  {
    id: 'proj-006',
    slug: 'seva-setu',
    title: 'SevaSetu',
    shortDescription:
      'Community-service platform connecting people who need help with volunteers, with an AI chatbot that offers caring guidance.',
    description:
      'SevaSetu is a compassionate community-service platform that connects people who need help with volunteers. An AI chatbot with a caring persona guides users through the experience.',
    problem:
      'People seeking support and volunteers willing to help need a simple way to find and connect with one another.',
    solution:
      'SevaSetu brings help seekers and volunteers together in one platform, with a caring AI chatbot to guide users.',
    architecture:
      'The frontend is built with React, TypeScript, and Vite, using Tailwind CSS and shadcn/ui. Supabase supports the platform, and an AI chatbot provides conversational guidance.',
    features: [
      'Connects people seeking help with volunteers',
      'AI chatbot with a caring persona',
      'Conversational guidance for users',
    ],
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Supabase', 'AI Chatbot'],
    categories: ['Generative AI', 'Full Stack'],
    links: [
      { label: 'GitHub', url: 'https://github.com/AnuradhaKashaudhan/seva-compassionate-connect', icon: 'github' },
    ],
    featured: false,
    status: 'in-progress',
    date: '2026-10-27',
    myRole: 'Full-stack developer — building the community-service platform and AI-chatbot guidance experience.',
    challenges: [
      'Making it straightforward for people seeking help and volunteers to connect.',
      'Designing chatbot guidance with a compassionate and supportive tone.',
    ],
    results: [
      'A community-service platform that brings help seekers, volunteers, and AI guidance together.',
    ],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null
  next: Project | null
} {
  const idx = projects.findIndex((p) => p.slug === slug)
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  }
}
