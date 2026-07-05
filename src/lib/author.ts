// Single source of truth for author identity — reused by the visible AuthorBio
// block and the BlogPosting author JSON-LD (which also references the global
// Person entity's @id for graph consolidation).

export const PERSON_ID = 'https://tayyabmanan.com/#person'

export const author = {
  name: 'Tayyab Manan',
  role: 'AI/ML Engineer',
  url: 'https://tayyabmanan.com/about',
  image: '/images/profile-picture.webp',
  bio: 'AI/ML Engineer working on computer vision, multi-agent systems, and geospatial AI. I’m a Junior AI Developer at Cointegration and an MS AI Engineering student at COMSATS, and every project I build ships with a live demo and a public repo.',
  sameAs: [
    'https://www.linkedin.com/in/tayyabmanan',
    'https://github.com/TayyabManan',
    'https://twitter.com/tayyabmanan',
    'https://huggingface.co/TayyabManan',
  ],
}
