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
    const html = document.documentElement;
    html.lang = lang;
    html.dir = 'ltr';
    html.classList.toggle('lang-ar', lang === 'ar');

    // Chrome often misdetects Turkish pages and offers "Translate to Turkish".
    // Block auto-translate only when the site language is already Turkish.
    const isTr = lang === 'tr';
    html.classList.toggle('notranslate', isTr);
    if (isTr) html.setAttribute('translate', 'no');
    else html.removeAttribute('translate');

    let meta = document.querySelector('meta[name="google"][content="notranslate"], meta[name="google"]');
    if (isTr) {
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'google');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', 'notranslate');
    } else if (meta && meta.getAttribute('content') === 'notranslate') {
      meta.remove();
    }
  }, [lang]);

  return lang;
}
