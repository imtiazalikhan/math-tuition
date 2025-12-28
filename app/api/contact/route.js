import { NextResponse } from 'next/server';

// Security: Input sanitization function
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 1000);
};

// Security: Enhanced email validation
const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate and sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // Validation
    if (!sanitizedName || sanitizedName.length < 2) {
      return NextResponse.json(
        { status: 'error', message: 'Valid name is required' },
        { status: 400 }
      );
    }

    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { status: 'error', message: 'Valid email is required' },
        { status: 400 }
      );
    }

    if (!sanitizedSubject || sanitizedSubject.length < 3) {
      return NextResponse.json(
        { status: 'error', message: 'Valid subject is required' },
        { status: 400 }
      );
    }

    if (!sanitizedMessage || sanitizedMessage.length < 10) {
      return NextResponse.json(
        { status: 'error', message: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Forward to external backend API
    const apiUrl = process.env.BACKEND_API_URL || 'https://math-tuition-backend.vercel.app/api';

    const response = await fetch(`${apiUrl}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: sanitizedName,
        email: sanitizedEmail,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        timestamp: new Date().toISOString(),
      }),
    });

    const result = await response.json();

    if (response.ok && result.status === 'success') {
      return NextResponse.json({
        status: 'success',
        message: 'Message sent successfully!',
      });
    } else {
      return NextResponse.json(
        { status: 'error', message: result.message || 'Failed to send message' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
