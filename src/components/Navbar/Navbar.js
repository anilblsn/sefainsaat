import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import logoImg from '../../assets/logo/logo2.png';
import './Navbar.css';

const FlagTR = (
  <svg className="navbar__lang-flagSvg" viewBox="0 0 32 24" aria-hidden="true">
    <rect width="32" height="24" rx="3" fill="#E30A17" />
    <circle cx="13" cy="12" r="6" fill="#fff" />
    <circle cx="14.7" cy="12" r="4.8" fill="#E30A17" />
    <path
      d="M20.6 12l3.1 1-1.9 2.6 0-3.2 1.9 2.6-3.1 1 1.9-2.6z"
      fill="#fff"
    />
  </svg>
);

const FlagGB = (
  <svg className="navbar__lang-flagSvg" viewBox="0 0 32 24" aria-hidden="true">
    <rect width="32" height="24" rx="3" fill="#012169" />
    <path d="M0 0l32 24M32 0L0 24" stroke="#fff" strokeWidth="5" />
    <path d="M0 0l32 24M32 0L0 24" stroke="#C8102E" strokeWidth="3" />
    <path d="M16 0v24M0 12h32" stroke="#fff" strokeWidth="7" />
    <path d="M16 0v24M0 12h32" stroke="#C8102E" strokeWidth="4" />
  </svg>
);

const CONTENT = {
  tr: {
    homeAria: 'Sefa İnşaat Ana Sayfa',
    about: 'HAKKIMIZDA',
    ongoing: 'SATIŞI DEVAM EDEN PROJELER',
    completed: 'TAMAMLANAN PROJELER',
    planned: 'PLANLANAN PROJELER',
    contact: 'İLETİŞİM',
    langMenu: 'Dil menüsü',
    langOptions: 'Dil seçenekleri',
  },
  en: {
    homeAria: 'Sefa Construction Home',
    about: 'ABOUT US',
    ongoing: 'ONGOING SALES PROJECTS',
    completed: 'COMPLETED PROJECTS',
    planned: 'PLANNED PROJECTS',
    contact: 'CONTACT',
    langMenu: 'Language menu',
    langOptions: 'Language options',
  },
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'tr';
  const pathWithLang = (l) => `${location.pathname}${l === 'tr' ? '' : '?lang=en'}`;
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const t = lang === 'en' ? CONTENT.en : CONTENT.tr;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const onPointerDown = (e) => {
      if (!langRef.current) return;
      if (langRef.current.contains(e.target)) return;
      setLangOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLangOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [langOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar__logo" aria-label={t.homeAria}>
        <img src={logoImg} alt="Sefa İnşaat" className="navbar__logo-img" />
      </Link>

      <div className="navbar__right">
        <ul className="navbar__links">
          <li>
            <Link
              to="/hakkimizda"
              className={`navbar__link ${location.pathname === '/hakkimizda' ? 'navbar__link--active' : ''}`}
            >
              {t.about}
            </Link>
          </li>
          <li>
            <Link
              to="/satisi-devam-eden-projeler"
              className={`navbar__link ${location.pathname === '/satisi-devam-eden-projeler' ? 'navbar__link--active' : ''}`}
            >
              {t.ongoing}
            </Link>
          </li>
          <li>
            <Link
              to="/tamamlanan-projeler"
              className={`navbar__link ${location.pathname === '/tamamlanan-projeler' ? 'navbar__link--active' : ''}`}
            >
              {t.completed}
            </Link>
          </li>
          <li>
            <Link
              to="/planlanan-projeler"
              className={`navbar__link ${location.pathname === '/planlanan-projeler' ? 'navbar__link--active' : ''}`}
            >
              {t.planned}
            </Link>
          </li>
          <li>
            <Link
              to="/iletisim"
              className={`navbar__link ${location.pathname === '/iletisim' ? 'navbar__link--active' : ''}`}
            >
              {t.contact}
            </Link>
          </li>
        </ul>

        <div ref={langRef} className="navbar__lang">
          <button
            type="button"
            className={`navbar__lang-trigger ${langOpen ? 'navbar__lang-trigger--open' : ''}`}
            onClick={() => setLangOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={langOpen}
            aria-label={t.langMenu}
          >
            {lang === 'en' ? FlagGB : FlagTR}
            <span>{lang === 'en' ? 'ENGLISH' : 'TÜRKÇE'}</span>
            <span className="navbar__lang-caret" aria-hidden="true">▾</span>
          </button>

          {langOpen && (
            <div className="navbar__lang-menu" role="menu" aria-label={t.langOptions}>
              <Link
                to={pathWithLang('tr')}
                className={`navbar__lang-option ${lang !== 'en' ? 'navbar__lang-option--active' : ''}`}
                role="menuitem"
                onClick={() => setLangOpen(false)}
                aria-label="Türkçe"
              >
                {FlagTR}
                <span>TÜRKÇE</span>
              </Link>
              <Link
                to={pathWithLang('en')}
                className={`navbar__lang-option ${lang === 'en' ? 'navbar__lang-option--active' : ''}`}
                role="menuitem"
                onClick={() => setLangOpen(false)}
                aria-label="English"
              >
                {FlagGB}
                <span>ENGLISH</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
