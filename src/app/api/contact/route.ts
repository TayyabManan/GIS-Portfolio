import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { contactFormSchema } from '@/lib/validation';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const rateLimitResult = await rateLimit(request, {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 3 // 3 requests per 15 minutes
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString()
          }
        }
      );
    }

    const body = await request.json();
    const { honeypot, ...formData } = body;

    // Anti-spam check
    if (honeypot) {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400 }
      );
    }

    // Validate and sanitize input
    let validatedData: z.infer<typeof contactFormSchema>;
    try {
      validatedData = contactFormSchema.parse(formData);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid input', details: validationError.errors },
          { status: 400 }
        );
      }
      throw validationError;
    }

    // Prepare Pushover notification with validated data
    const pushoverMessage = `New Contact Form Submission

Name: ${validatedData.name}
Email: ${validatedData.email}
Subject: ${validatedData.subject}

Message:
${validatedData.message}`;

    const ntfyTopic = process.env.NTFY_TOPIC;

    if (!ntfyTopic) {
      console.error('NTFY_TOPIC environment variable is not set');
      return NextResponse.json(
        { error: 'Notification service not configured. Please check server configuration.' },
        { status: 500 }
      );
    }

    // Send ntfy notification
    const ntfyUrl = `https://ntfy.sh/${ntfyTopic}`;
    console.log('Sending notification to:', ntfyUrl);
    
    const ntfyResponse = await fetch(ntfyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Title': `Contact Form: ${validatedData.subject}`,
        'Priority': '3', // Default priority
        'Tags': 'envelope,email',
      },
      body: pushoverMessage,
    });

    if (!ntfyResponse.ok) {
      const errorText = await ntfyResponse.text();
      console.error('ntfy.sh error:', ntfyResponse.status, errorText);
      return NextResponse.json(
        { error: 'Failed to send notification. Please try again later.' },
        { status: 500 }
      );
    }
    
    const successResponse = await ntfyResponse.json();
    console.log('ntfy.sh success:', successResponse);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}