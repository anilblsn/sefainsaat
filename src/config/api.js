/** Cloudflare Tunnel (HTTPS) – production & varsayılan */
export const API_BASE =
  process.env.REACT_APP_API_BASE || 'https://okay-wax-attempt-publication.trycloudflare.com';

export const VIDEOS_URL = `${API_BASE}/api/v1/getIntroVideos`;

/** API'den gelen video URL'lerini aktif API origin ile hizalar */
export function normalizeBackendUrl(url) {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    const base = new URL(API_BASE);
    if (parsed.origin === base.origin) return url;
    return `${base.origin}${parsed.pathname}${parsed.search}`;
  } catch {
    return url.startsWith('/') ? `${API_BASE}${url}` : url;
  }
}
