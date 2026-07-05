// FAQ data + structured-data builders.
//
// This module is intentionally free of Node-only imports (no `fs`) so the FAQ
// arrays can be consumed by client components (e.g. AboutPageContent) as well
// as the server pages that emit the matching FAQPage JSON-LD. The FaqItem /
// HowTo types are owned here and re-used as type-only imports in markdown.ts.

export interface FaqItem {
  question: string
  answer: string
}

export interface HowToStep {
  name: string
  text: string
}

export interface HowTo {
  name: string
  description?: string
  steps: HowToStep[]
}

/**
 * FAQPage JSON-LD. Google requires every question/answer here to also be
 * visible on the page, so callers must render the same array via <FAQ>.
 */
export function faqPageSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }
}

/**
 * HowTo JSON-LD. Each step's text must mirror a visible section of the post.
 */
export function howToSchema(howTo: HowTo, opts?: { image?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    ...(howTo.description ? { description: howTo.description } : {}),
    ...(opts?.image ? { image: opts.image } : {}),
    step: howTo.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

// ---------------------------------------------------------------------------
// Static-page FAQ content. Every answer is grounded in a fact already stated
// elsewhere on the site (availability, 24h reply, remote, stack, metrics).
// ---------------------------------------------------------------------------

export const homeFaqs: FaqItem[] = [
  {
    question: 'Is Tayyab Manan available for AI/ML work?',
    answer:
      'Yes. I’m open to full-time AI/ML engineering roles and some freelance work, and I reply to messages within 24 hours. I work remotely from Islamabad, Pakistan (UTC+5).',
  },
  {
    question: 'What does Tayyab Manan specialize in?',
    answer:
      'Production machine learning, computer vision, multi-agent AI systems, and geospatial AI. I build models end to end, from training in PyTorch and TensorFlow to deploying them behind Flask or FastAPI APIs.',
  },
  {
    question: 'What tech stack does he use?',
    answer:
      'PyTorch, TensorFlow, and Scikit-learn for ML. LangChain, AutoGen, and CrewAI for multi-agent systems. React, Next.js, and Flask or FastAPI to ship the app around them.',
  },
  {
    question: 'Are the portfolio projects actually deployed?',
    answer:
      'Yes. Every project has a live demo (on Hugging Face Spaces, Vercel, or Netlify) and a public GitHub repo. WaterTrace predicts groundwater at R²=0.89, and my Urdu LLM fine-tune wins 79.5% of blind comparisons against the base model.',
  },
  {
    question: 'How can I get in touch?',
    answer:
      'Use the contact page or email me directly. I usually reply within 24 hours, and I’m happy to talk about roles, collaborations, or project ideas.',
  },
]

export const aboutFaqs: FaqItem[] = [
  {
    question: 'What is Tayyab Manan’s background?',
    answer:
      'I started in Geographic Information Science at the University of the Punjab, working with satellite imagery and spatial data, and moved into machine learning from there. I’m now doing an MS in AI Engineering at COMSATS University, Islamabad.',
  },
  {
    question: 'What are his qualifications?',
    answer:
      'A BS in Geographic Information Science (2025) and an in-progress MS in Artificial Intelligence Engineering at COMSATS, plus certifications from ESRI and the Samsung Innovation Campus.',
  },
  {
    question: 'Where does he work?',
    answer:
      'I’m a Junior AI Developer at Cointegration, where I build production ML models and multi-agent workflows with LangChain, AutoGen, and the Model Context Protocol.',
  },
  {
    question: 'Has he shipped production ML systems?',
    answer:
      'Yes. Six of my projects are deployed with live demos and public repos, including WaterTrace (R²=0.89 across 145 districts), an Urdu LLM fine-tune (79.5% win rate), and face-expression detection (80% on RAF-DB).',
  },
]

export const contactFaqs: FaqItem[] = [
  {
    question: 'How quickly will you respond?',
    answer: 'Within 24 hours, and often the same day. I’m based in Islamabad, Pakistan (UTC+5).',
  },
  {
    question: 'What kind of work are you open to?',
    answer:
      'Full-time AI/ML engineering roles, plus some freelance work, especially anything involving production ML systems, computer vision, multi-agent AI, or geospatial AI.',
  },
  {
    question: 'Do you work remotely?',
    answer:
      'Yes. I work remotely from Islamabad, Pakistan, and I’ve worked with teams spread across different time zones.',
  },
  {
    question: 'What’s the best way to reach you?',
    answer:
      'Use the form on this page or email me directly. My LinkedIn, GitHub, and Upwork profiles are linked here too.',
  },
]
