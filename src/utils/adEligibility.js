/**
 * AdSense Route Eligibility System for Divine Garbh Sanskar
 * Google AdSense policy dictates that ads must NOT be shown on:
 * - Login, Registration, Account pages
 * - Checkout, Payment, Cart pages
 * - Contact forms, application forms
 * - Error pages (404), Loading screens
 * - Utility card pages without publisher content
 * 
 * Default behavior: FALSE for unknown or transactional routes.
 */

export const ADS_ALLOWED_ROUTES = [
  '/',
  '/about',
  '/courses',
  '/blog',
  '/simantonayan',
  '/authors',
  '/editorial-policy',
  '/disclaimer',
  '/privacy-policy',
  '/terms-of-service',
  '/refund-policy',
  '/cookie-policy'
];

export const isAdEligibleRoute = (pathname) => {
  if (!pathname) return false;

  // Explicitly disallow non-content or transactional utility routes
  if (
    pathname === '/card' ||
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/payment') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/login')
  ) {
    return false;
  }

  // Allow blog dynamic post routes (/blog/slug)
  if (pathname.startsWith('/blog/')) {
    return true;
  }

  // Check exact match for public publisher content routes
  return ADS_ALLOWED_ROUTES.includes(pathname);
};
