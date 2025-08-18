import { NextResponse } from 'next/server'
import { resumeData } from '@/lib/resume-data'

export async function GET() {
  try {
    return NextResponse.json(resumeData, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch resume data' },
      { status: 500 }
    )
  }
}