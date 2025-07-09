import { NextResponse } from 'next/server'
import { resumeData } from '@/lib/resume-data'

export async function GET() {
  try {
    // Return the resume data as JSON for client-side PDF generation
    return NextResponse.json(resumeData, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    })
  } catch (error) {
    console.error('Error fetching resume data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resume data' },
      { status: 500 }
    )
  }
}