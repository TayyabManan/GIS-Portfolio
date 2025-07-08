import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(1, 'Message is required').max(5000),
  honeypot: z.string().optional(),
});

// Create transporter
const createTransporter = () => {
  // Using Gmail SMTP (you can change this to any email service)
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD, // Use App Password for Gmail
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);
    
    // Check honeypot field (anti-spam)
    if (validatedData.honeypot) {
      // If honeypot is filled, it's likely a bot
      return NextResponse.json(
        { message: 'Email sent successfully!' }, // Fake success to confuse bots
        { status: 200 }
      );
    }
    
    // Create email transporter
    const transporter = createTransporter();
    
    // Email options
    const mailOptions = {
      from: `"${validatedData.name}" <${process.env.EMAIL_USER}>`,
      to: 'haris.a.mannan@gmail.com', // Your email
      replyTo: validatedData.email,
      subject: `Portfolio Contact: ${validatedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${validatedData.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${validatedData.email}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${validatedData.subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">
              <p style="margin: 0; white-space: pre-wrap;">${validatedData.message}</p>
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          
          <p style="font-size: 12px; color: #666;">
            This email was sent from your portfolio contact form at ${new Date().toLocaleString()}.
          </p>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${validatedData.name}
        Email: ${validatedData.email}
        Subject: ${validatedData.subject}
        
        Message:
        ${validatedData.message}
        
        ---
        This email was sent from your portfolio contact form at ${new Date().toLocaleString()}.
      `,
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Send confirmation email to the user (optional)
    const confirmationMailOptions = {
      from: `"Muhammad Tayyab" <${process.env.EMAIL_USER}>`,
      to: validatedData.email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for reaching out!</h2>
          
          <p>Hi ${validatedData.name},</p>
          
          <p>I've received your message and will get back to you within 24 hours.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Your message:</strong></p>
            <p style="margin: 5px 0; font-style: italic;">"${validatedData.message}"</p>
          </div>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Check out my <a href="https://github.com/TayyabManan" style="color: #3b82f6;">GitHub</a> for recent projects</li>
            <li>Connect with me on <a href="https://www.linkedin.com/in/muhammad-tayyab-3962a2373/" style="color: #3b82f6;">LinkedIn</a></li>
          </ul>
          
          <p>Best regards,<br>Muhammad Tayyab</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          
          <p style="font-size: 12px; color: #666;">
            This is an automated response to confirm I've received your message.
          </p>
        </div>
      `,
      text: `
        Thank you for reaching out!
        
        Hi ${validatedData.name},
        
        I've received your message and will get back to you within 24 hours.
        
        Your message:
        "${validatedData.message}"
        
        In the meantime, feel free to:
        - Check out my GitHub: https://github.com/TayyabManan
        - Connect with me on LinkedIn: https://www.linkedin.com/in/muhammad-tayyab-3962a2373/
        
        Best regards,
        Muhammad Tayyab
        
        ---
        This is an automated response to confirm I've received your message.
      `,
    };
    
    // Send confirmation email (don't wait for it)
    transporter.sendMail(confirmationMailOptions).catch(console.error);
    
    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    
    if (error instanceof Error && error.message.includes('auth')) {
      return NextResponse.json(
        { error: 'Email configuration error. Please contact the administrator.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}