/** Doğrudan backend (HTTP) – local geliştirme */
const BACKEND_ORIGIN = 'http://87.248.157.140:3131';

/**
 * Production (Vercel): '' → /api ve /assets, vercel.json ile proxy
 * Local: doğrudan HTTP backend
 * Override: REACT_APP_API_BASE=https://... (Cloudflare tunnel vb.)
 */
export const API_BASE =
  process.env.REACT_APP_API_BASE !== undefined
    ? process.env.REACT_APP_API_BASE
    : process.env.NODE_ENV === 'production'
      ? ''
      : BACKEND_ORIGIN;

export const VIDEOS_URL = `${API_BASE}/api/v1/getIntroVideos`;

/** API'den gelen video URL'lerini aktif API origin ile hizalar */
export function normalizeBackendUrl(url) {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    if (!API_BASE) return `${parsed.pathname}${parsed.search}`;
    const base = new URL(API_BASE);
    if (parsed.origin === base.origin) return url;
    return `${base.origin}${parsed.pathname}${parsed.search}`;
  } catch {
    return url.startsWith('/') ? `${API_BASE}${url}` : url;
  }
}
