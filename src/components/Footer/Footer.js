import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './Footer.css';

const QUICK_LINKS_TR = [
  { label: 'Hakkımızda', path: '/hakkimizda' },
  { label: 'Bizden Haberler', path: '#haberler' },
  { label: 'Satışı Devam Eden Projeler', path: '/satisi-devam-eden-projeler' },
  { label: 'Tamamlanan Projeler', path: '/tamamlanan-projeler' },
  { label: 'Planlanan Projeler', path: '/planlanan-projeler' },
  { label: 'İletişim', path: '/iletisim' },
];

const QUICK_LINKS_EN = [
  { label: 'About Us', path: '/hakkimizda' },
  { label: 'News', path: '#haberler' },
  { label: 'Ongoing Sales Projects', path: '/satisi-devam-eden-projeler' },
  { label: 'Completed Projects', path: '/tamamlanan-projeler' },
  { label: 'Planned Projects', path: '/planlanan-projeler' },
  { label: 'Contact', path: '/iletisim' },
];

const CONTENT = {
  tr: {
    tagline: '',
    about: '1977 yılında kurulan Sefa İnşaat, dürüstlük ilkesini prensip edinerek marka olmanın bilinci ve sorumluluğu ile sağlam adımlarla yürümektedir.',
    quickMenu: 'HIZLI MENÜ',
    headOffice: 'MERKEZ OFİS',
  },
  en: {
    tagline: '',
    about: 'Founded in 1977, Sefa Construction moves forward with steady steps, adopting integrity as a principle and with the awareness and responsibility of being a brand.',
    quickMenu: 'QUICK MENU',
    headOffice: 'HEAD OFFICE',
  },
};

function Footer() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'tr';
  const t = CONTENT[lang];
  const quickLinks = lang === 'en' ? QUICK_LINKS_EN : QUICK_LINKS_TR;
  const pathWithLang = (path) => (path.startsWith('/') && !path.includes('#')) ? `${path}${lang === 'en' ? '?lang=en' : ''}` : path;

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col footer__col--brand">
          <div className="footer__logo">
            <span className="footer__logo-main">SEFA</span>
            <span className="footer__logo-sub">İNŞAAT</span>
            {t.tagline ? <span className="footer__logo-tagline">{t.tagline}</span> : null}
          </div>
          <p className="footer__about">
            {t.about}
          </p>
        </div>
        <div className="footer__col footer__col--menu">
          <h3 className="footer__heading">{t.quickMenu}</h3>
          <ul className="footer__links">
            {quickLinks.map((item) => (
              <li key={item.path}>
                <a href={pathWithLang(item.path)} className="footer__link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__col footer__col--contact">
          <h3 className="footer__heading">{t.headOffice}</h3>
          <ul className="footer__contact">
            <li>
              <span className="footer__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span>Suadiye, Bağdat Cad. No:451 D:8, 34740 Kadıköy/İstanbul</span>
            </li>
            <li>
              <span className="footer__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <a href="tel:+902164451549">0216 445 15 49</a>
            </li>
            <li>
              <span className="footer__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <a href="mailto:info@sefainsaat.com.tr">info@sefainsaat.com.tr</a>
            </li>
            <li>
              <span className="footer__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </span>
              <a href="http://www.sefainsaat.com.tr/" target="_blank" rel="noopener noreferrer">www.sefainsaat.com.tr</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom" />
    </footer>
  );
}

export default Footer;
