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
    const { honeypot, subject, ...formData } = body;

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

    // Validate subject separately (not in schema as it's not in the original form fields)
    if (!subject || typeof subject !== 'string' || subject.length > 200) {
      return NextResponse.json(
        { error: 'Invalid subject' },
        { status: 400 }
      );
    }

    // Prepare Pushover notification with validated data
    const pushoverMessage = `New Contact Form Submission

Name: ${validatedData.name}
Email: ${validatedData.email}
Subject: ${subject}

Message:
${validatedData.message}`;

    // Check if environment variables are set
    const appToken = process.env.PUSHOVER_APP_TOKEN;
    const userKey = process.env.PUSHOVER_USER_KEY;

    if (!appToken || !userKey) {
      console.error('Pushover credentials not configured');
      return NextResponse.json(
        { error: 'Notification service not configured' },
        { status: 500 }
      );
    }

    // Send Pushover notification
    const pushoverResponse = await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        token: appToken,
        user: userKey,
        title: `Contact Form: ${subject}`,
        message: pushoverMessage,
        priority: '0', // Normal priority
        sound: 'pushover', // Default sound
      }),
    });

    const pushoverResult = await pushoverResponse.json();

    if (!pushoverResponse.ok || pushoverResult.status !== 1) {
      console.error('Pushover API error:', {
        status: pushoverResponse.status,
        result: pushoverResult,
      });
      return NextResponse.json(
        { error: 'Failed to send notification', details: pushoverResult.errors },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}