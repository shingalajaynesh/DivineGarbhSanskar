/**
 * API Base URL Configuration
 * Supports:
 * 1. Local Development (proxied via Vite or localhost:4100)
 * 2. Vercel Frontend + Render Backend via VITE_API_URL environment variable
 *    (e.g., VITE_API_URL=https://thedivinegarbhsanskar-backend.onrender.com)
 * 3. Fallback to same-origin /api
 */

const rawApiUrl = import.meta.env.VITE_API_URL || '';

export const API_BASE = rawApiUrl
  ? `${rawApiUrl.replace(/\/+$/, '')}/api`
  : '/api';

export default API_BASE;
