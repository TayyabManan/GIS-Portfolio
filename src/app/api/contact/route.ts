import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    // Anti-spam check
    if (honeypot) {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare Pushover notification
    const pushoverMessage = `New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`;

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