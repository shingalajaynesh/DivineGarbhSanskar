/**
 * AdSense Route Eligibility System for Divine Garbh Sanskar
 * Single source of truth for publisher monetization eligibility.
 * 
 * In alignment with Google Publisher Policies (2026):
 * - Content must remain the primary purpose of every monetized page.
 * - Ads must NOT appear on screens where advertising or promotional material exceeds content.
 * - Ads must NEVER be positioned where they can be confused with navigation, buttons, forms, or checkout.
 * 
 * Default behavior: FALSE for unknown, utility, commercial, or transactional routes.
 */

// Core educational publisher content routes eligible for monetization after AdSense approval
export const ADS_ALLOWED_ROUTES = [
  '/',           // Homepage (has rich educational sections & FAQ)
  '/about',      // About page (genuine institutional & Vedic background)
  '/blog'        // Blog library hub (educational article directory)
];

// Routes strictly excluded from displaying ads
export const ADS_EXCLUDED_ROUTES = [
  '/card',                 // Utility digital visiting card
  '/contact',              // Lead capture & inquiry form (accidental click risk)
  '/courses',              // Commercial curriculum & pricing sales page
  '/simantonayan',         // Specialized ceremony program page
  '/authors',              // Editorial author credibility hub
  '/editorial-policy',     // Editorial standards & citations policy
  '/disclaimer',           // Legal & medical disclaimer
  '/privacy-policy',       // Legal privacy disclosure
  '/terms-of-service',     // Legal terms
  '/refund-policy',        // Commercial policy
  '/cookie-policy'         // Cookie settings
];

/**
 * Evaluates whether a given pathname is eligible to serve ads.
 * @param {string} pathname 
 * @returns {boolean}
 */
export const isAdEligibleRoute = (pathname) => {
  if (!pathname || typeof pathname !== 'string') return false;

  const cleanPath = pathname.split('?')[0].split('#')[0];

  // 1. Explicitly disallow non-content, transactional, admin, or utility routes
  if (
    cleanPath.startsWith('/admin') ||
    cleanPath.startsWith('/login') ||
    cleanPath.startsWith('/account') ||
    cleanPath.startsWith('/checkout') ||
    cleanPath.startsWith('/payment') ||
    ADS_EXCLUDED_ROUTES.includes(cleanPath)
  ) {
    return false;
  }

  // 2. Allow substantive educational blog guides (/blog/:slug)
  if (cleanPath.startsWith('/blog/') && cleanPath.length > 6) {
    return true;
  }

  // 3. Exact match for approved core publisher content routes
  return ADS_ALLOWED_ROUTES.includes(cleanPath);
};

