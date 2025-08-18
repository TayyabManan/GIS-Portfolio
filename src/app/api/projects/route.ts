import { NextResponse } from 'next/server'
import { getAllProjectsFromMarkdown } from '@/lib/markdown'

export async function GET() {
  try {
    const projects = getAllProjectsFromMarkdown()
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}