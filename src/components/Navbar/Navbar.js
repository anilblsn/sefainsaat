import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/logo/logo2.png';
import { pathWithLang, pickContent, useLang, withLang } from '../../utils/lang';
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

const FlagSA = (
  <svg className="navbar__lang-flagSvg" viewBox="0 0 32 24" aria-hidden="true">
    <rect width="32" height="24" rx="3" fill="#006C35" />
    <text
      x="16"
      y="11"
      textAnchor="middle"
      fill="#fff"
      fontSize="5.5"
      fontFamily="Arial, sans-serif"
      fontWeight="700"
    >
      لا إله إلا الله
    </text>
    <path d="M10 15h12M11 17h10" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M22 14.5l2.5 1.5-2.5 1.5z" fill="#fff" />
  </svg>
);

const LANG_META = {
  tr: { flag: FlagTR, label: 'TÜRKÇE', aria: 'Türkçe' },
  en: { flag: FlagGB, label: 'ENGLISH', aria: 'English' },
  ar: { flag: FlagSA, label: 'العربية', aria: 'العربية' },
};

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
  ar: {
    homeAria: 'الصفحة الرئيسية لسيفا للإنشاءات',
    about: 'من نحن',
    ongoing: 'مشاريع قيد البيع',
    completed: 'المشاريع المكتملة',
    planned: 'المشاريع المخططة',
    contact: 'اتصل بنا',
    langMenu: 'قائمة اللغة',
    langOptions: 'خيارات اللغة',
  },
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const lang = useLang();
  const t = pickContent(CONTENT, lang);
  const currentLang = LANG_META[lang] || LANG_META.tr;
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

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

  const navTo = (path) => withLang(path, lang);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to={navTo('/')} className="navbar__logo" aria-label={t.homeAria}>
        <img src={logoImg} alt="Sefa İnşaat" className="navbar__logo-img" />
      </Link>

      <div className="navbar__right">
        <ul className="navbar__links">
          <li>
            <Link
              to={navTo('/hakkimizda')}
              className={`navbar__link ${location.pathname === '/hakkimizda' ? 'navbar__link--active' : ''}`}
            >
              {t.about}
            </Link>
          </li>
          <li>
            <Link
              to={navTo('/satisi-devam-eden-projeler')}
              className={`navbar__link ${location.pathname === '/satisi-devam-eden-projeler' ? 'navbar__link--active' : ''}`}
            >
              {t.ongoing}
            </Link>
          </li>
          <li>
            <Link
              to={navTo('/tamamlanan-projeler')}
              className={`navbar__link ${location.pathname === '/tamamlanan-projeler' ? 'navbar__link--active' : ''}`}
            >
              {t.completed}
            </Link>
          </li>
          <li>
            <Link
              to={navTo('/planlanan-projeler')}
              className={`navbar__link ${location.pathname === '/planlanan-projeler' ? 'navbar__link--active' : ''}`}
            >
              {t.planned}
            </Link>
          </li>
          <li>
            <Link
              to={navTo('/iletisim')}
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
            {currentLang.flag}
            <span>{currentLang.label}</span>
            <span className="navbar__lang-caret" aria-hidden="true">▾</span>
          </button>

          {langOpen && (
            <div className="navbar__lang-menu" role="menu" aria-label={t.langOptions}>
              {(['tr', 'en', 'ar']).map((code) => (
                <Link
                  key={code}
                  to={pathWithLang(location.pathname, code)}
                  className={`navbar__lang-option ${lang === code ? 'navbar__lang-option--active' : ''}`}
                  role="menuitem"
                  onClick={() => setLangOpen(false)}
                  aria-label={LANG_META[code].aria}
                >
                  {LANG_META[code].flag}
                  <span>{LANG_META[code].label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
