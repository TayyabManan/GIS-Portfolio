import { NextResponse } from 'next/server'
import { getAllProjectsFromMarkdown } from '@/lib/markdown'

export async function GET() {
  try {
    const projects = getAllProjectsFromMarkdown()
    return NextResponse.json(projects, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    // Log server-side (fs/frontmatter failures are otherwise undiagnosable);
    // the client still gets a generic body.
    console.error('Projects API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}