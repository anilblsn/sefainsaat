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
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
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
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
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
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
  },
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    setMenuOpen(false);
    setLangOpen(false);
  }, [location.pathname, lang]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!langOpen) return undefined;
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

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const navTo = (path) => withLang(path, lang);
  const isActive = (path) => location.pathname === path;

  const links = [
    { path: '/hakkimizda', label: t.about },
    { path: '/satisi-devam-eden-projeler', label: t.ongoing },
    { path: '/tamamlanan-projeler', label: t.completed },
    { path: '/planlanan-projeler', label: t.planned },
    { path: '/iletisim', label: t.contact },
  ];

  return (
    <nav className={`navbar ${scrolled || menuOpen ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--menu-open' : ''}`}>
      <Link to={navTo('/')} className="navbar__logo" aria-label={t.homeAria}>
        <img src={logoImg} alt="Sefa İnşaat" className="navbar__logo-img" />
      </Link>

      <div className="navbar__right">
        <ul className="navbar__links navbar__links--desktop">
          {links.map((item) => (
            <li key={item.path}>
              <Link
                to={navTo(item.path)}
                className={`navbar__link ${isActive(item.path) ? 'navbar__link--active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
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
            <span className="navbar__lang-label">{currentLang.label}</span>
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

        <button
          type="button"
          className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="navbar-mobile-menu"
          aria-label={menuOpen ? t.closeMenu : t.openMenu}
        >
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
        </button>
      </div>

      <div
        id="navbar-mobile-menu"
        className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className="navbar__links navbar__links--mobile">
          {links.map((item) => (
            <li key={item.path}>
              <Link
                to={navTo(item.path)}
                className={`navbar__link ${isActive(item.path) ? 'navbar__link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="navbar__backdrop"
          aria-label={t.closeMenu}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
}

export default Navbar;
