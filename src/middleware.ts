import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url } = context;

  // Bypass host checks and header injection for static HTML routes during pre-rendering/build time
  if (!url.pathname.startsWith('/api/')) {
    return next();
  }

  const host = request.headers.get('host');
  
  // 1. Host Header Validation to prevent Host Injection
  const allowedHosts = [
    'localhost:4321',
    'localhost:4322',
    'zcalculate.com',
    'www.zcalculate.com',
    'zcalculate-com.vercel.app'
  ];
  
  if (host) {
    const isAllowedHost = allowedHosts.some(allowed => 
      host === allowed || host.endsWith('.' + allowed)
    );
    if (!isAllowedHost) {
      return new Response('Invalid Host Header', { status: 400 });
    }
  }

  // 2. CORS Checks for API Routes
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://zcalculate.com',
    'https://www.zcalculate.com',
    'https://zcalculate-com.vercel.app'
  ];
  
  // In development environment, append local ports
  if (process.env.NODE_ENV !== 'production') {
    allowedOrigins.push('http://localhost:4321');
    allowedOrigins.push('http://localhost:4322');
  }

  if (origin && !allowedOrigins.includes(origin)) {
    return new Response(JSON.stringify({ success: false, error: 'CORS policy violation.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Execute downstream route
  const response = await next();

  // 3. Fallback Security Headers for API responses
  const headers = response.headers;
  
  if (!headers.has('Content-Security-Policy')) {
    headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self';");
  }
  if (!headers.has('Strict-Transport-Security')) {
    headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }
  if (!headers.has('X-Frame-Options')) {
    headers.set('X-Frame-Options', 'DENY');
  }
  if (!headers.has('X-Content-Type-Options')) {
    headers.set('X-Content-Type-Options', 'nosniff');
  }
  if (!headers.has('X-XSS-Protection')) {
    headers.set('X-XSS-Protection', '1; mode=block');
  }
  if (!headers.has('Referrer-Policy')) {
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  }
  if (!headers.has('Permissions-Policy')) {
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()');
  }

  return response;
});
