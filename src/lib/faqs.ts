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

// Voice rule: questions are what a visitor would actually ask ("Are you…"),
// answers are first person. Never third-person name-stuffed questions — they
// read as schema farming. FAQPage JSON-LD is happy with this phrasing, and
// Google requires the visible text to match the schema anyway. Max three per
// page: an FAQ is a footnote, not a section. (The home FAQ was removed in the
// home restructure; only about + contact render one now.)

export const aboutFaqs: FaqItem[] = [
  {
    question: 'What’s your background?',
    answer:
      'I started in Geographic Information Science at the University of the Punjab, working with satellite imagery and spatial data, and moved into machine learning from there. I’m now doing an MS in AI Engineering at COMSATS University, Islamabad, alongside certifications from ESRI and the Samsung Innovation Campus.',
  },
  {
    question: 'Where do you work?',
    answer:
      'I’m a Junior AI Developer at Cointegration, where I build production ML models and multi-agent workflows with LangChain, AutoGen, and the Model Context Protocol.',
  },
  {
    question: 'Have you shipped production ML systems?',
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
]
