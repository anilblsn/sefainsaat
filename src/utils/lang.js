import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SUPPORTED_LANGS = ['tr', 'en', 'ar'];

export function resolveLang(raw) {
  const value = (raw || 'tr').toLowerCase();
  return SUPPORTED_LANGS.includes(value) ? value : 'tr';
}

/** Keep current path, switch lang query (TR = no query). */
export function pathWithLang(pathname, lang) {
  const path = pathname || '/';
  const l = resolveLang(lang);
  if (l === 'tr') return path;
  return `${path}?lang=${l}`;
}

/** Append current lang to an internal path. */
export function withLang(path, lang) {
  if (!path || !path.startsWith('/') || path.includes('#')) return path;
  const l = resolveLang(lang);
  if (l === 'tr') return path;
  const [base, hash] = path.split('#');
  const sep = base.includes('?') ? '&' : '?';
  const next = `${base}${sep}lang=${l}`;
  return hash ? `${next}#${hash}` : next;
}

export function pickContent(contentByLang, lang) {
  const l = resolveLang(lang);
  return contentByLang[l] || contentByLang.tr;
}

export function useLang() {
  const [searchParams] = useSearchParams();
  const lang = resolveLang(searchParams.get('lang'));

  useEffect(() => {
    // Keep layout LTR always — Arabic only affects text direction via .lang-ar CSS
    document.documentElement.lang = lang === 'tr' ? 'tr' : lang;
    document.documentElement.dir = 'ltr';
    document.documentElement.classList.toggle('lang-ar', lang === 'ar');
  }, [lang]);

  return lang;
}
