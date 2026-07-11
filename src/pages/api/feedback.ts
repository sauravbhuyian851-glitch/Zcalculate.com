import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

// In-memory rate limiting cache (per server instance)
const rateLimitCache = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;   // Maximum 3 submissions per minute

// Simple HTML sanitizer to prevent XSS
function sanitizeString(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. IP-based Rate Limiting Check
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'anonymous';
    const now = Date.now();
    const clientLimit = rateLimitCache.get(ip);

    if (clientLimit) {
      if (now > clientLimit.resetTime) {
        // Reset window
        rateLimitCache.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      } else if (clientLimit.count >= MAX_REQUESTS_PER_WINDOW) {
        return new Response(JSON.stringify({ success: false, error: 'Too many requests. Please try again later.' }), {
          status: 429,
          headers: { 'Content-Type': 'application/json', 'Retry-After': String(Math.ceil((clientLimit.resetTime - now) / 1000)) }
        });
      } else {
        clientLimit.count++;
      }
    } else {
      rateLimitCache.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }

    // 2. Request Payload Size Check (Max 5 KB)
    const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
    if (contentLength > 5120) {
      return new Response(JSON.stringify({ success: false, error: 'Payload size limit exceeded.' }), {
        status: 413,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Read body safely and verify size dynamically (in case content-length header was spoofed)
    const rawBody = await request.text();
    if (rawBody.length > 5120) {
       return new Response(JSON.stringify({ success: false, error: 'Payload size limit exceeded.' }), {
        status: 413,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 3. Strict Input Verification and Schema Validation
    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return new Response(JSON.stringify({ success: false, error: 'Malformed JSON payload.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { name, email, rating, feedback } = body;

    // Validate Feedback (Required, 3 - 1000 chars)
    if (!feedback || typeof feedback !== 'string' || feedback.trim().length < 3 || feedback.length > 1000) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid feedback length. Must be 3 to 1000 characters.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate Rating (Required, integer between 1 and 5)
    const parsedRating = parseInt(rating, 10);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid rating. Must be an integer between 1 and 5.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate Name (Optional, max 100 chars)
    if (name && (typeof name !== 'string' || name.length > 100)) {
      return new Response(JSON.stringify({ success: false, error: 'Name too long (Max 100 characters).' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate Email (Optional, simple regex check, max 100 chars)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && (typeof email !== 'string' || email.length > 100 || !emailRegex.test(email))) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid email address format.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 4. Sanitize strings to mitigate XSS
    const cleanFeedback = sanitizeString(feedback.trim());
    const cleanName = name ? sanitizeString(name.trim()) : '';
    const cleanEmail = email ? sanitizeString(email.trim()) : '';

    // 5. Secure File Write (Atomic storage logic)
    const filePath = path.resolve('./user_feedback.json');
    let feedbacks = [];

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        feedbacks = JSON.parse(fileContent);
        if (!Array.isArray(feedbacks)) {
          feedbacks = [];
        }
      } catch (readErr) {
        // Log locally, fallback to fresh array if file is corrupted
        console.error('[Security System] Feedback read or parse failure:', readErr);
        feedbacks = [];
      }
    }

    feedbacks.push({
      name: cleanName,
      email: cleanEmail,
      rating: parsedRating,
      feedback: cleanFeedback,
      timestamp: new Date().toISOString()
    });

    // Write file atomically to prevent race condition corruption
    const tempPath = filePath + '.tmp';
    try {
      fs.writeFileSync(tempPath, JSON.stringify(feedbacks, null, 2), 'utf-8');
      fs.renameSync(tempPath, filePath);
    } catch (writeErr) {
      console.error('[Security System] Atomic feedback write failure:', writeErr);
      if (fs.existsSync(tempPath)) {
        try { fs.unlinkSync(tempPath); } catch {}
      }
      throw new Error('Data storage write exception');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    // Audit log details (do not return internal trace or message to the user)
    console.error('[Security System] Feedback API Exception:', err);
    return new Response(JSON.stringify({ success: false, error: 'An internal error occurred. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
