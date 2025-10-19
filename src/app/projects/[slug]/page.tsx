import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/markdown'
import ProjectPageClient from './ProjectPageClient'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    }
  }

  const imageUrl = project.image || '/images/profile-picture.jpg'
  const projectUrl = `https://tayyabmanan.vercel.app/projects/${project.slug}`

  // Create rich description with tech stack
  const techStackText = project.techStack?.slice(0, 5).join(', ') || 'GIS technologies'
  const fullDescription = `${project.description} Built with ${techStackText}. ${project.category} project showcasing expertise in geospatial analysis and full-stack development.`

  return {
    title: `${project.title} - ${project.subtitle || 'GIS Project'}`,
    description: fullDescription,
    keywords: [
      project.title,
      'GIS project',
      'geospatial analysis',
      'web mapping',
      project.category,
      ...(project.techStack || []),
      'spatial data visualization',
      'GIS developer',
      'full stack development'
    ],
    openGraph: {
      title: `${project.title} | Tayyab Manan GIS Portfolio`,
      description: project.description,
      url: projectUrl,
      type: 'article',
      publishedTime: project.date || new Date().toISOString(),
      authors: ['Tayyab Manan'],
      tags: project.techStack || [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} - ${project.subtitle || 'GIS Project Screenshot'}`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - ${project.subtitle || 'GIS Project'}`,
      description: project.description,
      images: [imageUrl],
      creator: '@tayyabmanan',
    },
    alternates: {
      canonical: projectUrl,
    },
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return <ProjectPageClient project={project} />
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}