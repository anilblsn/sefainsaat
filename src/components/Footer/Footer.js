import React from 'react';
import logoImg from '../../assets/logo/logo2.png';
import evinparkLogo from '../../assets/logo/evinparklogo.png';
import { pickContent, useLang, withLang } from '../../utils/lang';
import './Footer.css';

const QUICK_LINKS = {
  tr: [
    { label: 'Hakkımızda', path: '/hakkimizda' },
    { label: 'Bizden Haberler', path: '#haberler' },
    { label: 'Satışı Devam Eden Projeler', path: '/satisi-devam-eden-projeler' },
    { label: 'Tamamlanan Projeler', path: '/tamamlanan-projeler' },
    { label: 'Planlanan Projeler', path: '/planlanan-projeler' },
    { label: 'İletişim', path: '/iletisim' },
  ],
  en: [
    { label: 'About Us', path: '/hakkimizda' },
    { label: 'News', path: '#haberler' },
    { label: 'Ongoing Sales Projects', path: '/satisi-devam-eden-projeler' },
    { label: 'Completed Projects', path: '/tamamlanan-projeler' },
    { label: 'Planned Projects', path: '/planlanan-projeler' },
    { label: 'Contact', path: '/iletisim' },
  ],
  ar: [
    { label: 'من نحن', path: '/hakkimizda' },
    { label: 'أخبارنا', path: '#haberler' },
    { label: 'مشاريع قيد البيع', path: '/satisi-devam-eden-projeler' },
    { label: 'المشاريع المكتملة', path: '/tamamlanan-projeler' },
    { label: 'المشاريع المخططة', path: '/planlanan-projeler' },
    { label: 'اتصل بنا', path: '/iletisim' },
  ],
};

const CONTENT = {
  tr: {
    quickMenu: 'HIZLI MENÜ',
    headOffice: 'MERKEZ OFİS',
  },
  en: {
    quickMenu: 'QUICK MENU',
    headOffice: 'HEAD OFFICE',
  },
  ar: {
    quickMenu: 'قائمة سريعة',
    headOffice: 'المكتب الرئيسي',
  },
};

function Footer() {
  const lang = useLang();
  const t = pickContent(CONTENT, lang);
  const quickLinks = pickContent(QUICK_LINKS, lang);

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col footer__col--menu">
          <h3 className="footer__heading">{t.quickMenu}</h3>
          <ul className="footer__links">
            {quickLinks.map((item) => (
              <li key={item.path}>
                <a href={withLang(item.path, lang)} className="footer__link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__col footer__col--brand">
          <div className="footer__logo">
            <img src={logoImg} alt="Sefa İnşaat" className="footer__logo-img" />
            <img src={evinparkLogo} alt="evinpark" className="footer__evinpark-img" />
          </div>
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
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              <a href="https://wa.me/905394548728" target="_blank" rel="noopener noreferrer">
                +90 539 454 87 28
              </a>
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
