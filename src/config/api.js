/** Sunucu (HTTP). Vercel production'da istekler aynı origin üzerinden proxy ile gider. */
const BACKEND_ORIGIN = 'http://87.248.157.140:3131';

/**
 * Production (Vercel): '' → /api/... ve /assets/... (vercel.json rewrite)
 * Local dev: doğrudan HTTP backend
 * Override: REACT_APP_API_BASE=http://...
 */
export const API_BASE =
  process.env.REACT_APP_API_BASE !== undefined
    ? process.env.REACT_APP_API_BASE
    : process.env.NODE_ENV === 'production'
      ? ''
      : BACKEND_ORIGIN;

export const VIDEOS_URL = `${API_BASE}/api/v1/getIntroVideos`;

/** API'den gelen localhost / IP URL'lerini proxy path'ine çevirir */
export function normalizeBackendUrl(url) {
  if (!url) return '';
  try {
    const { pathname, search } = new URL(url);
    if (!API_BASE) return `${pathname}${search}`;
    return `${API_BASE}${pathname}${search}`;
  } catch {
    return url.startsWith('/') ? url : `/${url}`;
  }
}
