import { notFound } from 'next/navigation'
import { projects } from '@/lib/projects'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {project.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {project.subtitle}
        </p>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>{project.description}</p>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}