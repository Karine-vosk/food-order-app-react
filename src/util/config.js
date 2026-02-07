// Base URL for API. On Vercel we use /api (serverless routes). For local dev, set VITE_API_URL=http://localhost:3000 in .env
export const API_BASE = import.meta.env.VITE_API_URL ?? '/api';
