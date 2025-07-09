import { NextResponse } from 'next/server'
import { getAllProjectsFromMarkdown } from '@/lib/markdown'

export async function GET() {
  try {
    const projects = getAllProjectsFromMarkdown()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}